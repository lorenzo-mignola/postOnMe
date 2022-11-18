import type { Post } from "../../src/lib/client";

const post: Post = {
  id: 3,
  text: "prova 1",
  createdAt: new Date("2022-11-04T10:37:25.152Z"),
  userId: 1,
  like: 3,
  author: {
    id: 1,
    name: "lorenzo",
  },
  _count: {
    comment: 2,
  },
};

export default post;
