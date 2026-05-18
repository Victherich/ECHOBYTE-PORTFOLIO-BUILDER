"use client";

import { useState } from "react";
import styled from "styled-components";

/* =========================================================
   WRAPPER
========================================================= */

const Wrapper = styled.section`
  background: linear-gradient(
    180deg,
    #f8fbff 0%,
    #eef6ff 100%
  );

  border-radius: 30px;
  padding: 1rem;
  margin-bottom: 2rem;

  border: 1px solid rgba(0, 86, 179, 0.12);

  box-shadow:
    0 15px 40px rgba(0, 86, 179, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);

  overflow: hidden;
  position: relative;
`;

/* =========================================================
   HEADER
========================================================= */

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  margin: 0;

  font-size: clamp(2rem, 4vw, 2.7rem);
  font-weight: 800;

  color: #0056b3;
  letter-spacing: -1px;
`;

const Divider = styled.div`
  width: 80px;
  height: 5px;

  border-radius: 999px;

  margin-top: 10px;

  background: linear-gradient(
    90deg,
    #0056b3,
    #3b82f6
  );
`;

const Subtitle = styled.p`
  margin-top: 0.9rem;
  color: #5b6473;
  max-width: 650px;
  line-height: 1.6;
`;

/* =========================================================
   GRID
========================================================= */

const Grid = styled.div`
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));

  gap: 1.5rem;
`;

/* =========================================================
   CARD
========================================================= */

const Card = styled.div`
  background: rgba(255, 255, 255, 0.85);

  border-radius: 24px;

  overflow: hidden;

  border: 1px solid rgba(0, 86, 179, 0.12);

  backdrop-filter: blur(12px);

  transition: all 0.3s ease;

  box-shadow: 0 12px 24px rgba(0, 86, 179, 0.08);

  &:hover {
    transform: translateY(-6px);

    box-shadow: 0 20px 40px rgba(0, 86, 179, 0.14);
  }
`;

/* =========================================================
   IMAGE
========================================================= */

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
`;

const CertificateImage = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;

  display: block;

  cursor: pointer;

  transition: transform 0.4s ease;

  ${Card}:hover & {
    transform: scale(1.04);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;

  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.45),
    transparent
  );

  display: flex;
  align-items: flex-end;

  padding: 1rem;
`;

const OverlayText = styled.div`
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
`;

/* =========================================================
   CONTENT
========================================================= */

const Content = styled.div`
  padding: 1.3rem;
`;

const CertificateName = styled.h3`
  margin: 0;

  color: #111827;

  font-size: 1.2rem;
  font-weight: 800;
`;

const Organization = styled.p`
  margin: 0.55rem 0 0;

  color: #0056b3;

  font-size: 0.95rem;
  font-weight: 700;
`;

const DateBadge = styled.div`
  margin-top: 1rem;

  display: inline-flex;
  align-items: center;
  gap: 0.4rem;

  padding: 0.45rem 0.8rem;

  border-radius: 999px;

  background: rgba(0, 86, 179, 0.08);

  border: 1px solid rgba(0, 86, 179, 0.12);

  color: #0056b3;

  font-size: 0.8rem;
  font-weight: 700;
`;

const Footer = styled.div`
  margin-top: 1.3rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ViewButton = styled.button`
  border: none;

  background: linear-gradient(
    135deg,
    #0056b3,
    #0a6dd9
  );

  color: white;

  padding: 0.75rem 1rem;

  border-radius: 14px;

  font-size: 0.85rem;
  font-weight: 700;

  cursor: pointer;

  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    opacity: 0.95;
  }
`;

/* =========================================================
   MODAL
========================================================= */

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;

  background: rgba(0, 0, 0, 0.82);

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 9999;

  padding: 1rem;
`;

const ModalContent = styled.div`
  position: relative;

  width: 100%;
  max-width: 1200px;

  animation: fadeIn 0.25s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.96);
    }

    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const ModalImage = styled.img`
  width: 100%;
  max-height: 92vh;

  object-fit: contain;

  border-radius: 18px;

  background: white;
`;

const CloseBtn = styled.button`
  position: absolute;

  top: -12px;
  right: -12px;

  width: 42px;
  height: 42px;

  border-radius: 50%;
  border: none;

  background: white;

  color: #0056b3;

  font-size: 1.2rem;
  font-weight: 900;

  cursor: pointer;

  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
`;

/* =========================================================
   COMPONENT
========================================================= */

export default function CertificationsSection1({
  certifications,
}) {
  const [selectedImage, setSelectedImage] = useState(null);

  if (
    !certifications ||
    !Array.isArray(certifications) ||
    certifications.length === 0
  ) {
    return null;
  }

  return (
    <>
      <Wrapper>
        <Header>
          <Title>Certifications</Title>

          <Divider />

          <Subtitle>
            Professional certifications, completed
            trainings, and verified achievements.
          </Subtitle>
        </Header>

        <Grid>
          {certifications.map((cert, idx) => (
            <Card key={idx}>
              <ImageWrapper>
                <CertificateImage
                  src={cert.image}
                  alt={cert.name}
                  onClick={() =>
                    setSelectedImage(cert.image)
                  }
                />

                <ImageOverlay   onClick={() =>
                      setSelectedImage(cert.image)
                    }>
                  <OverlayText>
                    Click to view certificate
                  </OverlayText>
                </ImageOverlay>
              </ImageWrapper>

              <Content>
                <CertificateName>
                  {cert.name}
                </CertificateName>

                <Organization>
                  {cert.organization}
                </Organization>

                {cert.issueDate && (
                  <DateBadge>
                    Issued: {cert.issueDate}
                  </DateBadge>
                )}

                <Footer>
                  <ViewButton
                    onClick={() =>
                      setSelectedImage(cert.image)
                    }
                  >
                    View Certificate
                  </ViewButton>
                </Footer>
              </Content>
            </Card>
          ))}
        </Grid>
      </Wrapper>

      {selectedImage && (
        <ModalOverlay
          onClick={() => setSelectedImage(null)}
        >
          <ModalContent
            onClick={(e) => e.stopPropagation()}
          >
            <CloseBtn
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </CloseBtn>

            <ModalImage
              src={selectedImage}
              alt="Certificate"
            />
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}