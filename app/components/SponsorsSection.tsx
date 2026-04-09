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
  const tierStyles = {
    diamond: "h-32 w-full",
    gold: "h-28 w-full md:w-[calc(50%-1.5rem)]",
    silver: "h-24 w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-1.5rem)]",
    bronze: "h-20 w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)]",
  }[tier];

  return (
    <div className={`p-4 rounded-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center ${tierStyles} ${tier}`}>
      <img
        src={image}
        alt={name}
        className="object-contain max-h-full max-w-full opacity-90 hover:opacity-100 transition-opacity"
      />
    </div>
  );
}

//TODO: Use real sponsor info when available
export default function SponsorsSection() {
  return (
    <section
      id="sponsors"
      className="flex justify-center items-center px-6 md:px-12 w-screen"
    >
      <div className="border-12 border-white shadow-2xl w-full p-8 bg-[#0a1c29]">
        <div className="py-4">
          <h2 className="text-4xl md:text-6xl font-righteous text-white text-center tracking-wide mb-4">
            SPONSORS
          </h2>
          <p className="text-center font-sans text-[#e6f0f6] max-w-2xl mx-auto text-base mb-12">
            Become a part of Canada&apos;s premier high school hackathon. Your
            support helps inspire the next generation of innovators and leaders
            in technology. Looking to make an impact? Email us at{" "}
            <a
              href="mailto:sponsorships@eurekahacks.ca"
              className="text-yellow-300 hover:text-yellow-200 hover:underline transition-colors"
            >
              sponsorships@eurekahacks.ca
            </a>
            .
          </p>

          <div className="flex flex-col gap-12 md:gap-16">
            {/* Gold sponsors: 2 per row capacity, centered */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
              <SponsorCard
                name="Waterloo Accelerator Centre"
                image="https://www.acceleratorcentre.com/wp-content/uploads/2025/09/logo-fc.svg"
                tier="gold"
              />
            </div>

            {/* Silver sponsors: 3 per row capacity, centered */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              <SponsorCard
                name="CodeCrafters"
                image="/sponsors/CodeCrafters.svg"
                tier="silver"
              />
              <SponsorCard
                name="Geotab"
                image="https://tca.gov.au/wp-content/uploads/2024/01/geotab-logofull-colour-rgb-1.png"
                tier="silver"
              />
              <SponsorCard
                name="Dorahacks"
                image="https://2025.eurekahacks.ca/sponsors/dorahacks.png"
                tier="silver"
              />
              <SponsorCard
                name="Bolt.new"
                image="https://sfruby.com/sponsor_boltnew.png"
                tier="silver"
              />
            </div>

            {/* Bronze sponsors: 4 per row capacity, centered */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
              <SponsorCard
                name="Sobeys"
                image="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Sobeys_logo.svg/3840px-Sobeys_logo.svg.png"
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
