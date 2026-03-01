import * as React from "react";
import { Email, LinkButton, Paragraph } from "./components";

interface VerifyEmailTemplateProps {
    userFirstname: string;
    verificationLink: string;
}

export const VerifyEmailTemplate = ({
    userFirstname, verificationLink
}: VerifyEmailTemplateProps) => (
    <Email previewText="Verify your email">
        <Paragraph>Hi {userFirstname},</Paragraph>
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
    userFirstname: "John",
    verificationLink: "https://example.com",
} as VerifyEmailTemplateProps;

export default VerifyEmailTemplate;
