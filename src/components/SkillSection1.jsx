"use client";

import styled from "styled-components";

// ====== Styles ======
const SkillsWrapper = styled.section`
  background: #f0f6ff;
  border-radius: 24px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(0, 86, 179, 0.1);
  // box-shadow: 0 15px 30px rgba(0, 86, 179, 0.05);
`;

const SkillsHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const SkillsTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #0056b3;
  margin: 0;
`;

const SkillsDivider = styled.div`
  width: 60px;
  height: 4px;
  background: #0056b3;
  border-radius: 2px;
  margin-top: 6px;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
`;

const SkillCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 1rem 1.25rem;
  border: 1px solid rgba(0, 86, 179, 0.15);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 86, 179, 0.12);
  }
`;

const SkillName = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.5rem 0;
`;

const SkillLevel = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: #ffffff;
  background-color: #0056b3;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  text-transform: uppercase;
`;

// ====== Component ======
export default function SkillSection1({ skills }) {
  if (!skills || !Array.isArray(skills) || skills.length === 0) return null;

  return (
    <SkillsWrapper>
      <SkillsHeader>
        <SkillsTitle>Skills</SkillsTitle>
        <SkillsDivider />
      </SkillsHeader>

      <SkillsGrid>
        {skills.map((skill, idx) => (
          <SkillCard key={idx}>
            <SkillName>{skill.skillName}</SkillName>
            <SkillLevel>{skill.level}</SkillLevel>
          </SkillCard>
        ))}
      </SkillsGrid>
    </SkillsWrapper>
  );
}