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
import * as React from "react";

interface AcceptanceEmailTemplateProps {
    firstName: string;
}

export const AcceptanceEmailTemplate = ({ firstName }: AcceptanceEmailTemplateProps) => (
    <Html>
        <Head />
        <Preview>Congratulations 🎉 — You're in at EurekaHACKS 2026!</Preview>
        <Body style={main}>
            <Container style={container}>
                <Img
                    src={`https://eurekahacks.ca/logo/bigComic.webp`}
                    width="50"
                    height="50"
                    alt="EurekaHACKS logo"
                    style={logo}
                />
                <Text style={paragraph}>Hey {firstName}!</Text>
                <Text style={paragraph}>
                    Congratulations — you've been accepted to EurekaHACKS 2026! We were blown away by the
                    applications we received this year, and we're excited to have you join us.
                </Text>
                <Text style={paragraph}>
                    <strong>Please RSVP to confirm your spot through your dashboard. Spots are limited, so make
                    sure to lock in your place as soon as possible!</strong>
                </Text>
                <Text style={paragraph}>
                    We'll be sending you more details about the event in the coming days — stay tuned. In the
                    meantime, if you have any questions feel free to reach out at{" "}
                    <a href="mailto:hello@eurekahacks.ca">hello@eurekahacks.ca</a>.
                </Text>
                <Text style={paragraph}>
                    Can't wait to see what you'll build!<br />
                    The EurekaHACKS Team
                </Text>
                <Hr style={hr} />
                <Text style={footer}>Copyright © EurekaHACKS 2026, All rights reserved.</Text>
            </Container>
        </Body>
    </Html>
);

AcceptanceEmailTemplate.PreviewProps = {
    firstName: "John",
} as AcceptanceEmailTemplateProps;

export default AcceptanceEmailTemplate;

const main = {
    backgroundColor: "#ffffff",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
    maxWidth: "560px",
};

const logo = {
    margin: "0 auto",
};

const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
};

const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
};

const footer = {
    color: "#8898aa",
    fontSize: "12px",
};
