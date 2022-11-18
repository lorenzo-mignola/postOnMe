import { render, screen, waitFor } from "@testing-library/svelte";
import { describe, vi } from "vitest";
import comment from "../../../__test__/mock/comment";
import post from "../../../__test__/mock/post";
import client from "../../lib/client";
import postStore from "../../store/post";
import PostView from "./PostView.svelte";

const postMock = { ...post, comment };

describe("PostView", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    postStore.set(postMock);
  });

  test("render the post component view", async () => {
    vi.mock("../../lib/client", () => ({
      default: {
        getPost: {
          query: vi.fn(),
        },
      },
    }));

    vi.mocked(client.getPost.query).mockResolvedValue({
      ...post,
      comment,
    });

    render(PostView, { params: { id: "111111" } });

    await waitFor(() => {
      const postElement = screen.queryByRole("article");
      expect(postElement).not.toBeNull();
    });

    const author = screen.getByTestId("author");
    const text = screen.getByTestId("text");
    const date = screen.getByTestId("date");
    const like = screen.getByTestId("like");
    const comments = screen.getByTestId("comments");
    const commentElements = screen.queryAllByTestId("comment-element");

    expect(author.innerHTML).toBe(`@${post.author.name}`);
    expect(text.innerHTML).toBe(post.text);
    expect(date.innerHTML).toBe("04.11.2022 11:37");
    expect(like.innerHTML).toBe("3");
    expect(comments.innerHTML).toBe("2");
    expect(commentElements).toHaveLength(2);
  });
});
