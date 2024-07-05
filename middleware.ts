import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { locales, defaultLocale, Lang, cookieName } from '@/i18n/config';
const isMobile = (ua: string) => {
  return Boolean(ua.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
};

function getLocale(request: NextRequest): Lang {
  if (request.cookies.has(cookieName)) {
    return request.cookies.get(cookieName)!.value as Lang;
  }

  const headers = {
    'accept-language': request.headers.get('accept-language') || ''
  };
  // 这里不能直接传入 request，有更简单的写法欢迎评论留言
  const languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale) as Lang;
  // return defaultLocale;
}

export function middleware(request: NextRequest) {
  let pathname = request.nextUrl.pathname;
  let userSelectLocale = locales.find((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
  let pathnameHasLocale = false;
  let supportI18n = true;
  let locale = userSelectLocale;
  let isRedirect = false;
  // 如果是 public 文件，不重定向
  if (/\.(.*)$/.test(pathname) && !/\.(.*)$/.exec(pathname)?.[1]?.includes('/')) return;
  if (!/^(https?:\/\/)?(www\.)/.test(request.nextUrl.href) && request.nextUrl.hostname !== 'localhost') {
    request.nextUrl.hostname = `www.${request.nextUrl.hostname}`;
    isRedirect = true;
  }
  // 'https://www.dev.hackquest.io/'.replace(/^(https?:\/\/)([^/]+)/, "$1www.$2");
  // /^(https?:\/\/)?(www\.)/.test('https://dev.hackquest.io/');
  if (userSelectLocale) {
    // 如果url带语言，先把语言替换为空字符串，方便后面mobile判断
    pathname = pathname.replace(`/${userSelectLocale}`, '');
    if (!supportI18n) locale = defaultLocale;
    pathnameHasLocale = true;
  } else {
    if (!supportI18n) locale = defaultLocale;
    else locale = getLocale(request) || defaultLocale;
    request.nextUrl.pathname = `/${locale}${pathname}`;
  }

  const userAgent = request.headers.get('user-agent');

  if (!userAgent) {
    if (pathnameHasLocale) {
      if (isRedirect) return NextResponse.redirect(request.nextUrl);
      else NextResponse.next();
    } else return NextResponse.redirect(request.nextUrl);
  }

  // 移动设备访问，但是url不带/mobile，重定向到/mobile
  if (isMobile(userAgent!) && !pathname.startsWith('/mobile')) {
    // 前面加语言
    const url = `/${locale}/mobile${pathname}`;
    request.nextUrl.pathname = url;
    return NextResponse.redirect(request.nextUrl);
  }

  // 非移动设备访问，但是url带/mobile，重定向到/
  if (!isMobile(userAgent!) && pathname.startsWith('/mobile')) {
    const newPathname = pathname.replace(/^\/mobile/, '');
    const url = `/${locale}/${newPathname}`;
    request.nextUrl.pathname = url;
    return NextResponse.redirect(request.nextUrl);
  }

  // 带了语言的url 直接返回
  if (pathnameHasLocale && userSelectLocale === locale) {
    if (isRedirect) return NextResponse.redirect(request.nextUrl);
    else NextResponse.next();
  }
  // 不带语言的url 重定向到带语言的url
  else return NextResponse.redirect(request.nextUrl);
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
    }
  ]
};
