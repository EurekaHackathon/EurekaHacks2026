import * as React from "react";
import { Email, LinkButton, Paragraph } from "./components";

interface PersonalizedEmail {
    firstName: string;
}

export const AcceptanceEmailTemplate = ({firstName}: PersonalizedEmail) => (
    <Email previewText="Congratulations 🎉, See You At EurekaHACKS 2025!">
        <Paragraph>Hey {firstName}!</Paragraph>
        <Paragraph>
            We’re excited to have you as a hacker for EurekaHACKS 2025, our third hackathon iteration! (You are
            one step closer to the Bambu). Join us from 8:00 AM to 9:30 PM on April 5th 2025 at 1455 Glen
            Abbey Gate, Oakville to take part in a memorable day filled with fun workshops, exciting activities
            and free food!
        </Paragraph>
        <Paragraph>
            Here’s a sneak peek into this years event:
            <br/>
            🌟 $11,000+ prize pool including 4 Bambu Lab A1 minis
            <br/>
            🍎 Free lunch and dinner for all hackers!
            <br/>
            🛠 Take part in fun workshops!
            <br/>
            <br/>
            Date: Saturday April 5th
            <br/>
            Time: 8:00 AM - 9:30 PM
            <br/>
            Venue address: 1455 Glen Abbey Gate, Oakville
        </Paragraph>
        <Paragraph>
            <strong>
                Please RSVP to confirm your spot at EurekaHACKS 2025 if you have not already! We’ll be sending
                you more details about the event
                in the following days, so stay tuned!
            </strong>
        </Paragraph>
        <LinkButton url="https://eurekahacks.ca/dashboard/"/>
        <Paragraph>
            Can&apos;t wait to see what you&apos;ll create!
            <br/>
            Best,
            <br/>
            The EurekaHACKS Team
        </Paragraph>
    </Email>
);

AcceptanceEmailTemplate.PreviewProps = {
    firstName: "John",
} as PersonalizedEmail;

export default AcceptanceEmailTemplate;