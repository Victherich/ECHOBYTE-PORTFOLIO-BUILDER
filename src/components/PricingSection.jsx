"use client";

import styled from "styled-components";
import Link from "next/link";

/* ================= COLORS ================= */

const Blue = "#2563eb";
const Dark = "#0f172a";
const Text = "#475569";
const Light = "#f8fafc";

/* ================= SECTION ================= */

const Section = styled.section`
  padding: 5px;
  background: ${Light};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

/* ================= HEADER ================= */

const Badge = styled.div`
  padding: 5px;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.1);
  color: ${Blue};
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 5px;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  color: ${Dark};
  letter-spacing: -1px;
  margin: 0;
`;

const Subtitle = styled.p`
  margin-top: 5px;
  max-width: 750px;
  color: ${Text};
  line-height: 1.7;
`;

/* ================= PRICING CARD ================= */

const Card = styled.div`
  margin-top: 5px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 18px;

  padding: 5px;
  width: 100%;
  max-width: 420px;

  box-shadow: 0 10px 25px rgba(2, 6, 23, 0.05);
`;

/* ================= PRICE ================= */

const Price = styled.div`
  font-size: 2rem;
  font-weight: 900;
  color: ${Dark};
`;

const SubPrice = styled.div`
  font-size: 0.9rem;
  color: ${Text};
  margin-top: 5px;
`;

/* ================= FEATURES ================= */

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 5px;

  display: flex;
  flex-direction: column;
  gap: 5px;

  color: ${Text};
  font-size: 0.95rem;
`;

/* ================= BUTTONS ================= */

const ButtonRow = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const PrimaryButton = styled(Link)`
  padding: 5px;
  border-radius: 10px;
  background: ${Blue};
  color: white;
  font-weight: 700;
  text-decoration: none;
  text-align: center;

  &:hover {
    opacity: 0.9;
  }
`;

const SecondaryButton = styled(Link)`
  padding: 5px;
  border-radius: 10px;
  border: 1px solid ${Blue};
  color: ${Blue};
  font-weight: 700;
  text-decoration: none;
  text-align: center;

  &:hover {
    background: rgba(37, 99, 235, 0.08);
  }
`;

/* ================= COMPONENT ================= */

export default function PricingSection() {
  return (
    <Section>

      <Badge>Simple Pricing</Badge>

      <Title>One Plan. Everything Included.</Title>

      <Subtitle>
        Build your full professional portfolio with no limits.
        Pay once per year and focus on your growth.
      </Subtitle>

      <Card>

        <Price>₦1000 / $2</Price>
        <SubPrice>per year (billed annually)</SubPrice>

        <List>
          <li>✔ Unlimited portfolio pages</li>
          <li>✔ Multiple profiles</li>
          <li>✔ Custom themes</li>
          <li>✔ Shareable public link</li>
          <li>✔ Mobile optimized design</li>
        </List>

        <ButtonRow>
          <PrimaryButton href="/signup">
            Get Started
          </PrimaryButton>

          <SecondaryButton href="/login">
            I already have an account
          </SecondaryButton>
        </ButtonRow>

      </Card>

    </Section>
  );
}