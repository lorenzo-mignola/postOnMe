import { fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import { describe, test, vi } from 'vitest';
import client from '../../lib/client';
import JoinIn from './JoinIn.svelte';

beforeEach(() => {
  vi.resetAllMocks();
});

describe('JoinIn flow', () => {
  test.skip('should join in the user', () => {
    vi.mock('../../lib/client', () => ({
      default: {
        joinIn: {
          mutate: vi.fn().mockReturnValue(111111)
        }
      }
    }));
    render(JoinIn);

    const inputName = screen.getByRole('textbox');
    fireEvent.change(inputName, { target: { value: 'new user' } });
    const joinInButton = screen.getByRole('button');
    fireEvent.click(joinInButton);

    expect(vi.mocked(client.joinIn.mutate)).toBeCalled();
  });

  test('should not show error message', async () => {
    vi.mock('../../lib/client', () => ({
      default: {
        joinIn: {
          mutate: vi.fn().mockReturnValue(111111)
        }
      }
    }));
    render(JoinIn);

    const joinInButton = screen.getByRole('button');
    fireEvent.click(joinInButton);
    const errorMessage = screen.queryByText('User name already used!');
    expect(errorMessage).toBeNull();
  });

  test('should show error message', async () => {
    vi.mock('../../lib/client', () => ({
      default: {
        joinIn: {
          mutate: vi.fn(() => {
            throw new Error('Test error');
          })
        }
      }
    }));
    render(JoinIn);

    const joinInButton = screen.getByRole('button');
    fireEvent.click(joinInButton);
    waitFor(() => {
      const errorMessage = screen.getByText('User name already used!');
      expect(errorMessage).not.toBeNull();
    });
  });
});
