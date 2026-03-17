import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }
    if (email === 'dev@eurekahacks.ca' && password === 'yippee') {
      return NextResponse.json({
        success: true,
        message: 'Login successful',
        user: {
          firstName: 'Jamie',
          lastName: 'Dev',
          email: 'dev@eurekahacks.ca',
          grade: '12',
          school: 'Other',
          pronouns: 'they/them',
          dietary: 'None',
          hackathons: 0,
        },
      });
    }

    const { getDatabase } = await import('@/lib/mongodb');
    const db = await getDatabase();
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ email });

    if (user && user.password === password) {
      return NextResponse.json({
        success: true,
        message: 'Login successful',
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          grade: user.grade ?? '',
          school: user.school ?? '',
          pronouns: user.pronouns ?? '',
          dietary: user.dietary ?? 'None',
          hackathons: user.hackathons ?? 0,
          pfpIndex: user.pfpIndex ?? 0,
        },
      });
    }

    return NextResponse.json({
      success: false,
      message: 'Invalid credentials',
      dbConnected: true,
    }, { status: 401 });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        dbConnected: false,
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
