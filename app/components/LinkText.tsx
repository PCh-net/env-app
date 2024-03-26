import React, { ReactNode } from 'react';
import Link from 'next/link';

interface TextLinkProps {
  to: string;
  fontSize: string;
  children: ReactNode;
}

const LinkText: React.FC<TextLinkProps> = ({ to, fontSize, children }) => {
  return (
    <Link href={to} legacyBehavior>
      <a className={`text-lime-400 underline hover:text-lime-900 ${fontSize}`} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    </Link>
  );
};

export default LinkText;
