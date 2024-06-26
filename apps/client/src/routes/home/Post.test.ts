import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import { push } from "svelte-spa-router";
import { afterEach, describe, expect, test, vi } from "vitest";
import post from "../../../__test__/mock/post";
import client from "../../lib/client";
import Post from "./Post.svelte";

describe("Post.svelte", () => {
  afterEach(() => cleanup());

  test("render the post component", () => {
    render(Post, { post });

    const author = screen.getByTestId("author");
    const text = screen.getByTestId("text");
    const date = screen.getByTestId("date");
    const likeElements = screen.getAllByTestId("like");
    const like = Array.from(likeElements)[0];
    const comments = screen.getByTestId("comments");

    expect(author.innerHTML).toBe(`@${post.author.name}`);
    expect(text.innerHTML).toBe(post.text);
    expect(date.innerHTML).toBe("04.11.2022 11:37");
    expect(like.innerHTML).toBe("3");
    expect(comments.innerHTML).toBe("2");
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

    const likeButtonElements = screen.getAllByTestId("like-button");
    const likeButton = Array.from(likeButtonElements)[0];
    fireEvent.click(likeButton);

    waitFor(async () => {
      expect(vi.mocked(client.addLike.mutate)).toBeCalledWith(3);
      expect(vi.mocked(client.posts.query)).toBeCalled();
    });
  });

  test("should open the post", async () => {
    vi.mock("svelte-spa-router", () => ({
      push: vi.fn(),
    }));

    render(Post, { post });

    const openButton = screen.getByTestId("open-button");
    fireEvent.click(openButton);

    expect(vi.mocked(push)).toBeCalledWith(`/post/${post.id}`);
  });
});
