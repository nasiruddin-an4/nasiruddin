import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Visit from '@/models/Visit';

export async function POST(req) {
  try {
    const data = await req.json();
    
    await connectToDatabase();
    
    // Ignore visits to the admin area to prevent skewing stats with your own activity
    if (data.path && data.path.startsWith('/admin')) {
      return NextResponse.json({ success: true, ignored: true });
    }

    const newVisit = new Visit({
      path: data.path,
      referrer: data.referrer,
      userAgent: data.userAgent,
      utm_source: data.utm_source,
      utm_medium: data.utm_medium,
      utm_campaign: data.utm_campaign,
      utm_term: data.utm_term,
      utm_content: data.utm_content,
      sessionId: data.sessionId,
    });

    await newVisit.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving visit:', error);
    return NextResponse.json({ success: false, error: 'Failed to track visit' }, { status: 500 });
  }
}
