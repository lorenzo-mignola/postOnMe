import { render, screen } from "@testing-library/svelte";
import { describe, test } from "vitest";
import CommentCounterSvelte from "./CommentCounter.svelte";

describe("CommentCounter", () => {
  test("render the comment", () => {
    render(CommentCounterSvelte, { comment: 4 });

    const comments = screen.getByTestId("comments");

    expect(comments.innerHTML).toBe("4");
  });
});
