import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
const isMobile = (ua: string) => {
  return Boolean(
    ua.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );
};

const MANTLE_HOST = 'mantle.hackquest.io';

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent');
  if (!userAgent) return NextResponse.next();

  let host = request.url;

  const isMantle = host && host.includes(MANTLE_HOST);
  // || host.includes('localhost:3000')
  const isLanding = ['/', '/mobile'].includes(request.nextUrl.pathname);

  if (isMantle && !isLanding) {
    host = host.replace(MANTLE_HOST, 'hackquest.io');
    // host = host.replace('localhost:3000', 'hackquest.io');
  }

  const pathname = request.nextUrl.pathname;

  if (isMobile(userAgent!) && !pathname.startsWith('/mobile')) {
    const url = `/mobile${pathname}${request.nextUrl.search}`;
    return NextResponse.redirect(new URL(url, host));
  }

  if (!isMobile(userAgent!) && pathname.startsWith('/mobile')) {
    const newPathname = pathname.replace(/^\/mobile/, '');
    const url = `${newPathname}${request.nextUrl.search}`;
    return NextResponse.redirect(new URL(url, host));
  }

  if (isMantle && !isLanding) {
    return NextResponse.redirect(new URL(request.nextUrl.pathname, host));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * 匹配所有的路径除了以这些作为开头的：
     * - /api (API routes)
     * - /_next/static (static files)
     * - /_next/image (image optimization files)
     * - /favicon.ico (favicon file)
     * - /_vercel
     * - /images
     */
    {
      source: '/((?!api|_next/static|_next/image|_vercel|images|favicon.ico).*)'
      // missing: [
      //   { type: 'header', key: 'next-router-prefetch' },
      //   { type: 'header', key: 'purpose', value: 'prefetch' }
      // ]
    }
  ]
};
