"use client";

import styled from "styled-components";

const Container = styled.div`
  max-width: 900px;
  margin: auto;
  padding: 3rem 1rem;
  color: #111;
  line-height: 1.7;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 800;
  color: #0056b3;
  margin-bottom: 1rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const H2 = styled.h2`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #0056b3;
`;

const Text = styled.p`
  font-size: 0.95rem;
  color: #333;
`;

export default function PrivacyPolicyPage() {
  return (
    <Container>
      <Title>Privacy Policy</Title>

      <Section>
        <Text>
          This Privacy Policy explains how we collect, use, store, and protect
          your information when you use our portfolio builder platform.
          By using this platform, you agree to this policy.
        </Text>
      </Section>

      <Section>
        <H2>1. Information We Collect</H2>
        <Text>
          We collect information you provide directly when creating an account,
          building your portfolio, or subscribing to our services. This may
          include your name, email address, profile information, payment
          details, and any content you upload such as text, images, and links.
        </Text>
      </Section>

      <Section>
        <H2>2. How We Use Your Information</H2>
        <Text>
          We use your information to provide and improve our services, enable
          portfolio creation, process payments, manage subscriptions, and
          provide customer support. We may also use your information to send
          important service updates.
        </Text>
      </Section>

      <Section>
        <H2>3. Public Profiles</H2>
        <Text>
          When you publish a portfolio, certain information becomes publicly
          accessible through your unique link. This may include your name,
          profile image, biography, projects, and any content you choose to
          display. You are responsible for what you make public.
        </Text>
      </Section>

      <Section>
        <H2>4. Subscriptions & Payments</H2>
        <Text>
          We use third-party payment processors to handle payments securely.
          We do not store full credit card details on our servers. Subscription
          status and expiry dates are stored to manage access to premium
          features.
        </Text>
      </Section>

      <Section>
        <H2>5. Data Storage</H2>
        <Text>
          Your data is securely stored using cloud services such as Firebase.
          We take reasonable measures to protect your data, but no system is
          100% secure.
        </Text>
      </Section>

      <Section>
        <H2>6. Data Sharing</H2>
        <Text>
          We do not sell your personal data. We may share limited data with
          trusted service providers (such as payment processors and analytics
          tools) strictly to operate the platform.
        </Text>
      </Section>

      <Section>
        <H2>7. Cookies & Analytics</H2>
        <Text>
          We may use cookies and analytics tools to improve user experience,
          track usage, and understand platform performance.
        </Text>
      </Section>

      <Section>
        <H2>8. Account Responsibility</H2>
        <Text>
          You are responsible for maintaining the confidentiality of your
          account and ensuring that content you publish does not violate any
          laws or third-party rights.
        </Text>
      </Section>

      <Section>
        <H2>9. Subscription Termination</H2>
        <Text>
          If your subscription expires or is cancelled, access to premium
          features and public visibility may be restricted until renewal.
        </Text>
      </Section>

      <Section>
        <H2>10. Limitation of Liability</H2>
        <Text>
          We are not responsible for any loss, damage, or issues arising from
          the use of publicly shared portfolio links or user-generated content.
        </Text>
      </Section>

      <Section>
        <H2>11. Changes to This Policy</H2>
        <Text>
          We may update this Privacy Policy from time to time. Continued use of
          the platform means you accept any updated version.
        </Text>
      </Section>

      <Section>
        <H2>12. Contact Us</H2>
        <Text>
          If you have any questions about this Privacy Policy, contact us at:
          <br />
          📧 echobyteconcept@gmail.com
        </Text>
      </Section>
    </Container>
  );
}