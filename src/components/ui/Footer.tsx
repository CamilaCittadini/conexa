import React from 'react';
import Link from 'next/link';
import { GithubIcon, LinkedinIcon } from '@/icons';

const email = process.env.NEXT_PUBLIC_EMAIL || '';
const githubLink = process.env.NEXT_PUBLIC_GITHUB || '';
const linkedInLink = process.env.NEXT_PUBLIC_LINKEDIN || '';

type FooterLink = {
  id: string;
  label: string;
  link: string;
  icon: React.JSX.Element;
};

const footerLinks: FooterLink[] = [
  {
    id: 'github',
    label: 'Github',
    link: githubLink,
    icon: <GithubIcon className="w-6 h-6" />,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    link: linkedInLink,
    icon: <LinkedinIcon className="w-6 h-6" />,
  },
];

const Footer = () => {
  return (
    <div className="text-xs lg:text-md border-t-solid border-t w-full p-4 bg-green-300">
      <div className="flex w-full items-center justify-between">
        <Link href={`mailto:${email}`} data-testid="email">
          <p>
            by <b>Camila Cittadini</b>
          </p>
        </Link>

        <div className="flex items-center justify-center">
          {footerLinks.map(({ id, label, link, icon }, index) => (
            <div className="flex items-center" key={id}>
              <span className="mr-1">{icon}</span>
              <Link href={link} target="_blank" data-testid={id}>
                {label}
              </Link>
              {index !== footerLinks.length - 1 && (
                <span className="mx-3 ">|</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { Footer };
