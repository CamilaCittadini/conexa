import React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorView } from '@/components';

it('should show error message', () => {
  render(<ErrorView />);

  const myElement = screen.getByText('There was an error loading the page');
  expect(myElement).toBeInTheDocument();
});
