import * as React from "react";
import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import * as styles from "./styles";

interface VerifyEmailTemplateProps {
    userFirstname: string;
    resetLink: string;
}

export const ResetPasswordTemplate = ({
                                          userFirstname, resetLink
                                      }: VerifyEmailTemplateProps) => (
    <Html>
        <Head/>
        <Preview>
            Reset your password
        </Preview>
        <Body style={styles.main}>
            <Container style={styles.container}>
                <Img
                    src={`https://eurekahacks.ca/logo-small.png`}
                    width="50"
                    height="50"
                    alt="EurekaHACKS logo"
                    style={styles.logo}
                />
                <Text style={styles.paragraph}>Hi {userFirstname},</Text>
                <Text style={styles.paragraph}>
                    You have requested to reset your password. Please click the button below to reset it.
                    If you did not request this, please ignore this email.
                </Text>
                <Section style={styles.btnContainer}>
                    <Button style={styles.button} href={resetLink}>
                        Reset Password
                    </Button>
                </Section>
                <Hr style={styles.hr}/>
                <Text style={styles.footer}>
                    Copyright © EurekaHACKS, All rights reserved.
                </Text>
            </Container>
        </Body>
    </Html>
);

ResetPasswordTemplate.PreviewProps = {
    userFirstname: "John",
    resetLink: "https://example.com",
} as VerifyEmailTemplateProps;

export default ResetPasswordTemplate;
