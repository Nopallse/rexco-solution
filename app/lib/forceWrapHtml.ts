export function forceWrapHtml(html: string) {
  return html
    .replace(/&nbsp;/g, " ")
    .replace(/\u00A0/g, " ");
}
