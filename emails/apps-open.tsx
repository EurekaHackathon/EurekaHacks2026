import * as React from "react";
import { Email, Header, HighlightSection, LinkButton, Paragraph } from "./components";

interface ApplicationsOpenTemplateProps {
    applicationLink: string;
    unsubscribeLink: string;
}

export const ApplicationsOpenTemplate = ({
    applicationLink, unsubscribeLink
}: ApplicationsOpenTemplateProps) => (
    <Email previewText="EurekaHACKS 2025 Applications are Now Open! 🚀" unsubscribeLink={unsubscribeLink}>
        <Paragraph>Hey!</Paragraph>
        <Paragraph>
            We're excited to announce that applications for EurekaHACKS 2025 are now open!
            Join us on April 5th, 2025 at Abbey Park High School for an unforgettable day of
            innovation, learning, and fun.
        </Paragraph>
        <HighlightSection>
            📍 Location: Abbey Park High School<br/>
            📅 Date: April 5th, 2025<br/>
            ⏰ Duration: 12 hours<br/>
            💻 Open to all high school students
        </HighlightSection>
        <LinkButton url={applicationLink} text="Apply Now"/>
        <Paragraph>
            Questions? Feel free to reach out to us at hello@eurekahacks.ca!
        </Paragraph>
        <Paragraph>
            Can't wait to see what you'll create!
            <br/>
            Best,
            <br/>
            The EurekaHACKS Team
        </Paragraph>
    </Email>
);

ApplicationsOpenTemplate.PreviewProps = {
    applicationLink: "http://localhost:3000/dashboard",
    unsubscribeLink: "http://localhost:3000/unsubscribe?id=abcdefg",
} as ApplicationsOpenTemplateProps;

export default ApplicationsOpenTemplate;
