(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const button = $("accountButton");
  const avatar = $("accountAvatar");
  const name = $("accountName");
  const action = $("accountAction");
  const toast = $("toast");
  let toastTimeout;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove("show"), 2600);
  }
  function paintAccount(state) {
    const user = state && state.user;
    if (user) {
      name.textContent = user.username || "CrazyGames Player";
      avatar.src = user.profilePictureUrl || "assets/images/pixelforge-mark.svg";
      avatar.alt = user.username ? user.username + " profile picture" : "CrazyGames profile picture";
      action.textContent = "CrazyGames";
      button.setAttribute("aria-label", "Signed in as " + (user.username || "CrazyGames player"));
      button.title = "Signed in with CrazyGames";
    } else {
      name.textContent = "Guest";
      avatar.src = "assets/images/pixelforge-mark.svg";
      avatar.alt = "";
      action.textContent = "Sign in";
      button.setAttribute("aria-label", "Sign in with CrazyGames");
      button.title = "Optional: sign in with your CrazyGames account";
    }
  }
  button.addEventListener("click", async () => {
    const state = window.PFAccount && window.PFAccount.state;
    if (state && state.user) {
      showToast("Your CrazyGames profile is connected.");
      return;
    }
    if (window.PFAccount) await window.PFAccount.signIn();
    else showToast("You can still play as a guest.");
  });
  window.addEventListener("pf-account-change", event => paintAccount(event.detail));
  window.addEventListener("pf-toast", event => showToast(event.detail || "Something went wrong."));
  $("playButton").addEventListener("click", () => {
    window.location.href = "game.html";
  });
  paintAccount({ user: null });
  if (window.PFAccount) window.PFAccount.init();
})();