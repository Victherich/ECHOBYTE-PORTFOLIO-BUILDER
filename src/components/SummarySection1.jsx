"use client";

import styled from "styled-components";

/* ================= WRAPPER ================= */

const SummaryWrapper = styled.section`
  position: relative;
  overflow: hidden;

  background: linear-gradient(180deg, #f8fbff 0%, #eef6ff 100%);
  border-radius: 32px;

  padding: 2.5rem;
  margin-bottom: 2rem;

  border: 1px solid rgba(0, 86, 179, 0.12);

  box-shadow:
    0 18px 45px rgba(0, 86, 179, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);

  @media (max-width: 768px) {
    padding: 1.6rem;
    border-radius: 24px;
  }
`;

/* ================= GLOW EFFECTS ================= */

const Glow = styled.div`
  position: absolute;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  top: -140px;
  right: -120px;
  background: rgba(0, 86, 179, 0.06);
  filter: blur(12px);
`;

const Glow2 = styled.div`
  position: absolute;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  bottom: -90px;
  left: -90px;
  background: rgba(59, 130, 246, 0.08);
  filter: blur(12px);
`;

/* ================= HEADER ================= */

const Header = styled.div`
  position: relative;
  z-index: 2;
  margin-bottom: 2rem;
`;

const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconBox = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 18px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: linear-gradient(135deg, #0056b3, #3b82f6);
  color: white;

  font-size: 1.4rem;

  box-shadow: 0 12px 28px rgba(0, 86, 179, 0.2);
`;

const TitleWrap = styled.div``;

const Title = styled.h2`
  margin: 0;
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  font-weight: 900;
  letter-spacing: -1px;
  color: #0056b3;
`;

const Subtitle = styled.p`
  margin: 0.3rem 0 0;
  color: #64748b;
  font-size: 0.95rem;
`;

const Divider = styled.div`
  width: 90px;
  height: 5px;
  border-radius: 999px;
  margin-top: 1rem;
  background: linear-gradient(90deg, #0056b3, #60a5fa);
`;

/* ================= CONTENT ================= */

const ContentGrid = styled.div`
  position: relative;
  z-index: 2;

  display: grid;
  gap: 1.2rem;
`;

/* ================= CARD ================= */

const SummaryCard = styled.div`
  position: relative;

  background: rgba(255, 255, 255, 0.88);
  border-radius: 22px;

  padding: 1.4rem 1.4rem;

  border: 1px solid rgba(0, 86, 179, 0.08);

  backdrop-filter: blur(12px);

  box-shadow:
    0 10px 25px rgba(0, 86, 179, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);

  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 18px 35px rgba(0, 86, 179, 0.14);
  }
`;

const QuoteMark = styled.div`
  font-size: 2.5rem;
  color: rgba(0, 86, 179, 0.15);
  position: absolute;
  top: 10px;
  left: 16px;
`;

const Text = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.8;
  color: #111827;
  white-space: pre-line;
  padding-left: 1.5rem;
`;

/* ================= COMPONENT ================= */

export default function SummarySection1({ summary }) {
  if (!summary || summary.length === 0) return null;

  return (
    <SummaryWrapper>
      <Glow />
      <Glow2 />

      {/* HEADER */}
      <Header>
        <HeaderTop>
          <IconBox>📝</IconBox>

          <TitleWrap>
            <Title>Summary</Title>
            {/* <Subtitle>
              A quick overview of profile highlights
            </Subtitle> */}
          </TitleWrap>
        </HeaderTop>

        <Divider />
      </Header>

      {/* CONTENT */}
      <ContentGrid>
        {summary.map((s) => (
          <SummaryCard key={s.id}>
            <QuoteMark>“</QuoteMark>
            <Text>{s.summary}</Text>
          </SummaryCard>
        ))}
      </ContentGrid>
    </SummaryWrapper>
  );
}