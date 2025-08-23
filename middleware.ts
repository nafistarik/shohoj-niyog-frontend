import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get auth token from request headers or cookies
  const authToken =
    request.cookies.get("access_token")?.value || request.headers.get("authorization")?.replace("Bearer ", "")

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/login", "/signup"]
  const isPublicRoute = publicRoutes.includes(pathname)

  // Auth routes that authenticated users shouldn't access
  const authRoutes = ["/login", "/signup"]
  const isAuthRoute = authRoutes.includes(pathname)

  // Protected routes
  const candidateRoutes = pathname.startsWith("/candidate")
  const interviewerRoutes = pathname.startsWith("/interviewer")
  const isProtectedRoute = candidateRoutes || interviewerRoutes

  // // If user is not authenticated and trying to access protected routes
  // if (!authToken && isProtectedRoute) {
  //   return NextResponse.redirect(new URL("/login", request.url))
  // }

  // // If user is authenticated and trying to access auth routes
  // if (authToken && isAuthRoute) {
  //   // In a real app, you'd decode the JWT to get the role
  //   // For now, redirect to a default dashboard
  //   return NextResponse.redirect(new URL("/candidate/dashboard", request.url))
  // }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
