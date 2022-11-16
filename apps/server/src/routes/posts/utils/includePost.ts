const includePost = {
  author: true,
  _count: {
    select: {
      comment: true,
    },
  },
};

export default includePost;
