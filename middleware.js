import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (except /admin/login) and /api/admin routes
  const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin/login';
  const isApiAdminRoute = pathname.startsWith('/api/') && !pathname.startsWith('/api/auth');

  // We are protecting all /api/* routes except /api/auth.
  // Wait, if frontend fetches data via GET, it should be public.
  // We'll protect POST, PUT, DELETE requests to /api/ (except auth).
  const isApiWriteMethod = pathname.startsWith('/api/') && !pathname.startsWith('/api/auth') && ['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method);

  if (isAdminRoute || isApiWriteMethod) {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      if (isApiWriteMethod) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || process.env.ADMIN_PASSWORD);
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (error) {
      console.error('JWT verification failed:', error);
      if (isApiWriteMethod) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};
