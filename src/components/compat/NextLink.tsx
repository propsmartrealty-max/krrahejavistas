import React from 'react';

export default function NextLink({
  href,
  children,
  className = '',
  ...props
}: any) {
  return (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  );
}
