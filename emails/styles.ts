export const main = {
    backgroundColor: "#ffffff",
    fontFamily:
        "-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Oxygen-Sans,Ubuntu,Cantarell,\"Helvetica Neue\",sans-serif",
};

export const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
};

export const logo = {
    margin: "0 auto",
};

export const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
};

export const header = {
    fontSize: "20px",
    lineHeight: "30px",
    fontWeight: "bold",
    color: "#f8a93f",
};

export const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
};

export const footer = {
    color: "#8898aa",
    fontSize: "12px",
};

export const btnContainer = {
    textAlign: "center" as const,
};

export const btnContainerWithMargin = {
    ...btnContainer,
    margin: "32px 0",
};

export const button = {
    backgroundColor: "#fcc972",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "12px",
    cursor: "pointer",
};

export const buttonLarge = {
    ...button,
    borderRadius: "8px",
    padding: "16px 24px",
    fontWeight: "500",
};

export const highlightBox = {
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    padding: "20px",
    margin: "20px 0",
};

export const highlightText = {
    fontSize: "16px",
    lineHeight: "26px",
    margin: "0",
};

export const link = {
    color: "#ffd500"
};