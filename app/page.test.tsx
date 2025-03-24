/**
 * @jest-environment jsdom
 */
import Page from './page'
import { render, screen } from '@testing-library/react'
// import '@testing-library/jest-dom'

it("App Router: Works with Server Components", () => {
    render(<Page />);
    expect(screen.getByRole("heading")).toHaveTextContent("App Router");
  });