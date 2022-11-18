import { fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import { beforeEach, describe, expect, test, vi } from "vitest";
import client from "../../lib/client";
import postText from "../../store/postText";
import AddButton from "./AddButton.svelte";

describe("Write post flow", () => {
  beforeEach(() => {
    postText.set("some text");
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "user-id=111111",
    });
    vi.resetAllMocks();

    vi.mock("../../lib/client", () => ({
      default: {
        posts: {
          query: vi.fn(),
        },
        addPost: {
          mutate: vi.fn(),
        },
      },
    }));
  });

  test("should write a post and be able to click the post button", () => {
    render(AddButton);

    const addButton = screen.getByTestId("add-button");
    fireEvent.click(addButton);

    const postButton = screen.getByText<HTMLButtonElement>("Post");

    expect(postButton.disabled).toBe(false);
  });

  test("should close the dialog", async () => {
    render(AddButton);

    const addButton = screen.getByTestId("add-button");
    fireEvent.click(addButton);

    const dialogTitle = screen.queryByTestId("add-dialog");
    await waitFor(() => {
      expect(Array.from(dialogTitle.classList)).not.toContain("hidden");
    });

    const postButton = screen.getByText<HTMLButtonElement>("Cancel");
    fireEvent.click(postButton);

    await waitFor(() => {
      expect(Array.from(dialogTitle.classList)).toContain("hidden");
    });
  });

  test("should write a post and send post", async () => {
    render(AddButton);

    const addButton = screen.getByTestId("add-button");
    fireEvent.click(addButton);

    const textArea = screen.getByRole<HTMLTextAreaElement>("textbox");
    fireEvent.change(textArea, { target: { value: "some text" } });

    const postButton = screen.getByText<HTMLButtonElement>("Post");

    await waitFor(() => {
      expect(textArea.value).toBe("some text");
      expect(postButton.disabled).toBe(false);
    });

    fireEvent.click(postButton);
    expect(vi.mocked(client.addPost.mutate)).toBeCalledWith({
      text: "some text",
      userId: 111111,
    });
  });
});
