import { permanentRedirect } from "next/navigation";

import { getPost, postPath } from "../lib/posts";

/**
 * Legacy route. The old site linked posts as /blogs?id=12, and those URLs are
 * already shared and indexed — resolve the id to the new slug instead of
 * dropping everyone on the index.
 */
export default async function LegacyBlogsPage({
    searchParams,
}: {
    searchParams: { id?: string };
}) {
    const id = Number(searchParams.id);

    if (Number.isInteger(id) && id > 0) {
        const post = await getPost(id);
        if (post) permanentRedirect(postPath(post));
    }

    permanentRedirect("/yazilar");
}
