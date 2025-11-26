import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, WaitlistEmail } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Get database connection
    const db = await getDatabase();
    const collection = db.collection<WaitlistEmail>('waitlist');

    // Check if email already exists
    const existingEmail = await collection.findOne({
      email: email.toLowerCase().trim()
    });

    if (existingEmail) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    // Get client IP and user agent for tracking
    const ipAddress = request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Insert new email
    const waitlistEntry: WaitlistEmail = {
      email: email.toLowerCase().trim(),
      createdAt: new Date(),
      ipAddress,
      userAgent,
      source
    };

    const result = await collection.insertOne(waitlistEntry);

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully added to waitlist',
        id: result.insertedId
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error adding email to waitlist:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const db = await getDatabase();
    const collection = db.collection<WaitlistEmail>('waitlist');

    const count = await collection.countDocuments();

    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error getting waitlist count:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
