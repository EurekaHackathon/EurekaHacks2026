import * as React from "react";
import { Email, Paragraph, A, PersonalizedEmailProps } from "./components";

export const ApplicationSubmittedTemplate = ({
    firstName
}: PersonalizedEmailProps) => (
    <Email previewText="Thanks for applying!">
        <Paragraph>Hey {firstName}!</Paragraph>
        <Paragraph>
            Thanks for applying to EurekaHACKS 2025! Your hacker application has been successfully submitted.
            We will review your application and get back to you soon. If you have any questions or concerns,
            please contact <A href="mailto:hello@eurekahacks.ca">hello@eurekahacks.ca</A>.
        </Paragraph>
        <Paragraph>
            Best,
            <br />
            The EurekaHACKS Team
        </Paragraph>
    </Email>
);

ApplicationSubmittedTemplate.PreviewProps = {
    firstName: "John",
} as PersonalizedEmailProps;

export default ApplicationSubmittedTemplate;