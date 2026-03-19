//TODO This email is NOT production ready; content needs to be updated first

import * as React from "react";
import { Email, LinkButton, Paragraph, PersonalizedEmailProps } from "./components";

export const ApplicationsDueTemplate = ({firstName}: PersonalizedEmailProps) => (
    <Email previewText="🚨 EurekaHACKS 2025 applications are due tomorrow! 🚨">
        <Paragraph>Hey {firstName}!</Paragraph>
        <Paragraph>
            We saw that you created a EurekaHACKS account but haven't submitted an application yet! Applications
            are due on Saturday, March 22, 2025 at 11:59 PM EST. Applying only takes a few minutes—no short answer
            responses required. Don't miss out on free food, $11,000 in prizes
            (including four 3D printers), and a ton of fun!
        </Paragraph>
        <LinkButton url="https://eurekahacks.ca/dashboard/application" text="Apply Now"/>
        <Paragraph>
            Can't wait to see what you'll create!
            <br/>
            Best,
            <br/>
            The EurekaHACKS Team
        </Paragraph>
    </Email>
);

ApplicationsDueTemplate.PreviewProps = {
    firstName: "John",
} as PersonalizedEmailProps;

export default ApplicationsDueTemplate;
