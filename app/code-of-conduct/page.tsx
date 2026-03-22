export default function CodeOfConduct() {
    return (
        <main className="flex-1 w-full max-w-4xl mx-auto py-24 px-6 md:px-12 text-white/90">
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-righteous mb-4 text-white">Code of Conduct</h1>
                <p className="text-lg text-white/70">Last Updated: March 2026</p>
            </div>

            <div className="space-y-6 text-[1.1rem] leading-relaxed mb-16">
                <p>
                    EurekaHACKS strives to create a hackathon environment where every participant and volunteer feels welcome, included, respected, and secure. To uphold this commitment, all attendees, spanning sponsors, students, speakers, judges, volunteers, and organizers, are expected to adhere to the following code of conduct at all times.
                </p>

                <p>
                    Harassment encompasses various behaviors, including but not limited to offensive written posts, comments, or messages related to gender, age, sexual orientation, ability, physical appearance, race, or religion. It also includes the display of sexual or graphic images in public spaces, deliberate intimidation, stalking, following, harassment, photography, or video recording without consent, sustained disruption of talks or events, inappropriate contact, and unwelcome sexual attention.
                </p>

                <p>
                    Participants engaging in any of these harmful behaviors will be promptly requested to cease their actions. Sponsors, speakers, volunteers, and organizers are all expected to adhere to the anti-harassment policy. Specifically, sponsors should refrain from using sexualized images, activities, or other graphic materials, and booth staff, including volunteers, should avoid wearing sexualized clothing, uniforms, costumes, or creating a sexualized environment.
                </p>

                <p>
                    Furthermore, hacks or projects submitted by teams that violate this code may face disqualification or be denied the right to demo at the discretion of the event organizers.
                </p>

                <p>
                    While photography is encouraged, participants should be given a reasonable chance to opt out. If someone objects to being photographed, their request should be respected. Taking photographs in contexts where individuals have a reasonable expectation of privacy, such as capturing screenshots or pictures of their screens without consent, is considered inappropriate.
                </p>

                <p>
                    In the event of harmful behavior, the event organizers may take appropriate action, including issuing warnings or expelling the perpetrator from the event.
                </p>

                <p>
                    If you experience harassment, witness someone else being harassed, or have any concerns, please follow the reporting procedures provided at the end of this document and report the incident immediately. Hackathon staff, including the Co-Directors, will be easily identifiable, and they can be reached at all times through the provided phone numbers. We highly value your attendance and expect all participants to adhere to these rules at hackathon and workshop venues, as well as during all related social events.
                </p>
            </div>

            <div className="space-y-6 text-[1.1rem] leading-relaxed mb-16 relative">
                <h2 className="text-2xl md:text-3xl font-bold font-righteous text-white mb-6">Reporting Procedures</h2>

                <p>
                    If you feel uneasy or suspect a potential violation of the code of conduct, please utilize the following reporting methods. All reporters have the option to remain anonymous.
                </p>

                <p>
                    Feel free to reach out to any organizers or the on-duty security guard at any time. For direct communication with the Co-Directors, you can email them at <a href="mailto:hello@eurekahacks.ca" className="text-pink-400 hover:text-pink-300 underline underline-offset-4">hello@eurekahacks.ca</a>.
                </p>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6 mt-6">
                    <h3 className="text-xl font-bold text-white mb-3 text-red-400">In Case of Emergency</h3>
                    <p className="mb-2">Please contact the following resources immediately:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2 text-white/80">
                        <li><strong>Oakville Police/Fire/Paramedics</strong></li>
                        <li>Emergency: <a href="tel:911" className="text-white hover:underline">911</a></li>
                        <li>Non-Emergency: <a href="tel:905-825-4777" className="text-white hover:underline">905-825-4777</a></li>
                    </ul>
                </div>
            </div>

            <div className="space-y-6 text-[1.1rem] leading-relaxed">
                <h2 className="text-2xl md:text-3xl font-bold font-righteous text-white mb-6">Attribution & Modifications</h2>

                <p>Credit for this code of conduct is attributed to the following codes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mb-6">
                    <li>McHacks Code of Conduct</li>
                    <li>Major League Hacking Code of Conduct</li>
                    <li>Hack Code of Conduct</li>
                    <li>Hack@Brown Code of Conduct</li>
                    <li>JustHack Code of Conduct</li>
                </ul>

                <p className="pt-6 border-t border-white/10">
                    For any inquiries about this code of conduct, please contact <a href="mailto:hello@eurekahacks.ca" className="text-pink-400 hover:text-pink-300 underline underline-offset-4">hello@eurekahacks.ca</a>. EurekaHACKS reserves the right to modify this code of conduct at any time.
                </p>
            </div>
        </main>
    );
}
