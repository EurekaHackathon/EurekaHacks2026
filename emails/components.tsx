import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import type { ComponentProps, ReactNode } from "react";
import * as styles from "./styles";

type TextProps = ComponentProps<typeof Text>;

export const Paragraph = ({ style, ...props }: TextProps) => (
    <Text style={{ ...styles.paragraph, ...(style ?? {}) }} {...props} />
);

export const Header = ({ style, ...props }: TextProps) => (
    <Text style={{ ...styles.header, ...(style ?? {}) }} {...props} />
);

interface LinkProps {
    href: string,
    children: ReactNode,
}

//TODO: think of a better name for this component
export const A = ({ href, children }: LinkProps ) => (
    <Link style={styles.link} href={href} target="_blank">
        {children}
    </Link>
);

interface ButtonProps {
    url: string;
    text?: string;
}

export const LinkButton = ({ url, text = "Verify email" }: ButtonProps) => (
    <Section style={styles.btnContainer}>
        <Button style={styles.button} href={url}>
            {text}
        </Button>
    </Section>
);

export const HighlightSection = ({ children }: { children: ReactNode }) => (
    <Section style={styles.highlightBox}>
        <Text style={styles.highlightText}>
            {children}
        </Text>
    </Section>
);

interface EmailProps {
    children: ReactNode;
    previewText?: string;
    unsubscribeLink?: string;
}

export const Email = ({ children, previewText, unsubscribeLink }: EmailProps) => (
    <Html>
        <Head />
        <Preview>
            {previewText}
        </Preview>
        <Body style={styles.main}>
            <Container style={styles.container}>
                <Img
                    src={`https://eurekahacks.ca/logo/bigComic.webp`}
                    width="100"
                    height="100"
                    alt="EurekaHACKS logo"
                    style={styles.logo}
                />
                {children}
                <Hr style={styles.hr} />
                <Text style={styles.footer}>
                    Copyright © EurekaHACKS, All rights reserved.
                    {unsubscribeLink && (
                        <>
                            {" | "}
                            <Link href={unsubscribeLink}>Unsubscribe</Link>
                        </>
                    )}
                </Text>
            </Container>
        </Body>
    </Html>
);