import React from 'react';
import { render } from '@testing-library/react';
import { Footer } from '@/components';

const emailHref = process.env.NEXT_PUBLIC_EMAIL;
const githubHref = process.env.NEXT_PUBLIC_GITHUB;
const linkedInHref = process.env.NEXT_PUBLIC_LINKEDIN;

describe('Footer', () => {
  it('renders three links (email, github and linkedin) with the correct href attributes', () => {
    const { getByTestId } = render(<Footer />);

    const emailLink = getByTestId('email');
    const githubLink = getByTestId('github');
    const linkedinLink = getByTestId('linkedin');

    expect(emailLink).toHaveAttribute('href', `mailto:${emailHref}`);
    expect(githubLink).toHaveAttribute('href', githubHref);
    expect(linkedinLink).toHaveAttribute('href', linkedInHref);
  });
});
