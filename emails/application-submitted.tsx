import * as React from "react";
import {
    Body,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Text,
} from "@react-email/components";
import * as styles from "./styles";

interface VerifyEmailTemplateProps {
    userFirstname: string;
}

export const ApplicationSubmittedTemplate = ({
                                        userFirstname
                                    }: VerifyEmailTemplateProps) => (
    <Html>
        <Head/>
        <Preview>
            Thanks for applying!
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
                <Text style={styles.paragraph}>Hey {userFirstname}!</Text>
                <Text style={styles.paragraph}>
                    Thanks for applying to EurekaHACKS 2025! Your hacker application has been successfully submitted.
                    We will review your application and get back to you soon. If you have any questions or concerns,
                    please contact <a href="mailto:hello@eurekahacks.ca">hello@eurekahacks.ca</a>.
                </Text>
                <Text style={styles.paragraph}>
                    Best,
                    <br/>
                    The EurekaHACKS Team
                </Text>
                <Hr style={styles.hr}/>
                <Text style={styles.footer}>
                    Copyright © EurekaHACKS, All rights reserved.
                </Text>
            </Container>
        </Body>
    </Html>
);

ApplicationSubmittedTemplate.PreviewProps = {
    userFirstname: "John",
    verificationLink: "https://example.com",
} as VerifyEmailTemplateProps;

export default ApplicationSubmittedTemplate;