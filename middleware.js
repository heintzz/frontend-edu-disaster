import { NextResponse } from 'next/server';

import enums from './enums/enum';

export async function middleware(request) {
  const response = NextResponse.next();

  const authenticationPaths = ['/login', '/register'];

  const token = request.cookies.get('access_token');
  const user = request.cookies.get('user_profile');

  let userProfile = null;

  if (request.nextUrl.pathname.startsWith('/dashboard') && token === undefined) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const getUserProfile = async () => {
    const res = await fetch(`${process.env.BASE_API_ENDPOINT}/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      credentials: 'include',
    });
    const json = await res.json();
    userProfile = json.data;
    response.cookies.set({
      name: 'user_profile',
      value: JSON.stringify(userProfile),
      maxAge: 60 * 60 * 24,
      path: '/',
    });
  };

  if (token) {
    if (user === undefined) {
      await getUserProfile();
    } else {
      userProfile = JSON.parse(user.value);
    }
  }

  if (request.nextUrl.pathname.startsWith('/dashboard') && !userProfile) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (
    request.nextUrl.pathname.startsWith('/dashboard') &&
    userProfile &&
    userProfile.role !== enums.ROLE.TEACHER
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (authenticationPaths.includes(request.nextUrl.pathname) && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (request.nextUrl.pathname === '/' && userProfile) {
    if (userProfile.role === enums.ROLE.TEACHER) {
      return NextResponse.redirect(new URL('/dashboard/kelas', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/', '/login', '/register', '/dashboard', '/dashboard/kelas'],
};
