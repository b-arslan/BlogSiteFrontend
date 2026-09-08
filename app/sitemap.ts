import type { MetadataRoute } from "next";

import { site, workAreas } from "./lib/content";
import { getPosts, postPath } from "./lib/posts";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes = [
        { path: "/", priority: 1 },
        { path: "/hakkimda", priority: 0.8 },
        { path: "/calisma-alanlari", priority: 0.9 },
        { path: "/yazilar", priority: 0.9 },
        { path: "/sikca-sorulan-sorular", priority: 0.7 },
        { path: "/iletisim", priority: 0.7 },
    ].map((route) => ({
        url: `${site.url}${route.path}`,
        lastModified: new Date(),
        priority: route.priority,
    }));

    const areaRoutes = workAreas.map((area) => ({
        url: `${site.url}/calisma-alanlari/${area.slug}`,
        lastModified: new Date(),
        priority: 0.8,
    }));

    const posts = await getPosts();
    const postRoutes = posts.map((post) => ({
        url: `${site.url}${postPath(post)}`,
        lastModified: new Date(post.created_at),
        priority: 0.7,
    }));

    return [...staticRoutes, ...areaRoutes, ...postRoutes];
}
