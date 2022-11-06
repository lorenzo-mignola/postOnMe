import { cleanup, render, screen } from '@testing-library/svelte';
import type { Post as PostType } from '../../lib/client';
import Post from './Post.svelte';

const post: PostType = {
  id: 3,
  text: 'prova 1',
  createdAt: new Date('2022-11-04T10:37:25.152Z'),
  userId: 1,
  like: 0,
  author: {
    id: 1,
    name: 'lorenzo'
  }
};

describe('Post.svelte', () => {
  afterEach(() => cleanup());

  it('render the post component', () => {
    render(Post, { post });

    const author = screen.getByTestId('author');
    const text = screen.getByTestId('text');
    const date = screen.getByTestId('date');

    expect(author.innerHTML).toBe(`@${post.author.name}`);
    expect(text.innerHTML).toBe(post.text);
    expect(date.innerHTML).toBe(post.createdAt.toLocaleString());
  });
});
