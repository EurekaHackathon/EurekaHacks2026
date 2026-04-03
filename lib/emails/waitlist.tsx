import * as React from "react";
import { Email, Paragraph, A } from "./components";

interface WaitlistEmailTemplateProps {
    firstName: string;
}

export const WaitlistEmailTemplate = ({ firstName }: WaitlistEmailTemplateProps) => (
    <Email previewText="Your EurekaHACKS 2026 Application Update">
        <Paragraph>Hey {firstName},</Paragraph>
        <Paragraph>
            Thank you for applying to EurekaHACKS 2026! We were blown away by the quality of applications we
            received this year. While we'd love to have everyone, spots are limited and we've placed you on our
            waitlist.
        </Paragraph>
        <Paragraph>
            This means you're still in the running — if a spot opens up, we'll reach out to you right away. We
            encourage you to keep an eye on your inbox over the coming days.
        </Paragraph>
        <Paragraph>
            If you have any questions, don&apos;t hesitate to contact us at <A href="mailto:hello@eurekahacks.ca">hello@eurekahacks.ca</A>.
        </Paragraph>
        <Paragraph>
            Best,
            <br />
            The EurekaHACKS Team
        </Paragraph>
    </Email>
);

WaitlistEmailTemplate.PreviewProps = {
    firstName: "John",
} as WaitlistEmailTemplateProps;

export default WaitlistEmailTemplate;