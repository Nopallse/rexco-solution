import { NextRequest, NextResponse } from 'next/server';

const SUPPORTED_LANGS = ['en', 'id'];

const isPublicFile = (pathname: string) => /\.[^/]+$/.test(pathname);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip Next.js internals and public files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/sitemap') ||
    pathname.startsWith('/favicon') ||
    isPublicFile(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split('/');
  const maybeLang = segments[1];

  // If URL already has language prefix, rewrite to internal path without prefix
  if (SUPPORTED_LANGS.includes(maybeLang)) {
    const url = request.nextUrl.clone();
    const rest = segments.slice(2).join('/');
    url.pathname = rest ? `/${rest}` : '/';

    const response = NextResponse.rewrite(url);
    response.cookies.set('lang', maybeLang, { path: '/' });
    return response;
  }

  // Otherwise, redirect to prefixed URL based on cookie or default
  const cookieLang = request.cookies.get('lang')?.value;
  const lang = SUPPORTED_LANGS.includes(cookieLang || '') ? cookieLang! : 'en';

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = pathname === '/' ? `/${lang}` : `/${lang}${pathname}`;
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ['/((?!_next|api|.*\..*).*)'],
};
