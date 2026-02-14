"use client";

import styled from "styled-components";

// ====== Styles ======
const EducationWrapper = styled.section`
  background: #f0f7ff;
  border-radius: 24px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(0, 86, 179, 0.15);
  box-shadow: 0 12px 24px rgba(0, 86, 179, 0.08);
`;

const EducationHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const EducationTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #0056b3;
  margin: 0;
`;

const EducationDivider = styled.div`
  width: 60px;
  height: 4px;
  background: #0056b3;
  border-radius: 2px;
  margin-top: 6px;
`;

const EducationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
`;

const EducationCard = styled.div`
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

const SchoolName = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.25rem 0;
`;

const Certificate = styled.p`
  font-size: 0.875rem;
  color: #555;
  margin: 0 0 0.5rem 0;
`;

const GraduationYear = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: #ffffff;
  background-color: #0056b3;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  align-self: flex-start;
  text-transform: uppercase;
`;

// ====== Component ======
export default function EducationSection1({ education }) {
  if (!education || !Array.isArray(education) || education.length === 0) return null;

  return (
    <EducationWrapper>
      <EducationHeader>
        <EducationTitle>Education</EducationTitle>
        <EducationDivider />
      </EducationHeader>

      <EducationGrid>
        {education.map((edu, idx) => (
          <EducationCard key={idx}>
            <SchoolName>{edu.school}</SchoolName>
            <Certificate>{edu.certificate}</Certificate>
            <GraduationYear>{edu.graduationYear}</GraduationYear>
          </EducationCard>
        ))}
      </EducationGrid>
    </EducationWrapper>
  );
}