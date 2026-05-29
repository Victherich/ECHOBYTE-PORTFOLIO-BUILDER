"use client";

import styled from "styled-components";

// ================= WRAPPER =================
const ExperienceWrapper = styled.section`
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
    padding: 1.5rem;
    border-radius: 24px;
  }
`;

// decorative glow
const Glow = styled.div`
  position: absolute;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: rgba(0, 86, 179, 0.06);
  top: -140px;
  right: -120px;
  filter: blur(12px);
`;

const Glow2 = styled.div`
  position: absolute;
  width: 240px;
  height: 240px;
  border-radius: 50%;
  background: rgba(59, 130, 246, 0.08);
  bottom: -100px;
  left: -100px;
  filter: blur(12px);
`;

// ================= HEADER =================
const ExperienceHeader = styled.div`
  position: relative;
  z-index: 2;
  margin-bottom: 2rem;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconBox = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: linear-gradient(135deg, #0056b3, #3b82f6);
  color: white;

  font-size: 1.6rem;

  box-shadow: 0 14px 30px rgba(0, 86, 179, 0.25);
`;

const TitleWrap = styled.div``;

const ExperienceTitle = styled.h2`
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.6rem);
  font-weight: 900;
  letter-spacing: -1px;
  color: #0056b3;
`;

const Subtitle = styled.p`
  margin: 0.3rem 0 0;
  color: #64748b;
  font-size: 0.95rem;
`;

const ExperienceDivider = styled.div`
  width: 110px;
  height: 5px;
  margin-top: 1.2rem;
  border-radius: 999px;

  background: linear-gradient(90deg, #0056b3, #60a5fa);
`;

// ================= GRID =================
const ExperienceGrid = styled.div`
  position: relative;
  z-index: 2;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.4rem;
`;

// ================= CARD =================
const ExperienceCard = styled.div`
  position: relative;
  overflow: hidden;

  background: rgba(255, 255, 255, 0.85);
  border-radius: 26px;

  padding: 1.6rem;

  border: 1px solid rgba(0, 86, 179, 0.1);

  backdrop-filter: blur(14px);

  box-shadow:
    0 12px 28px rgba(0, 86, 179, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);

  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 22px 50px rgba(0, 86, 179, 0.16);
  }
`;

const CardGlow = styled.div`
  position: absolute;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: rgba(59, 130, 246, 0.06);
  top: -70px;
  right: -70px;
`;

// ================= TOP =================
const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

const CompanyBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const CompanyName = styled.h3`
  margin: 0;
  font-size: 1.15rem;
  font-weight: 800;
  color: #0f172a;
`;

const Location = styled.p`
  margin: 0.3rem 0 0;
  font-size: 0.85rem;
  color: #64748b;
`;

const Duration = styled.span`
  padding: 0.55rem 0.9rem;
  border-radius: 999px;
  text-align:center;

  font-size: 0.75rem;
  font-weight: 800;

  background: linear-gradient(135deg, #0056b3, #3b82f6);
  color: white;

  box-shadow: 0 10px 20px rgba(0, 86, 179, 0.2);
`;

// ================= BODY =================
const JobTitle = styled.p`
  margin: 1rem 0 0;
  font-size: 1rem;
  font-weight: 700;
  color: #1e293b;
`;

const Responsibilities = styled.p`
  margin: 0.6rem 0 0;
  font-size: 0.9rem;
  line-height: 1.7;
  color: #475569;
`;

// ================= SKILLS =================
const SkillsWrap = styled.div`
  margin-top: 1.2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Skill = styled.span`
  padding: 0.45rem 0.75rem;
  border-radius: 999px;

  font-size: 0.75rem;
  font-weight: 600;

  color: #0056b3;
  background: rgba(0, 86, 179, 0.08);
  border: 1px solid rgba(0, 86, 179, 0.12);
`;

// ================= COMPONENT =================
export default function ExperienceSection1({ experiences }) {
  if (!experiences || !Array.isArray(experiences) || experiences.length === 0)
    return null;

  return (
    <ExperienceWrapper>
      <Glow />
      <Glow2 />

      <ExperienceHeader>
        <HeaderRow>
          <IconBox>💼</IconBox>

          <TitleWrap>
            <ExperienceTitle>Experience</ExperienceTitle>
            <Subtitle>Professional journey and work history</Subtitle>
          </TitleWrap>
        </HeaderRow>

        <ExperienceDivider />
      </ExperienceHeader>

      <ExperienceGrid>
        {experiences.map((exp, idx) => {
          const item = exp.experiences?.[0];

          if (!item) return null;

          return (
            <ExperienceCard key={idx}>
              <CardGlow />

              <TopRow>
                <CompanyBlock>
                  <CompanyName>{item.company}</CompanyName>
                  <Location>{item.location}</Location>
                </CompanyBlock>

                <Duration>{item.duration}</Duration>
              </TopRow>

              <JobTitle>Role: {item.jobTitle}</JobTitle>

              <Responsibilities>
                <b>Responsibilities:</b> {item.responsibilities}
              </Responsibilities>

              {/* {item.skills && (
                <SkillsWrap>
                  {item.skills
                    .split(",")
                    .map((skill, i) => (
                      <Skill key={i}>
                        {skill.trim()}
                      </Skill>
                    ))}
                </SkillsWrap>
              )} */}
            </ExperienceCard>
          );
        })}
      </ExperienceGrid>
    </ExperienceWrapper>
  );
}