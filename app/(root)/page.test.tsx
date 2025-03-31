/**
 * @jest-environment jsdom
 */
import Page from './page'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('HomePage', () => {
  it('renders the homepage without crashing', () => {
    render(<Page />);
    
    // Test main heading is present
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Welcome to My Portfolio');
    
    // Test paragraph content
    expect(screen.getByText('This is a sample page to test the navbar with scroll effects.')).toBeInTheDocument();
    
    // Test button is present
    expect(screen.getByRole('button')).toHaveTextContent('Get Started');
  });
  
  it('renders all three sections', () => {
    render(<Page />);
    
    // Test section headings
    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(3); // Main heading + 2 section headings
    
    expect(headings[0]).toHaveTextContent('Welcome to My Portfolio');
    expect(headings[1]).toHaveTextContent('Section 1');
    expect(headings[2]).toHaveTextContent('Section 2');
  });
  
  it('renders section content correctly', () => {
    render(<Page />);
    
    // Test section 1 content
    expect(screen.getByText(/Scroll down to see how the navbar changes/)).toBeInTheDocument();
    
    // Test section 2 content
    expect(screen.getByText(/Another section to provide more content/)).toBeInTheDocument();
  });
});
