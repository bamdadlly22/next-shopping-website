import { NextResponse } from "next/server";

export async function middleware(req, res) {
  if (req.cookies.get('token')) {
    if(req.nextUrl.pathname === "/auth/login") {
      return NextResponse.redirect('http://localhost:3000');
    }
  } else {
    if(req.nextUrl.pathname === "/profile") {
      return NextResponse.redirect('http://localhost:3000');
    }
  }
  return NextResponse.next();
}
