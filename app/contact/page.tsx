"use client";

import React from 'react';


const dummyTeam = [
  { id: 1, role: 'LEAD DESIGNER', name: 'ALEX', description: 'LOVES PIXEL ART AND COFFEE.' },
  { id: 2, role: 'FULL STACK', name: 'SAM', description: 'CAN CENTER A DIV IN 3 SECONDS.' },
  { id: 3, role: 'PROJECT MANAGER', name: 'JORDAN', description: 'HERDING CATS EXPERT.' },
  { id: 4, role: 'BACKEND WIZ', name: 'TAYLOR', description: 'SQL INJECTIONS ARE A MYTH.' },
  { id: 5, role: 'DEVOPS', name: 'CASEY', description: 'IT WORKS ON MY MACHINE.' },
];


export default function ContactPage() {
  const scrollContainer = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = scrollContainer.current;
    if (el) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY === 0) return;
        e.preventDefault();
        el.scrollBy({
          left: e.deltaY,
          behavior: 'smooth'
        });
      };
      el.addEventListener('wheel', onWheel);
      return () => el.removeEventListener('wheel', onWheel);
    }
  }, []);

  return (
    <div className="w-full h-screen !p-8 relative">
      <div className="border-white  h-full w-full flex flex-col font-righteous gap-4 ">
        <div className="grow border-8 !p-4 flex flex-col min-w-0">
          <h1 className="font-righteous text-6xl">Meet the Team</h1>
          <div className="flex-1 w-full min-h-0 relative">
            <div
              ref={scrollContainer}
              className="absolute inset-0 flex gap-6 overflow-x-auto !pb-4 snap-x snap-mandatory !px-4 items-center w-full"
            >
              {dummyTeam.map((member) => (
                <div key={member.id} className="min-w-[300px] h-[85%] bg-[#d1d5db] rounded-xl p-6 flex flex-col shadow-lg snap-center shrink-0 transition-transform hover:scale-105 duration-300">
                  <h2 className="text-2xl font-bold text-[#0a2540] mb-2 uppercase">{member.role}</h2>
                  <div className="flex gap-4 items-start mb-4">
                    <div className="w-24 h-24 bg-[#9ca3af] rounded-md shrink-0"></div>
                    <div className="flex flex-col">
                      <span className="text-xl font-bold text-[#0a2540] leading-tight">THIS IS A</span>
                      <span className="text-xl font-bold text-[#0a2540] leading-tight">{member.name}</span>
                    </div>
                  </div>
                  <p className="mt-auto text-sm font-bold text-black uppercase">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-row grow border-8 !p-4">
          <h1 className="grow self-end text-6xl ">CONTACT US</h1>
          <div className="flex flex-col grow self-center">
            <a href="mailto:hello@eurekahacks.ca" className="underline">hello@eurekahacks.ca</a>
            <a href="https://www.instagram.com/eureka_hacks" target="_blank" rel="noopener noreferrer" className="underline">@eureka_hacks</a>
          </div >
        </div>
      </div>
    </div>
  );
}

