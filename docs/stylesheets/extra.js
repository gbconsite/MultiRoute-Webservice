// Open links externally.
var links = document.links;

for (var i = 0, linksLength = links.length; i < linksLength; i++) {
   if (links[i].hostname != window.location.hostname) {
       links[i].target = '_blank';
   }
}

// Give Zensical's search modal an opaque surface instead of its frosted glass.
// Zensical currently renders search inside an open Shadow DOM, so this looks
// up the modal classes from the bundled search stylesheet.
(function makeSearchSurfaceSolid() {
  function patchSearchRoot() {
    for (const host of document.body.children) {
      const root = host.shadowRoot;
      if (!root || root.querySelector("style[data-solid-search-surface]")) continue;

      const source = Array.from(root.querySelectorAll("style"))
        .map(style => style.textContent)
        .find(css => css.includes("--color-backdrop") && css.includes("--alpha-light"));
      if (!source) continue;

      const backdrop = source.match(/\.([a-z0-9_-]+)\{position:absolute;width:100%;height:100%;background-color:rgba\(var\(--color-backdrop\)/i);
      const panel = source.match(/\.([a-z0-9_-]+)\{display:flex;position:absolute;width:720px;height:70vh;overflow:hidden;background-color:rgba\(var\(--color-background\)/i);
      if (!backdrop || !panel) continue;

      const style = document.createElement("style");
      style.dataset.solidSearchSurface = "true";
      style.textContent = `
        .${panel[1]} {
          background-color: rgb(var(--color-background-subtle)) !important;
          -webkit-backdrop-filter: none !important;
          backdrop-filter: none !important;
        }
      `;
      root.appendChild(style);
    }
  }

  const observer = new MutationObserver(patchSearchRoot);
  observer.observe(document.body, { childList: true });
  patchSearchRoot();
})();
