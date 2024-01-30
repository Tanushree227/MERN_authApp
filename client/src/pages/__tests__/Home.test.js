import { render } from '@testing-library/react';
import Home from '../Home';
import { test, expect } from 'vitest';
import '@testing-library/jest-dom/extend-expect'; // for additional matchers

test('Home Component renders posts after fetching data', async () => {
  const { getByText, queryByText, getByTestId, wait } = render(<Home />);

  // Check if loading text is displayed initially
  expect(getByText(/loading/i)).toBeTruthy();

  // Wait for the data to be loaded (assuming it takes some time)
  await wait(() => {
    // Check if the loading text is not present
    expect(queryByText(/loading/i)).toBeNull();

    // Check if the h1 element with text 'All Posts' is present
    expect(getByText(/All Posts/i)).toBeTruthy();

    // Check if at least one post is rendered
    expect(getByTestId('post-item')).toBeTruthy();
  });
});
