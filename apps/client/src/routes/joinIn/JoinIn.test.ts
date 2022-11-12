import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, test, vi } from 'vitest';
import client from '../../lib/client';
import JoinIn from './JoinIn.svelte';

vi.mock('../../lib/client.ts', () => ({
  default: {
    joinIn: {
      mutate: vi.fn().mockReturnValue(111111)
    }
  }
}));

describe('JoinIn flow', () => {
  test('should join in the user', () => {
    render(JoinIn);

    const inputName = screen.getByRole('textbox');
    fireEvent.change(inputName, { target: { value: 'new user' } });
    const joinInButton = screen.getByRole('button');
    fireEvent.click(joinInButton);

    expect(vi.mocked(client.joinIn.mutate)).toBeCalled();
  });
});
