import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    name: 'Bishal Shrestha',
    age: '27',
  };

  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const res = await request.json();
  return Response.json({ res });
}
