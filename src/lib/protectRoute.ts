import { NextResponse } from 'next/server';

export function protectRoute(req) {
  const token = req.cookies.get('token');
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}
