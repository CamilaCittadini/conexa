import React from 'react';
import Link from 'next/link';
import { GithubIcon } from '@/icons/github';
import { LinkedinIcon } from '@/icons/linkedin';

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
    link: process.env.GITHUB || '',
    icon: <GithubIcon className="w-6 h-6" />,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    link: process.env.LINKEDIN || '',
    icon: <LinkedinIcon className="w-6 h-6" />,
  },
];

const email = process.env.EMAIL || '';

const Footer = () => {
  return (
    <div className="border-t-solid border-t bottom-0 left-0 w-full p-4 bg-blue-200">
      <div className="flex w-full items-center justify-between">
        <Link href={`mailto:${email}`}>
          <p>
            by <b>Camila Cittadini</b>
          </p>
        </Link>

        <div className="flex">
          {footerLinks.map(({ id, label, link, icon }, index) => (
            <div className="flex" key={id}>
              <span className="mr-1">{icon}</span>
              <Link href={link} target="_blank">
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
