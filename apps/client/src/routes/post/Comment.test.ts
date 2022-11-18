import { render, screen } from "@testing-library/svelte";
import { describe, test } from "vitest";
import commentArray from "../../../__test__/mock/comment";
import formatDate from "../../util/formatDate";
import Comment from "./Comment.svelte";

const comment = commentArray[0];

describe("Comment", () => {
  test("should render a comment", () => {
    render(Comment, { comment });

    const commentComment = screen.getByTestId("comment-comment");
    const commentAuthor = screen.getByTestId("comment-author");
    const commentDate = screen.getByTestId("comment-date");

    expect(commentComment.innerHTML).toBe(comment.comment);
    expect(commentAuthor.innerHTML).toBe(`by @${comment.author.name}`);
    expect(commentDate.innerHTML).toBe(formatDate(comment.commentedAt));
  });
});
