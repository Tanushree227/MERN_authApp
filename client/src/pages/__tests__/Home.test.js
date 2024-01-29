import { render, screen } from '@testing-library/react';
import Home from '../Home';
import { describe, it, expect } from 'vitest';

describe('Home', () => {
    it('renders h1 element', () => {
        render(<Home />)
        expect(screen.getByText('All Posts')).toBeInTheDocument();
    })
})