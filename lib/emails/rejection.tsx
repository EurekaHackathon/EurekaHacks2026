import * as React from "react";
import { Email, Paragraph, A } from "./components";

interface RejectionEmailTemplateProps {
    firstName: string;
}

export const RejectionEmailTemplate = ({ firstName }: RejectionEmailTemplateProps) => (
    <Email previewText="Your EurekaHACKS 2026 Application Update">
        <Paragraph>Hey {firstName},</Paragraph>
        <Paragraph>
            Thank you so much for applying to EurekaHACKS 2026. After careful consideration, we regret to
            inform you that we are unable to offer you a spot at this year's event. We received an overwhelming
            number of applications and the decision was incredibly difficult.
        </Paragraph>
        <Paragraph>
            We hope you continue to pursue your passion for technology and innovation, and we encourage you to
            apply again in future iterations of EurekaHACKS. If you have any questions, feel free to reach out
            to us at <A href="mailto:hello@eurekahacks.ca">hello@eurekahacks.ca</A>.
        </Paragraph>
        <Paragraph>
            Best,
            <br />
            The EurekaHACKS Team
        </Paragraph>
    </Email>
);

RejectionEmailTemplate.PreviewProps = {
    firstName: "John",
} as RejectionEmailTemplateProps;

export default RejectionEmailTemplate;