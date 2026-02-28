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

interface ApplicationsOpenTemplateProps {
    firstName: string;
}

export const ApplicationsDueTemplate = ({firstName}: ApplicationsOpenTemplateProps) => (
    <Html>
        <Head/>
        <Preview>
            🚨 EurekaHACKS 2025 applications are due tomorrow! 🚨
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
                <Text style={styles.paragraph}>Hey {firstName}!</Text>
                <Text style={styles.paragraph}>
                    We saw that you created a EurekaHACKS account but haven't submitted an application yet! Applications
                    are due on Saturday, March 22, 2025 at 11:59 PM EST. Applying only takes <strong>3</strong> minutes—no short answer
                    responses required. Don't miss out on free food, $11,000 in prizes
                    (including four 3D printers), and a ton of fun!
                </Text>
                <Section style={styles.btnContainerWithMargin}>
                    <Button style={styles.buttonLarge} href={"https://eurekahacks.ca/dashboard/application"}>
                        Apply Now
                    </Button>
                </Section>
                <Text style={styles.paragraph}>
                    Can't wait to see what you'll create!
                    <br/>
                    Best,
                    <br/>
                    The EurekaHACKS Team
                </Text>
                <Hr style={styles.hr}/>
                <Text style={styles.footer}>
                    Copyright © EurekaHACKS 2025, All rights reserved.
                </Text>
            </Container>
        </Body>
    </Html>
);

ApplicationsDueTemplate.PreviewProps = {
    firstName: "John",
} as ApplicationsOpenTemplateProps;

export default ApplicationsDueTemplate;