"use client";

import styled from "styled-components";

/* =========================================================
   WRAPPER
========================================================= */

const BioWrapper = styled.section`
  position: relative;
  overflow: hidden;

  background: linear-gradient(
    180deg,
    #ffffff 0%,
    #f4f9ff 100%
  );

  border-radius: 32px;

  padding: 2.5rem;

  margin-bottom: 2rem;

  border: 1px solid rgba(0, 86, 179, 0.1);

  box-shadow:
    0 20px 45px rgba(0, 86, 179, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);

  @media (max-width: 768px) {
    padding: 1.6rem;
    border-radius: 24px;
  }
`;

/* =========================================================
   BACKGROUND GLOWS
========================================================= */

const Glow = styled.div`
  position: absolute;

  top: -120px;
  right: -120px;

  width: 280px;
  height: 280px;

  border-radius: 50%;

  background: rgba(0, 86, 179, 0.05);

  filter: blur(10px);
`;

const Glow2 = styled.div`
  position: absolute;

  bottom: -100px;
  left: -100px;

  width: 220px;
  height: 220px;

  border-radius: 50%;

  background: rgba(59, 130, 246, 0.06);

  filter: blur(10px);
`;

/* =========================================================
   HEADER
========================================================= */

const BioHeader = styled.div`
  position: relative;
  z-index: 2;

  margin-bottom: 2rem;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconBox = styled.div`
  width: 58px;
  height: 58px;

  border-radius: 18px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: linear-gradient(
    135deg,
    #0056b3,
    #3b82f6
  );

  color: white;

  font-size: 1.4rem;

  box-shadow: 0 10px 25px rgba(0, 86, 179, 0.2);
`;

const TitleWrap = styled.div``;

const BioTitle = styled.h2`
  margin: 0;

  font-size: clamp(2rem, 4vw, 2.8rem);

  font-weight: 900;

  letter-spacing: -1px;

  color: #0056b3;
`;

const BioSub = styled.p`
  margin: 0.35rem 0 0;

  color: #64748b;

  font-size: 0.95rem;
`;

const BioDivider = styled.div`
  width: 90px;
  height: 5px;

  border-radius: 999px;

  margin-top: 1.2rem;

  background: linear-gradient(
    90deg,
    #0056b3,
    #60a5fa
  );
`;

/* =========================================================
   CONTENT CARD
========================================================= */

const ContentCard = styled.div`
  position: relative;
  z-index: 2;

  background: rgba(255, 255, 255, 0.72);

  border-radius: 24px;

  padding: 2rem;

  border: 1px solid rgba(0, 86, 179, 0.08);

  backdrop-filter: blur(12px);

  box-shadow:
    0 10px 25px rgba(0, 86, 179, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);

  @media (max-width: 768px) {
    padding: 1.3rem;
  }
`;

const QuoteMark = styled.div`
  position: absolute;

  top: 18px;
  left: 20px;

  font-size: 5rem;

  color: rgba(0, 86, 179, 0.08);

  font-weight: 900;

  line-height: 1;
`;

const BioContent = styled.p`
  position: relative;
  z-index: 2;

  margin: 0;

  font-size: 1.02rem;

  line-height: 2;

  color: #1e293b;

  white-space: pre-line;

  letter-spacing: 0.2px;

  @media (max-width: 768px) {
    font-size: 0.96rem;
    line-height: 1.9;
  }
`;

const BottomAccent = styled.div`
  margin-top: 2rem;

  display: flex;
  gap: 0.7rem;
`;

const Dot = styled.div`
  width: ${(p) => p.$lg ? "40px" : "10px"};
  height: 10px;

  border-radius: 999px;

  background: ${(p) =>
    p.$lg
      ? "linear-gradient(90deg,#0056b3,#3b82f6)"
      : "rgba(0,86,179,0.2)"};
`;

/* =========================================================
   COMPONENT
========================================================= */

export default function BiographySection1({
  bio,
}) {
  if (!bio) return null;

  return (
    <BioWrapper>
      <Glow />
      <Glow2 />

      <BioHeader>
        <TopRow>
          <IconBox>✦</IconBox>

          <TitleWrap>
            <BioTitle>Biography</BioTitle>

            <BioSub>
              Personal story, background, and
              professional journey
            </BioSub>
          </TitleWrap>
        </TopRow>

        <BioDivider />
      </BioHeader>

      <ContentCard>
        <QuoteMark>“</QuoteMark>

        <BioContent>{bio}</BioContent>

        <BottomAccent>
          <Dot $lg />
          <Dot />
          <Dot />
        </BottomAccent>
      </ContentCard>
    </BioWrapper>
  );
}