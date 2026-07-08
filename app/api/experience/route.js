import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Experience from '@/models/Experience';

export async function GET() {
  await connectToDatabase();
  try {
    const items = await Experience.find({}).sort({ createdAt: -1 });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await connectToDatabase();
  try {
    const body = await request.json();
    const item = await Experience.create(body);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
