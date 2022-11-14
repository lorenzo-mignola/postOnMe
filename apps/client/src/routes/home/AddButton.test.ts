import { fireEvent } from '@testing-library/dom';
import { render, screen, waitFor } from '@testing-library/svelte';
import { describe } from 'vitest';
import AddButton from './AddButton.svelte';

describe('Write post flow', () => {
  test('should write a post and be able to click the post button', () => {
    render(AddButton);

    const addButton = screen.getByTestId('add-button');
    fireEvent.click(addButton);

    const postButton = screen.getByText<HTMLButtonElement>('Post');
    expect(postButton.disabled).toBe(true);

    const textArea = screen.getByRole<HTMLTextAreaElement>('textbox');
    fireEvent.change(textArea, { target: { value: 'some text' } });

    expect(postButton.disabled).toBe(true);
  });

  test('should close the dialog', () => {
    render(AddButton);

    const addButton = screen.getByTestId('add-button');
    fireEvent.click(addButton);

    const dialogTitle = screen.queryByText('Write a new post');
    expect(dialogTitle).not.toBeNull();

    const postButton = screen.getByText<HTMLButtonElement>('Cancel');
    fireEvent.click(postButton);

    waitFor(() => {
      expect(dialogTitle).toBeNull();
    });
  });
});
