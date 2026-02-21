'use client';
//unfinished!!! still looks ugly
//but at least the basics r here

import { useState, useEffect } from 'react';
import {
  Bell, Calendar, CheckCircle, Edit, FileText, Send,
  Trophy, User, Users, AlertCircle, ChevronRight, LogOut,
} from 'lucide-react';
import Image from 'next/image';

const user = {
  displayName: 'Plato',
  fullTitle: 'Plato Philosopher',
  role: 'Philosopher',
  team: 'The Philosophers',
};

const quests = [
  { id: 1, name: 'Build a Landing Page', status: 'completed' },
  { id: 2, name: 'API Integration', status: 'in-progress' },
  { id: 3, name: 'Database Schema', status: 'not-started' },
];

const submissions = [
  { id: 1, name: 'Landing Page v1', quest: 'Build a Landing Page', time: '2:30 PM', status: 'submitted' },
  { id: 2, name: 'API Draft', quest: 'API Integration', time: '3:15 PM', status: 'pending' },
];

const team = [
  { name: 'Plato', avatar: '/logo/small.webp' },
  { name: 'Aristotle', avatar: '/logo/small.webp' },
  { name: 'Socrates', avatar: '/logo/small.webp' },
  { name: 'Euclid', avatar: '/logo/small.webp' },
  { name: 'Hypatia', avatar: '/logo/small.webp' },
];

const notifs = [
  { id: 1, text: 'Quest 2 deadline in 30 min', type: 'warning' },
  { id: 2, text: 'New announcement from organizers', type: 'info' },
  { id: 3, text: 'Quest 1 graded — 95 pts', type: 'success' },
];

const schedule = [
  { time: '9:00 AM', event: 'Opening Ceremony' },
  { time: '10:00 AM', event: 'Hacking Begins' },
  { time: '12:00 PM', event: 'Lunch' },
  { time: '3:00 PM', event: 'Workshop: APIs' },
  { time: '6:00 PM', event: 'Dinner' },
  { time: '9:00 PM', event: 'Submissions Due' },
];

const statusColors: Record<string, string> = {
  completed: 'bg-green-500/20 text-green-400 border-green-500/40',
  'in-progress': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
  'not-started': 'bg-gray-600/20 text-gray-400 border-gray-500/30',
};

const statusText: Record<string, string> = {
  completed: 'Done',
  'in-progress': 'In Progress',
  'not-started': 'Not Started',
};

function Clock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const h = now.getHours().toString().padStart(2, '0');
  const m = now.getMinutes().toString().padStart(2, '0');
  return (
    <span className="text-[5vw] font-[family-name:var(--font-righteous)] tabular-nums tracking-wider">
      {h}<span className="animate-pulse">:</span>{m}
    </span>
  );
}

