import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, password, grade, school, dietary, pronouns, hackathons } = await req.json();

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'First name, last name, email, and password are required' },
        { status: 400 }
      );
    }

    const { getDatabase } = await import('@/lib/mongodb');
    const db = await getDatabase();
    const usersCollection = db.collection('users');

    // Check if email already exists
    const existing = await usersCollection.findOne({ email });

    if (existing) {
      return NextResponse.json(
        { success: false, message: 'An account with that email already exists' },
        { status: 409 }
      );
    }

    // TODO: hash the password before storing (e.g. with bcrypt)
    const result = await usersCollection.insertOne({
      username: `${firstName} ${lastName}`,
      firstName,
      lastName,
      email,
      password, // replace with hashed password in production
      grade: grade || null,
      school: school || null,
      dietary: dietary || 'None',
      pronouns: pronouns || 'Not specified',
      hackathons: hackathons ?? 0,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      userId: result.insertedId,
    });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
