"use client";

import styled from "styled-components";

// ====== Styles ======
const ExperienceWrapper = styled.section`
  background: #f0f7ff;
  border-radius: 24px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(0, 86, 179, 0.15);
  box-shadow: 0 12px 24px rgba(0, 86, 179, 0.08);
`;

const ExperienceHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const ExperienceTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #0056b3;
  margin: 0;
`;

const ExperienceDivider = styled.div`
  width: 60px;
  height: 4px;
  background: #0056b3;
  border-radius: 2px;
  margin-top: 6px;
`;

const ExperienceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
`;

const ExperienceCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 1rem 1.25rem;
  border: 1px solid rgba(0, 86, 179, 0.2);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 86, 179, 0.15);
  }
`;

const CompanyName = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.25rem 0;
`;

const JobTitle = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: #333;
  margin: 0 0 0.25rem 0;
`;

const Duration = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: #ffffff;
  background-color: #0056b3;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  align-self: flex-start;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`;

const Responsibilities = styled.p`
  font-size: 0.875rem;
  color: #555;
  margin: 0 0 0.5rem 0;
`;

const SkillsTag = styled.span`
  font-size: 0.75rem;
  color: #0056b3;
  background-color: #e0f2ff;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  text-transform: uppercase;
  margin-right: 0.25rem;
  margin-top: 0.25rem;
  display: inline-block;
`;

// ====== Component ======
export default function ExperienceSection1({ experiences }) {
  if (!experiences || !Array.isArray(experiences) || experiences.length === 0) return null;

  console.log(experiences)

  return (
    <ExperienceWrapper>
      <ExperienceHeader>
        <ExperienceTitle>Experience</ExperienceTitle>
        <ExperienceDivider />
      </ExperienceHeader>

      <ExperienceGrid>
        {experiences.map((exp, idx) => (
          <ExperienceCard key={idx}>
            <CompanyName>{exp.experiences[0].company}</CompanyName>
            <CompanyName>{exp.experiences[0].location}</CompanyName>
            <JobTitle>{exp.experiences[0].jobTitle}</JobTitle>
            <Duration>{exp.experiences[0].duration}</Duration>
            <Responsibilities>{exp.experiences[0].responsibilities}</Responsibilities>
            {exp.experiences[0].skills && exp.experiences[0].skills.split(",").map((skill, i) => (
              <SkillsTag key={i}>{skill.trim()}</SkillsTag>
            ))}
          </ExperienceCard>
        ))}
      </ExperienceGrid>
    </ExperienceWrapper>
  );
}