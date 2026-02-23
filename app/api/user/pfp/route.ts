import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest) {
  try {
    const { email, pfpIndex } = await req.json();
    if (!email || pfpIndex === undefined) {
      return NextResponse.json({ success: false, message: 'email and pfpIndex required' }, { status: 400 });
    }

    const { getDatabase } = await import('@/lib/mongodb');
    const db = await getDatabase();
    await db.collection('users').updateOne({ email }, { $set: { pfpIndex } });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('PATCH /api/user/pfp error:', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
