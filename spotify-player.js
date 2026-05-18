const SPOTIFY_CLIENT_ID = "930d6d20806249f1828734389e5c9173";
function resolveSpotifyRedirectUri() {
  const fallback = "https://rickforgestudio.github.io/smartstudy-ai/";
  if (typeof window === "undefined" || !window.location) {
    return fallback;
  }

  const override = typeof window.SMARTSTUDY_SPOTIFY_REDIRECT_URI === "string"
    ? window.SMARTSTUDY_SPOTIFY_REDIRECT_URI.trim()
    : "";
  if (override) {
    return override;
  }

  try {
    const currentUrl = new URL(window.location.href);
    currentUrl.search = "";
    currentUrl.hash = "";

    // Prefer the current page during local development so the callback matches
    // the page you are actually testing on.
    if (currentUrl.hostname === "localhost" || currentUrl.hostname === "127.0.0.1") {
      return currentUrl.toString();
    }

    // On deployed environments, use the current page unless Spotify auth is
    // configured to return to a dedicated callback path via override.
    return currentUrl.toString();
  } catch (error) {
    return fallback;
  }
}

const SPOTIFY_REDIRECT_URI = resolveSpotifyRedirectUri();

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
const SPOTIFY_CONTROL_TIMEOUT_MS = 7000;
const SPOTIFY_AUTO_RESUME_GRACE_MS = 3000;
const SPOTIFY_TOKEN_EXPIRING_SOON_MS = 5 * 60 * 1000;
let spotifyWidgetInitialized = false;
let spotifyControlsBound = false;
let spotifyShouldKeepPlaying = false;
let spotifyUserPaused = false;
let spotifyDeviceId = null;
let currentSpotifyPlaybackState = null;
let spotifyBusy = false;
let spotifyAutoResumeUntil = 0;

