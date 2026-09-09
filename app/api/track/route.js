import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Visit from '@/models/Visit';
import { isValidVisitPayload, clampVisitField } from '@/lib/utils';

export async function POST(req) {
  try {
    const data = await req.json();

    if (!isValidVisitPayload(data)) {
      return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
    }

    await connectToDatabase();

    // Ignore visits to the admin area to prevent skewing stats with your own activity
    if (data.path.startsWith('/admin')) {
      return NextResponse.json({ success: true, ignored: true });
    }

    const newVisit = new Visit({
      path: clampVisitField(data.path),
      referrer: clampVisitField(data.referrer),
      userAgent: clampVisitField(data.userAgent),
      utm_source: clampVisitField(data.utm_source),
      utm_medium: clampVisitField(data.utm_medium),
      utm_campaign: clampVisitField(data.utm_campaign),
      utm_term: clampVisitField(data.utm_term),
      utm_content: clampVisitField(data.utm_content),
      sessionId: clampVisitField(data.sessionId),
    });

    await newVisit.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving visit:', error);
    return NextResponse.json({ success: false, error: 'Failed to track visit' }, { status: 500 });
  }
}
