import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Experience from '@/models/Experience';

export async function GET(request, { params }) {
  await connectToDatabase();
  try {
    const item = await Experience.findById(params.id);
    if (!item) return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await connectToDatabase();
  try {
    const body = await request.json();
    const item = await Experience.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!item) return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  await connectToDatabase();
  try {
    const item = await Experience.findByIdAndDelete(params.id);
    if (!item) return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
