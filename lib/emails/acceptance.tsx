import * as React from "react";
import { Email, LinkButton, Paragraph, HighlightSection, PersonalizedEmailProps } from "./components";

export const AcceptanceEmailTemplate = ({firstName}: PersonalizedEmailProps) => (
    <Email previewText="Congratulations 🎉, See You At EurekaHACKS 2026!">
        <Paragraph>Hey {firstName}!</Paragraph>
        <Paragraph>
            We’re excited to have you as a hacker for EurekaHACKS 2026, our fourth hackathon iteration! Join us from May 1st-2nd at the Waterloo Accelerator Center to take part in a memorable day filled with fun workshops, exciting activities
            and free food!
        </Paragraph>
        <Paragraph>
            Here’s a sneak peek into this years event:
        </Paragraph>
        <HighlightSection>
            🌟 $XX,XXX+ prize pool including ________
            <br/>
            🍎 Free lunch and dinner for all hackers!
            <br/>
            🛠 Take part in fun workshops and activities!
        </HighlightSection>
        <Paragraph>
            And a reminder about the logistics:
        </Paragraph>
        <HighlightSection>
            📍 Waterloo Accelerator Center (295 Hagey Blvd, Waterloo)<br/>
            📅 5pm May 1st - 10pm May 2nd<br/>
        </HighlightSection>
        <Paragraph>
            <strong>
                Please RSVP to confirm your spot at EurekaHACKS 2026 if you have not already! We’ll be sending
                you more details about the event
                in the following days, so stay tuned!
            </strong>
        </Paragraph>
        <LinkButton url="https://eurekahacks.ca/dashboard/" text="RSVP Now"/>
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
} as PersonalizedEmailProps;

export default AcceptanceEmailTemplate;
