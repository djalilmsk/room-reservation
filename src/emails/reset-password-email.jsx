import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Img,
} from "@react-email/components";

const OTPEmail = ({ otpCode }) => {
  const otp1 = otpCode.slice(0, 3);
  const otp2 = otpCode.slice(3, 6);

  const digitStyle = {
    display: "inline-block",
    fontSize: "24px",
    margin: "0 4px",
    fontWeight: "bold",
    color: "#3792de",
  };

  const dividerStyle = {
    display: "inline-block",
    width: "8px",
    height: "2px",
    backgroundColor: "#3792de",
    margin: "0 8px",
    verticalAlign: "middle",
  };

  return (
    <Section style={{ textAlign: "center", marginTop: "16px" }}>
      <div
        style={{
          display: "inline-block",
          padding: "12px 24px",
          backgroundColor: "rgba(55, 146, 222, 0.1)",
          borderRadius: "8px",
          color: "#3792de",
        }}
      >
        {otp1.split("").map((digit, index) => (
          <span key={`otp1-${index}`} style={digitStyle}>
            {digit}
          </span>
        ))}

        <span style={dividerStyle} />

        {otp2.split("").map((digit, index) => (
          <span key={`otp2-${index}`} style={digitStyle}>
            {digit}
          </span>
        ))}
      </div>
    </Section>
  );
};

const ResetPasswordEmail = ({ userName = "User", otpCode = "123456" }) => {
  return (
    <Html>
      <Head />
      <Preview>Your OTP code to reset your password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://res.cloudinary.com/dio6jutii/image/upload/v1745086843/x71tqxbgyoj7nqh5uolo.png"
            alt="ROOM Logo"
            width="100"
            style={image}
          />

          <div
            style={{ borderBottom: "1px solid #ddd", margin: "40px 0 20px" }}
          ></div>

          <Text style={heading}>Hi {userName},</Text>
          <Text style={paragraph}>
            We received a request to reset the password for your account.
          </Text>
          <Text style={paragraph}>
            To proceed with resetting your password, please use the verification
            code provided below.
          </Text>
          <OTPEmail otpCode={otpCode} />
          <Text style={paragraph}>
            This code is valid for the next 10 minutes. If you did not request
            this, please ignore this email.
          </Text>
          <Text style={paragraph}>
            For your security, please do not share this code with anyone.
          </Text>
          <Text style={signature}>Thanks,</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default ResetPasswordEmail;

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: "Arial, sans-serif",
  padding: "20px",
};

const container = {
  backgroundColor: "#ffffff",
  padding: "40px",
  borderRadius: "8px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  maxWidth: "600px",
  margin: "0 auto",
  border: "1px solid #ddd",
};

const heading = {
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "20px",
  color: "#1e1e1e",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "1.6",
  marginBottom: "16px",
  color: "#333",
};

const signature = {
  fontSize: "16px",
  marginTop: "32px",
  color: "#333",
};

const image = {
  margin: "auto",
};