function Box({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[0.8vw] border border-white/8 bg-white/[0.03] p-[1.2vw] ${className}`}>
      {children}
    </div>
  );
}

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      data.success ? onLogin() : setMsg(data.message || 'Login failed');
    } catch (err) {
      setMsg('Error: ' + (err instanceof Error ? err.message : 'Unknown'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8">
        <h1 className="text-3xl font-[family-name:var(--font-righteous)] text-center mb-6">Login</h1>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <input
            type="text" placeholder="Username" value={username}
            onChange={e => setUsername(e.target.value)} required
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-[var(--neon-yellow)]"
          />
          <input
            type="password" placeholder="Password" value={password}
            onChange={e => setPassword(e.target.value)} required
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-[var(--neon-yellow)]"
          />
          <button
            type="submit" disabled={loading}
            className="rounded-lg bg-[var(--neon-yellow)] text-black font-bold py-3 hover:brightness-110 disabled:opacity-50"
          >
            {loading ? 'Logging in…' : 'Login'}
          </button>
        </form>
        {msg && <p className="mt-4 text-center text-red-400 text-sm">{msg}</p>}
      </div>
    </div>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const completedCount = quests.filter(q => q.status === 'completed').length;

  return (
    <div className="h-[100vh] w-[100vw] bg-[var(--background)] text-white font-[family-name:var(--font-inter)] overflow-hidden">
      <div className="grid grid-cols-[45fr_55fr] gap-[1vw] p-[1.5vw] h-full">

        <div className="flex flex-col gap-[1vh] h-full overflow-hidden">

          <div className="flex items-center justify-between flex-[14] min-h-0 px-[0.5vw]">
            <div>
              <h1 className="text-[3vw] font-[family-name:var(--font-righteous)] leading-none text-[var(--neon-yellow)]">
                WELCOME
              </h1>
              <h1 className="text-[3vw] font-[family-name:var(--font-righteous)] leading-none">
                <span className="text-[var(--neon-yellow)]">{user.displayName.toUpperCase()}</span>!!
              </h1>
            </div>
            <div className="flex flex-col items-center gap-[0.5vh]">
              <button className="flex items-center gap-[0.3vw] rounded-full bg-red-500/25 border border-red-500/50 px-[1vw] py-[0.5vh] text-[0.8vw] font-bold text-red-300">
                <Bell size={14} /> NEW ALERT!
              </button>
              <Image src="/mascots/blue_robot.png" alt="" width={48} height={48}
                className="rounded-full h-[4vh] w-[4vh] object-cover" />
            </div>
          </div>

          <Box className="flex-[20] min-h-0 flex flex-col">
            <div className="flex items-center gap-[0.5vw] mb-[0.6vh]">
              <Trophy size={16} className="text-[var(--neon-yellow)]" />
              <span className="text-[0.9vw] font-[family-name:var(--font-righteous)]">Quest Tracker</span>
            </div>
            <ul className="flex flex-col gap-[0.5vh] overflow-y-auto flex-1">
              {quests.map(q => (
                <li key={q.id} className="flex items-center justify-between rounded-[0.5vw] bg-white/[0.03] px-[0.8vw] py-[0.7vh]">
                  <div className="flex items-center gap-[0.4vw]">
                    <FileText size={14} className="text-gray-500" />
                    <span className="text-[0.75vw] text-gray-200">{q.name}</span>
                  </div>
                  <span className={`text-[0.6vw] font-semibold px-[0.5vw] py-[0.25vh] rounded-full border ${statusColors[q.status]}`}>
                    {statusText[q.status]}
                  </span>
                </li>
              ))}
            </ul>
          </Box>

          <Box className="flex-[24] min-h-0 flex flex-col">
            <div className="flex items-center gap-[0.5vw] mb-[0.6vh]">
              <Send size={16} className="text-[var(--neon-yellow)]" />
              <span className="text-[0.9vw] font-[family-name:var(--font-righteous)]">Submission Tracker</span>
            </div>
            <ul className="flex flex-col gap-[0.5vh] overflow-y-auto flex-1">
              {submissions.map(s => (
                <li key={s.id} className="flex items-center justify-between rounded-[0.5vw] bg-white/[0.03] px-[0.8vw] py-[0.7vh]">
                  <div>
                    <p className="text-[0.75vw] text-gray-200">{s.name}</p>
                    <p className="text-[0.55vw] text-gray-500">{s.quest}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-[0.6vw] font-semibold px-[0.5vw] py-[0.25vh] rounded-full border ${
                      s.status === 'submitted' ? 'bg-green-500/20 text-green-400 border-green-500/40' : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
                    }`}>
                      {s.status === 'submitted' ? 'Submitted' : 'Pending'}
                    </span>
                    <p className="text-[0.55vw] text-gray-500 mt-[0.2vh] font-mono">{s.time}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-end mt-auto pt-[0.5vh]">
              <button className="flex items-center gap-[0.3vw] rounded-[0.5vw] bg-[var(--neon-yellow)] text-black font-bold px-[1vw] py-[0.5vh] text-[0.7vw]">
                <Send size={12} /> Submit
              </button>
            </div>
          </Box>

          <Box className="flex-[28] min-h-0 flex flex-col">
            <div className="flex items-center justify-between flex-1">
              <Clock />
              <button
                onClick={() => setScheduleOpen(v => !v)}
                className="flex items-center gap-[0.3vw] text-[0.85vw] text-[var(--neon-yellow)] font-semibold"
              >
                <Calendar size={16} />
                {scheduleOpen ? 'Hide Schedule' : 'See Schedule'}
                <ChevronRight size={14} className={`transition-transform duration-200 ${scheduleOpen ? 'rotate-90' : ''}`} />
              </button>
            </div>
            {scheduleOpen && (
              <ul className="flex flex-col gap-[0.3vh] border-t border-white/5 pt-[0.6vh] mt-[0.6vh]">
                {schedule.map((s, i) => (
                  <li key={i} className="flex gap-[0.5vw] text-[0.65vw]">
                    <span className="w-[4vw] text-gray-500 font-mono shrink-0">{s.time}</span>
                    <span className="text-gray-300">{s.event}</span>
                  </li>
                ))}
              </ul>
            )}
          </Box>
        </div>

        <div className="flex flex-col gap-[1vh] h-full overflow-hidden">

          <Box className="flex-[30] min-h-0">
            <div className="flex justify-between items-center mb-[0.3vh]">
              <div className="flex items-center gap-[0.4vw]">
                <User size={16} className="text-[var(--neon-yellow)]" />
                <span className="text-[0.85vw] font-[family-name:var(--font-righteous)]">Profile: {user.fullTitle}</span>
              </div>
              <button onClick={onLogout} className="flex items-center gap-[0.3vw] text-[0.6vw] text-gray-500 hover:text-white">
                <LogOut size={11} /> Logout
              </button>
            </div>
            <div className="flex items-center gap-[1.5vw] mt-[1vh]">
              <div className="h-[10vw] w-[10vw] shrink-0 rounded-full bg-white/5 border-[0.15vw] border-[var(--neon-yellow)] overflow-hidden flex items-center justify-center">
                <Image src="/mascots/blue_robot.png" alt="" width={96} height={96} className="object-cover" />
              </div>
              <div className="flex-1 space-y-[0.6vh] text-[0.7vw]">
                {[
                  ['Name', user.displayName],
                  ['Role', user.role],
                  ['Team', user.team],
                  ['Quests Done', `${completedCount}/${quests.length}`],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-gray-500">{label}</span>
                    <span className="text-gray-200">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </Box>

          <Box className="flex-[52] min-h-0 flex flex-col">
            <div className="flex items-center gap-[0.4vw] mb-[0.3vh]">
              <Users size={16} className="text-[var(--neon-yellow)]" />
              <span className="text-[0.85vw] font-[family-name:var(--font-righteous)]">Team</span>
            </div>
            <p className="text-[1.1vw] font-[family-name:var(--font-righteous)] text-[var(--neon-yellow)] mb-[1vh]">
              {user.team}
            </p>
            <div className="flex gap-[0.7vw] flex-1 items-start overflow-x-auto">
              {team.map((m, i) => (
                <div key={i} className="flex flex-col items-center gap-[0.4vh] rounded-[0.5vw] border border-white/8 bg-white/[0.02] p-[0.6vw] w-[7vw] shrink-0">
                  <div className="h-[4.5vw] w-[4.5vw] rounded-full bg-white/5 overflow-hidden border border-white/10 flex items-center justify-center">
                    <Image src={m.avatar} alt={m.name} width={48} height={48} className="object-cover" />
                  </div>
                  <span className="text-[0.6vw] text-gray-300 text-center">{m.name}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-[0.8vh] shrink-0">
              <button className="flex items-center gap-[0.25vw] rounded-[0.4vw] border border-white/8 bg-white/[0.03] px-[0.8vw] py-[0.4vh] text-[0.6vw] text-gray-400 hover:text-white">
                <Edit size={11} /> Edit
              </button>
            </div>
          </Box>

          <Box className="flex-[14] min-h-0">
            <div className="flex items-center gap-[0.4vw] mb-[0.4vh]">
              <Bell size={16} className="text-[var(--neon-yellow)]" />
              <span className="text-[0.85vw] font-[family-name:var(--font-righteous)]">Notif Bar</span>
            </div>
            <div className="flex gap-[0.6vw] overflow-x-auto">
              {notifs.map(n => (
                <div key={n.id} className="flex items-center gap-[0.3vw] text-[0.6vw] rounded-[0.35vw] bg-white/[0.03] border border-white/8 px-[0.6vw] py-[0.4vh] shrink-0">
                  {n.type === 'warning' && <AlertCircle size={13} className="text-yellow-400 shrink-0" />}
                  {n.type === 'info' && <Bell size={13} className="text-blue-400 shrink-0" />}
                  {n.type === 'success' && <CheckCircle size={13} className="text-green-400 shrink-0" />}
                  <span className="text-gray-300">{n.text}</span>
                </div>
              ))}
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  if (!loggedIn) return <LoginForm onLogin={() => setLoggedIn(true)} />;
  return <Dashboard onLogout={() => setLoggedIn(false)} />;
}
