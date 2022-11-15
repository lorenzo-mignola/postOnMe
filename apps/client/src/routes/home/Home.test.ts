import { fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import { beforeEach, describe, expect, test, vi } from "vitest";
import client from "../../lib/client";
import Home from "./Home.svelte";

describe("Home", () => {
  beforeEach(() => {
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "user-id=111111",
    });
    vi.resetAllMocks();
  });

  test("should refresh on close", async () => {
    vi.mock("../../lib/client", () => ({
      default: {
        posts: {
          query: vi.fn(),
        },
      },
    }));

    vi.mocked(client.posts.query).mockResolvedValue([]);

    render(Home);

    const cancelButton = screen.getByText<HTMLButtonElement>("Cancel");
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(vi.mocked(client.posts.query)).toBeCalled();
    });
  });
});
