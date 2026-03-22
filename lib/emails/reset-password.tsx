import * as React from "react";
import { Email, LinkButton, Paragraph, PersonalizedEmailProps } from "./components";

interface VerifyEmailTemplateProps extends PersonalizedEmailProps {
    resetLink: string;
}

export const ResetPasswordTemplate = ({
    firstName, resetLink
}: VerifyEmailTemplateProps) => (
    <Email previewText="Reset your password">
        <Paragraph>Hi {firstName},</Paragraph>
        <Paragraph>
            You have requested to reset your password. Please click the button below to reset it.
            If you did not request this, please ignore this email.
        </Paragraph>
        <LinkButton url={resetLink} text="Reset Password"/>
    </Email>
);

ResetPasswordTemplate.PreviewProps = {
    firstName: "John",
    resetLink: "https://example.com",
} as VerifyEmailTemplateProps;

export default ResetPasswordTemplate;
