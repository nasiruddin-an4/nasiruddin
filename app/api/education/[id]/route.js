import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Education from '@/models/Education';

export async function GET(request, { params }) {
  await connectToDatabase();
  try {
    const item = await Education.findById(params.id);
    if (!item) return NextResponse.json({ error: 'Education not found' }, { status: 404 });
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await connectToDatabase();
  try {
    const body = await request.json();
    const item = await Education.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!item) return NextResponse.json({ error: 'Education not found' }, { status: 404 });
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  await connectToDatabase();
  try {
    const item = await Education.findByIdAndDelete(params.id);
    if (!item) return NextResponse.json({ error: 'Education not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
