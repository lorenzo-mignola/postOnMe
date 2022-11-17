import type { Post } from "../../src/lib/client";

const comment: Post["comment"] = [
  {
    id: 5,
    comment: "new comment",
    postId: 236,
    userId: 33,
    commentedAt: new Date("2022-11-17T09:52:01.961Z"),
    author: { id: 33, name: "comments test" },
  },
];

export default comment;
