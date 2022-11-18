import { fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import { describe, vi } from "vitest";
import client from "./client";
import LikeSvelte from "./Like.svelte";

describe("Like", () => {
  test("should show the like", () => {
    vi.mock("./client", () => ({
      default: {
        addLike: {
          mutate: vi.fn(),
        },
      },
    }));

    render(LikeSvelte, {
      like: 2,
      id: 11111,
      refresh: vi.fn(),
    });

    const like = screen.getByTestId("like");

    expect(like.innerHTML).toBe("2");
  });

  test("should add like", () => {
    vi.mock("./client", () => ({
      default: {
        addLike: {
          mutate: vi.fn(),
        },
      },
    }));

    const refresh = vi.fn();

    render(LikeSvelte, {
      like: 2,
      id: 11111,
      refresh,
    });

    const likeButton = screen.getByTestId("like-button");
    fireEvent.click(likeButton);

    waitFor(async () => {
      expect(vi.mocked(client.addLike.mutate)).toBeCalledWith(11111);
      expect(refresh).toBeCalled();
    });
  });
});
