import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const cookieValue = request.cookies.get('user')?.value;
  const currentUrl = new URL(request.url);

  if (cookieValue) {
    if (currentUrl.pathname === '/auth') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  } else if(cookieValue == undefined) {
    if (currentUrl.pathname !== '/auth/login') {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/', 
};