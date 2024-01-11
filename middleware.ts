import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
const isMobile = (ua: string) => {
  return Boolean(
    ua.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );
};

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent');
  if (!userAgent) return NextResponse.next();

  if (isMobile(userAgent!) && !request.nextUrl.pathname.startsWith('/mobile')) {
    const url = `/mobile${request.nextUrl.pathname}${request.nextUrl.search}`;
    return NextResponse.redirect(new URL(url, request.url));
  }

  if (!isMobile(userAgent!) && request.nextUrl.pathname.startsWith('/mobile')) {
    const newPathname = request.nextUrl.pathname.replace(/^\/mobile/, '');
    const url = `${newPathname}${request.nextUrl.search}`;
    return NextResponse.redirect(new URL(url, request.url));
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
      source:
        '/((?!api|_next/static|_next/image|_vercel|images|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' }
      ]
    }
  ]
};
