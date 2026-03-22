import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get('email');
    if (!email) {
      return NextResponse.json({ success: false, message: 'Email required' }, { status: 400 });
    }

    const { getDatabase } = await import('@/lib/mongodb');
    const db = await getDatabase();
    const users = db.collection('users');
    const teams = db.collection('teams');
    const invites = db.collection('invites');

    const user = await users.findOne({ email });

    const members: { firstName: string; lastName: string; email: string; pfpIndex: number }[] = [];
    if (user?.teamId) {
      const team = await teams.findOne({ _id: user.teamId });
      if (team) {
        const otherEmails: string[] = team.members.filter((m: string) => m !== email);
        if (otherEmails.length > 0) {
          const memberDocs = await users.find({ email: { $in: otherEmails } }).toArray();
          for (const m of memberDocs) {
            members.push({
              firstName: m.firstName,
              lastName: m.lastName,
              email: m.email,
              pfpIndex: m.pfpIndex ?? 0,
            });
          }
        }
      }
    }

    const pendingDocs = await invites.find({ from: email }).toArray();
    const pending: { firstName: string; lastName: string; email: string }[] = [];
    for (const inv of pendingDocs) {
      const invitee = await users.findOne({ email: inv.to });
      if (invitee) {
        pending.push({
          firstName: invitee.firstName,
          lastName: invitee.lastName,
          email: invitee.email,
        });
      }
    }

    return NextResponse.json({ success: true, members, pending });
  } catch (err) {
    console.error('GET /api/team error:', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
