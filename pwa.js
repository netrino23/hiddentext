(() => {
  "use strict";

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js").catch(() => {
        // HiddenText remains fully usable online if registration is unavailable.
      });
    });
  }

  const installButton = document.querySelector("[data-install-app]");
  if (!installButton) return;

  const installDialog = document.getElementById("installDialog");
  const installInstructions = document.getElementById("installInstructions");
  const closeButton = document.getElementById("closeInstallDialog");
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;
  let deferredPrompt = null;

  function setInstalledState() {
    installButton.disabled = true;
    installButton.innerHTML = '<span aria-hidden="true">✓</span> App installed';
    installButton.setAttribute("aria-label", "HiddenText is installed");
  }

  function manualInstructions() {
    const agent = navigator.userAgent;
    const isAppleMobile = /iPad|iPhone|iPod/.test(agent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const isAndroid = /Android/.test(agent);

    if (isAppleMobile) {
      return "In Safari, tap the Share button, scroll down, and choose “Add to Home Screen”.";
    }
    if (isAndroid) {
      return "Open your browser menu (⋮), then choose “Install app” or “Add to Home screen”.";
    }
    return "Open your browser menu and choose “Install HiddenText” or “Install app”. Installation support depends on your browser.";
  }

  function showInstallHelp() {
    if (installInstructions) installInstructions.textContent = manualInstructions();
    if (installDialog?.showModal) {
      installDialog.showModal();
    } else {
      window.alert(manualInstructions());
    }
  }

  if (isStandalone) setInstalledState();

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    installButton.disabled = false;
  });

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    setInstalledState();
  });

  installButton.addEventListener("click", async () => {
    if (isStandalone || installButton.disabled) return;
    if (!deferredPrompt) {
      showInstallHelp();
      return;
    }

    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
  });

  closeButton?.addEventListener("click", () => installDialog?.close());
  installDialog?.addEventListener("click", (event) => {
    if (event.target === installDialog) installDialog.close();
  });
})();
