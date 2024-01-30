import { render } from '@testing-library/react';
import Home from '../Home';
import { test, expect } from 'vitest';
import '@testing-library/jest-dom/extend-expect'; // for additional matchers

test('Home Component renders posts after fetching data', async () => {
  const { getByText, queryByText, getByTestId, wait } = render(<Home />);

  expect(getByText(/loading/i)).toBeTruthy();

  await wait(() => {
    expect(queryByText(/loading/i)).toBeNull();

    expect(getByText(/All Posts/i)).toBeTruthy();

    // Check if at least one post is rendered
    expect(getByTestId('post-item')).toBeTruthy();
  });
});
