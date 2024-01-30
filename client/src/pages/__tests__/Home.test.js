import { render, screen } from '@testing-library/react';
import Home from '../Home';
import { test, expect } from 'vitest';

test('Home Component renders posts after fetching data', async () => {
  render(<Home />);

  // Check if loading text is displayed initially
  expect(screen.getByText(/loading/i)).toBeTruthy();

  // Wait for the data to be loaded (assuming it takes some time)
  await screen.wait(() => {
    // Check if the loading text is not present
    expect(screen.queryByText(/loading/i)).toBeNull();

    // Check if the h1 element with text 'All Posts' is present
    expect(screen.getByText(/All Posts/i)).toBeTruthy();

    // Check if at least one post is rendered
    expect(screen.getByTestId('post-item')).toBeTruthy();
  });
});
