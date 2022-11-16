import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import { afterEach, describe, expect, test, vi } from "vitest";
import type { Post as PostType } from "../../lib/client";
import client from "../../lib/client";
import Post from "./Post.svelte";

const post: PostType = {
  id: 3,
  text: "prova 1",
  createdAt: new Date("2022-11-04T10:37:25.152Z"),
  userId: 1,
  like: 3,
  author: {
    id: 1,
    name: "lorenzo",
  },
};

describe("Post.svelte", () => {
  afterEach(() => cleanup());

  test("render the post component", () => {
    render(Post, { post });

    const author = screen.getByTestId("author");
    const text = screen.getByTestId("text");
    const date = screen.getByTestId("date");
    const like = screen.getByTestId("like");

    expect(author.innerHTML).toBe(`@${post.author.name}`);
    expect(text.innerHTML).toBe(post.text);
    expect(date.innerHTML).toBe("04.11.2022 11:37");
    expect(like.innerHTML).toBe("3");
  });

  test("add like", () => {
    vi.mock("../../lib/client", () => ({
      default: {
        addLike: {
          mutate: vi.fn(),
        },
        posts: {
          query: vi.fn(),
        },
      },
    }));

    render(Post, { post });

    const likeButton = screen.getByTestId("like-button");
    fireEvent.click(likeButton);

    waitFor(async () => {
      expect(vi.mocked(client.addLike.mutate)).toBeCalledWith(3);
      expect(vi.mocked(client.posts.query)).toBeCalled();
    });
  });
});
