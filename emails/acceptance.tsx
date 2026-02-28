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
import * as React from "react";

interface ApplicationsOpenTemplateProps {
    firstName: string;
}

import * as styles from "./styles";

export const AcceptanceEmailTemplate = ({firstName}: ApplicationsOpenTemplateProps) => (
    <Html>
        <Head/>
        <Preview>
            Congratulations 🎉, See You At EurekaHACKS 2025!
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
                    We’re excited to have you as a hacker for EurekaHACKS 2025, our third hackathon iteration! (You are
                    one step closer to the Bambu). Join us from 8:00 AM to 9:30 PM on April 5th 2025 at 1455 Glen
                    Abbey Gate, Oakville to take part in a memorable day filled with fun workshops, exciting activities
                    and free food!
                </Text>
                <Text style={styles.paragraph}>
                    Here’s a sneak peek into this years event:
                    <br/>
                    🌟 $11,000+ prize pool including 4 Bambu Lab A1 minis
                    <br/>
                    🍎 Free lunch and dinner for all hackers!
                    <br/>
                    🛠 Take part in fun workshops!
                    <br/>
                    <br/>
                    Date: Saturday April 5th
                    <br/>
                    Time: 8:00 AM - 9:30 PM
                    <br/>
                    Venue address: 1455 Glen Abbey Gate, Oakville
                </Text>
                <Text style={styles.paragraph}>
                    <strong>
                        Please RSVP to confirm your spot at EurekaHACKS 2025 if you have not already! We’ll be sending
                        you more details about the event
                        in the following days, so stay tuned!
                    </strong>
                </Text>
                <Section style={styles.btnContainer}>
                    <Button style={styles.button} href={"https://eurekahacks.ca/dashboard/"}>
                        RSVP Now
                    </Button>
                </Section>
                <Text style={styles.paragraph}>
                    Can&apos;t wait to see what you&apos;ll create!
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

AcceptanceEmailTemplate.PreviewProps = {
    firstName: "John",
} as ApplicationsOpenTemplateProps;

export default AcceptanceEmailTemplate;