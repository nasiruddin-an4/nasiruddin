import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import News from '@/models/News';

export async function GET() {
  await connectToDatabase();
  try {
    const news = await News.find({}).sort({ createdAt: -1 });
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await connectToDatabase();
  try {
    const body = await request.json();
    const news = await News.create(body);
    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
