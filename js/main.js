const VALID_APPID_REGEX = /^\d+$/;
const TOKEN_CHECK_INTERVAL = 5 * 60 * 1000;

function initApp() {
  initTheme();
  setupEventListeners();

  const token = handleHash() || localStorage.getItem("discord_token");
  if (token) {
    checkTokenValidity(token).then(isValid => {
      if (isValid) {
        handleToken(token);
      } else {
        localStorage.removeItem("discord_token");
      }
    });
  }
}

function setupEventListeners() {
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);

  document.getElementById('appid').addEventListener('input', function() {
    const appid = this.value.trim();
    const validation = validateAppId(appid);
    showValidationMessage(validation.valid, validation.message);
  });

  document.getElementById('appid-form').addEventListener('submit', handleDownload);
}

document.addEventListener('DOMContentLoaded', initApp);