import { render, screen } from '@testing-library/react';
import Home from '../Home';
import { describe, it, expect } from 'vitest';

describe("Testing for Home Page", () => {
    it("should renders the complete data", () => {
        render(<Home />);
        expect(screen.getAllByText("All Posts")).toBeTruthy();
    });
});
