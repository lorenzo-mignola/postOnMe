import { writable } from "svelte/store";
import type { Post } from "../lib/client";
import client from "../lib/client";

const posts = writable<Post[]>([]);

export const fetchPost = async () => {
  try {
    const postData = await client.posts.query();
    posts.set(postData);
  } catch (e) {
    console.error(e);
  }
};

export default posts;
