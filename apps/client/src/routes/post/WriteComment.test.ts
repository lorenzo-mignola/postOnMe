import { act, fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, test, vi } from "vitest";
import comment from "../../../__test__/mock/comment";
import post from "../../../__test__/mock/post";
import client from "../../lib/client";
import postStore from "../../store/post";
import WriteComment from "./WriteComment.svelte";

const params = {
  id: "222222",
};

const postMock = { ...post, comment };

describe("WriteComment", () => {
  beforeEach(() => {
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "user-id=111111",
    });
    vi.resetAllMocks();
    postStore.set(postMock);
  });

  test("should have the button disabled when comment is empty", () => {
    render(WriteComment);

    const sendButton = screen.getByRole<HTMLButtonElement>("button");

    expect(sendButton.disabled).toBe(true);
  });

  test("should write a comment and the button must be clickable", async () => {
    render(WriteComment);

    const sendButton = screen.getByRole<HTMLButtonElement>("button");
    const input = screen.getByRole<HTMLInputElement>("textbox");
    await act(() => fireEvent.input(input, { target: { value: "some comment" } }));

    expect(input.value).toBe("some comment");
    expect(sendButton.disabled).toBe(false);
  });

  test("should write a comment, send click", async () => {
    vi.mock("../../lib/client", () => ({
      default: {
        addComment: {
          mutate: vi.fn().mockResolvedValue(undefined),
        },
        getPost: {
          query: vi.fn().mockResolvedValue(undefined),
        },
      },
    }));
    render(WriteComment, { params });

    const sendButton = screen.getByRole<HTMLButtonElement>("button");
    const input = screen.getByRole<HTMLInputElement>("textbox");

    await act(() => fireEvent.input(input, { target: { value: "some comment" } }));
    await userEvent.click(sendButton);

    await waitFor(() => {
      expect(vi.mocked(client.addComment.mutate)).toBeCalledWith({
        comment: "some comment",
        userId: 111111,
        postId: 222222,
      });
    });
    expect(vi.mocked(client.getPost.query)).toBeCalled();
  });

  test("should have empty input when button is clicked", async () => {
    vi.mock("../../lib/client", () => ({
      default: {
        addComment: {
          mutate: vi.fn().mockResolvedValue(undefined),
        },
        getPost: {
          query: vi.fn().mockResolvedValue(undefined),
        },
      },
    }));
    render(WriteComment, { params });

    const sendButton = screen.getByRole<HTMLButtonElement>("button");
    const input = screen.getByRole<HTMLInputElement>("textbox");

    await act(() => fireEvent.input(input, { target: { value: "some comment" } }));
    await userEvent.click(sendButton);

    expect(input.value).toBe("");
  });
});
