import React from "react";
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

interface IProps {
  name: string;
}

const WelcomeEmailTemplate: React.FC<Readonly<IProps>> = (
  props
): React.ReactElement => {
  const { name } = props;
  const baseUrl = process.env.APP_URL;
  return (
    <Html>
      <Head />
      <Preview>Never Miss a Todo Comment Again!</Preview>
      <Body style={main}>
        <Container style={container}>
          <div style={logo}>
            <div style={mainTitle}>
              <span>Dev</span>
              <span style={span}>Todo</span>
            </div>
          </div>
          <Hr style={hr} />
          <Text style={paragraph}>Hi {name},</Text>
          <Text style={paragraph}>
            Welcome to DevTodo, the platform with help of which you can easily
            keep track of all the pending TODOs in your project, ensuring that
            nothing slips through the cracks.
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={baseUrl}>
              Get started
            </Button>
          </Section>
          <Text style={paragraph}>
            Best,
            <br />
            Naveen
          </Text>
          <Hr style={hr} />
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeEmailTemplate;

const mainTitle = {
  color: "#FF4C29",
  fontSize: "1.875rem",
  fontWeight: 800,
};

const span = {
  color: "black",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const btnContainer = {
  textAlign: "center" as const,
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#FF4C29",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const logo = {
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
