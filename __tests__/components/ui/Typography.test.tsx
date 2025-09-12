import React from 'react';
import { render, screen } from '@testing-library/react';
import Typography from '@/components/ui/Typography';

describe('Typography', () => {
  it('renders with default variant as h1', () => {
    render(<Typography variant="h1">Test Heading</Typography>);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Test Heading');
    expect(heading).toHaveClass('typography-h1');
  });

  it('renders with h2 variant', () => {
    render(<Typography variant="h2">Test Heading 2</Typography>);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Test Heading 2');
    expect(heading).toHaveClass('typography-h2');
  });

  it('renders with h3 variant', () => {
    render(<Typography variant="h3">Test Heading 3</Typography>);
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Test Heading 3');
    expect(heading).toHaveClass('typography-h3');
  });

  it('renders with h4 variant', () => {
    render(<Typography variant="h4">Test Heading 4</Typography>);
    const heading = screen.getByRole('heading', { level: 4 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Test Heading 4');
    expect(heading).toHaveClass('typography-h4');
  });

  it('renders with h5 variant', () => {
    render(<Typography variant="h5">Test Heading 5</Typography>);
    const heading = screen.getByRole('heading', { level: 5 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Test Heading 5');
    expect(heading).toHaveClass('typography-h5');
  });

  it('renders with custom className', () => {
    render(<Typography variant="h1" className="custom-class">Test Heading</Typography>);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass('typography-h1', 'custom-class');
  });

  it('renders with custom as prop', () => {
    render(<Typography variant="h1" as="div">Test Content</Typography>);
    const element = screen.getByText('Test Content');
    expect(element.tagName).toBe('DIV');
    expect(element).toHaveClass('typography-h1');
  });

  it('renders with as="span"', () => {
    render(<Typography variant="h2" as="span">Test Span</Typography>);
    const element = screen.getByText('Test Span');
    expect(element.tagName).toBe('SPAN');
    expect(element).toHaveClass('typography-h2');
  });

  it('renders with as="p"', () => {
    render(<Typography variant="h3" as="p">Test Paragraph</Typography>);
    const element = screen.getByText('Test Paragraph');
    expect(element.tagName).toBe('P');
    expect(element).toHaveClass('typography-h3');
  });

  it('renders children correctly', () => {
    render(
      <Typography variant="h1">
        <span>Nested</span> Content
      </Typography>
    );
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Nested Content');
  });
});
