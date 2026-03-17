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

interface RejectionEmailTemplateProps {
    firstName: string;
}

export const RejectionEmailTemplate = ({ firstName }: RejectionEmailTemplateProps) => (
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
                    Thank you so much for applying to EurekaHACKS 2026. After careful consideration, we regret to
                    inform you that we are unable to offer you a spot at this year's event. We received an overwhelming
                    number of applications and the decision was incredibly difficult.
                </Text>
                <Text style={paragraph}>
                    We hope you continue to pursue your passion for technology and innovation, and we encourage you to
                    apply again in future iterations of EurekaHACKS. If you have any questions, feel free to reach out
                    to us at <a href="mailto:hello@eurekahacks.ca">hello@eurekahacks.ca</a>.
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

RejectionEmailTemplate.PreviewProps = {
    firstName: "John",
} as RejectionEmailTemplateProps;

export default RejectionEmailTemplate;

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
