import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./pages/Home";

describe('Home Testing', () => {
    //Test Case 1: Check for the loading state
    it("should return true for loading state", () => {
        render(<Home />);
        expect(screen.getByTestId("loading")).exist;
    })

    //Test Case 2: Check for the post item
    it("should return true for rendering atleast one post item", () => {
        render(<Home />);
        expect(screen.findByTestId("post-item")).exist;
    })

    //Test Case 3: Check for the h1 on Home Page
    it("should return true for H1 element", () => {
        render(<Home />);
        expect(screen.findByText("All Posts")).exist;
    })
});