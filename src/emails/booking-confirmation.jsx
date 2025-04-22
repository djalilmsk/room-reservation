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

function BookingConfirmation({
  userName = "user name",
  status = "confirmed",
  date = "April 22, 2025",
  bookingId = "BD-4de6e1",
  Room = "Meeting Room A",
}) {
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
            We’re happy to confirm that your booking demand request has been
            successfully received.
          </Text>
          <Text style={paragraph}>Here are the details of your request:</Text>

          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <tbody>
              <tr>
                <td style={tdStyle}>
                  <strong>Booking ID</strong>
                </td>
                <td style={tdStyle}>{bookingId}</td>
              </tr>
              <tr>
                <td style={tdStyle}>
                  <strong>Status</strong>
                </td>
                <td style={tdStyle}>
                  {status === "confirmed" ? "✅ Confirmed" : status}
                </td>
              </tr>
              <tr>
                <td style={tdStyle}>
                  <strong>Date Requested</strong>
                </td>
                <td style={tdStyle}>{date}</td>
              </tr>
              <tr>
                <td style={tdStyle}>
                  <strong>Requested Room</strong>
                </td>
                <td style={tdStyle}>{Room}</td>
              </tr>
            </tbody>
          </table>

          <Text style={paragraph}>
            You will receive further updates once the booking is finalized.
          </Text>
          <Text style={paragraph}>
            If you did not make this request, please disregard this message.
          </Text>
          <Text style={signature}>
            Thanks for using <b>ROOM</b>!
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default BookingConfirmation;

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

const tdStyle = {
  padding: "8px",
  border: "1px solid #e0e0e0",
};
