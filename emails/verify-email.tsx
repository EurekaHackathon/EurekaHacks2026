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
    verificationLink: string;
}

export const VerifyEmailTemplate = ({
    userFirstname, verificationLink
}: VerifyEmailTemplateProps) => (
    <Html>
        <Head />
        <Preview>
            Verify your email
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
                    Thank you for creating a EurekaHACKS account! To get started, please verify your email address by
                    clicking the button below.
                    This will expire in 15 minutes.
                </Text>
                <Section style={styles.btnContainer}>
                    <Button style={styles.button} href={verificationLink}>
                        Verify email
                    </Button>
                </Section>
                <Text style={styles.paragraph}>
                    Best,
                    <br />
                    The EurekaHACKS Team
                </Text>
                <Hr style={styles.hr} />
                <Text style={styles.footer}>
                    Copyright © EurekaHACKS, All rights reserved.
                </Text>
            </Container>
        </Body>
    </Html>
);

VerifyEmailTemplate.PreviewProps = {
    userFirstname: "John",
    verificationLink: "https://example.com",
} as VerifyEmailTemplateProps;

export default VerifyEmailTemplate;
