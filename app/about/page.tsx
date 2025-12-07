import Skyline from "@/public/landing/mid.png";
import Page1 from "@/public/comics/page1.png";

import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="w-screen h-screen !p-8 ">
            <div className="flex flex-col sm:flex-row border-8 border-white w-full h-full relative bg-[#0a1c29] md:!pr-8">
                <div className="flex flex-col gap-4 items-center !p-20 z-2 text-xl sm:w-[50%]">
                    <h1 className="font-righteous text-5xl">Who are we?</h1>
                    <p className="font-inter text-md">We're the largest high school hackathon in Canada! EurekaHACKS was founded on passion, catering to all levels and encourages participates to break expectations!</p>
                </div>
                <div className="grow w-auto z-2 flex items-center justify-center">
                    <Image src={Page1} width="500" height="800" alt="EurekaHACKS Comic Page 1" className="h-[80%] w-auto z-5" />
                </div>
                <Image src={Skyline} alt="Skyline" className="absolute bottom-0 left-0 w-full h-auto pointer-events-none select-none" />

            </div>
        </div>
    )
}