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
import Link from "next/link";

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
            EurekaHACKS 2026 Applications are Now Open! 🚀
        </Preview>
        <Body style={main}>
            <Container style={container}>
                <Img
                    src={`https://eurekahacks.ca/logo/bigComic.webp`}
                    width="50"
                    height="50"
                    alt="EurekaHACKS logo"
                    style={logo}
                />
                <Text style={paragraph}>Hey!</Text>
                <Text style={paragraph}>
                    We're excited to announce that applications for EurekaHACKS 2026 are now open!
                </Text>
                <Section style={highlightBox}>
                    <Text style={highlightText}>
                        📍 Location: Abbey Park High School<br/>
                        📅 Date: May 1st - May 2nd, 2026<br/>
                        ⏰ Duration: 29 hours<br/>
                        💻 Open to all high school students
                    </Text>
                </Section>
                <Section style={btnContainer}>
                    <Button style={button} href={applicationLink}>
                        Apply Now
                    </Button>
                </Section>
                <Text style={paragraph}>
                    Questions? Feel free to reach out to us at <Link href="mailto:hello@eurekahacks.ca">
                    hello@eurekahacks.ca
                </Link>!
                </Text>
                <Text style={paragraph}>
                    Can't wait to see what you'll create!
                    <br/>
                    Best,
                    <br/>
                    The EurekaHACKS Team
                </Text>
                <Hr style={hr}/>
                <Text style={footer}>
                    Copyright © EurekaHACKS 2026, All rights reserved. | <Link target="_blank"
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

const main = {
    backgroundColor: "#ffffff",
    fontFamily:
        "-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Oxygen-Sans,Ubuntu,Cantarell,\"Helvetica Neue\",sans-serif",
};

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
};

const logo = {
    margin: "0 auto",
};

const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
};

const highlightBox = {
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    padding: "20px",
    margin: "20px 0",
};

const highlightText = {
    fontSize: "16px",
    lineHeight: "26px",
    margin: "0",
};

const btnContainer = {
    textAlign: "center" as const,
    margin: "32px 0",
};

const button = {
    backgroundColor: "#1a42c8",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "16px 24px",
    cursor: "pointer",
    fontWeight: "500",
};

const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
};

const footer = {
    color: "#8898aa",
    fontSize: "12px",
};