import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

const MAX_TEAM_OTHERS = 3;

export async function POST(req: NextRequest) {
  try {
    const { userEmail, inviteeEmail } = await req.json();

    if (!userEmail || !inviteeEmail) {
      return NextResponse.json({ success: false, message: 'Both emails required' }, { status: 400 });
    }
    if (userEmail.trim().toLowerCase() === inviteeEmail.trim().toLowerCase()) {
      return NextResponse.json({ success: false, message: 'You cannot invite yourself' }, { status: 400 });
    }

    const { getDatabase } = await import('@/lib/mongodb');
    const db = await getDatabase();
    const users = db.collection('users');
    const teams = db.collection('teams');
    const invites = db.collection('invites');

    const inviter = await users.findOne({ email: userEmail });
    const invitee = await users.findOne({ email: inviteeEmail });

    if (!inviter) {
      return NextResponse.json({ success: false, message: 'Your account was not found' }, { status: 404 });
    }
    if (!invitee) {
      return NextResponse.json({ success: false, message: 'No registered user found with that email' }, { status: 404 });
    }

    const mutualInvite = await invites.findOne({ from: inviteeEmail, to: userEmail });
    if (mutualInvite) {
      const targetTeamId = mutualInvite.teamId as ObjectId;
      const team = await teams.findOne({ _id: targetTeamId });

      if (team && team.members.length > MAX_TEAM_OTHERS) {
        return NextResponse.json({ success: false, message: 'That team is already full' }, { status: 400 });
      }

      await teams.updateOne({ _id: targetTeamId }, { $addToSet: { members: userEmail } });
      await users.updateOne({ email: userEmail }, { $set: { teamId: targetTeamId } });
      await invites.deleteOne({ _id: mutualInvite._id });

      return NextResponse.json({
        success: true,
        message: `You've joined ${invitee.firstName}'s team!`,
      });
    }

    if (
      inviter.teamId &&
      invitee.teamId &&
      inviter.teamId.toString() === invitee.teamId.toString()
    ) {
      return NextResponse.json({ success: false, message: 'That person is already on your team' }, { status: 400 });
    }

    if (invitee.teamId) {
      return NextResponse.json({ success: false, message: 'That person is already on another team' }, { status: 400 });
    }

    const duplicate = await invites.findOne({ from: userEmail, to: inviteeEmail });
    if (duplicate) {
      return NextResponse.json({ success: false, message: 'You already have a pending invite to that person' }, { status: 400 });
    }

    let teamId: ObjectId;
    if (inviter.teamId) {
      teamId = inviter.teamId as ObjectId;
    } else {
      const result = await teams.insertOne({ members: [userEmail], createdAt: new Date() });
      teamId = result.insertedId;
      await users.updateOne({ email: userEmail }, { $set: { teamId } });
    }

    const team = await teams.findOne({ _id: teamId });
    const confirmedOthers: number = team ? team.members.length - 1 : 0;
    const pendingCount = await invites.countDocuments({ from: userEmail });
    if (confirmedOthers + pendingCount >= MAX_TEAM_OTHERS) {
      return NextResponse.json({ success: false, message: 'Your team is full (max 3 others)' }, { status: 400 });
    }

    await invites.insertOne({ from: userEmail, to: inviteeEmail, teamId, createdAt: new Date() });

    return NextResponse.json({
      success: true,
      message: `Invite sent to ${invitee.firstName}! They need to invite you back to confirm.`,
    });
  } catch (err) {
    console.error('POST /api/team/invite error:', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
