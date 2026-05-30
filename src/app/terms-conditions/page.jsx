"use client";

import styled from "styled-components";

const Container = styled.div`
  max-width: 900px;
  margin: auto;
  padding: 3rem 1rem;
  line-height: 1.7;
  color: #111;
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
  font-size: 1.25rem;
  font-weight: 700;
  color: #0056b3;
  margin-bottom: 0.5rem;
`;

const Text = styled.p`
  font-size: 0.95rem;
  color: #333;
`;

export default function TermsPage() {
  return (
    <Container>
      <Title>Terms & Conditions</Title>

      <Section>
        <Text>
          By accessing or using this platform, you agree to be bound by these Terms & Conditions.
          If you do not agree, you must not use this platform.
        </Text>
      </Section>

      <Section>
        <H2>1. Platform Overview</H2>
        <Text>
          This platform allows users to create, customize, and publish online portfolio pages.
          Each user is responsible for the content they upload and share publicly through their unique link.
        </Text>
      </Section>

      <Section>
        <H2>2. Eligibility</H2>
        <Text>
          You must be at least 13 years old to use this platform. By using the service,
          you confirm that you meet this requirement.
        </Text>
      </Section>

      <Section>
        <H2>3. User Accounts</H2>
        <Text>
          You are responsible for maintaining the confidentiality of your account credentials.
          Any activity under your account is your responsibility.
        </Text>
      </Section>

      <Section>
        <H2>4. User Content</H2>
        <Text>
          You retain ownership of the content you upload. However, by using the platform,
          you grant us a non-exclusive, worldwide license to host, display, and distribute
          your content solely for the purpose of operating the service.
        </Text>
      </Section>

      <Section>
        <H2>5. Public Profiles</H2>
        <Text>
          Any content you choose to publish becomes publicly accessible via a unique link.
          You are solely responsible for ensuring that your published content does not violate
          any laws, rights, or third-party agreements.
        </Text>
      </Section>

      <Section>
        <H2>6. Prohibited Use</H2>
        <Text>
          You agree NOT to use the platform to:
          <br />• Upload illegal, harmful, or offensive content
          <br />• Impersonate others
          <br />• Violate intellectual property rights
          <br />• Attempt to hack, disrupt, or exploit the system
          <br />• Use the platform for fraudulent or abusive activity
        </Text>
      </Section>

      <Section>
        <H2>7. Subscriptions & Payments</H2>
        <Text>
          Some features require a paid subscription. Payments are processed through third-party providers.
          We do not store full payment details.
        </Text>
        <Text>
          All subscriptions are billed annually and are non-refundable unless stated otherwise.
          Failure to renew may result in loss of premium features and public visibility.
        </Text>
      </Section>

      <Section>
        <H2>8. No Guarantee of Availability</H2>
        <Text>
          We do not guarantee uninterrupted or error-free service. The platform may be modified,
          suspended, or discontinued at any time without liability.
        </Text>
      </Section>

      <Section>
        <H2>9. Limitation of Liability</H2>
        <Text>
          To the maximum extent permitted by law, we are not liable for any direct, indirect,
          incidental, or consequential damages arising from your use of the platform,
          including loss of data, business, or revenue.
        </Text>
      </Section>

      <Section>
        <H2>10. Content Responsibility</H2>
        <Text>
          We do not review or control user-generated content. You agree that we are not responsible
          for any content published by users, including portfolios, links, or descriptions.
        </Text>
      </Section>

      <Section>
        <H2>11. Account Suspension</H2>
        <Text>
          We reserve the right to suspend or terminate any account that violates these Terms,
          engages in abuse, fraud, or harms the integrity of the platform.
        </Text>
      </Section>

      <Section>
        <H2>12. Intellectual Property</H2>
        <Text>
          All platform branding, design, code, and features remain the exclusive property of the business.
          You may not copy, reproduce, or resell any part of the system without permission.
        </Text>
      </Section>

      <Section>
        <H2>13. Changes to Terms</H2>
        <Text>
          We may update these Terms at any time. Continued use of the platform after updates
          means you accept the revised Terms.
        </Text>
      </Section>

      <Section>
        <H2>14. Governing Law</H2>
        <Text>
          These Terms are governed by the laws of your operating jurisdiction.
          Any disputes will be handled in accordance with applicable legal frameworks.
        </Text>
      </Section>

      <Section>
        <H2>15. Contact</H2>
        <Text>
          If you have questions about these Terms, contact:
          <br />
          📧 echobyteconcept@gmail.com
        </Text>
      </Section>
    </Container>
  );
}