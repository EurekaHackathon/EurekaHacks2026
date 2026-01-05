import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ username });

    if (user && user.password === password) {
      return NextResponse.json({
        success: true,
        message: 'Login successful',
        user: {
          username: user.username,
          email: user.email,
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
