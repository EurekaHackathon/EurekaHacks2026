'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  grade: string;
  school: string;
  pronouns: string;
  dietary: string;
  hackathons: number;
  pfpIndex?: number;
}

const CANADIAN_SCHOOLS = [
  'Abbey Park High School', 'Académie De La Salle', 'Académie Sainte-Cécile',
  'Albert Campbell Collegiate Institute', 'Applewood Heights Secondary School',
  'Archbishop MacDonald High School', 'Ardrossan Junior Senior High School',
  'Bayview Secondary School', 'Bear Creek Secondary School',
  'Birchmount Park Collegiate Institute', 'Bishop McNally High School',
  'Blessed Trinity Catholic Secondary School', 'Bluevale Collegiate Institute',
  'Brampton Centennial Secondary School', 'Brebeuf College School',
  'Britannia Secondary School', 'Cameron Heights Collegiate Institute',
  'Campbell Collegiate', 'Carleton Place High School', 'Centennial Secondary School',
  'Charlottetown Rural High School', 'Churchill High School',
  'Colonel By Secondary School', 'Colonel Gray High School',
  'Corpus Christi Catholic Secondary School', 'David Thompson Secondary School',
  'Dr. Frank J. Hayden Secondary School', 'Dr. Norman Bethune Collegiate Institute',
  'Dunbarton High School', 'Earl Haig Secondary School', 'Eden High School',
  'École secondaire catholique Père-René-de-Galinée', 'École secondaire publique De La Salle',
  'École secondaire Étienne-Brûlé', 'Elmwood School', 'Emily Carr Secondary School',
  'Eric Hamber Secondary School', 'Etobicoke Collegiate Institute',
  'Fleetwood Park Secondary School', 'Forest Heights Collegiate Institute',
  'Frank Hurt Secondary School', 'Fredericton High School', 'Glebe Collegiate Institute',
  'Glenforest Secondary School', 'Gloucester High School',
  'Governor Simcoe Secondary School', 'Grand River Collegiate Institute',
  'Grimsby Secondary School', 'Guelph Collegiate Vocational Institute',
  'Harry Ainlay High School', 'Heart Lake Secondary School',
  'Henry Wise Wood High School', 'Heritage Woods Secondary School',
  'Hillcrest High School', 'Holy Trinity Catholic High School', 'Huntsville High School',
  'Île-Perrot Secondary School', 'John Fraser Secondary School',
  'John McGregor Secondary School', 'Kelowna Secondary School',
  'Kitchener Collegiate Institute', 'Lakeshore Catholic Secondary School',
  'Laura Secord Secondary School', 'Laval Senior Academy', 'Leaside High School',
  'Lisgar Collegiate Institute', 'Loretto Abbey Catholic Secondary School',
  'Loyola Catholic Secondary School', 'Markham District High School',
  'Mary Ward Catholic Secondary School', 'Meadowvale Secondary School',
  'Merivale High School', 'Milliken Mills High School', 'Milton District High School',
  "Miss Edgar's and Miss Cramp's School", 'Mother Teresa Catholic Secondary School',
  'Mount Royal Collegiate', 'Nelson High School', 'New Westminster Secondary School',
  'Newmarket High School', 'Niagara Falls Collegiate Vocational Institute',
  'North Toronto Collegiate Institute', 'Northview Heights Secondary School',
  'Notre Dame Secondary School', 'Oakridge Secondary School',
  'Oakville Trafalgar High School', 'Orangeville District Secondary School',
  'Port Credit Secondary School', 'Prince Andrew High School',
  'Prince of Wales Collegiate', 'Rideau High School', 'Ridgewood High School',
  'Rockland District High School', 'Ross Sheppard High School',
  "Royal St. George's College", 'Samuel-Genest Catholic Middle School',
  'Sarnia Collegiate Institute and Technical School', 'Seaquam Secondary School',
  'Sir John A. Macdonald Collegiate Institute', 'Sir Wilfrid Laurier Secondary School',
  'South Carleton High School', 'Southwood Secondary School',
  'Springbank Community High School', 'Smithville District Christian High School',
  'St. Brother André Catholic High School', 'St. Elizabeth Catholic High School',
  'St. Francis Xavier Secondary School', "St. George's School",
  'St. James Catholic Global Learning Centre', 'St. Joan of Arc Catholic High School',
  'St. Joseph-Scollard Hall Catholic Secondary School', 'St. Marcellinus Secondary School',
  "St. Mary's High School", "St. Michael's College School", "St. Peter's Secondary School",
  'St. Robert Catholic High School', 'Strathcona High School', 'Sudbury Secondary School',
  'Terry Fox Secondary School', 'The Woodlands Secondary School',
  'Thornhill Secondary School', 'Thornlea Secondary School',
  'Tom Thomson Secondary School', 'Toronto District Christian High School',
  'Turner Fenton Secondary School', 'University of Toronto Schools',
  'Upper Canada College', 'Vankleek Hill Collegiate Institute',
  'Victoria Park Collegiate Institute', 'Vincent Massey Secondary School',
  'WA Porter Collegiate Institute', 'Walter Murray Collegiate',
  'Waterloo Collegiate Institute', 'Westdale Secondary School',
  'Western Canada High School', 'Westgate Mennonite Collegiate',
  'Westminster Secondary School', 'Westmount Charter School',
  'White Oaks Secondary School', 'William Lyon Mackenzie Collegiate Institute',
  'Woodroffe High School', 'Woburn Collegiate Institute',
  'York Mills Collegiate Institute', 'Other',
];

