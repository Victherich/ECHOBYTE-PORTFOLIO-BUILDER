"use client";

import styled from "styled-components";

/* =========================================================
   WRAPPER
========================================================= */

const EducationWrapper = styled.section`
  position: relative;
  overflow: hidden;

  background: linear-gradient(
    180deg,
    #f8fbff 0%,
    #eef6ff 100%
  );

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

/* =========================================================
   BACKGROUND DECORATION
========================================================= */

const Glow = styled.div`
  position: absolute;

  width: 320px;
  height: 320px;

  border-radius: 50%;

  top: -140px;
  right: -120px;

  background: rgba(0, 86, 179, 0.06);

  filter: blur(10px);
`;

const Glow2 = styled.div`
  position: absolute;

  width: 220px;
  height: 220px;

  border-radius: 50%;

  bottom: -90px;
  left: -90px;

  background: rgba(59, 130, 246, 0.08);

  filter: blur(10px);
`;

/* =========================================================
   HEADER
========================================================= */

const EducationHeader = styled.div`
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
  width: 62px;
  height: 62px;

  border-radius: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: linear-gradient(
    135deg,
    #0056b3,
    #3b82f6
  );

  color: white;

  font-size: 1.5rem;

  box-shadow: 0 12px 28px rgba(0, 86, 179, 0.2);
`;

const TitleWrap = styled.div``;

const EducationTitle = styled.h2`
  margin: 0;

  font-size: clamp(2rem, 4vw, 2.8rem);

  font-weight: 900;

  letter-spacing: -1px;

  color: #0056b3;
`;

const HeaderText = styled.p`
  margin: 0.35rem 0 0;

  color: #64748b;

  font-size: 0.96rem;
`;

const EducationDivider = styled.div`
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
   GRID
========================================================= */

const EducationGrid = styled.div`
  position: relative;
  z-index: 2;

  display: grid;

  grid-template-columns: repeat(
    auto-fit,
    minmax(280px, 1fr)
  );

  gap: 1.4rem;
`;

/* =========================================================
   CARD
========================================================= */

const EducationCard = styled.div`
  position: relative;

  background: rgba(255, 255, 255, 0.82);

  border-radius: 26px;

  padding: 1.5rem;

  border: 1px solid rgba(0, 86, 179, 0.08);

  backdrop-filter: blur(12px);

  transition: all 0.3s ease;

  overflow: hidden;

  box-shadow:
    0 10px 25px rgba(0, 86, 179, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);

  &:hover {
    transform: translateY(-7px);

    box-shadow:
      0 18px 35px rgba(0, 86, 179, 0.14),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
  }
`;

const CardGlow = styled.div`
  position: absolute;

  width: 160px;
  height: 160px;

  border-radius: 50%;

  top: -70px;
  right: -70px;

  background: rgba(0, 86, 179, 0.05);
`;

const TopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
`;

const SchoolIcon = styled.div`
  width: 58px;
  height: 58px;

  border-radius: 18px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: linear-gradient(
    135deg,
    rgba(0, 86, 179, 0.12),
    rgba(59, 130, 246, 0.12)
  );

  color: #0056b3;

  font-size: 1.5rem;

  flex-shrink: 0;
`;

const GraduationYear = styled.div`
  padding: 0.55rem 0.9rem;

  border-radius: 999px;

  background: linear-gradient(
    135deg,
    #0056b3,
    #3b82f6
  );

  color: white;

  font-size: 0.78rem;
  font-weight: 800;

  letter-spacing: 0.5px;

  box-shadow: 0 8px 18px rgba(0, 86, 179, 0.18);
`;

const SchoolContent = styled.div`
  margin-top: 1.3rem;
`;

const SchoolName = styled.h3`
  margin: 0;

  color: #0f172a;

  font-size: 1.15rem;

  font-weight: 800;

  line-height: 1.4;
`;

const Certificate = styled.p`
  margin: 0.7rem 0 0;

  color: #475569;

  font-size: 0.95rem;

  line-height: 1.7;
`;

const BottomLine = styled.div`
  margin-top: 1.5rem;

  width: 100%;
  height: 1px;

  background: linear-gradient(
    90deg,
    rgba(0, 86, 179, 0.15),
    transparent
  );
`;

const BottomDots = styled.div`
  display: flex;
  gap: 0.5rem;

  margin-top: 1rem;
`;

const Dot = styled.div`
  width: ${(p) => (p.$large ? "34px" : "8px")};
  height: 8px;

  border-radius: 999px;

  background: ${(p) =>
    p.$large
      ? "linear-gradient(90deg,#0056b3,#60a5fa)"
      : "rgba(0,86,179,0.15)"};
`;

/* =========================================================
   COMPONENT
========================================================= */

export default function EducationSection1({
  education,
}) {
  if (
    !education ||
    !Array.isArray(education) ||
    education.length === 0
  )
    return null;

  return (
    <EducationWrapper>
      <Glow />
      <Glow2 />

      <EducationHeader>
        <HeaderTop>
          <IconBox>🎓</IconBox>

          <TitleWrap>
            <EducationTitle>
              Education
            </EducationTitle>

            <HeaderText>
              Academic background, qualifications,
              and achievements
            </HeaderText>
          </TitleWrap>
        </HeaderTop>

        <EducationDivider />
      </EducationHeader>

      <EducationGrid>
        {education.map((edu, idx) => (
          <EducationCard key={idx}>
            <CardGlow />

            <TopRow>
              <SchoolIcon>🏛️</SchoolIcon>

              <GraduationYear>
                {edu.graduationYear}
              </GraduationYear>
            </TopRow>

            <SchoolContent>
              <SchoolName>
                {edu.school}
              </SchoolName>

              <Certificate>
                {edu.certificate}
              </Certificate>

              <BottomLine />

              <BottomDots>
                <Dot $large />
                <Dot />
                <Dot />
              </BottomDots>
            </SchoolContent>
          </EducationCard>
        ))}
      </EducationGrid>
    </EducationWrapper>
  );
}