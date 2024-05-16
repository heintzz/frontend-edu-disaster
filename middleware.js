import { NextResponse } from 'next/server';

import enums from './enums/enum';
import apiV1 from './lib/api';

export async function middleware(request) {
  const response = NextResponse.next();

  const token = request.cookies.get('access_token');
  const user = request.cookies.get('user_profile');

  let userProfile = null;

  console.log(user);

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
    apiV1.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
    if (user === undefined) {
      await getUserProfile();
    } else {
      userProfile = JSON.parse(user.value);
    }
  }

  if (
    request.nextUrl.pathname.startsWith('/guru/dashboard') &&
    userProfile &&
    userProfile.role === enums.ROLE.STUDENT
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (['/login', '/register'].includes(request.nextUrl.pathname) && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (request.nextUrl.pathname === '/' && userProfile) {
    if (userProfile.role === enums.ROLE.TEACHER) {
      return NextResponse.redirect(new URL('/guru/dashboard', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/', '/guru/dashboard', '/login', '/register', '/dashboard'],
};
