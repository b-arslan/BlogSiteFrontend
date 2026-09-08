import "server-only";

/**
 * Defence-in-depth scrub for blog HTML before it reaches
 * dangerouslySetInnerHTML.
 *
 * Scope note: post bodies are authored by the site owner through the
 * authenticated admin panel (Word import), not by visitors, so this is not
 * guarding against a hostile author. It exists to contain whatever markup
 * Word/TipTap happens to emit and to blunt a compromised-backend scenario.
 *
 * This is intentionally conservative rather than exhaustive. If posts ever
 * accept third-party input, replace it with a real parser-based sanitizer
 * (sanitize-html / DOMPurify) — regex HTML filtering is not sufficient for a
 * genuinely untrusted source.
 */

const DANGEROUS_ELEMENTS = [
    "script",
    "style",
    "iframe",
    "object",
    "embed",
    "form",
    "input",
    "button",
    "link",
    "meta",
    "base",
];

export function sanitizeHtml(html: string): string {
    let out = html;

    for (const tag of DANGEROUS_ELEMENTS) {
        // Paired form, including contents.
        out = out.replace(
            new RegExp(`<${tag}\\b[^>]*>[\\s\\S]*?<\\/${tag}\\s*>`, "gi"),
            ""
        );
        // Unclosed / self-closing leftovers.
        out = out.replace(new RegExp(`<\\/?${tag}\\b[^>]*>`, "gi"), "");
    }

    // Inline event handlers: onclick=..., onerror=... in quoted or bare form.
    out = out.replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");

    // javascript:/data: URLs in href/src. Neutralised rather than removed so
    // the surrounding markup structure stays intact.
    out = out.replace(
        /\s(href|src|xlink:href)\s*=\s*("|')\s*(javascript|data|vbscript):[^"']*\2/gi,
        ' $1="#"'
    );

    return out;
}
