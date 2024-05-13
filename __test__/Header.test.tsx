import React from 'react';
import { render } from '@testing-library/react';
import { Header } from '@/components';

describe('Header', () => {
  it('should render rick and morty image', () => {
    const { getByRole } = render(<Header />);

    const imageElement = getByRole('img', { name: 'rick and morty' });

    expect(imageElement).toBeInTheDocument();
  });
});
