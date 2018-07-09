export function setup(helper) {
  if (!helper.markdownIt) { return; }

  helper.registerOptions((opts, siteSettings) => {
    opts.features.mermaid = siteSettings.discourse_mermaid_enabled;
  });

  helper.whiteList(["div.mermaid"]);

  helper.registerPlugin(md => {
    md.inline.bbcode.ruler.push("mermaid",{
      tag: "mermaid",

      replace: function(state, tagInfo, content) {
        const token = state.push("html_raw", '', 0);
        const escaped = state.md.utils.escapeHtml(content);
        const escapedCss = state.md.utils.escapeHtml(`height: ${tagInfo.attrs.height || 200}px`);
        token.content = `<div class="mermaid" style="${escapedCss}">\n${escaped}\n</div>\n`;
        return true;
      }
    });
  });
}
