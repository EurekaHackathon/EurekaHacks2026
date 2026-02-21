"use client";

function SponsorCard({
  name,
  image,
  tier,
}: {
  name: string;
  image: string;
  tier: "diamond" | "gold" | "silver" | "bronze";
}) {
  // Tailwind grid col spans for each tier
  const tierCol = {
    diamond: "col-span-12 h-36 px-4 py-2",
    gold: "col-span-6 h-28 px-4 py-2",
    silver: "col-span-4 h-24 px-4 py-2",
    bronze: "col-span-3 h-20 px-2 py-1",
  }[tier];
  const returnClass =
    "w-full h-full flex items-center justify-center p-4 rounded-2xl transition-transform duration-200 hover:scale-105 " +
    tier;

  return (
    <div className={`flex items-center w-full justify-center noborder ${tierCol}`}>
      <div className={returnClass}>
        <img
          src={image}
          alt={name}
          className="object-contain max-h-full max-w-full"
        />
      </div>
    </div>
  );
}

//TODO: Use real sponsor info when available
export default function SponsorsSection() {
  return (
    <section id="sponsors" className="flex justify-center items-center px-12 w-screen py-4">
      <div className="border-12 border-white shadow-2xl max-w-7xl w-full p-4 bg-[#0a1c29]">
        <div className="py-4 px-32">
          <h2 className="text-6xl font-righteous text-white text-center tracking-wide mb-2 margining">
            SPONSORS
          </h2>
          <p className="text-center font-sans text-[#e6f0f6] max-w-2xl mx-auto text-m mb-6 abcdefgh">
            Become a part of Canada&apos;s premier high school hackathon. Your
            support helps inspire the next generation of innovators and leaders
            in technology. Looking to make an impact? Email us at{" "}
            <a
              href="mailto:sponsorships@eurekahacks.ca"
              className="text-yellow-300 hover:underline"
            >
              sponsorships@eurekahacks.ca
            </a>
            .
          </p>

          <div className="grid grid-cols-12 gap-8 mt-6">
            {/* Diamond Sponsor */}
            <SponsorCard
              name="Geotab"
              image="https://tca.gov.au/wp-content/uploads/2024/01/geotab-logofull-colour-rgb-1.png"
              tier="diamond"
            />

            {/* Gold Sponsors */}
            <SponsorCard
              name="Bolt.new"
              image="https://sfruby.com/sponsor_boltnew.png"
              tier="gold"
            />
            <SponsorCard
              name="Dorahacks"
              image="https://2025.eurekahacks.ca/sponsors/dorahacks.png"
              tier="gold"
            />

            {/* Silver Sponsors */}
            <SponsorCard
              name="Internet Computer"
              image="https://2025.eurekahacks.ca/sponsors/icp.png"
              tier="silver"
            />
            <SponsorCard
              name="Jane Street"
              image="https://2025.eurekahacks.ca/sponsors/jane-street.png"
              tier="silver"
            />
            <SponsorCard
              name="Ultimate Coders"
              image="https://2025.eurekahacks.ca/sponsors/ultimate-coders.png"
              tier="silver"
            />

            {/* Bronze Sponsors */}
            <SponsorCard
              name="Sobeys"
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Sobeys_logo.svg/2560px-Sobeys_logo.svg.png"
              tier="bronze"
            />
            <SponsorCard
              name="Interview Cake"
              image="https://2025.eurekahacks.ca/sponsors/interview-cake.png"
              tier="bronze"
            />
            <SponsorCard
              name=".XYZ"
              image="https://2025.eurekahacks.ca/sponsors/xyz.png"
              tier="bronze"
            />
            <SponsorCard
              name="NordVPN"
              image="https://2025.eurekahacks.ca/sponsors/nordvpn.png"
              tier="bronze"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
