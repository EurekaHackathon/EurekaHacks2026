import * as React from "react";
import Link from "next/link";
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

interface ApplicationsOpenTemplateProps {
    applicationLink: string;
    unsubscribeLink: string;
}

export const ApplicationsOpenTemplate = ({
                                             applicationLink, unsubscribeLink
                                         }: ApplicationsOpenTemplateProps) => (
    <Html>
        <Head/>
        <Preview>
            EurekaHACKS 2025 Applications are Now Open! 🚀
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
                <Text style={styles.paragraph}>Hey!</Text>
                <Text style={styles.paragraph}>
                    We're excited to announce that applications for EurekaHACKS 2025 are now open!
                    Join us on April 5th, 2025 at Abbey Park High School for an unforgettable day of
                    innovation, learning, and fun.
                </Text>
                <Section style={styles.highlightBox}>
                    <Text style={styles.highlightText}>
                        📍 Location: Abbey Park High School<br/>
                        📅 Date: April 5th, 2025<br/>
                        ⏰ Duration: 12 hours<br/>
                        💻 Open to all high school students
                    </Text>
                </Section>
                <Section style={styles.btnContainerWithMargin}>
                    <Button style={styles.buttonLarge} href={applicationLink}>
                        Apply Now
                    </Button>
                </Section>
                <Text style={styles.paragraph}>
                    Questions? Feel free to reach out to us at <Link href="mailto:hello@eurekahacks.ca">
                    hello@eurekahacks.ca
                </Link>!
                </Text>
                <Text style={styles.paragraph}>
                    Can't wait to see what you'll create!
                    <br/>
                    Best,
                    <br/>
                    The EurekaHACKS Team
                </Text>
                <Hr style={styles.hr}/>
                <Text style={styles.footer}>
                    Copyright © EurekaHACKS 2025, All rights reserved. | <Link target="_blank"
                                                                               href={unsubscribeLink}>Unsubscribe</Link>
                </Text>
            </Container>
        </Body>
    </Html>
);

ApplicationsOpenTemplate.PreviewProps = {
    recipientFirstname: "John",
    applicationLink: "http://localhost:3000/dashboard",
    unsubscribeLink: "http://localhost:3000/unsubscribe?id=abcdefg",
} as ApplicationsOpenTemplateProps;

export default ApplicationsOpenTemplate;