"use client";

import styled from "styled-components";

/* ================= COLORS ================= */

const Blue = "#2563eb";
const Dark = "#0f172a";
const Text = "#475569";
const Light = "#f8fafc";

/* ================= SECTION ================= */

const Section = styled.section`
  padding: 6rem 1.5rem;
  background: ${Light};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

/* ================= HEADER ================= */

const Badge = styled.div`
  padding: 6px 14px;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.1);
  color: ${Blue};
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  color: ${Dark};
  letter-spacing: -1px;
`;

const Subtitle = styled.p`
  margin-top: 1rem;
  max-width: 750px;
  color: ${Text};
  line-height: 1.7;
`;

/* ================= GRID ================= */

const Grid = styled.div`
  margin-top: 3.5rem;
  width: 100%;
  max-width: 1100px;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
`;

/* ================= CARD ================= */

const Card = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 18px;

  padding: 2rem;
  text-align: left;

  transition: 0.3s ease;
  box-shadow: 0 10px 25px rgba(2, 6, 23, 0.05);

  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(37, 99, 235, 0.3);
    box-shadow: 0 18px 40px rgba(37, 99, 235, 0.12);
  }
`;

const Icon = styled.div`
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 800;
  color: ${Dark};
  margin-bottom: 0.5rem;
`;

const CardText = styled.p`
  color: ${Text};
  font-size: 0.95rem;
  line-height: 1.6;
`;

/* ================= COMPONENT ================= */

export default function FeaturesSection() {
  return (
    <Section>

      <Badge>Everything You Need</Badge>

      <Title>
        A powerful portfolio system built for modern creators
      </Title>

      <Subtitle>
        Whether you’re a developer, musician, designer, student, or entrepreneur —
        your identity deserves more than scattered links and random social media pages.
      </Subtitle>

      <Grid>

        <Card>
          <Icon>🎨</Icon>
          <CardTitle>Multiple Themes</CardTitle>
          <CardText>
            Choose from clean modern designs to match your personality.
            Switch styles anytime to keep your portfolio fresh and unique.
          </CardText>
        </Card>

        <Card>
          <Icon>⚡</Icon>
          <CardTitle>No Coding Required</CardTitle>
          <CardText>
            Build your full portfolio without writing a single line of code.
            Everything is visual, fast, and beginner friendly.
          </CardText>
        </Card>

        <Card>
          <Icon>👤</Icon>
          <CardTitle>Multiple Profiles</CardTitle>
          <CardText>
            Create different profiles for different careers — music, tech, business,
            content creation — all under one account.
          </CardText>
        </Card>

        <Card>
          <Icon>🌍</Icon>
          <CardTitle>Professional Identity</CardTitle>
          <CardText>
            Your portfolio becomes your online identity — a central place
            that represents everything you do.
          </CardText>
        </Card>

        <Card>
          <Icon>🔗</Icon>
          <CardTitle>One Shareable Link</CardTitle>
          <CardText>
            Share your work anywhere with a single link that contains
            everything about you.
          </CardText>
        </Card>

        <Card>
          <Icon>🚀</Icon>
          <CardTitle>Built for Growth</CardTitle>
          <CardText>
            Designed to help you get discovered, build credibility,
            and grow your audience or career faster.
          </CardText>
        </Card>

      </Grid>

    </Section>
  );
}