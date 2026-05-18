"use client";

import styled from "styled-components";

/* =========================================================
   WRAPPER
========================================================= */

const SkillsWrapper = styled.section`
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

/* =========================================================
   DECORATIVE GLOWS
========================================================= */

const Glow = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
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
  bottom: -100px;
  left: -90px;
  background: rgba(59, 130, 246, 0.08);
  filter: blur(10px);
`;

/* =========================================================
   HEADER
========================================================= */

const SkillsHeader = styled.div`
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

const SkillsTitle = styled.h2`
  margin: 0;
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  font-weight: 900;
  letter-spacing: -1px;
  color: #0056b3;
`;

const SkillsSubtitle = styled.p`
  margin: 0.3rem 0 0;
  color: #64748b;
  font-size: 0.95rem;
`;

const SkillsDivider = styled.div`
  width: 90px;
  height: 5px;
  border-radius: 999px;
  margin-top: 1rem;

  background: linear-gradient(90deg, #0056b3, #60a5fa);
`;

/* =========================================================
   GRID
========================================================= */

const SkillsGrid = styled.div`
  position: relative;
  z-index: 2;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.2rem;
`;

/* =========================================================
   CARD
========================================================= */

const SkillCard = styled.div`
  position: relative;

  background: rgba(255, 255, 255, 0.85);
  border-radius: 22px;

  padding: 1.3rem 1.2rem;

  border: 1px solid rgba(0, 86, 179, 0.08);

  backdrop-filter: blur(12px);

  box-shadow:
    0 10px 25px rgba(0, 86, 179, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);

  transition: all 0.3s ease;

  overflow: hidden;

  &:hover {
    transform: translateY(-6px);
    box-shadow:
      0 18px 35px rgba(0, 86, 179, 0.14);
  }
`;

const SkillGlow = styled.div`
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  top: -50px;
  right: -50px;
  background: rgba(0, 86, 179, 0.05);
`;

/* =========================================================
   CONTENT
========================================================= */

const SkillTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const SkillIcon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 14px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 86, 179, 0.12);
  color: #0056b3;

  font-size: 1.1rem;
`;

const SkillName = styled.p`
  margin: 0;
  font-size: 1rem;
  font-weight: 800;
  color: #0f172a;
`;

const SkillLevel = styled.span`
  padding: 0.35rem 0.7rem;
  border-radius: 999px;

  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.5px;

  color: white;

  background: linear-gradient(135deg, #0056b3, #3b82f6);

  box-shadow: 0 6px 16px rgba(0, 86, 179, 0.18);
`;

const SkillBar = styled.div`
  margin-top: 1rem;
  height: 6px;
  border-radius: 999px;
  background: #e5efff;
  overflow: hidden;
`;

const SkillFill = styled.div`
  height: 100%;
  width: ${(p) => p.$level || "70%"};
  background: linear-gradient(90deg, #0056b3, #60a5fa);
  border-radius: 999px;
`;

/* =========================================================
   COMPONENT
========================================================= */

export default function SkillSection1({ skills }) {
  if (!skills || !Array.isArray(skills) || skills.length === 0) return null;

  const getPercent = (level) => {
    if (!level) return "60%";
    const map = {
      beginner: "35%",
      intermediate: "60%",
      advanced: "80%",
      expert: "95%",
    };
    return map[level.toLowerCase()] || "60%";
  };

  return (
    <SkillsWrapper>
      <Glow />
      <Glow2 />

      <SkillsHeader>
        <HeaderTop>
          <IconBox>⚡</IconBox>

          <TitleWrap>
            <SkillsTitle>Skills</SkillsTitle>
            <SkillsSubtitle>
              Technologies, tools, and expertise
            </SkillsSubtitle>
          </TitleWrap>
        </HeaderTop>

        <SkillsDivider />
      </SkillsHeader>

      <SkillsGrid>
        {skills.map((skill, idx) => (
          <SkillCard key={idx}>
            <SkillGlow />

            <SkillTop>
              <SkillIcon>💡</SkillIcon>
              <SkillLevel>{skill.level}</SkillLevel>
            </SkillTop>

            <div style={{ marginTop: "0.9rem" }}>
              <SkillName>{skill.skillName}</SkillName>

              <SkillBar>
                <SkillFill $level={getPercent(skill.level)} />
              </SkillBar>
            </div>
          </SkillCard>
        ))}
      </SkillsGrid>
    </SkillsWrapper>
  );
}