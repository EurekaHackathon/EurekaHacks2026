import * as React from "react";
import { Email, LinkButton, Paragraph, PersonalizedEmailProps } from "./components";

interface VerifyEmailTemplateProps extends PersonalizedEmailProps {
    verificationLink: string;
}

export const VerifyEmailTemplate = ({
    firstName, verificationLink
}: VerifyEmailTemplateProps) => (
    <Email previewText="Verify your email">
        <Paragraph>Hi {firstName},</Paragraph>
        <Paragraph>
            Thank you for creating a EurekaHACKS account! To get started, please verify your email address by
            clicking the button below.
            This will expire in 15 minutes.
        </Paragraph>
        <LinkButton url={verificationLink}/>
        <Paragraph>
            Best,
            <br />
            The EurekaHACKS Team
        </Paragraph>
    </Email>
);

VerifyEmailTemplate.PreviewProps = {
    firstName: "John",
    verificationLink: "https://example.com",
} as VerifyEmailTemplateProps;

export default VerifyEmailTemplate;
