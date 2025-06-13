const downloadCodes = [
  "7XK9-QWJE-38DA-MN2L",
  "ZP4V-3KLT-9MDA-JU7R",
];

function validateDownloadCode(code) {
  const index = downloadCodes.indexOf(code.toUpperCase());
  if (index > -1) {
    downloadCodes.splice(index, 1);
    return true;
  }
  return false;
}

async function handleDownload(event) {
  event.preventDefault();
  const appid = document.getElementById('appid').value.trim();

  if (!validateAppId(appid).valid || !validateDownloadCode(prompt("Enter download code:"))) {
    return;
  }

  startDownloadProcess(appid);
}

function startDownloadProcess(appid) {
  showCountdown();

  setTimeout(() => {
    simulateDownloadProgress();
    // window.location.href = `https://example.com/download/${appid}`;
  }, 5000);
}