const inputCls = 'rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-[var(--neon-yellow)]';
const selectCls = 'w-full rounded-lg border border-white/10 bg-[#111] px-4 py-3 text-white outline-none focus:border-[var(--neon-yellow)] cursor-pointer';

function LoginForm({ onLogin }: { onLogin: (user: UserProfile) => void }) {
  const [tab, setTab] = useState<'login' | 'apply'>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [grade, setGrade] = useState('');
  const [school, setSchool] = useState('');
  const [dietaryTags, setDietaryTags] = useState<string[]>([]);
  const [dietarySel, setDietarySel] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [pronounsCustom, setPronounsCustom] = useState('');
  const [hackathons, setHackathons] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg('');
    if (tab === 'apply') {
      if (password !== confirm) { setMsg('Passwords do not match'); return; }
      setLoading(true);
      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName, lastName, email, password,
            grade, school,
            dietary: dietaryTags.length ? dietaryTags.join(', ') : 'None',
            pronouns: pronouns === 'Other' ? (pronounsCustom || 'Other') : pronouns,
            hackathons: Number(hackathons),
          }),
        });
        const data = await res.json();
        if (data.success) {
          setMsg('Application submitted! You can now log in.');
          switchTab('login');
        } else {
          setMsg(data.message || 'Registration failed');
        }
      } catch (err) {
        setMsg('Error: ' + (err instanceof Error ? err.message : 'Unknown'));
      } finally {
        setLoading(false);
      }
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      data.success ? onLogin(data.user) : setMsg(data.message || 'Login failed');
    } catch (err) {
      setMsg('Error: ' + (err instanceof Error ? err.message : 'Unknown'));
    } finally {
      setLoading(false);
    }
  }

  function switchTab(t: 'login' | 'apply') {
    setTab(t);
    setMsg('');
    setLoginEmail(''); setLoginPassword('');
    setFirstName(''); setLastName(''); setEmail('');
    setPassword(''); setConfirm('');
    setGrade(''); setSchool(''); setDietaryTags([]); setDietarySel(''); setPronouns(''); setPronounsCustom(''); setHackathons('');
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/5 p-8">
        <div className="flex rounded-lg overflow-hidden border border-white/10 mb-6">
          <button onClick={() => switchTab('login')}
            className={`flex-1 py-2 text-sm font-bold font-[family-name:var(--font-righteous)] transition-colors ${
              tab === 'login' ? 'bg-[var(--neon-yellow)] text-black' : 'bg-transparent text-gray-400 hover:text-white'
            }`}>Login</button>
          <button onClick={() => switchTab('apply')}
            className={`flex-1 py-2 text-sm font-bold font-[family-name:var(--font-righteous)] transition-colors ${
              tab === 'apply' ? 'bg-[var(--neon-yellow)] text-black' : 'bg-transparent text-gray-400 hover:text-white'
            }`}>Apply</button>
        </div>
        <form onSubmit={submit} className="flex flex-col gap-4">
          {tab === 'login' ? (
            <>
              <input type="email" placeholder="Email" value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)} required className={inputCls} />
              <input type="password" placeholder="Password" value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)} required className={inputCls} />
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" value={firstName}
                  onChange={e => setFirstName(e.target.value)} required className={inputCls} />
                <input type="text" placeholder="Last Name" value={lastName}
                  onChange={e => setLastName(e.target.value)} required className={inputCls} />
              </div>
              <input type="email" placeholder="Email" value={email}
                onChange={e => setEmail(e.target.value)} required className={inputCls} />
              <input type="password" placeholder="Password" value={password}
                onChange={e => setPassword(e.target.value)} required className={inputCls} />
              <input type="password" placeholder="Confirm Password" value={confirm}
                onChange={e => setConfirm(e.target.value)} required className={inputCls} />
              <div className="grid grid-cols-2 gap-4">
                <select value={grade} onChange={e => setGrade(e.target.value)} required className={selectCls}>
                  <option value="" disabled>Grade</option>
                  {[9,10,11,12].map(g => <option key={g} value={String(g)}>Grade {g}</option>)}
                </select>
                <div className="flex flex-col gap-2">
                  <select value={pronouns} onChange={e => setPronouns(e.target.value)} className={selectCls}>
                    <option value="" disabled>Pronouns</option>
                    {['he/him','she/her','they/them','Prefer not to say','Other'].map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  {pronouns === 'Other' && (
                    <input type="text" placeholder="Your pronouns" value={pronounsCustom}
                      onChange={e => setPronounsCustom(e.target.value)} className={inputCls} />
                  )}
                </div>
              </div>
              <select value={school} onChange={e => setSchool(e.target.value)} required className={selectCls}>
                <option value="" disabled>School</option>
                {CANADIAN_SCHOOLS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <div className="flex flex-col gap-2">
                <select
                  value={dietarySel}
                  onChange={e => {
                    const val = e.target.value;
                    if (val && !dietaryTags.includes(val)) setDietaryTags(t => [...t, val]);
                    setDietarySel('');
                  }}
                  className={selectCls}
                >
                  <option value="" disabled>Add Dietary Restriction</option>
                  {['None','Vegetarian','Vegan','Gluten-free','Halal','Kosher','Nut-free','Dairy-free','Egg-free','Soy-free','Other'].map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                {dietaryTags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {dietaryTags.map(tag => (
                      <span key={tag} className="flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-[var(--neon-yellow)]/10 border border-[var(--neon-yellow)]/30 text-[var(--neon-yellow)]">
                        {tag}
                        <button type="button" onClick={() => setDietaryTags(t => t.filter(x => x !== tag))}
                          className="ml-1 hover:text-white transition-colors leading-none">&times;</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <input type="number" placeholder="# of Hackathons Attended" value={hackathons} min={0}
                onChange={e => setHackathons(e.target.value)} required className={inputCls} />
            </>
          )}
          <button type="submit" disabled={loading}
            className="rounded-lg bg-[var(--neon-yellow)] text-black font-bold py-3 hover:brightness-110 disabled:opacity-50">
            {loading ? 'Please wait…' : tab === 'login' ? 'Login' : 'Submit Application'}
          </button>
        </form>
        {msg && (
          <p className={`mt-4 text-center text-sm ${msg.startsWith('Application') ? 'text-green-400' : 'text-red-400'}`}>{msg}</p>
        )}
      </div>
    </div>
  );
}

function ProfileCard({ onLogout, user }: { onLogout: () => void; user: UserProfile }) {
  const DEVART_PICS = [
    '/logo/devartpfp.png',
    '/logo/devartpfp2.png',
    '/logo/devartpfp3.png',
    '/logo/devartpfp4.png',
    '/logo/devartpfp5.png',
  ];
  const [profilePic, setProfilePic] = useState(DEVART_PICS[user.pfpIndex ?? 0]);
  const [pickerOpen, setPickerOpen] = useState(false);

  async function savePfp(index: number) {
    setProfilePic(DEVART_PICS[index]);
    setPickerOpen(false);
    try {
      await fetch('/api/user/pfp', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, pfpIndex: index }),
      });
    } catch {}
  }

  const fields: [string, string][] = [
    ['Email', user.email],
    ['Grade', user.grade ? `Grade ${user.grade}` : '—'],
    ['School', user.school || '—'],
    ['Pronouns', user.pronouns || '—'],
    ['Hackathons', String(user.hackathons ?? 0)],
  ];

  return (
    <div className="flex flex-col rounded-[0.6vw] border border-white/10 bg-white/[0.03] p-[1vw]">
      <div className="flex items-center justify-between mb-[1vh]">
        <h2 className="text-[1.5vw] font-[family-name:var(--font-righteous)]">
          {user.firstName.toUpperCase()} {user.lastName.toUpperCase()}
        </h2>
        <button
          onClick={onLogout}
          className="text-[0.9vw] px-[1.2vw] py-[0.6vh] rounded-[0.3vw] bg-red-500/20 border border-red-500/40 text-red-300"
        >
          Logout
        </button>
      </div>
      <div className="flex gap-[1.5vw]">
        <div className="flex-shrink-0 flex flex-col items-center gap-[0.5vw]">
          <div
            className="w-[9vw] h-[9vw] relative cursor-pointer"
            onClick={() => setPickerOpen(o => !o)}
            title="Click to choose profile picture"
          >
            <Image
              src={profilePic}
              alt="Profile"
              fill
              className="object-cover"
              style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
            />
          </div>
          {pickerOpen && (
            <div className="flex gap-[0.4vw] flex-wrap justify-center">
              {DEVART_PICS.map((src, i) => (
                <button
                  key={i}
                  onClick={() => savePfp(i)}
                  className={`w-[2.5vw] h-[2.5vw] relative rounded-full overflow-hidden border-2 transition-all ${
                    profilePic === src ? 'border-[var(--neon-yellow)]' : 'border-white/20 hover:border-white/60'
                  }`}
                >
                  <Image src={src} alt={`Option ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex-1 grid grid-cols-2 gap-[0.5vw]">
          {fields.map(([key, val]) => (
            <div key={key} className="rounded-[0.4vw] border border-white/10 bg-white/[0.02] px-[0.8vw] py-[0.6vh]">
              <p className="text-[0.7vw] text-gray-500 uppercase tracking-wide">{key}</p>
              <p className="text-[0.9vw] text-gray-200 font-medium truncate" title={val}>{val}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState('--:--:--');

  useEffect(() => {
    function calc() {
      const now = new Date();
      const target = new Date();
      target.setHours(21, 0, 0, 0);
      if (now >= target) target.setDate(target.getDate() + 1);
      const diff = target.getTime() - now.getTime();
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(
        String(h).padStart(2, '0') + ':' +
        String(m).padStart(2, '0') + ':' +
        String(s).padStart(2, '0')
      );
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  return <>{timeLeft}</>;
}

interface TeamMember {
  firstName: string;
  lastName: string;
  email: string;
  pfpIndex?: number;
}

function Dashboard({ onLogout, user }: { onLogout: () => void; user: UserProfile }) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [pendingMembers, setPendingMembers] = useState<{ firstName: string; lastName: string; email: string }[]>([]);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteMsg, setInviteMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [inviting, setInviting] = useState(false);

  useEffect(() => {
    fetchTeam();
  }, [user.email]);

  async function fetchTeam() {
    try {
      const res = await fetch(`/api/team?email=${encodeURIComponent(user.email)}`);
      const data = await res.json();
      if (data.success) {
        setTeamMembers(data.members);
        setPendingMembers(data.pending ?? []);
      }
    } catch {}
  }

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    setInviting(true);
    setInviteMsg(null);
    try {
      const res = await fetch('/api/team/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail: user.email, inviteeEmail: inviteEmail.trim() }),
      });
      const data = await res.json();
      setInviteMsg({ text: data.message, ok: data.success });
      if (data.success) {
        setInviteEmail('');
        await fetchTeam();
      }
    } catch {
      setInviteMsg({ text: 'Network error', ok: false });
    } finally {
      setInviting(false);
    }
  }

  function welcomeFontSize(name: string) {
    const len = name.length;
    if (len <= 5) return '9vw';
    if (len <= 8) return '7vw';
    if (len <= 11) return '5.5vw';
    if (len <= 15) return '4vw';
    return '3vw';
  }
  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden bg-[var(--background)] text-white p-[1vw] gap-[1vw] flex">
      <div className="flex flex-col gap-[1vh] w-[45vw] h-full">
        <div className="h-[35vh] flex flex-col items-start justify-start gap-[0.3vh] rounded-[0.6vw] pt-[1vh]">
          <div className="flex items-center gap-[0.2vw]">
            <div className="relative w-[10vw] h-[12vh] flex-shrink-0">
              <Image
                src="/logo/bigComic.webp"
                alt="Eureka Logo"
                fill
                className="object-contain object-left"
              />
            </div>
            <span className="text-[5vw] font-[family-name:var(--font-righteous)] text-[var(--neon-yellow)] leading-none">
              WELCOME
            </span>
          </div>
          <h1
            className="font-[family-name:var(--font-righteous)] text-[var(--neon-yellow)] leading-none text-center w-full transition-all duration-300"
            style={{ fontSize: welcomeFontSize(user.firstName) }}
          >
            {user.firstName.toUpperCase()}!
          </h1>
        </div>

        <div className="h-[12vh] rounded-[0.6vw] border border-white/10 bg-white/[0.03] p-[1.2vw] flex flex-col justify-center">
          <h2 className="text-[1.4vw] font-[family-name:var(--font-righteous)] mb-[0.8vh]">Quest Tracker</h2>
          <div className="w-full h-[2.5vh] rounded-full bg-white/[0.05] border border-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--neon-yellow)] to-yellow-600 transition-all duration-300"
              style={{ width: '68%' }}
            />
          </div>
          <p className="text-[1vw] text-[var(--neon-yellow)] mt-[0.5vh] font-bold">68% Complete</p>
        </div>

        <div className="h-[12vh] rounded-[0.6vw] border border-white/10 bg-white/[0.03] p-[1.2vw] flex flex-col justify-center">
          <h2 className="text-[1.4vw] font-[family-name:var(--font-righteous)] mb-[0.8vh]">Submission Tracker</h2>
          <div className="w-full h-[2.5vh] rounded-full bg-white/[0.05] border border-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--neon-yellow)] to-yellow-600 transition-all duration-300"
              style={{ width: '47%' }}
            />
          </div>
          <p className="text-[1vw] text-[var(--neon-yellow)] mt-[0.5vh] font-bold">47% Complete</p>
        </div>

        <div className="flex-1 rounded-[0.6vw] border border-white/10 bg-white/[0.03] flex flex-col items-center justify-center">
          <p className="text-[1vw] text-gray-400 mb-[1vh] font-[family-name:var(--font-righteous)] uppercase tracking-widest">Until Submission!</p>
          <div className="font-[family-name:var(--font-righteous)] text-white tabular-nums leading-none" style={{ fontSize: 'clamp(2rem, 9vh, 12vw)' }}>
            <Countdown />
          </div>
        </div>

        <div className="h-[8vh] flex gap-[1vw]">
          <button className="flex-1 rounded-[0.5vw] border border-white/20 bg-white/[0.03] text-gray-300 font-[family-name:var(--font-righteous)] text-[1.2vw] hover:text-white hover:border-white/40 transition-all">
            Submit
          </button>
          <button className="flex-1 rounded-[0.5vw] border border-white/20 bg-white/[0.03] text-gray-300 font-[family-name:var(--font-righteous)] text-[1.2vw] hover:text-white hover:border-white/40 transition-all">
            See Schedule
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-[1vh] flex-1">
        <ProfileCard onLogout={onLogout} user={user} />

        <div className="rounded-[0.6vw] border border-white/10 bg-white/[0.03] p-[1vw] flex flex-col gap-[1vh]">
          <h2 className="text-[1.5vw] font-[family-name:var(--font-righteous)] text-[var(--neon-yellow)] mb-[1vh] flex-shrink-0">
            YOUR TEAM {(teamMembers.length + pendingMembers.length) > 0 && `· ${teamMembers.length + pendingMembers.length}/3`}
          </h2>

          <div className="grid grid-cols-3 gap-[1vw]">
            {(() => {
              const TEAM_PICS = [
                '/logo/devartpfp.png', '/logo/devartpfp2.png', '/logo/devartpfp3.png',
                '/logo/devartpfp4.png', '/logo/devartpfp5.png',
              ];
              return [...Array(3)].map((_, i) => {
                if (i < teamMembers.length) {
                  const m = teamMembers[i];
                  return (
                    <div key={i} className="rounded-[0.6vw] border border-white/10 bg-white/[0.02] p-[1.2vw] flex flex-col items-center justify-center">
                      <div className="w-full aspect-square mb-[1vh] relative">
                        <Image
                          src={TEAM_PICS[m.pfpIndex ?? 0]}
                          alt={m.firstName}
                          fill
                          className="object-cover"
                          style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                        />
                      </div>
                      <p className="text-[0.9vw] text-gray-200 font-semibold text-center leading-tight">{m.firstName}</p>
                      <p className="text-[0.7vw] text-gray-500 text-center leading-tight">{m.lastName}</p>
                    </div>
                  );
                } else if (i < teamMembers.length + pendingMembers.length) {
                  const p = pendingMembers[i - teamMembers.length];
                  return (
                    <div key={i} className="rounded-[0.6vw] border border-[var(--neon-yellow)]/20 bg-[var(--neon-yellow)]/[0.03] p-[1.2vw] flex flex-col items-center justify-center gap-[0.4vh]">
                      <div className="w-full aspect-square relative opacity-35">
                        <Image
                          src={TEAM_PICS[0]}
                          alt={p.firstName}
                          fill
                          className="object-cover"
                          style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                        />
                      </div>
                      <p className="text-[0.9vw] text-gray-300 font-semibold text-center leading-tight">{p.firstName}</p>
                      <span className="text-[0.6vw] px-[0.5vw] py-[0.15vh] rounded-full bg-[var(--neon-yellow)]/10 border border-[var(--neon-yellow)]/30 text-[var(--neon-yellow)] font-bold uppercase tracking-wider">
                        Pending
                      </span>
                    </div>
                  );
                } else {
                  return (
                    <div key={i} className="rounded-[0.6vw] border border-dashed border-white/10 bg-white/[0.01] flex flex-col items-center justify-center gap-[0.5vh] text-white/20">
                      <span className="text-[2vw] leading-none">+</span>
                      <span className="text-[0.7vw] font-[family-name:var(--font-righteous)]">EMPTY</span>
                    </div>
                  );
                }
              });
            })()}
          </div>

          {showInvite ? (
            <form onSubmit={handleInvite} className="flex flex-col gap-[0.6vh]">
              <div className="flex gap-[0.5vw]">
                <input
                  type="email"
                  placeholder="Invite by email…"
                  value={inviteEmail}
                  onChange={e => { setInviteEmail(e.target.value); setInviteMsg(null); }}
                  className="flex-1 rounded-[0.4vw] bg-white/[0.06] border border-white/10 text-white text-[0.85vw] px-[0.7vw] py-[0.5vh] outline-none focus:border-[var(--neon-yellow)]/40 placeholder:text-white/25"
                />
                <button
                  type="submit"
                  disabled={inviting || !inviteEmail.trim()}
                  className="px-[1vw] rounded-[0.4vw] bg-[var(--neon-yellow)]/20 border border-[var(--neon-yellow)]/40 text-[var(--neon-yellow)] text-[0.85vw] font-bold hover:bg-[var(--neon-yellow)]/30 disabled:opacity-40 transition-all"
                >
                  {inviting ? '…' : 'Add'}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowInvite(false); setInviteMsg(null); }}
                  className="px-[0.8vw] rounded-[0.4vw] border border-white/10 text-gray-400 text-[0.85vw] hover:text-white transition-all"
                >
                  Done
                </button>
              </div>
              {inviteMsg && (
                <p className={`text-[0.8vw] ${inviteMsg.ok ? 'text-[var(--neon-yellow)]' : 'text-red-400'}`}>
                  {inviteMsg.text}
                </p>
              )}
            </form>
          ) : (
            <button
              onClick={() => setShowInvite(true)}
              disabled={teamMembers.length + pendingMembers.length >= 3}
              className="w-full px-[1.5vw] py-[0.8vh] rounded-[0.4vw] border-2 border-[var(--neon-yellow)]/40 bg-[var(--neon-yellow)]/10 text-[1vw] font-bold text-[var(--neon-yellow)] hover:bg-[var(--neon-yellow)]/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              {teamMembers.length + pendingMembers.length >= 3 ? 'Team Full' : 'Invite Member'}
            </button>
          )}
        </div>

        <div className="flex-1 rounded-[0.6vw] border border-white/10 bg-white/[0.03] p-[1vw] flex flex-col">
          <h2 className="text-[1.5vw] font-[family-name:var(--font-righteous)] text-[var(--neon-yellow)] mb-[1vh]">
            NOTIF BAR
          </h2>
          <div className="flex flex-col gap-[1vh] overflow-y-auto">
            {[
              { color: 'bg-red-400', text: 'Alert 1' },
              { color: 'bg-yellow-400', text: 'Alert 2' },
              { color: 'bg-green-400', text: 'Alert 3' },
              { color: 'bg-blue-400', text: 'Alert 4' },
            ].map((notif, i) => (
              <div key={i} className="rounded-[0.4vw] border border-white/10 bg-white/[0.02] p-[1.2vw] flex items-center gap-[0.8vw]">
                <div className={"w-[1.8vw] h-[1.8vw] rounded-full " + notif.color} />
                <p className="text-[1vw] text-gray-300 font-medium">{notif.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  if (!loggedIn || !user) {
    return <LoginForm onLogin={(u) => { setUser(u); setLoggedIn(true); }} />;
  }

  return <Dashboard onLogout={() => { setLoggedIn(false); setUser(null); }} user={user} />;
}
