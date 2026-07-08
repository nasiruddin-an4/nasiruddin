import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import News from '@/models/News';

export async function GET(request, { params }) {
  await connectToDatabase();
  try {
    const news = await News.findById(params.id);
    if (!news) return NextResponse.json({ error: 'News not found' }, { status: 404 });
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await connectToDatabase();
  try {
    const body = await request.json();
    const news = await News.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!news) return NextResponse.json({ error: 'News not found' }, { status: 404 });
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  await connectToDatabase();
  try {
    const news = await News.findByIdAndDelete(params.id);
    if (!news) return NextResponse.json({ error: 'News not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
