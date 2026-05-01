import * as React from "react";
import { Email, Header, Paragraph, A, PersonalizedEmailProps } from "./components";

export const InfoEmailTemplate = ({firstName}: PersonalizedEmailProps) => (
    <Email previewText="EurekaHACKS is tomorrow!">
        <Paragraph>Hey {firstName}!</Paragraph>
        <Paragraph>
            EurekaHACKS kicks off tomorrow! 🚀 We're thrilled to have you join us for a weekend of creativity,
            innovation, and problem-solving alongside other passionate high school hackers. Check out the info
            below so you're fully prepared.
        </Paragraph>
        <Header>When &amp; where</Header>
        <Paragraph>
            Friday, May 1st – Saturday, May 2nd<br/>
            Waterloo Accelerator Centre — <A
            href="https://www.google.com/maps/place/295+Hagey+Blvd,+Waterloo,+ON+N2L+6R5">
            295 Hagey Blvd, Waterloo, ON N2L 6R5</A>
        </Paragraph>
        <Paragraph>
            Doors open at <strong>5:00 PM</strong> — get there early to claim your hacker badge and grab a seat
            for our opening ceremony at <strong>6:00 PM</strong>!
        </Paragraph>
        <Header>What to bring</Header>
        <Paragraph>
            • Extension cables (seriously — bring them!)<br/>
            • Laptop and phone<br/>
            • Chargers<br/>
            • Water bottle<br/>
            • Sleeping bag, pillow, comfy clothes, and personal hygiene items
        </Paragraph>
        <Header>Food</Header>
        <Paragraph>
            Meals will be provided throughout the event, so come hungry! 🍕
        </Paragraph>
        <Header>Hacker package</Header>
        <Paragraph>
            All the details about the schedule, rules, prizes, and more can be found in our hacker package: <A
            href="https://drive.google.com/file/d/1qJhYXFsqAITua0H2_Ptc0CRR-wAIMMnD/view?usp=sharing">view the
            hacker package</A>. Please take a moment to review it before the event.
        </Paragraph>
        <Header>Questions?</Header>
        <Paragraph>
            Reach out on our <A href="https://discord.gg/ApEmE7g7GB">Discord server</A> or email us at <A
            href="mailto:hello@eurekahacks.ca">hello@eurekahacks.ca</A>.
        </Paragraph>
        <Paragraph>
            Can't wait to see what you'll build!
            <br/>
            Best,
            <br/>
            The EurekaHACKS Team
        </Paragraph>
    </Email>
);

InfoEmailTemplate.PreviewProps = {
    firstName: "John",
} as PersonalizedEmailProps;

export default InfoEmailTemplate;
