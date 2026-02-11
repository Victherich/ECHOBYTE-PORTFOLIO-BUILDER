// src/app/about/page.js
"use client";

import styled from "styled-components";
import Link from "next/link";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #f0f4f8;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Text = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  text-align: center;
  margin-bottom: 2rem;
`;

const BackButton = styled(Link)`
  padding: 0.8rem 1.5rem;
  background-color: #0070f3;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: bold;

  &:hover {
    background-color: #005bb5;
  }
`;

export default function AboutPage() {
  return (
    <Container>
      <Title>About This Portfolio Builder</Title>
      <Text>
        This tool lets you create beautiful, customizable portfolios easily.
        Designed for developers, designers, and anyone wanting a professional
        online presence. It’s fast, easy to use, and completely free to start.
      </Text>
      <BackButton href="/">Back to Home</BackButton>
    </Container>
  );
}
