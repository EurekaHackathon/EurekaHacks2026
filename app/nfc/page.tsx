"use client";

import { useEffect, useState } from "react";

const UNLOCK_AT = new Date("2026-05-02T19:00:00-04:00").getTime();

export default function NFCPage() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (now === null) return null;
  return now >= UNLOCK_AT ? (
    <Unlocked />
  ) : (
    <Locked unlockAt={UNLOCK_AT} now={now} />
  );
}

function Locked({ unlockAt, now }: { unlockAt: number; now: number }) {
  const remaining = Math.max(0, unlockAt - now);
  const h = Math.floor(remaining / 3_600_000);
  const m = Math.floor((remaining % 3_600_000) / 60_000);
  const s = Math.floor((remaining % 60_000) / 1000);

  return (
    <main className="flex-1 w-full max-w-2xl mx-auto py-24 px-6 md:px-12 text-white/90 text-center">
      <div className="text-7xl md:text-8xl mb-6">🔒</div>
      <h1 className="text-4xl md:text-5xl font-bold font-righteous mb-6 text-white">
        omg u found it i cant believe it
      </h1>

      <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-6">
        We wanted everyone to walk out of EurekaHACKS with something to take
        home — a little piece of the weekend you can actually hold.
      </p>

      <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-12">
        Hold on to these cards, they are special{" "}
        <span className="inline-block">:)</span>
      </p>

      <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-8 inline-block">
        <p className="text-sm uppercase tracking-widest text-white/50 mb-3">
          Unlocks in
        </p>
        <p className="text-3xl md:text-4xl font-mono font-bold text-pink-400 tabular-nums">
          {String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}:
          {String(s).padStart(2, "0")}
        </p>
        <p className="text-xs text-white/40 mt-3">May 2, 2026 · 7:00 PM EDT</p>
      </div>
    </main>
  );
}

function Unlocked() {
  return (
    <main className="flex-1 w-full max-w-3xl mx-auto py-24 px-6 md:px-12 text-white/90">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-righteous mb-4 text-white">
          Programming Your NFC Card
        </h1>
        <p className="text-lg text-white/70">
          Your card is a rewritable NFC tag — you can use it for whatever you
          like. Here&apos;s how to put your own stuff on it.
        </p>
      </div>

      <section className="space-y-4 mb-12">
        <h2 className="text-2xl md:text-3xl font-bold font-righteous text-white">
          1. Get NFC Tools
        </h2>
        <p className="text-[1.05rem] leading-relaxed">
          Install <strong>NFC Tools</strong> on your phone — it&apos;s free, has
          no ads in the basic version, and works on both platforms.
        </p>
        <ul className="list-disc list-inside space-y-1 ml-2 text-white/85">
          <li>
            Android:{" "}
            <a
              href="https://play.google.com/store/apps/details?id=com.wakdev.wdnfc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 hover:text-pink-300 underline underline-offset-4"
            >
              Play Store
            </a>
          </li>
          <li>
            iPhone (XS or newer):{" "}
            <a
              href="https://apps.apple.com/app/nfc-tools/id1252962749"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 hover:text-pink-300 underline underline-offset-4"
            >
              App Store
            </a>
          </li>
        </ul>
        <p className="text-sm text-white/60">
          On iPhone you&apos;ll need to open NFC Tools manually each time you
          write — Apple doesn&apos;t allow background NFC writes.
        </p>
      </section>

      <section className="space-y-4 mb-12">
        <h2 className="text-2xl md:text-3xl font-bold font-righteous text-white">
          2. Write something
        </h2>
        <ol className="list-decimal list-inside space-y-2 ml-2 text-[1.05rem] leading-relaxed">
          <li>
            Open NFC Tools and tap the <strong>Write</strong> tab.
          </li>
          <li>
            Tap <strong>Add a record</strong> and pick what you want to store
            (see below).
          </li>
          <li>
            Tap <strong>Write / 1 record</strong>, then hold the card flat
            against the back of your phone until it confirms.
          </li>
        </ol>
        <p className="text-sm text-white/60">
          Writing replaces whatever was on the card before. The card itself can
          be rewritten thousands of times.
        </p>
      </section>

      <section className="space-y-6 mb-12">
        <h2 className="text-2xl md:text-3xl font-bold font-righteous text-white">
          3. Useful things to put on it
        </h2>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-2">🔗 Link / URL</h3>
          <p className="text-white/85 mb-2">
            Pick <strong>URL</strong>. Paste any link — your portfolio, GitHub,
            LinkedIn, a Spotify playlist, your devpost.
          </p>
          <p className="text-sm text-white/60">
            Tapping the card will open the link in a browser. Easiest, most
            universal option.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-2">
            👤 vCard (contact info)
          </h3>
          <p className="text-white/85 mb-2">
            Pick <strong>Contact</strong>. Fill in name, email, phone, etc. —
            when someone taps the card, their phone offers to save you as a
            contact.
          </p>
          <p className="text-sm text-white/60">
            Great as a digital business card. Only fill the fields you want
            shared.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-2">📱 Social media</h3>
          <p className="text-white/85 mb-2">
            Pick <strong>Social networks</strong> and choose Instagram, Discord,
            TikTok, X, GitHub, LinkedIn, etc. NFC Tools formats the link so the
            app opens directly when supported.
          </p>
          <p className="text-sm text-white/60">
            For Discord, you can also use a URL record with your invite link.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-2">
            📧 Email / SMS / Phone
          </h3>
          <p className="text-white/85">
            <strong>Mail</strong> opens a pre-filled email draft.{" "}
            <strong>SMS</strong> opens a pre-filled text.{" "}
            <strong>Phone number</strong> starts a call. Useful for quick
            contact without sharing your number visibly.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-2">
            📶 Wi-Fi network
          </h3>
          <p className="text-white/85 mb-2">
            Pick <strong>Wi-Fi network</strong>, enter SSID + password +
            encryption type. Guests tap to join — no typing.
          </p>
          <p className="text-sm text-white/60">
            Works great as a coaster by your router.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-2">📝 Plain text</h3>
          <p className="text-white/85">
            Pick <strong>Text</strong> for a note, a wifi password, a secret
            message — whatever. Phones will display the text on tap.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-2">
            ⚡ Custom URL → app shortcut
          </h3>
          <p className="text-white/85">
            Use a deep link as a URL record to open a specific app screen —
            Spotify track (
            <code className="text-pink-300">spotify:track:…</code>), Google Maps
            location, a Shortcut on iOS. Lots of room to get creative here.
          </p>
        </div>
      </section>

      <section className="space-y-4 mb-12">
        <h2 className="text-2xl md:text-3xl font-bold font-righteous text-white">
          Tips
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-2 text-[1.05rem] leading-relaxed">
          <li>
            You can <strong>lock</strong> a tag in NFC Tools if you want it to
            be read-only forever — don&apos;t do this unless you&apos;re sure.
          </li>
          <li>
            Keep the URL/text short. These cards have limited storage (around
            884 bytes for this one).
          </li>
          <li>
            Hold the card steady against the phone for ~2 seconds. Most
            phones&apos; NFC sensor is near the top of the back.
          </li>
          <li>
            To erase a card, use <strong>Other → Erase tag</strong> in NFC
            Tools.
          </li>
        </ul>
      </section>

      <p className="text-sm text-white/50 pt-8 border-t border-white/10">
        Have fun with it.
      </p>
    </main>
  );
}
