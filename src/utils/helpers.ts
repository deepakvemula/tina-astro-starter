import { type CollectionEntry } from "astro:content";

export function sortItemsByDateDesc(
  itemA: CollectionEntry<"blog">,
  itemB: CollectionEntry<"blog">
) {
  return (
    new Date(itemB.data.pubDate).getTime() -
    new Date(itemA.data.pubDate).getTime()
  );
}

export function createSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with a single hyphen
}

export function getAllTags(posts: CollectionEntry<"blog">[]) {
  const tags: string[] = [
    ...new Set(posts.flatMap((post) => post.data.tags || []).filter(Boolean)),
  ];
  return tags
    .map((tag) => {
      return {
        name: tag,
        id: createSlugFromTitle(tag),
      };
    })
    .filter((obj, pos, arr) => {
      return arr.map((mapObj) => mapObj.id).indexOf(obj.id) === pos;
    });
}

export function getPostsByTag(posts: CollectionEntry<"blog">[], tagId: string) {
  const filteredPosts: CollectionEntry<"blog">[] = posts.filter((post) =>
    (post.data.tags || [])
      .map((tag) => createSlugFromTitle(tag))
      .includes(tagId)
  );
  return filteredPosts;
}

export const withBase = (path: string) => {
  const base = import.meta.env.BASE_URL;
  // Remove trailing slash from base and leading slash from path to avoid double slashes
  const cleanBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
};
