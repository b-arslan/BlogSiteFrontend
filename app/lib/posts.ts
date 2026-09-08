import "server-only";

export interface Post {
    id: number;
    title: string;
    content: string;
    created_at: string;
    created_by: string;
    cover_image_url?: string;
    video_url?: string | null;
}

export interface PostSummary extends Post {
    slug: string;
    excerpt: string;
}

const API_URL = process.env.API_URL?.replace(/\/$/, "");

/**
 * Turkish-aware slug. The default toLowerCase() maps "I" to "i" rather than
 * "ı", which would produce slugs that don't round-trip for titles like
 * "SINAV KAYGISI".
 */
export function slugify(title: string): string {
    const map: Record<string, string> = {
        ç: "c", Ç: "c", ğ: "g", Ğ: "g", ı: "i", I: "i",
        İ: "i", i: "i", ö: "o", Ö: "o", ş: "s", Ş: "s",
        ü: "u", Ü: "u",
    };

    return title
        .replace(/[çÇğĞıIİiöÖşŞüÜ]/g, (ch) => map[ch])
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 80);
}

/** Canonical post path. The id suffix keeps it unique without a backend column. */
export function postPath(post: Pick<Post, "id" | "title">): string {
    return `/yazilar/${slugify(post.title)}-${post.id}`;
}

/** Pulls the trailing id out of a slug produced by postPath(). */
export function idFromSlug(slug: string): number | null {
    const match = slug.match(/-(\d+)$/);
    return match ? Number(match[1]) : null;
}

const NAMED_ENTITIES: Record<string, string> = {
    nbsp: " ",
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    ldquo: "“",
    rdquo: "”",
    lsquo: "‘",
    rsquo: "’",
    hellip: "…",
    ndash: "–",
    mdash: "—",
};

/**
 * The Word import stores Turkish characters as numeric entities (ş is
 * &#x15f;, ı is &#x131;, …). The browser decodes those for the post body
 * because it is injected as HTML, but excerpts are rendered as plain text —
 * so they have to be decoded here or the card previews show raw entities.
 */
function decodeEntities(input: string): string {
    return input
        .replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
            String.fromCodePoint(parseInt(hex, 16))
        )
        .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
        .replace(/&([a-z]+);/gi, (match, name) => {
            const key = name.toLowerCase();
            return key in NAMED_ENTITIES ? NAMED_ENTITIES[key] : match;
        });
}

/** Strips the HTML that comes out of the Word-document import for previews. */
export function toExcerpt(html: string, maxChars = 180): string {
    // Decode before truncating, otherwise the cut can land inside an entity.
    const text = decodeEntities(html.replace(/<[^>]*>/g, " "))
        .replace(/\s+/g, " ")
        .trim();

    if (text.length <= maxChars) return text;

    const cut = text.lastIndexOf(" ", maxChars);
    return text.slice(0, cut > 0 ? cut : maxChars) + "…";
}

function decorate(post: Post): PostSummary {
    return {
        ...post,
        slug: `${slugify(post.title)}-${post.id}`,
        excerpt: toExcerpt(post.content),
    };
}

export async function getPosts(): Promise<PostSummary[]> {
    if (!API_URL) {
        // Keeps the site renderable before the backend URL is configured.
        return [];
    }

    try {
        const res = await fetch(`${API_URL}/api/blogposts`, {
            next: { revalidate: 300, tags: ["posts"] },
        });

        if (!res.ok) {
            console.error(`getPosts: backend responded ${res.status}`);
            return [];
        }

        const data = await res.json();
        const posts: Post[] = data?.content ?? [];

        return posts
            .map(decorate)
            .sort(
                (a, b) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
            );
    } catch (error) {
        console.error("getPosts failed:", error);
        return [];
    }
}

export async function getPost(id: number): Promise<PostSummary | null> {
    const posts = await getPosts();
    return posts.find((post) => post.id === id) ?? null;
}
