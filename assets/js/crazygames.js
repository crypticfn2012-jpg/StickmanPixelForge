(() => {
  "use strict";
  const state = { ready: false, user: null, available: false, guest: true };
  const listeners = new Set();
  const publish = () => {
    window.dispatchEvent(new CustomEvent("pf-account-change", { detail: { ...state } }));
    listeners.forEach(fn => fn({ ...state }));
  };
  const sdk = () => window.CrazyGames && window.CrazyGames.SDK;
  async function refreshUser() {
    const api = sdk();
    if (!api || !api.user) { state.user = null; state.guest = true; publish(); return state; }
    try {
      const user = await api.user.getUser();
      state.user = user || null;
      state.guest = !user;
    } catch (_) {
      state.user = null;
      state.guest = true;
    }
    publish();
    return state;
  }
  async function init() {
    const api = sdk();
    if (!api) { state.ready = false; state.guest = true; publish(); return state; }
    try {
      await api.init();
      state.ready = true;
      try {
        const value = api.user && api.user.isUserAccountAvailable;
        state.available = typeof value === "function" ? !!(await value.call(api.user)) : value !== false;
      } catch (_) { state.available = false; }
      try { if (api.game && api.game.loadingStop) api.game.loadingStop(); } catch (_) {}
      await refreshUser();
      if (api.user && api.user.addAuthListener) {
        api.user.addAuthListener(user => {
          state.user = user || null;
          state.guest = !user;
          publish();
        });
      }
    } catch (error) {
      state.ready = false;
      state.guest = true;
      publish();
    }
    return state;
  }
  async function signIn() {
    const api = sdk();
    if (!api || !api.user || !state.ready) {
      window.dispatchEvent(new CustomEvent("pf-toast", { detail: "Sign-in is available when the game is running on CrazyGames." }));
      return state;
    }
    try {
      const user = await api.user.showAuthPrompt();
      state.user = user || null;
      state.guest = !user;
      publish();
    } catch (error) {
      if (!error || !["userCancelled", "showAuthPromptInProgress", "userAlreadySignedIn"].includes(error.code)) {
        window.dispatchEvent(new CustomEvent("pf-toast", { detail: "Could not open CrazyGames sign-in. You can still play as a guest." }));
      }
      await refreshUser();
    }
    return state;
  }
  window.PFAccount = { state, init, refreshUser, signIn, subscribe(fn) { listeners.add(fn); fn({ ...state }); return () => listeners.delete(fn); } };
})();