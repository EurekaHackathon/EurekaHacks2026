"use client";

function SponsorCard({
  name,
  image,
  tier,
  href,
}: {
  name: string;
  image: string;
  tier: "diamond" | "gold" | "silver" | "bronze" | "partner";
  href?: string;
}) {
  const tierStyles = {
    diamond: "h-32 w-full",
    gold: "h-28 w-full md:w-[calc(50%-1.5rem)]",
    silver: "h-24 w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-1.5rem)]",
    bronze: "h-20 w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)]",
    partner: "bg-gray-700 h-20 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)]",
  }[tier];

  const content = (
    <img
      src={image}
      alt={name}
      loading="lazy"
      decoding="async"
      className="object-contain max-h-full max-w-full opacity-90 hover:opacity-100 transition-opacity"
    />
  );

  const wrapperClass = `p-4 rounded-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center ${tierStyles} ${tier}`;

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={wrapperClass}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={wrapperClass}>
      {content}
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
                name="Vallo"
                image="/sponsors/vallo.webp"
                tier="gold"
                href="https://vallo.dev"
              />
              <SponsorCard
                name="Convictional"
                image="/sponsors/convictional.svg"
                tier="gold"
                href="https://convictional.com"
              />
              <SponsorCard
                name="Waterloo Accelerator Centre"
                image="/sponsors/accelerator-centre.svg"
                tier="gold"
                href="https://acceleratorcentre.com"
              />
            </div>

            {/* Silver sponsors: 3 per row capacity, centered */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              <SponsorCard
                name="CodeCrafters"
                image="/sponsors/CodeCrafters.svg"
                tier="silver"
                href="https://codecrafters.io"
              />
              <SponsorCard
                name="Geotab"
                image="/sponsors/geotab.png"
                tier="silver"
                href="https://geotab.com"
              />
              <SponsorCard
                name="Dorahacks"
                image="/sponsors/dorahacks.png"
                tier="silver"
                href="https://dorahacks.io"
              />
              <SponsorCard
                name="Bolt.new"
                image="/sponsors/boltnew.png"
                tier="silver"
                href="https://bolt.new"
              />
              <SponsorCard
                name="Solderable"
                image="/sponsors/solderable.png"
                tier="silver"
                href="https://solderable.dev"
              />
            </div>

            {/* Bronze sponsors: 4 per row capacity, centered */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
              <SponsorCard
                name="Sobeys"
                image="/sponsors/sobeys.svg"
                tier="bronze"
                href="https://sobeys.com"
              />
              <SponsorCard
                name="Interview Cake"
                image="/sponsors/interview-cake.webp"
                tier="bronze"
                href="https://interviewcake.com"
              />
              <SponsorCard
                name=".XYZ"
                image="/sponsors/xyz.webp"
                tier="bronze"
                href="https://gen.xyz"
              />
              <SponsorCard
                name="Basecamp Climbing"
                image="/sponsors/basecamp-climbing.webp"
                tier="bronze"
                href="https://basecampclimbing.ca"
              />
            </div>

            <div className="pt-8">
              <h2 className="text-4xl md:text-5xl font-righteous text-white text-center tracking-wide mb-8">
                PARTNERS
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
                <SponsorCard
                  name="Hack Club Bank"
                  image="/partners/hcb.webp"
                  tier="partner"
                  href="https://bank.hackclub.com"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
