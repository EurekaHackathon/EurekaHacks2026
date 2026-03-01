import * as React from "react";
import { Email, LinkButton, Paragraph } from "./components";

interface VerifyEmailTemplateProps {
    userFirstname: string;
    resetLink: string;
}

export const ResetPasswordTemplate = ({
    userFirstname, resetLink
}: VerifyEmailTemplateProps) => (
    <Email previewText="Reset your password">
        <Paragraph>Hi {userFirstname},</Paragraph>
        <Paragraph>
            You have requested to reset your password. Please click the button below to reset it.
            If you did not request this, please ignore this email.
        </Paragraph>
        <LinkButton url={resetLink} text="Reset Password"/>
    </Email>
);

ResetPasswordTemplate.PreviewProps = {
    userFirstname: "John",
    resetLink: "https://example.com",
} as VerifyEmailTemplateProps;

export default ResetPasswordTemplate;
