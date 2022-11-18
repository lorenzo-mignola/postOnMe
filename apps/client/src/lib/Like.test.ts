import { fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import { describe, vi } from "vitest";
import comment from "../../__test__/mock/comment";
import post from "../../__test__/mock/post";
import client from "./client";
import LikeSvelte from "./Like.svelte";

describe("Like", () => {
  test("should show the like", () => {
    vi.mock("../../lib/client", () => ({
      default: {
        addLike: {
          mutate: vi.fn(),
        },
      },
    }));

    render(LikeSvelte, { like: 2, id: 11111, refresh: vi.fn() });

    const like = screen.getByTestId("like");

    expect(like.innerHTML).toBe("2");
  });

  test("should add like", () => {
    vi.mock("../../lib/client", () => ({
      default: {
        addLike: {
          mutate: vi.fn(),
        },
      },
    }));

    render(LikeSvelte, {
      like: 2,
      id: 11111,
      refresh: vi.fn().mockResolvedValue({ ...post, comment }),
    });

    const likeButton = screen.getByTestId("like-button");
    fireEvent.click(likeButton);

    waitFor(async () => {
      expect(vi.mocked(client.addLike.mutate)).toBeCalledWith(11111);
      expect(vi.mocked(client.posts.query)).toBeCalled();
    });
  });
});
