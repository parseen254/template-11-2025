import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from '@react-email/components';
import * as React from 'react';

interface OTPVerificationEmailProps {
  verificationCode: string;
  expiryMinutes?: number;
}

export const OTPVerificationEmail: React.FC<Readonly<OTPVerificationEmailProps>> = ({
  verificationCode,
  expiryMinutes = 15,
}) => (
  <Html>
    <Head />
    <Preview>Your verification code: {verificationCode}</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header */}
        <Section style={header}>
          <Text style={companyName}>Your Company</Text>
        </Section>

        {/* Main Content */}
        <Section style={content}>
          <Heading style={h1}>Verification Required</Heading>

          <Text style={text}>
            We received a request to sign in to your account. Please use the
            verification code below to complete your sign-in:
          </Text>

          {/* OTP Code Box */}
          <Section style={codeContainer}>
            <Text style={codeText}>{verificationCode}</Text>
          </Section>

          <Text style={text}>
            This code will expire in <strong>{expiryMinutes} minutes</strong>.
          </Text>

          <Hr style={divider} />

          {/* Security Notice */}
          <Section style={securityNotice}>
            <Text style={securityTitle}>Security Notice</Text>
            <Text style={securityText}>
              • If you didn't request this code, you can safely ignore this email.
            </Text>
            <Text style={securityText}>
              • Never share this code with anyone. We will never ask you for your
              verification code.
            </Text>
            <Text style={securityText}>
              • This code can only be used once and expires after {expiryMinutes} minutes.
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              This message was sent to you because you requested a verification
              code for your account. If you didn't make this request, please
              contact our support team immediately.
            </Text>
            <Text style={footerTextSmall}>
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </Text>
          </Section>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default OTPVerificationEmail;

// Styles inspired by AWS email design
const main = {
  backgroundColor: '#f6f6f6',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '600px',
};

const header = {
  backgroundColor: '#232f3e',
  padding: '20px 30px',
};

const companyName = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0',
  padding: '0',
};

const content = {
  backgroundColor: '#ffffff',
  padding: '40px 30px',
};

const h1 = {
  color: '#232f3e',
  fontSize: '24px',
  fontWeight: '700',
  margin: '0 0 24px',
  padding: '0',
  lineHeight: '1.3',
};

const text = {
  color: '#333333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0 0 16px',
};

const codeContainer = {
  backgroundColor: '#f4f4f4',
  border: '2px dashed #d5d9d9',
  borderRadius: '8px',
  padding: '32px 24px',
  margin: '32px 0',
  textAlign: 'center' as const,
};

const codeText = {
  color: '#232f3e',
  fontSize: '32px',
  fontWeight: '700',
  letterSpacing: '8px',
  margin: '0',
  fontFamily: '"Courier New", Courier, monospace',
};

const divider = {
  borderColor: '#e5e5e5',
  margin: '32px 0',
};

const securityNotice = {
  backgroundColor: '#fffbf0',
  border: '1px solid #ffd700',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
};

const securityTitle = {
  color: '#ff9900',
  fontSize: '14px',
  fontWeight: '700',
  margin: '0 0 12px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
};

const securityText = {
  color: '#666666',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0 0 8px',
};

const footer = {
  marginTop: '32px',
};

const footerText = {
  color: '#666666',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0 0 16px',
};

const footerTextSmall = {
  color: '#999999',
  fontSize: '12px',
  lineHeight: '18px',
  margin: '0',
};
