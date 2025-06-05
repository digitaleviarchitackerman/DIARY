(() => {
  window.__DIARY_LOG__ = [];
  window.__DIARY_START__ = new Date().toISOString();

  const log = (eventType, details = {}) => {
    window.__DIARY_LOG__.push({
      time: new Date().toISOString(),
      action: eventType,
      ...details
    });
  };

  // Click tracking
  document.addEventListener("click", (e) => {
    log("click", {
      tag: e.target.tagName,
      id: e.target.id,
      class: e.target.className,
      text: e.target.innerText?.slice(0, 50)
    });
  });

  // Input tracking
  document.addEventListener("input", (e) => {
    log("input", {
      tag: e.target.tagName,
      id: e.target.id,
      class: e.target.className
    });
  });

  // Scroll tracking (sampled)
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      log("scroll", {
        scrollY: window.scrollY
      });
    }, 500);
  });

  // Tab switch tracking (requires focus/blur)
  window.addEventListener("blur", () => log("tab_blur"));
  window.addEventListener("focus", () => log("tab_focus"));

  alert("📒 DIARY recording started. Paste Script 2 to stop and export.");
})();
