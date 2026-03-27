import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import Week1CatalogPage from './Week1CatalogPage';

describe('Week1CatalogPage', () => {
  test('renders page title', () => {
    render(<Week1CatalogPage />);
    
    expect(screen.getByText(/catalog/i)).toBeInTheDocument();
  });

  test('renders buttons', () => {
    render(<Week1CatalogPage />);
    
    expect(screen.getByText(/Switch to/i)).toBeInTheDocument();
  });
});