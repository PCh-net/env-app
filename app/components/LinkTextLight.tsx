import React, { ReactNode } from 'react';
import Link from 'next/link';

interface TextLinkProps {
  to: string;
  fontSize: string;
  children: ReactNode;
}

const LinkTextLight: React.FC<TextLinkProps> = ({ to, fontSize, children }) => {
  return (
    <Link href={to} legacyBehavior>
      <a className={`text-lime-300 underline hover:text-lime-200 ${fontSize} transition-colors duration-400`} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    </Link>
  );
};

export default LinkTextLight;
