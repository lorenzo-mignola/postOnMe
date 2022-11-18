import { writable } from "svelte/store";
import type { Post } from "../lib/client";
import client from "../lib/client";

const post = writable<Post | null>(null);

export const getPost = async (params: { id?: string }) => {
  try {
    if (params.id) {
      const postData = await client.getPost.query(Number(params.id));
      post.set(postData);
    }
  } catch (error) {
    console.error(error);
  }
};

export default post;
