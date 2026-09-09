// Compatibility shim for next/navigation in Astro
import { useState, useEffect } from 'react';

export function usePathname(): string {
  const [pathname, setPathname] = useState('/');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname);
    }
  }, []);
  return typeof window !== 'undefined' ? window.location.pathname : '/';
}

export function useRouter() {
  return {
    push: (href: string) => {
      if (typeof window !== 'undefined') window.location.href = href;
    },
    replace: (href: string) => {
      if (typeof window !== 'undefined') window.location.replace(href);
    },
    back: () => {
      if (typeof window !== 'undefined') window.history.back();
    },
    forward: () => {
      if (typeof window !== 'undefined') window.history.forward();
    },
    prefetch: () => {},
    refresh: () => {
      if (typeof window !== 'undefined') window.location.reload();
    },
  };
}

export function useSearchParams() {
  if (typeof window !== 'undefined') {
    return new URLSearchParams(window.location.search);
  }
  return new URLSearchParams();
}

export function notFound() {
  throw new Error('404 Not Found');
}

export function redirect(url: string) {
  if (typeof window !== 'undefined') {
    window.location.href = url;
  }
}
