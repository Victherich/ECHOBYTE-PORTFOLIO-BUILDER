"use client";

import { useState } from "react";
import styled from "styled-components";

/* ================= WRAPPER ================= */

const Wrapper = styled.section`
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
`;

/* ================= HEADER ================= */

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 900;
  color: #0056b3;
  margin: 0;
`;

const Divider = styled.div`
  width: 90px;
  height: 5px;
  border-radius: 999px;
  margin-top: 8px;
  background: linear-gradient(90deg, #0056b3, #60a5fa);
`;

/* ================= GRID ================= */

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.4rem;
`;

/* ================= CARD ================= */

const Card = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 24px;

  overflow: hidden;

  border: 1px solid rgba(0, 86, 179, 0.1);

  box-shadow: 0 10px 25px rgba(0, 86, 179, 0.06);

  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 35px rgba(0, 86, 179, 0.14);
  }
`;

/* ================= IMAGE ================= */

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;

  ${Card}:hover & {
    transform: scale(1.08);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;

  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.35),
    transparent
  );

  display: flex;
  justify-content: flex-end;
  align-items: flex-start;

  padding: 10px;
`;

const ViewBtn = styled.button`
  background: rgba(255, 255, 255, 0.9);
  border: none;

  padding: 6px 10px;
  border-radius: 10px;

  font-size: 0.75rem;
  font-weight: 700;

  cursor: pointer;

  &:hover {
    background: white;
  }
`;

/* ================= CONTENT ================= */

const Content = styled.div`
  padding: 1.2rem;
`;

const ProjectName = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 800;
  color: #0f172a;
`;

const Description = styled.p`
  margin: 0.6rem 0;
  font-size: 0.9rem;
  color: #475569;
  line-height: 1.6;
`;

const Tech = styled.span`
  display: inline-block;
  margin-top: 0.5rem;

  padding: 6px 10px;
  border-radius: 999px;

  background: rgba(0, 86, 179, 0.08);
  color: #0056b3;

  font-size: 0.75rem;
  font-weight: 700;
`;

/* ================= BUTTONS ================= */

const LinksRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 1rem;
`;

const LinkBtn = styled.a`
  flex: 1;
  text-align: center;

  padding: 8px 10px;
  border-radius: 10px;

  font-size: 0.8rem;
  font-weight: 700;

  text-decoration: none;

  background: ${(p) => (p.$primary ? "#0056b3" : "white")};
  color: ${(p) => (p.$primary ? "white" : "#0056b3")};

  border: 1px solid #0056b3;

  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

/* ================= MODAL ================= */

const Modal = styled.div`
  position: fixed;
  inset: 0;

  background: rgba(0, 0, 0, 0.8);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 999;
`;

const ModalImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  border-radius: 16px;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;

  background: white;
  border: none;

  padding: 10px 14px;
  border-radius: 10px;

  font-weight: 700;

  cursor: pointer;
`;

/* ================= COMPONENT ================= */

export default function ProjectSection1({ projects }) {
  const [openImage, setOpenImage] = useState(null);

  if (!projects || projects.length === 0) return null;

  return (
    <Wrapper>
      <Header>
        <Title>Projects</Title>
        <Divider />
      </Header>

      <Grid>
        {projects.map((project, i) => (
          <Card key={i}>
            {/* IMAGE */}
            {project.imageUrl && (
              <ImageWrapper>
                <ProjectImage src={project.imageUrl} alt={project.name} />

                <ImageOverlay>
                  <ViewBtn onClick={() => setOpenImage(project.imageUrl)}>
                    View
                  </ViewBtn>
                </ImageOverlay>
              </ImageWrapper>
            )}

            {/* CONTENT */}
            <Content>
              <ProjectName>
                {project.name || "Untitled Project"}
              </ProjectName>

              {project.description && (
                <Description>{project.description}</Description>
              )}

              {/* {project.skillsUsed && (
                <Tech>{project.skillsUsed}</Tech>
              )} */}

              <LinksRow>
                {project.liveLink && (
                  <LinkBtn
                    href={project.liveLink}
                    target="_blank"
                    $primary
                  >
                   Click to View Full Project
                  </LinkBtn>
                )}

                {project.github && (
                  <LinkBtn
                    href={project.github}
                    target="_blank"
                  >
                    Code
                  </LinkBtn>
                )}
              </LinksRow>
            </Content>
          </Card>
        ))}
      </Grid>

      {/* MODAL */}
      {openImage && (
        <Modal onClick={() => setOpenImage(null)}>
          <CloseBtn onClick={() => setOpenImage(null)}>
            Close
          </CloseBtn>
          <ModalImage src={openImage} />
        </Modal>
      )}
    </Wrapper>
  );
}