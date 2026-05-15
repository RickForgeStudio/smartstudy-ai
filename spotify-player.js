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

(function bootstrapSpotifyFocusPlayer() {
  const state = {
    ui: null,
    auth: loadJsonStorage(SPOTIFY_AUTH_STORAGE_KEY) || null,
    player: null,
    deviceId: "",
    playback: null,
    pollTimer: null,
    pollIntervalMs: 4000,
    sdkReady: false,
    connecting: false,
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
    state.ui.nowPlaying.hidden = !item;
    state.ui.progressWrap.hidden = !item;

    if (!item) {
      state.ui.trackName.textContent = "尚未播放";
      state.ui.artistName.textContent = "Spotify 目前沒有正在播放的歌曲";
      state.ui.playPauseButton.textContent = "播放";
      renderLockState();
      return;
    }

    const artists = Array.isArray(item.artists) ? item.artists.map((artist) => artist.name).join("、") : "";
    const coverUrl = item.album?.images?.[0]?.url || "";
    state.ui.trackName.textContent = item.name || "未命名歌曲";
    state.ui.artistName.textContent = artists || "未知歌手";
    state.ui.playPauseButton.textContent = isPlaying ? "暫停" : "播放";
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
      setError("Spotify 網頁播放需要 Premium 帳號", "Spotify Premium 必要");
      throw new Error("Spotify Premium required");
    }

    if (response.status === 429) {
      state.pollIntervalMs = 10000;
      restartPolling();
      setError("Spotify 請求太頻繁，稍後自動重試", "Spotify 請求過多");
      throw new Error("Spotify rate limited");
    }

    return response;
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

  function restartPolling() {
    if (state.pollTimer) {
      window.clearInterval(state.pollTimer);
    }
    state.pollTimer = window.setInterval(() => {
      void getPlaybackState().catch(() => {});
    }, state.pollIntervalMs);
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
        volume: 0.25
      });

      state.player.addListener("ready", async ({ device_id: deviceId }) => {
        state.deviceId = deviceId;
        state.sdkReady = true;
        setPremiumState(true);
        setStatus("SmartStudy-AI Player 已準備好", "播放器已就緒");
        try {
          await transferPlayback();
          await getPlaybackState();
          restartPolling();
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

      await state.player.connect();
    } catch (error) {
      setError("Spotify Player 初始化失敗，請稍後再試。", "初始化失敗");
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
    await spotifyFetch(`/me/player/play${state.deviceId ? `?device_id=${encodeURIComponent(state.deviceId)}` : ""}`, {
      method: "PUT",
      body: JSON.stringify({
        context_uri: state.lockedPlaylistUri
      })
    });
    setStatus("已切回鎖定歌單。", "已回到鎖定歌單");
    await getPlaybackState();
  }

  async function disconnectSpotify() {
    if (state.pollTimer) {
      window.clearInterval(state.pollTimer);
      state.pollTimer = null;
    }
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

    state.ui.playPauseButton?.addEventListener("click", () => {
      const nextAction = state.playback?.is_playing ? "pause" : "play";
      if (nextAction === "play") {
        window.dispatchEvent(new CustomEvent("smartstudy:spotify-playing"));
      }
      void callPlayerAction(nextAction)
        .then(() => getPlaybackState())
        .catch(() => {});
    });

    state.ui.previousButton?.addEventListener("click", () => {
      void callPlayerAction("previous")
        .then(() => getPlaybackState())
        .catch(() => {});
    });

    state.ui.nextButton?.addEventListener("click", () => {
      void callPlayerAction("next")
        .then(() => getPlaybackState())
        .catch(() => {});
    });

    state.ui.volumeInput?.addEventListener("input", () => {
      const value = Math.min(100, Math.max(0, Number(state.ui.volumeInput.value) || 25));
      void spotifyFetch(`/me/player/volume?volume_percent=${value}${state.deviceId ? `&device_id=${encodeURIComponent(state.deviceId)}` : ""}`, {
        method: "PUT"
      }).catch(() => {});
    });

    state.ui.lockButton?.addEventListener("click", () => {
      void lockCurrentPlaylist();
    });

    state.ui.returnLockedButton?.addEventListener("click", () => {
      void returnToLockedPlaylist().catch(() => {});
    });
  }

  function init(ui) {
    if (state.initialized) {
      return;
    }
    state.initialized = true;
    state.ui = ui;
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
