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

interface WaitlistEmailTemplateProps {
    firstName: string;
}

export const WaitlistEmailTemplate = ({ firstName }: WaitlistEmailTemplateProps) => (
    <Html>
        <Head />
        <Preview>Your EurekaHACKS 2026 Application Update</Preview>
        <Body style={main}>
            <Container style={container}>
                <Img
                    src={`https://eurekahacks.ca/logo/bigComic.webp`}
                    width="50"
                    height="50"
                    alt="EurekaHACKS logo"
                    style={logo}
                />
                <Text style={paragraph}>Hey {firstName},</Text>
                <Text style={paragraph}>
                    Thank you for applying to EurekaHACKS 2026! We were blown away by the quality of applications we
                    received this year. While we'd love to have everyone, spots are limited and we've placed you on our
                    waitlist.
                </Text>
                <Text style={paragraph}>
                    This means you're still in the running — if a spot opens up, we'll reach out to you right away. We
                    encourage you to keep an eye on your inbox over the coming days.
                </Text>
                <Text style={paragraph}>
                    If you have any questions, don't hesitate to contact us at{" "}
                    <a href="mailto:hello@eurekahacks.ca">hello@eurekahacks.ca</a>.
                </Text>
                <Text style={paragraph}>
                    Best,
                    <br />
                    The EurekaHACKS Team
                </Text>
                <Hr style={hr} />
                <Text style={footer}>Copyright © EurekaHACKS 2026, All rights reserved.</Text>
            </Container>
        </Body>
    </Html>
);

WaitlistEmailTemplate.PreviewProps = {
    firstName: "John",
} as WaitlistEmailTemplateProps;

export default WaitlistEmailTemplate;

const main = {
    backgroundColor: "#ffffff",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
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

const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
};

const footer = {
    color: "#8898aa",
    fontSize: "12px",
};
