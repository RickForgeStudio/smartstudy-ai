const SPOTIFY_CLIENT_ID = "930d6d20806249f1828734389e5c9173";
const SPOTIFY_REDIRECT_URI = "https://rickforgestudio.github.io/smartstudy-ai/";

console.log("Spotify redirect URI:", SPOTIFY_REDIRECT_URI);

const SPOTIFY_SCOPES = [
  "streaming",
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-email",
  "user-read-private"
];

const SPOTIFY_AUTH_STORAGE_KEY = "smartstudy-spotify-auth";
const SPOTIFY_LOCKED_PLAYLIST_KEY = "smartstudy-spotify-locked-playlist-uri";
const SPOTIFY_PKCE_VERIFIER_KEY = "smartstudy-spotify-pkce-verifier";
const SPOTIFY_CONTROL_TIMEOUT_MS = 3000;
let spotifyWidgetInitialized = false;
let spotifyControlsBound = false;

(function bootstrapSpotifyFocusPlayer() {
  const state = {
    ui: null,
    auth: loadJsonStorage(SPOTIFY_AUTH_STORAGE_KEY) || null,
    player: null,
    deviceId: "",
    playback: null,
    pollTimer: null,
    pollIntervalMs: 5000,
    sdkReady: false,
    connecting: false,
    toggleBusy: false,
    previousBusy: false,
    nextBusy: false,
    volumeDebounceTimer: null,
    volume: Math.max(0, Math.min(1, Number(localStorage.getItem("smartstudy.spotify.volume")) || 0.25)),
    lockedPlaylistUri: localStorage.getItem(SPOTIFY_LOCKED_PLAYLIST_KEY) || "",
    initialized: false
  };

  function loadJsonStorage(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }

  function saveJsonStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Ignore storage errors.
    }
  }

  function setStatus(message, title) {
    if (state.ui?.statusText) {
      state.ui.statusText.textContent = message;
      state.ui.statusText.classList.remove("is-error");
    }
    if (title && state.ui?.statusTitle) {
      state.ui.statusTitle.textContent = title;
    }
  }

  function setError(message, title) {
    if (state.ui?.statusText) {
      state.ui.statusText.textContent = message;
      state.ui.statusText.classList.add("is-error");
    }
    if (title && state.ui?.statusTitle) {
      state.ui.statusTitle.textContent = title;
    }
  }

  function setSpotifyStatus(message, title) {
    setStatus(message, title);
  }

  function createSpotifyControlTimeoutError(label, timeoutMs) {
    const error = new Error(`${label} timeout after ${timeoutMs}ms`);
    error.name = "SpotifyControlTimeoutError";
    error.code = "SPOTIFY_CONTROL_TIMEOUT";
    return error;
  }

  async function withSpotifyControlTimeout(task, label, timeoutMs = SPOTIFY_CONTROL_TIMEOUT_MS) {
    let timeoutId = null;
    try {
      return await Promise.race([
        Promise.resolve().then(task),
        new Promise((_, reject) => {
          timeoutId = window.setTimeout(() => {
            reject(createSpotifyControlTimeoutError(label, timeoutMs));
          }, timeoutMs);
        })
      ]);
    } finally {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    }
  }

  function getSpotifyControlElements() {
    const spotifyPlayButton = document.getElementById("spotifyPlayButton");
    const spotifyPreviousButton = document.getElementById("spotifyPreviousButton");
    const spotifyNextButton = document.getElementById("spotifyNextButton");
    const spotifyVolumeInput = document.getElementById("spotifyVolumeInput");

    console.log("Spotify play button:", spotifyPlayButton);
    console.log("Spotify previous button:", spotifyPreviousButton);
    console.log("Spotify next button:", spotifyNextButton);
    console.log("Spotify volume input:", spotifyVolumeInput);

    if (!spotifyPlayButton) {
      console.warn("[Spotify] spotifyPlayButton is null");
    }
    if (!spotifyVolumeInput) {
      console.warn("[Spotify] spotifyVolumeInput is null");
    }

    return {
      spotifyPlayButton,
      spotifyPreviousButton,
      spotifyNextButton,
      spotifyVolumeInput
    };
  }

  function warnMissingElement(label, element) {
    if (!element) {
      console.warn(`[Spotify] Missing element: ${label}`);
    }
  }

  function setPremiumState(enabled) {
    if (!state.ui?.premiumBadge) {
      return;
    }
    state.ui.premiumBadge.hidden = !enabled;
  }

  function persistAuth() {
    if (state.auth) {
      saveJsonStorage(SPOTIFY_AUTH_STORAGE_KEY, state.auth);
      return;
    }
    localStorage.removeItem(SPOTIFY_AUTH_STORAGE_KEY);
  }

  function setLockedPlaylistUri(uri) {
    state.lockedPlaylistUri = uri || "";
    if (state.lockedPlaylistUri) {
      localStorage.setItem(SPOTIFY_LOCKED_PLAYLIST_KEY, state.lockedPlaylistUri);
    } else {
      localStorage.removeItem(SPOTIFY_LOCKED_PLAYLIST_KEY);
    }
    renderLockState();
  }

  function renderLockState() {
    if (!state.ui?.lockActions || !state.ui?.lockButton || !state.ui?.returnLockedButton || !state.ui?.lockStatus) {
      return;
    }

    const context = state.playback?.context || null;
    const isPlaylist = context?.type === "playlist" && Boolean(context?.uri);
    const leftLockedPlaylist = Boolean(state.lockedPlaylistUri)
      && Boolean(context?.uri)
      && context.uri !== state.lockedPlaylistUri;

    state.ui.lockActions.hidden = !isPlaylist && !state.lockedPlaylistUri;
    state.ui.lockButton.hidden = !isPlaylist;
    state.ui.returnLockedButton.hidden = !leftLockedPlaylist;
    state.ui.lockStatus.hidden = !state.lockedPlaylistUri;

    if (!state.lockedPlaylistUri) {
      state.ui.lockStatus.hidden = true;
      state.ui.lockStatus.textContent = "";
      return;
    }

    if (leftLockedPlaylist) {
      state.ui.lockStatus.textContent = "已離開鎖定歌單";
      state.ui.lockStatus.classList.add("is-error");
      return;
    }

    state.ui.lockStatus.textContent = "已鎖定歌單";
    state.ui.lockStatus.classList.remove("is-error");
  }

  function updateConnectButtons() {
    if (!state.ui) {
      return;
    }
    const hasAuth = Boolean(state.auth?.access_token);
    if (state.ui.connectButton) {
      state.ui.connectButton.hidden = hasAuth;
    }
    if (state.ui.reconnectButton) {
      state.ui.reconnectButton.hidden = !hasAuth;
    }
    if (state.ui.disconnectButton) {
      state.ui.disconnectButton.hidden = !hasAuth;
    }
  }

  function formatMs(value) {
    const totalSeconds = Math.max(0, Math.floor((Number(value) || 0) / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  function renderPlayback(playback) {
    state.playback = playback;

    if (!state.ui) {
      return;
    }

    const item = playback?.item || null;
    const isPlaying = Boolean(playback?.is_playing);

    state.ui.controls.hidden = !item;
    state.ui.nowPlaying.hidden = false;
    state.ui.progressWrap.hidden = !item;

    if (!item) {
      state.ui.trackName.textContent = "尚未播放";
      state.ui.artistName.textContent = "等待讀取目前播放內容";
      state.ui.cover.hidden = true;
      state.ui.playPauseButton.textContent = "播放";
      renderLockState();
      return;
    }

    const artists = Array.isArray(item.artists) ? item.artists.map((artist) => artist.name).join("、") : "";
    const coverUrl = item.album?.images?.[0]?.url || "";
    state.ui.trackName.textContent = item.name || "未命名歌曲";
    state.ui.artistName.textContent = artists || "未知歌手";
    state.ui.playPauseButton.textContent = isPlaying ? "暫停" : "播放";
    if (state.ui.volumeInput && typeof playback?.device?.volume_percent === "number") {
      state.ui.volumeInput.value = String(Math.min(1, Math.max(0, playback.device.volume_percent / 100)));
    }
    state.ui.cover.src = coverUrl;
    state.ui.cover.hidden = !coverUrl;
    state.ui.progressCurrent.textContent = formatMs(playback.progress_ms);
    state.ui.progressTotal.textContent = formatMs(item.duration_ms);
    const ratio = item.duration_ms ? Math.min(100, Math.max(0, (playback.progress_ms / item.duration_ms) * 100)) : 0;
    state.ui.progressFill.style.width = `${ratio}%`;

    if (isPlaying) {
      window.dispatchEvent(new CustomEvent("smartstudy:spotify-playing"));
    }

    renderLockState();
  }

  async function sha256(plain) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest("SHA-256", data);
  }

  function base64UrlEncode(input) {
    const bytes = new Uint8Array(input);
    let binary = "";
    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
  }

  function createCodeVerifier() {
    const array = new Uint8Array(64);
    window.crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
  }

  async function redirectToSpotifyAuth() {
    if (!SPOTIFY_CLIENT_ID || SPOTIFY_CLIENT_ID.includes("請在這裡填入")) {
      setError("請先在 spotify-player.js 填入 Spotify Developer App Client ID。", "尚未設定 Spotify Client ID");
      return;
    }

    const codeVerifier = createCodeVerifier();
    const challenge = base64UrlEncode(await sha256(codeVerifier));
    sessionStorage.setItem(SPOTIFY_PKCE_VERIFIER_KEY, codeVerifier);

    const params = new URLSearchParams({
      client_id: SPOTIFY_CLIENT_ID,
      response_type: "code",
      redirect_uri: SPOTIFY_REDIRECT_URI,
      code_challenge_method: "S256",
      code_challenge: challenge,
      scope: SPOTIFY_SCOPES.join(" ")
    });

    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  async function exchangeCodeForToken(code) {
    const codeVerifier = sessionStorage.getItem(SPOTIFY_PKCE_VERIFIER_KEY);
    if (!codeVerifier) {
      throw new Error("找不到 PKCE 驗證資訊，請重新連接 Spotify。");
    }

    const body = new URLSearchParams({
      client_id: SPOTIFY_CLIENT_ID,
      grant_type: "authorization_code",
      code,
      redirect_uri: SPOTIFY_REDIRECT_URI,
      code_verifier: codeVerifier
    });

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body
    });

    if (!response.ok) {
      throw new Error("Spotify 授權交換失敗");
    }

    const payload = await response.json();
    state.auth = {
      access_token: payload.access_token,
      refresh_token: payload.refresh_token,
      scope: payload.scope,
      expires_at: Date.now() + (Number(payload.expires_in || 0) * 1000)
    };
    persistAuth();
    sessionStorage.removeItem(SPOTIFY_PKCE_VERIFIER_KEY);
  }

  async function refreshAccessToken() {
    if (!state.auth?.refresh_token) {
      throw new Error("沒有可用的 refresh token");
    }

    const body = new URLSearchParams({
      client_id: SPOTIFY_CLIENT_ID,
      grant_type: "refresh_token",
      refresh_token: state.auth.refresh_token
    });

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body
    });

    if (!response.ok) {
      throw new Error("Spotify refresh token 失敗");
    }

    const payload = await response.json();
    state.auth = {
      ...state.auth,
      access_token: payload.access_token,
      refresh_token: payload.refresh_token || state.auth.refresh_token,
      scope: payload.scope || state.auth.scope,
      expires_at: Date.now() + (Number(payload.expires_in || 0) * 1000)
    };
    persistAuth();
    return state.auth.access_token;
  }

  async function ensureValidAccessToken() {
    if (!state.auth?.access_token) {
      throw new Error("尚未連接 Spotify");
    }
    if ((Number(state.auth.expires_at) || 0) - Date.now() < 60_000) {
      return refreshAccessToken();
    }
    return state.auth.access_token;
  }

  async function getValidSpotifyAccessToken() {
    return ensureValidAccessToken();
  }

  async function spotifyFetch(path, options = {}, allowRetry = true) {
    const token = await ensureValidAccessToken();
    const response = await fetch(`https://api.spotify.com/v1${path}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...(options.headers || {})
      }
    });

    if (response.status === 401 && allowRetry) {
      try {
        await refreshAccessToken();
      } catch (error) {
        setError("Spotify 授權已過期，請重新連接", "請重新連接 Spotify");
        throw error;
      }
      return spotifyFetch(path, options, false);
    }

    if (response.status === 403) {
      setPremiumState(false);
      setError("Spotify 網頁播放需要 Premium 或播放權限", "Spotify Premium 必要");
      throw new Error("Spotify Premium required");
    }

    if (response.status === 429) {
      state.pollIntervalMs = 10000;
      startSpotifySync();
      setError("Spotify 請求太頻繁，稍後自動重試", "Spotify 請求過多");
      throw new Error("Spotify rate limited");
    }

    return response;
  }

  async function fallbackSpotifyPlayPause(allowRetry = true) {
    const token = await getValidSpotifyAccessToken();
    const isPlaying = Boolean(state.playback && state.playback.is_playing);
    const endpoint = isPlaying
      ? "https://api.spotify.com/v1/me/player/pause"
      : "https://api.spotify.com/v1/me/player/play";

    const response = await fetch(`${endpoint}?device_id=${encodeURIComponent(state.deviceId)}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (response.status === 401 && allowRetry) {
      await refreshAccessToken();
      return fallbackSpotifyPlayPause(false);
    }

    if (!response.ok && response.status !== 204) {
      if (response.status === 403) {
        setError("Spotify 網頁播放需要 Premium 或播放權限", "Spotify Premium 必要");
      } else if (response.status === 429) {
        state.pollIntervalMs = 10000;
        startSpotifySync();
        setError("Spotify 請求太頻繁，稍後自動重試", "Spotify 請求過多");
      }
      throw new Error(`Spotify play/pause API failed: ${response.status}`);
    }
  }

  function loadSpotifySdk() {
    if (window.Spotify?.Player) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      window.onSpotifyWebPlaybackSDKReady = () => resolve();
      const existing = document.querySelector('script[data-smartstudy-spotify-sdk="true"]');
      if (existing) {
        return;
      }
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      script.dataset.smartstudySpotifySdk = "true";
      script.onerror = () => reject(new Error("Spotify SDK 載入失敗"));
      document.head.appendChild(script);
    });
  }

  async function getPlaybackState() {
    const response = await spotifyFetch("/me/player");
    if (response.status === 204) {
      renderPlayback(null);
      setStatus("Spotify 目前沒有正在播放的歌曲", "尚未播放");
      return null;
    }

    const playback = await response.json();
    renderPlayback(playback);
    if (playback?.device?.id && state.deviceId && playback.device.id !== state.deviceId) {
      setStatus("播放裝置已切換，可點重新連接播放器切回 SmartStudy-AI。", "播放裝置已切換");
    } else if (playback?.item) {
      setStatus(playback.is_playing ? "Spotify 已連接並正在播放。" : "Spotify 已連接，目前為暫停狀態。", "SmartStudy-AI Player 已準備好");
    }
    return playback;
  }

  async function syncSpotifyPlaybackState() {
    const playbackState = await getPlaybackState();
    const spotifyPlayButton = document.getElementById("spotifyPlayButton");
    if (spotifyPlayButton) {
      spotifyPlayButton.textContent = playbackState?.is_playing ? "暫停" : "播放";
    }
    return playbackState;
  }

  function startSpotifySync() {
    if (state.pollTimer) {
      window.clearInterval(state.pollTimer);
    }
    state.pollTimer = window.setInterval(() => {
      void syncSpotifyPlaybackState().catch((error) => {
        console.warn("Spotify sync failed:", error);
      });
    }, state.pollIntervalMs);
  }

  function queueSpotifySync() {
    window.setTimeout(() => {
      void syncSpotifyPlaybackState().catch((error) => {
        console.warn("Spotify sync failed:", error);
      });
    }, 0);
  }

  function stopSpotifySync() {
    if (state.pollTimer) {
      window.clearInterval(state.pollTimer);
      state.pollTimer = null;
    }
  }

  async function transferPlayback(forcePlay) {
    if (!state.deviceId) {
      setError("播放器尚未準備完成，請稍後再試。", "播放器未準備");
      return;
    }

    let shouldPlay = typeof forcePlay === "boolean" ? forcePlay : false;
    try {
      const playback = await getPlaybackState();
      shouldPlay = typeof forcePlay === "boolean"
        ? forcePlay
        : Boolean(playback?.is_playing);
    } catch (error) {
      // Fallback to provided play flag.
    }

    const response = await spotifyFetch("/me/player", {
      method: "PUT",
      body: JSON.stringify({
        device_ids: [state.deviceId],
        play: shouldPlay
      })
    });

    if (response.ok || response.status === 204) {
      setStatus("已切換到 SmartStudy-AI Player。", "播放器已連線");
    }
  }

  async function connectPlayer() {
    if (state.connecting || !state.auth?.access_token) {
      return;
    }
    state.connecting = true;
    updateConnectButtons();
    setStatus("正在準備 SmartStudy-AI Player…", "正在連接 Spotify");

    try {
      await loadSpotifySdk();
      if (state.player) {
        state.player.disconnect();
      }

      state.player = new window.Spotify.Player({
        name: "SmartStudy-AI Focus Player",
        getOAuthToken: async (callback) => {
          try {
            const token = await ensureValidAccessToken();
            callback(token);
          } catch (error) {
            setError("Spotify 授權已過期，請重新連接", "請重新連接 Spotify");
          }
        },
        volume: state.volume
      });

      state.player.addListener("ready", async ({ device_id: deviceId }) => {
        state.deviceId = deviceId;
        state.sdkReady = true;
        setPremiumState(true);
        setStatus("SmartStudy-AI Player 已準備好", "播放器已就緒");
        try {
          await transferPlayback();
          await getPlaybackState();
          startSpotifySync();
        } catch (error) {
          // Status already handled.
        }
      });

      state.player.addListener("not_ready", () => {
        state.sdkReady = false;
        setError("播放器目前未就緒，請重新連接。", "播放器離線");
      });

      state.player.addListener("player_state_changed", (playerState) => {
        if (!playerState) {
          return;
        }
        const item = playerState.track_window?.current_track;
        const albumImage = item?.album?.images?.[0]?.url || "";
        renderPlayback({
          is_playing: !playerState.paused,
          progress_ms: playerState.position,
          context: state.playback?.context || null,
          item: item ? {
            name: item.name,
            duration_ms: playerState.duration,
            artists: item.artists,
            album: {
              images: albumImage ? [{ url: albumImage }] : []
            }
          } : null
        });
      });

      state.player.addListener("authentication_error", () => {
        setError("Spotify 授權失敗，請重新連接。", "授權失敗");
      });

      state.player.addListener("account_error", () => {
        setPremiumState(false);
        setError("Spotify 網頁播放需要 Premium 帳號", "Spotify Premium 必要");
      });

      state.player.addListener("playback_error", ({ message }) => {
        setError(message || "Spotify 播放發生問題。", "播放錯誤");
      });

      await withSpotifyControlTimeout(
        () => state.player.connect(),
        "Spotify Player connect"
      );
    } catch (error) {
      if (error?.code === "SPOTIFY_CONTROL_TIMEOUT") {
        setError("Spotify Player 連線逾時，請稍後再試或按重新連接。", "連線逾時");
      } else {
        setError("Spotify Player 初始化失敗，請稍後再試。", "初始化失敗");
      }
    } finally {
      state.connecting = false;
      updateConnectButtons();
    }
  }

  async function handleOAuthReturn() {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const error = url.searchParams.get("error");

    if (error) {
      setError("Spotify 授權被取消或失敗，請重新連接。", "授權失敗");
      url.searchParams.delete("error");
      window.history.replaceState({}, document.title, url.toString());
      return;
    }

    if (!code) {
      return;
    }

    try {
      await exchangeCodeForToken(code);
      setStatus("Spotify 已授權，正在準備播放器。", "Spotify 已連接");
    } catch (oauthError) {
      setError(oauthError.message || "Spotify 授權失敗，請重新連接。", "授權失敗");
    } finally {
      url.searchParams.delete("code");
      window.history.replaceState({}, document.title, url.toString());
    }
  }

  async function callPlayerAction(kind) {
    if (kind === "previous") {
      await spotifyFetch("/me/player/previous", { method: "POST" });
      return;
    }
    if (kind === "next") {
      await spotifyFetch("/me/player/next", { method: "POST" });
      return;
    }
    if (kind === "pause") {
      await spotifyFetch(`/me/player/pause${state.deviceId ? `?device_id=${encodeURIComponent(state.deviceId)}` : ""}`, { method: "PUT" });
      return;
    }
    if (kind === "play") {
      await spotifyFetch(`/me/player/play${state.deviceId ? `?device_id=${encodeURIComponent(state.deviceId)}` : ""}`, { method: "PUT" });
    }
  }

  async function handleSpotifyTogglePlay() {
    const spotifyPlayer = state.player;
    const spotifyReady = state.sdkReady;
    const spotifyDeviceId = state.deviceId;
    const { spotifyPlayButton, spotifyVolumeInput } = getSpotifyControlElements();
    const focusMusicAudio = document.getElementById("focusMusicAudio");

    console.log("Spotify play button:", spotifyPlayButton);
    console.log("Spotify volume input:", spotifyVolumeInput);
    console.log("Spotify toggle clicked");
    console.log("Spotify player ready:", !!spotifyPlayer, spotifyReady, spotifyDeviceId);

    if (!spotifyPlayButton) {
      console.warn("[Spotify] play button not found");
      setSpotifyStatus("Spotify 播放按鈕不存在，請重新整理頁面。", "控制項遺失");
      return;
    }

    if (!spotifyPlayer || !spotifyReady || !spotifyDeviceId) {
      setSpotifyStatus("Spotify Player 尚未準備完成，請稍候或按重新連接", "播放器未準備");
      console.warn("Spotify not ready:", {
        hasPlayer: !!spotifyPlayer,
        spotifyReady,
        spotifyDeviceId
      });
      return;
    }

    if (state.toggleBusy) {
      return;
    }

    state.toggleBusy = true;
    spotifyPlayButton.disabled = true;

    try {
      if (focusMusicAudio && !focusMusicAudio.paused) {
        focusMusicAudio.pause();
      }

      if (state.playback) {
        state.playback = {
          ...state.playback,
          is_playing: !state.playback.is_playing
        };
        spotifyPlayButton.textContent = state.playback.is_playing ? "暫停" : "播放";
      }

      await withSpotifyControlTimeout(
        () => spotifyPlayer.togglePlay(),
        "Spotify togglePlay"
      );
      queueSpotifySync();
    } catch (error) {
      console.error("Spotify togglePlay failed:", error);
      try {
        await withSpotifyControlTimeout(
          () => fallbackSpotifyPlayPause(),
          "Spotify fallback play/pause"
        );
        queueSpotifySync();
      } catch (fallbackError) {
        console.error("Spotify fallback play/pause failed:", fallbackError);
        setSpotifyStatus("播放 / 暫停失敗，請重新連接 Spotify Player", "播放控制失敗");
      }
    } finally {
      state.toggleBusy = false;
      spotifyPlayButton.disabled = false;
    }
  }

  async function setSpotifyVolume(volume, allowRetry = true) {
    const spotifyPlayer = state.player;
    const spotifyReady = state.sdkReady;
    const spotifyDeviceId = state.deviceId;
    if (!spotifyPlayer || !spotifyReady) {
      setSpotifyStatus("Spotify Player 尚未準備完成，無法調整音量", "播放器未準備");
      return;
    }

    try {
      await withSpotifyControlTimeout(
        () => spotifyPlayer.setVolume(volume),
        "Spotify setVolume"
      );
      console.log("Spotify SDK volume updated:", volume);
    } catch (error) {
      console.warn("Spotify SDK setVolume failed, fallback to Web API:", error);
      try {
        const token = await withSpotifyControlTimeout(
          () => getValidSpotifyAccessToken(),
          "Spotify volume token"
        );
        const volumePercent = Math.round(volume * 100);

        const response = await withSpotifyControlTimeout(
          () => fetch(
            `https://api.spotify.com/v1/me/player/volume?volume_percent=${volumePercent}&device_id=${encodeURIComponent(spotifyDeviceId)}`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          ),
          "Spotify volume API"
        );

        if (response.status === 401 && allowRetry) {
          await withSpotifyControlTimeout(
            () => refreshAccessToken(),
            "Spotify refresh token"
          );
          return setSpotifyVolume(volume, false);
        }

        if (!response.ok && response.status !== 204) {
          throw new Error(`Spotify volume API failed: ${response.status}`);
        }

        console.log("Spotify Web API volume updated:", volumePercent);
      } catch (fallbackError) {
        console.error("Spotify set volume failed:", fallbackError);
        setSpotifyStatus("音量調整失敗；如果你使用 iPhone / iPad，可能需要用系統音量鍵調整。", "音量調整失敗");
      }
    }
  }

  function handleSpotifyVolumeInput(event) {
    console.log("Spotify volume changed:", event.target.value);

    const rawValue = Number(event.target.value);
    const volume = Math.max(0, Math.min(1, rawValue));
    state.volume = volume;

    localStorage.setItem("smartstudy.spotify.volume", String(volume));

    if (state.volumeDebounceTimer) {
      clearTimeout(state.volumeDebounceTimer);
    }

    state.volumeDebounceTimer = setTimeout(() => {
      state.volumeDebounceTimer = null;
      void setSpotifyVolume(volume);
    }, 150);
  }

  async function handleSpotifyPrevious() {
    const { spotifyPreviousButton } = getSpotifyControlElements();
    if (state.previousBusy) return;
    state.previousBusy = true;
    if (spotifyPreviousButton) {
      spotifyPreviousButton.disabled = true;
    }
    try {
      await withSpotifyControlTimeout(
        () => callPlayerAction("previous"),
        "Spotify previous"
      );
      queueSpotifySync();
    } catch (error) {
      console.warn("Spotify previous failed:", error);
      setSpotifyStatus("上一首操作逾時或失敗，請再試一次。", "播放控制失敗");
    } finally {
      state.previousBusy = false;
      if (spotifyPreviousButton) {
        spotifyPreviousButton.disabled = false;
      }
    }
  }

  async function handleSpotifyNext() {
    const { spotifyNextButton } = getSpotifyControlElements();
    if (state.nextBusy) return;
    state.nextBusy = true;
    if (spotifyNextButton) {
      spotifyNextButton.disabled = true;
    }
    try {
      await withSpotifyControlTimeout(
        () => callPlayerAction("next"),
        "Spotify next"
      );
      queueSpotifySync();
    } catch (error) {
      console.warn("Spotify next failed:", error);
      setSpotifyStatus("下一首操作逾時或失敗，請再試一次。", "播放控制失敗");
    } finally {
      state.nextBusy = false;
      if (spotifyNextButton) {
        spotifyNextButton.disabled = false;
      }
    }
  }

  async function lockCurrentPlaylist() {
    const uri = state.playback?.context?.uri;
    if (!uri || state.playback?.context?.type !== "playlist") {
      setError("目前播放內容不是歌單，暫時無法鎖定。", "無法鎖定歌單");
      return;
    }
    setLockedPlaylistUri(uri);
    setStatus("已鎖定目前歌單。", "歌單已鎖定");
  }

  async function returnToLockedPlaylist() {
    if (!state.lockedPlaylistUri) {
      return;
    }
    await withSpotifyControlTimeout(
      () => spotifyFetch(`/me/player/play${state.deviceId ? `?device_id=${encodeURIComponent(state.deviceId)}` : ""}`, {
        method: "PUT",
        body: JSON.stringify({
          context_uri: state.lockedPlaylistUri
        })
      }),
      "Spotify return locked playlist"
    );
    setStatus("已切回鎖定歌單。", "已回到鎖定歌單");
    await withSpotifyControlTimeout(
      () => getPlaybackState(),
      "Spotify refresh playback state"
    );
  }

  async function disconnectSpotify() {
    stopSpotifySync();
    if (state.player) {
      state.player.disconnect();
      state.player = null;
    }
    state.sdkReady = false;
    state.deviceId = "";
    state.playback = null;
    state.auth = null;
    persistAuth();
    setPremiumState(false);
    renderPlayback(null);
    setStatus("Spotify 已中斷連線。", "尚未連接 Spotify");
    updateConnectButtons();
  }

  function bindSpotifyControls() {
    if (!state.ui) {
      return;
    }

    if (spotifyControlsBound) return;
    spotifyControlsBound = true;

    const {
      spotifyPlayButton,
      spotifyPreviousButton,
      spotifyNextButton,
      spotifyVolumeInput
    } = getSpotifyControlElements();

    if (!spotifyPlayButton || !spotifyVolumeInput) {
      setSpotifyStatus("Spotify 控制項未完整載入，請重新整理頁面。", "控制項遺失");
    }

    if (spotifyPlayButton) {
      spotifyPlayButton.addEventListener("click", handleSpotifyTogglePlay);
    }

    if (spotifyPreviousButton) {
      spotifyPreviousButton.addEventListener("click", () => {
        void handleSpotifyPrevious();
      });
    }

    if (spotifyNextButton) {
      spotifyNextButton.addEventListener("click", () => {
        void handleSpotifyNext();
      });
    }

    if (spotifyVolumeInput) {
      spotifyVolumeInput.addEventListener("input", handleSpotifyVolumeInput);
    }
  }

  function bindUiEvents() {
    if (!state.ui) {
      return;
    }

    state.ui.connectButton?.addEventListener("click", () => {
      void redirectToSpotifyAuth();
    });

    state.ui.reconnectButton?.addEventListener("click", () => {
      void connectPlayer();
    });

    state.ui.disconnectButton?.addEventListener("click", () => {
      void disconnectSpotify();
    });
    bindSpotifyControls();

    state.ui.lockButton?.addEventListener("click", () => {
      void lockCurrentPlaylist();
    });

    state.ui.returnLockedButton?.addEventListener("click", () => {
      void returnToLockedPlaylist().catch((error) => {
        console.warn("Spotify return to locked playlist failed:", error);
        setSpotifyStatus("切回鎖定歌單逾時或失敗，請再試一次。", "播放控制失敗");
      });
    });
  }

  function init(ui) {
    if (spotifyWidgetInitialized) {
      console.warn("Spotify widget already initialized, skip binding events.");
      return;
    }
    spotifyWidgetInitialized = true;

    if (state.initialized) {
      return;
    }
    state.initialized = true;
    state.ui = ui;
    if (state.ui.volumeInput) {
      state.ui.volumeInput.value = String(state.volume);
    }
    updateConnectButtons();
    renderPlayback(null);
    renderLockState();
    bindUiEvents();

    void handleOAuthReturn()
      .then(() => {
        if (state.auth?.access_token) {
          setPremiumState(true);
          void connectPlayer();
        }
      })
      .catch(() => {
        setError("Spotify 初始化失敗，請稍後再試。", "初始化失敗");
      });
  }

  async function pause() {
    try {
      if (state.playback?.is_playing) {
        await callPlayerAction("pause");
        await getPlaybackState();
      }
    } catch (error) {
      // Keep quiet and only update widget state when possible.
    }
  }

  window.SmartStudySpotifyPlayer = {
    init,
    pause
  };
})();
