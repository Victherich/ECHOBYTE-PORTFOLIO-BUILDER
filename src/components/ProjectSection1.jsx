"use client";

import styled from "styled-components";

/* ================= STYLES ================= */

const Wrapper = styled.section`
  background: #f0f7ff;
  border-radius: 24px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(0, 86, 179, 0.15);
  box-shadow: 0 12px 24px rgba(0, 86, 179, 0.08);
`;

const Header = styled.div`
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #0056b3;
  margin: 0;
`;

const Divider = styled.div`
  width: 60px;
  height: 4px;
  background: #0056b3;
  border-radius: 2px;
  margin-top: 6px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 18px;
  padding: 1.25rem;
  border: 1px solid rgba(0, 86, 179, 0.15);
  display: flex;
  flex-direction: column;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0, 86, 179, 0.15);
  }
`;

const ProjectName = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 8px;
  color: #111827;
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: #4b5563;
  line-height: 1.5;
  margin: 0 0 12px;
`;

const Tech = styled.span`
  align-self: flex-start;
  background: rgba(0, 86, 179, 0.08);
  color: #0056b3;
  border: 1px solid rgba(0, 86, 179, 0.2);
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 12px;
`;

const LinksRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
`;

const LinkBtn = styled.a`
  flex: 1;
  text-align: center;
  padding: 8px 10px;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 10px;
  text-decoration: none;
  transition: 0.2s;

  background: ${(p) => (p.$primary ? "#0056b3" : "white")};
  color: ${(p) => (p.$primary ? "white" : "#0056b3")};
  border: 1px solid #0056b3;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

/* ================= COMPONENT ================= */

export default function ProjectSection1({ projects }) {
  if (!projects || !Array.isArray(projects) || projects.length === 0)
    return null;

  return (
    <Wrapper>
      <Header>
        <Title>Projects</Title>
        <Divider />
      </Header>

      <Grid>
        {projects.map((project, i) => (
          <Card key={i}>
            <ProjectName>{project.name || "Untitled Project"}</ProjectName>

            {project.description && (
              <Description>{project.description}</Description>
            )}

            {project.skillsUsed && <Tech>{project.skillsUsed}</Tech>}

         <LinksRow>


  {project.liveLink && (
    <LinkBtn
      href={project.liveLink}
      target="_blank"
      rel="noopener noreferrer"
      $primary
    >
      Live Demo
    </LinkBtn>
  )}
</LinksRow>
          </Card>
        ))}
      </Grid>
    </Wrapper>
  );
}