import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Education from '@/models/Education';

export async function GET() {
  await connectToDatabase();
  try {
    const items = await Education.find({}).sort({ createdAt: -1 });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await connectToDatabase();
  try {
    const body = await request.json();
    const item = await Education.create(body);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
