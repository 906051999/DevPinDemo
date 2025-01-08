import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const nodeId = request.nextUrl.searchParams.get('nodeId')
  
  if (nodeId) {
    // 可以把 nodeId 添加到 headers 或者 cookies
    const response = NextResponse.next()
    response.cookies.set('nodeId', nodeId)
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/chat',
} 