(function bootstrapSpotifyFocusPlayer() {
  const state = {
    ui: null,
    auth: loadJsonStorage(SPOTIFY_AUTH_STORAGE_KEY) || null,
    player: null,
    deviceId: "",
    playback: null,
    pollTimer: null,
    pollIntervalMs: 12000,
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

  function getSpotifyRedirectHint() {
    return `Redirect URI：${SPOTIFY_REDIRECT_URI}`;
  }

  function hasUsableSpotifyAuth() {
    return Boolean(state.auth?.access_token);
  }

  function isSpotifyTokenExpired() {
    return !hasUsableSpotifyAuth() || (Number(state.auth?.expires_at) || 0) <= Date.now();
  }

  function isSpotifyTokenExpiringSoon() {
    if (!hasUsableSpotifyAuth()) {
      return false;
    }
    return ((Number(state.auth?.expires_at) || 0) - Date.now()) < SPOTIFY_TOKEN_EXPIRING_SOON_MS;
  }

  function formatTokenRemainingTime() {
    const expiresAt = Number(state.auth?.expires_at) || 0;
    const remainingMs = expiresAt - Date.now();

    if (remainingMs <= 0) {
      return "已過期";
    }

    const remainingMinutes = Math.ceil(remainingMs / 60000);
    if (remainingMinutes < 60) {
      return `約 ${remainingMinutes} 分鐘`;
    }

    const hours = Math.floor(remainingMinutes / 60);
    const minutes = remainingMinutes % 60;
    if (!minutes) {
      return `約 ${hours} 小時`;
    }

    return `約 ${hours} 小時 ${minutes} 分鐘`;
  }

  function updateSpotifyAuthHint() {
    if (!state.ui?.authHint) {
      return;
    }

    let message = "尚未授權 Spotify。按下「連接 Spotify」後，系統會導向 Spotify 完成授權。";
    let isError = false;

    if (hasUsableSpotifyAuth()) {
      if (isSpotifyTokenExpired()) {
        message = "Spotify 授權已失效，請按「重新連接播放器」重新取得授權。";
        isError = true;
      } else if (isSpotifyTokenExpiringSoon()) {
        message = `Spotify 授權即將到期，剩餘 ${formatTokenRemainingTime()}。建議先重新連接，避免播放到一半失去控制。`;
      } else if (state.connecting) {
        message = `Spotify 授權有效，剩餘 ${formatTokenRemainingTime()}。正在準備 SmartStudy-AI Player，請稍候。`;
      } else if (state.sdkReady && state.deviceId) {
        message = `Spotify 授權有效，剩餘 ${formatTokenRemainingTime()}。播放器已就緒，可以直接播放、切歌與調整音量。`;
      } else {
        message = `Spotify 授權有效，剩餘 ${formatTokenRemainingTime()}。如果控制按鈕暫時不能用，請按「重新連接播放器」把 SmartStudy-AI Player 切回 active device。`;
      }
    }

    state.ui.authHint.textContent = message;
    state.ui.authHint.classList.toggle("is-error", isError);
  }

  function updateSpotifyControlAvailability() {
    if (!state.ui) {
      return;
    }

    const hasAuth = hasUsableSpotifyAuth();
    const tokenValid = !isSpotifyTokenExpired();
    const playerReady = Boolean(state.sdkReady && state.deviceId);
    const canControlPlayback = Boolean(hasAuth && tokenValid && playerReady);
    const canAdjustVolume = Boolean(canControlPlayback && state.ui.volumeInput);
    const canLockPlaylist = Boolean(canControlPlayback && state.playback?.context?.type === "playlist");
    const canReturnLocked = Boolean(canControlPlayback && state.lockedPlaylistUri);

    if (state.ui.playPauseButton) state.ui.playPauseButton.disabled = !canControlPlayback;
    if (state.ui.previousButton) state.ui.previousButton.disabled = !canControlPlayback;
    if (state.ui.nextButton) state.ui.nextButton.disabled = !canControlPlayback;
    if (state.ui.volumeInput) state.ui.volumeInput.disabled = !canAdjustVolume;
    if (state.ui.lockButton) state.ui.lockButton.disabled = !canLockPlaylist;
    if (state.ui.returnLockedButton) state.ui.returnLockedButton.disabled = !canReturnLocked;

    if (state.ui.reconnectButton) {
      state.ui.reconnectButton.title = isSpotifyTokenExpiringSoon()
        ? "Spotify 授權即將過期，建議先重新連接。"
        : "";
    }

    updateSpotifyAuthHint();
  }

  function clearSpotifyAuthState(message, title = "需要重新連接 Spotify") {
    state.auth = null;
    persistAuth();
    stopSpotifySync();
    state.sdkReady = false;
    state.deviceId = "";
    spotifyDeviceId = null;
    updateConnectButtons();
    updateSpotifyControlAvailability();
    if (message) {
      setError(message, title);
    }
  }

  function armSpotifyAutoResume(durationMs = SPOTIFY_AUTO_RESUME_GRACE_MS) {
    spotifyAutoResumeUntil = Date.now() + durationMs;
  }

  function clearSpotifyAutoResume() {
    spotifyAutoResumeUntil = 0;
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
      state.ui.connectButton.disabled = state.connecting;
    }
    if (state.ui.reconnectButton) {
      state.ui.reconnectButton.hidden = !hasAuth;
      state.ui.reconnectButton.disabled = state.connecting || !hasAuth;
    }
    if (state.ui.disconnectButton) {
      state.ui.disconnectButton.hidden = !hasAuth;
      state.ui.disconnectButton.disabled = state.connecting || !hasAuth;
    }
    updateSpotifyControlAvailability();
  }

  function formatMs(value) {
    const totalSeconds = Math.max(0, Math.floor((Number(value) || 0) / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  function renderPlayback(playback) {
    state.playback = playback;
    currentSpotifyPlaybackState = playback;

    if (!state.ui) {
      return;
    }

    const item = playback?.item || null;
    const isPlaying = Boolean(playback?.is_playing);

    state.ui.controls.hidden = !(state.sdkReady && state.deviceId);
    state.ui.nowPlaying.hidden = false;
    state.ui.progressWrap.hidden = !item;

    if (!item) {
      state.ui.trackName.textContent = "尚未播放";
      state.ui.artistName.textContent = "等待讀取目前播放內容";
      state.ui.cover.hidden = true;
      state.ui.playPauseButton.textContent = "播放";
      updateSpotifyControlAvailability();
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

    updateSpotifyControlAvailability();
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
      setError("請先在 spotify-player.js 填入 Spotify Developer App Client ID。", "尚未設定 Spotify");
      return;
    }

    setStatus(`正在導向 Spotify 授權頁。${getSpotifyRedirectHint()}`, "正在授權");

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
    updateSpotifyAuthHint();
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
      clearSpotifyAuthState("Spotify refresh token 失敗，請重新連接。", "授權已失效");
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
    updateSpotifyAuthHint();
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
        clearSpotifyAuthState("Spotify 授權已過期，請按重新連接重新取得授權。", "授權已過期");
        throw error;
      }
      return spotifyFetch(path, options, false);
    }

    if (response.status === 403) {
      setPremiumState(false);
      setError("Spotify 網頁播放需要 Premium 帳號，或目前帳號沒有足夠的播放控制權限。", "Spotify Premium 必要");
      throw new Error("Spotify Premium required");
    }

    if (response.status === 429) {
      state.pollIntervalMs = 10000;
      startSpotifySync();
      setError("Spotify 請求太頻繁，系統會稍後自動重試，請先等幾秒再操作。", "請求過多");
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
        setError("Spotify 網頁播放需要 Premium 帳號，或目前帳號沒有足夠的播放控制權限。", "Spotify Premium 必要");
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
      currentSpotifyPlaybackState = null;
      renderPlayback(null);
      setStatus("Spotify 已連接，但目前沒有正在播放的內容。請先在 Spotify 選一首歌或直接按播放。", "尚未播放");
      return null;
    }

    const playback = await response.json();
    renderPlayback(playback);
    if (playback?.device?.id && state.deviceId && playback.device.id !== state.deviceId) {
      setStatus("Spotify 目前正在別的裝置上播放。你可以按重新連接播放器，把 SmartStudy-AI Player 切回 active device。", "播放裝置已切換");
    } else if (playback?.item) {
      setStatus(
        playback.is_playing
          ? "Spotify 已連接並正在播放。"
          : "Spotify 已連接，目前是暫停狀態。",
        playback.is_playing ? "正在播放" : "已暫停"
      );
    }
    return playback;
  }

  async function syncSpotifyPlaybackState() {
    const playbackState = await getPlaybackState();
    currentSpotifyPlaybackState = playbackState;
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

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function ensureSpotifyDeviceIsActive(allowRetry = true) {
    if (!spotifyDeviceId) {
      throw new Error("Missing Spotify device id");
    }

    const token = await getValidSpotifyAccessToken();

    const response = await fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        device_ids: [spotifyDeviceId],
        play: false
      })
    });

    if (response.status === 401 && allowRetry) {
      await refreshAccessToken();
      return ensureSpotifyDeviceIsActive(false);
    }

    if (!response.ok && response.status !== 204) {
      throw new Error(`Transfer playback failed: ${response.status}`);
    }
  }

  async function resumeSpotifyPlayback(allowRetry = true) {
    const token = await getValidSpotifyAccessToken();

    await ensureSpotifyDeviceIsActive();

    const response = await fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${encodeURIComponent(spotifyDeviceId)}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (response.status === 401 && allowRetry) {
      await refreshAccessToken();
      return resumeSpotifyPlayback(false);
    }

    if (!response.ok && response.status !== 204) {
      throw new Error(`Spotify resume failed: ${response.status}`);
    }
  }

  async function pauseSpotifyPlayback(allowRetry = true) {
    const token = await getValidSpotifyAccessToken();

    const response = await fetch(
      `https://api.spotify.com/v1/me/player/pause?device_id=${encodeURIComponent(spotifyDeviceId)}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (response.status === 401 && allowRetry) {
      await refreshAccessToken();
      return pauseSpotifyPlayback(false);
    }

    if (!response.ok && response.status !== 204) {
      throw new Error(`Spotify pause failed: ${response.status}`);
    }
  }

  async function transferPlayback(forcePlay) {
    if (!state.deviceId) {
      setError("播放器尚未準備完成，請先重新連接播放器，讓 SmartStudy-AI Player 成為可用裝置。", "播放器未準備");
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
      updateSpotifyAuthHint();
    }
  }

  async function connectPlayer() {
    if (state.connecting || !state.auth?.access_token) {
      return;
    }
    state.connecting = true;
    updateConnectButtons();
    setStatus("正在準備 SmartStudy-AI Player，這通常需要幾秒鐘。", "正在連接 Spotify");

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
            clearSpotifyAuthState("Spotify 授權已過期，請按重新連接重新取得授權。", "授權已過期");
          }
        },
        volume: state.volume
      });

      state.player.addListener("ready", async ({ device_id: deviceId }) => {
        state.deviceId = deviceId;
        spotifyDeviceId = deviceId;
        state.sdkReady = true;
        setPremiumState(true);
        setStatus("Spotify Player 已就緒，可以直接播放或切歌。", "播放器已就緒");
        updateSpotifyControlAvailability();
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
        spotifyDeviceId = null;
        updateSpotifyControlAvailability();
        setError("播放器目前離線，請按重新連接播放器，讓 SmartStudy-AI Player 再次成為可用裝置。", "播放器離線");
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
        currentSpotifyPlaybackState = {
          ...state.playback,
          is_playing: !playerState.paused
        };
      });

      state.player.addListener("authentication_error", () => {
        clearSpotifyAuthState(`Spotify 授權失敗，請重新連接，並確認 Spotify Developer Dashboard 的設定是否包含目前網址。${getSpotifyRedirectHint()}`, "授權失敗");
      });

      state.player.addListener("account_error", () => {
        setPremiumState(false);
        setError("Spotify 網頁播放需要 Premium 帳號，或目前帳號沒有足夠的播放控制權限。", "Spotify Premium 必要");
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
        setError("Spotify Player 連線逾時。通常是網路較慢、Spotify 端反應較慢，或帳號尚未把 SmartStudy-AI Player 切成 active device。", "連線逾時");
      } else {
        setError("Spotify Player 初始化失敗，請稍後再試。", "初始化失敗");
      }
    } finally {
      state.connecting = false;
      updateConnectButtons();
      updateSpotifyAuthHint();
    }
  }

  async function handleOAuthReturn() {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const error = url.searchParams.get("error");

    if (error) {
      setError(`Spotify 授權被取消或失敗。請重新連接，並確認 Spotify Developer Dashboard 的 Redirect URI 設定是否包含目前網址。${getSpotifyRedirectHint()}`, "授權失敗");
      url.searchParams.delete("error");
      window.history.replaceState({}, document.title, url.toString());
      return;
    }

    if (!code) {
      return;
    }

    try {
      await exchangeCodeForToken(code);
      setStatus("Spotify 已授權，正在準備播放器。", "已授權");
      updateConnectButtons();
    } catch (oauthError) {
      clearSpotifyAuthState(`${oauthError.message || "Spotify 授權失敗，請重新連接。"} ${getSpotifyRedirectHint()}`, "授權失敗");
    } finally {
      url.searchParams.delete("code");
      window.history.replaceState({}, document.title, url.toString());
    }
  }

  async function handleSpotifyTogglePlay() {
    const spotifyPlayer = state.player;
    const spotifyReady = state.sdkReady;
    spotifyDeviceId = state.deviceId || spotifyDeviceId || null;
    const { spotifyPlayButton } = getSpotifyControlElements();
    const focusMusicAudio = document.getElementById("focusMusicAudio");

    if (!spotifyPlayButton) {
      console.warn("[Spotify] play button not found");
      setSpotifyStatus("Spotify 控制項沒有完整載入，請重新整理頁面後再試。", "控制項遺失");
      return;
    }

    if (!spotifyPlayer || !spotifyReady || !spotifyDeviceId) {
      setSpotifyStatus("Spotify Player 尚未準備完成。請先按重新連接播放器，確認 SmartStudy-AI Player 已成為 active device。", "播放器未準備");
      console.warn("Spotify not ready:", {
        hasPlayer: !!spotifyPlayer,
        spotifyReady,
        spotifyDeviceId
      });
      return;
    }

    if (spotifyBusy) {
      return;
    }

    spotifyBusy = true;
    spotifyPlayButton.disabled = true;

    try {
      if (focusMusicAudio && !focusMusicAudio.paused) {
        focusMusicAudio.pause();
      }

      const isPlaying = Boolean(
        currentSpotifyPlaybackState
        && currentSpotifyPlaybackState.is_playing
      );

      if (isPlaying) {
        spotifyShouldKeepPlaying = false;
        spotifyUserPaused = true;
        clearSpotifyAutoResume();
        try {
          await withSpotifyControlTimeout(
            () => spotifyPlayer.togglePlay(),
            "Spotify SDK toggle pause"
          );
        } catch (sdkError) {
          await withSpotifyControlTimeout(
            () => pauseSpotifyPlayback(),
            "Spotify pause playback"
          );
        }
      } else {
        spotifyShouldKeepPlaying = true;
        spotifyUserPaused = false;
        try {
          await withSpotifyControlTimeout(
            () => spotifyPlayer.togglePlay(),
            "Spotify SDK toggle play"
          );
        } catch (sdkError) {
          await withSpotifyControlTimeout(
            () => resumeSpotifyPlayback(),
            "Spotify resume playback"
          );
        }
      }

      await wait(250);
      await withSpotifyControlTimeout(
        () => syncSpotifyPlaybackState(),
        "Spotify sync playback state"
      );
    } catch (error) {
      console.error("Spotify toggle failed:", error);
      setSpotifyStatus("Spotify 播放 / 暫停失敗，請重新連接播放器", "播放控制失敗");
    } finally {
      spotifyBusy = false;
      spotifyPlayButton.disabled = false;
    }
  }

  async function setSpotifyVolume(volume, allowRetry = true) {
    const spotifyPlayer = state.player;
    const spotifyReady = state.sdkReady;
    const spotifyDeviceId = state.deviceId;
    if (!spotifyPlayer || !spotifyReady) {
      setSpotifyStatus("Spotify Player 尚未準備完成，無法調整音量。請先重新連接播放器。", "播放器未準備");
      return;
    }

    try {
      await withSpotifyControlTimeout(
        () => spotifyPlayer.setVolume(volume),
        "Spotify setVolume"
      );
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
      } catch (fallbackError) {
        console.error("Spotify set volume failed:", fallbackError);
        setSpotifyStatus("音量調整失敗；如果你使用 iPhone / iPad，可能需要用系統音量鍵調整。", "音量調整失敗");
      }
    }
  }

  function handleSpotifyVolumeInput(event) {
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
    const spotifyPlayer = state.player;
    spotifyDeviceId = state.deviceId || spotifyDeviceId || null;
    if (spotifyBusy) return;
    spotifyBusy = true;
    if (spotifyPreviousButton) {
      spotifyPreviousButton.disabled = true;
    }
    try {
      try {
        await withSpotifyControlTimeout(
          () => spotifyPlayer.previousTrack(),
          "Spotify SDK previous"
        );
      } catch (sdkError) {
        const token = await withSpotifyControlTimeout(
          () => getValidSpotifyAccessToken(),
          "Spotify previous token"
        );

        await withSpotifyControlTimeout(
          () => ensureSpotifyDeviceIsActive(),
          "Spotify ensure device active"
        );

        const response = await withSpotifyControlTimeout(
          () => fetch(
            `https://api.spotify.com/v1/me/player/previous?device_id=${encodeURIComponent(spotifyDeviceId)}`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          ),
          "Spotify previous"
        );

        if (!response.ok && response.status !== 204) {
          throw new Error(`Spotify previous failed: ${response.status}`);
        }
      }

      await wait(250);
      const playbackState = await withSpotifyControlTimeout(
        () => syncSpotifyPlaybackState(),
        "Spotify sync after previous"
      );

    } catch (error) {
      console.error("Spotify previous failed:", error);
      setSpotifyStatus("切到上一首失敗，請重新連接 Spotify", "播放控制失敗");
    } finally {
      spotifyBusy = false;
      if (spotifyPreviousButton) {
        spotifyPreviousButton.disabled = false;
      }
    }
  }

  async function handleSpotifyNext() {
    const { spotifyNextButton } = getSpotifyControlElements();
    const spotifyPlayer = state.player;
    spotifyDeviceId = state.deviceId || spotifyDeviceId || null;
    if (spotifyBusy) return;
    spotifyBusy = true;
    if (spotifyNextButton) {
      spotifyNextButton.disabled = true;
    }
    try {
      try {
        await withSpotifyControlTimeout(
          () => spotifyPlayer.nextTrack(),
          "Spotify SDK next"
        );
      } catch (sdkError) {
        const token = await withSpotifyControlTimeout(
          () => getValidSpotifyAccessToken(),
          "Spotify next token"
        );

        await withSpotifyControlTimeout(
          () => ensureSpotifyDeviceIsActive(),
          "Spotify ensure device active"
        );

        const response = await withSpotifyControlTimeout(
          () => fetch(
            `https://api.spotify.com/v1/me/player/next?device_id=${encodeURIComponent(spotifyDeviceId)}`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          ),
          "Spotify next"
        );

        if (!response.ok && response.status !== 204) {
          throw new Error(`Spotify next failed: ${response.status}`);
        }
      }

      await wait(250);
      const playbackState = await withSpotifyControlTimeout(
        () => syncSpotifyPlaybackState(),
        "Spotify sync after next"
      );

    } catch (error) {
      console.error("Spotify next failed:", error);
      setSpotifyStatus("切到下一首失敗，請重新連接 Spotify", "播放控制失敗");
    } finally {
      spotifyBusy = false;
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
    currentSpotifyPlaybackState = null;
    spotifyDeviceId = null;
    spotifyShouldKeepPlaying = false;
    spotifyUserPaused = false;
    clearSpotifyAutoResume();
    state.auth = null;
    persistAuth();
    setPremiumState(false);
    renderPlayback(null);
    setStatus("Spotify 已中斷連線。按下連接 Spotify 可重新授權。", "尚未連接 Spotify");
    updateConnectButtons();
    updateSpotifyControlAvailability();
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
      setSpotifyStatus("Spotify 控制項沒有完整載入，請重新整理頁面後再試。", "控制項遺失");
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
    if (state.initialized) {
      if (ui) {
        state.ui = {
          ...(state.ui || {}),
          ...ui
        };
      }
      updateConnectButtons();
      renderPlayback(state.playback);
      renderLockState();
      updateSpotifyAuthHint();
      return;
    }

    spotifyWidgetInitialized = true;
    state.initialized = true;
    state.ui = ui;
    if (state.ui.volumeInput) {
      state.ui.volumeInput.value = String(state.volume);
    }
    updateConnectButtons();
    renderPlayback(null);
    renderLockState();
    updateSpotifyControlAvailability();
    updateSpotifyAuthHint();
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
        spotifyShouldKeepPlaying = false;
        spotifyUserPaused = true;
        clearSpotifyAutoResume();
        await pauseSpotifyPlayback();
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
