"use client";
import Image from "next/image";

function SponsorCard({ name, image, tier, largeLogo = true }: { name: string; image: string; tier: "diamond" | "gold" | "silver" | "bronze"; largeLogo?: boolean }) {
  // Tailwind grid col spans for each tier
  const tierCol = {
    diamond: "col-span-12 h-36 px-8 py-8",
    gold: "col-span-6 h-28 px-4 py-2",
    silver: "col-span-4 h-24 px-4 py-2",
    bronze: "col-span-3 h-20 px-2 py-1",
  }[tier];

  return (
    <div
      className={`flex items-center justify-center bg-white shadow-md border border-white/10 ${tierCol}`}
    >
      {largeLogo ? (
        <div className="w-full h-full flex items-center justify-center p-2">
          <img src={image} alt={name} className="object-contain max-h-full max-w-full" style={{height: '100%', width: '100%'}} />
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
            <img src={image} alt={name} className="object-contain max-h-10 max-w-10" width={40} height={40} />
          </div>
          <span className="font-sans font-bold text-2xl text-gray-900">{name}</span>
        </div>
      )}
    </div>
  );
}

//TODO: Use real sponsor info when available
export default function SponsorsSection() {
  return (
    <section className="flex justify-center items-center py-12 px-4">
      <div className="bg-gradient-to-b from-[#092434] to-[#0b2b40] border-4 border-white shadow-2xl max-w-6xl w-full p-6">
        <div className="py-4 px-32">
          <h2 className="text-4xl md:text-5xl font-righteous text-white text-center tracking-wide mb-2">SPONSORS</h2>
          <p className="text-center font-sans text-[#e6f0f6] max-w-2xl mx-auto text-sm mb-6">
            Become a part of Canada's premier high school hackathon. Your support helps inspire the next generation of innovators and leaders in technology. Looking to make an impact? Email us at{' '}
            <a href="mailto:sponsorships@eurekahacks.ca" className="text-yellow-300 hover:underline">sponsorships@eurekahacks.ca</a>.
          </p>

          <div className="grid grid-cols-12 gap-8 mt-6">
            {/* Diamond Sponsor */}
            <SponsorCard name="Geotab" image="https://tca.gov.au/wp-content/uploads/2024/01/geotab-logofull-colour-rgb-1.png" tier="diamond" largeLogo={true} />

            {/* Gold Sponsors */}
            <SponsorCard name="Bolt.new" image="https://sfruby.com/sponsor_boltnew.png" tier="gold" />
            <SponsorCard name="Dorahacks" image="https://2025.eurekahacks.ca/sponsors/dorahacks.png" tier="gold" />

            {/* Silver Sponsors */}
            <SponsorCard name="Internet Computer" image="https://2025.eurekahacks.ca/sponsors/icp.png" tier="silver" />
            <SponsorCard name="Jane Street" image="https://2025.eurekahacks.ca/sponsors/jane-street.png" tier="silver" />
            <SponsorCard name="Ultimate Coders" image="https://2025.eurekahacks.ca/sponsors/ultimate-coders.png" tier="silver" />

            {/* Bronze Sponsors */}
            <SponsorCard name="Sobeys" image="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Sobeys_logo.svg/2560px-Sobeys_logo.svg.png" tier="bronze" largeLogo={true} />
            <SponsorCard name="Interview Cake" image="https://2025.eurekahacks.ca/sponsors/interview-cake.png" tier="bronze" largeLogo={true} />
            <SponsorCard name=".XYZ" image="https://2025.eurekahacks.ca/sponsors/xyz.png" tier="bronze" largeLogo={true} />
            <SponsorCard name="NordVPN" image="https://2025.eurekahacks.ca/sponsors/nordvpn.png" tier="bronze" largeLogo={true} />
          </div>
        </div>
      </div>
    </section>
  );
}
