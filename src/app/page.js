"use client"; // required because we use hooks

import styled, { keyframes } from "styled-components";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useRouter } from "next/navigation";


// --- STYLED COMPONENTS ---

const Blue = "#007BFF";
const DarkBlue = "#0056b3";
const White = "#FFFFFF";
const LightGray = "#f8f9fa";

// Keyframes for animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeAndScale = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

const PageContainer = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  overflow-x: hidden;
`;

// --- SECTIONS ---
const Section = styled.section`
  padding: 6rem 1rem;
  text-align: center;
  background-color: ${(props) => props.background || White};
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const HeroSection = styled(Section)`
  color: ${White};
  background: linear-gradient(
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.6)
    ),
    url("/h1.jpg");
  background-size: cover;
  background-position: center;
`;

const Heading = styled.h2`
  font-size: 3rem;
  color: ${(props) => props.color || DarkBlue};
  margin-bottom: 1rem;
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${(props) => props.color || "#666"};
  max-width: 800px;
  margin-bottom: 2rem;
  line-height: 1.6;
  animation: ${fadeIn} 1s ease-out 0.3s forwards;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Button = styled.button`
  background-color: ${Blue};
  color: ${White};
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);

  &:hover {
    background-color: ${DarkBlue};
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 123, 255, 0.4);
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  width: 100%;
  max-width: 1200px;
`;

const FeatureCard = styled.div`
  background-color: ${White};
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${fadeAndScale} 0.8s ease-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const Icon = styled.span`
  font-size: 2.5rem;
  color: ${Blue};
  margin-bottom: 1rem;
  display: block;
`;

// --- MAIN COMPONENT ---
export default function LandingPage() {
  const router = useRouter();

  return (
    <PageContainer>


      {/* HERO SECTION */}
      <HeroSection>
        <Heading color={White}>
          Your All-in-One Online Showcase: Build a Portfolio & Manage All Your Links
        </Heading>
        <Subtitle color={White}>
          Create a stunning online portfolio and a single link to share all your important websites, social media, and projects. It's the simplest way to showcase everything you do.
        </Subtitle>
        <Button onClick={() => router.push("/login")}>Get Started Now</Button>
      </HeroSection>

      {/* FEATURES SECTION */}
      <Section id="features">
        <Heading>Why Choose ECHOBYTE?</Heading>
        <FeaturesGrid>
          <FeatureCard>
            <Icon>📝</Icon>
            <h3>Intuitive Editor</h3>
            <p>An easy-to-use editor lets you build and customize your pages without any coding. </p>
          </FeatureCard>
          <FeatureCard>
            <Icon>🎨</Icon>
            <h3>Stunning Designs</h3>
            <p>Choose from our different design themes and professional templates to quickly create a beautiful page that matches your style.</p>
          </FeatureCard>
          <FeatureCard>
            <Icon>🔗</Icon>
            <h3>Centralized Online Hub</h3>
            <p>Get a single, professional link that serves as your online resume and a central place for everyone to find your work and social media.</p>
          </FeatureCard>
          <FeatureCard>
            <Icon>💻</Icon>
            <h3>Showcase Your Projects</h3>
            <p>Showcase your work with live projects, photos, and videos. Whether it's code, design, or art, you can make your work stand out.</p>
          </FeatureCard>
          <FeatureCard>
            <Icon>🌐</Icon>
            <h3>Unified Link Manager</h3>
            <p>Combine all your social media profiles and links into one clean page. Perfect for Instagram bios or sharing with your network.</p>
          </FeatureCard>
        </FeaturesGrid>
      </Section>

      {/* HOW IT WORKS SECTION */}
      <Section id="how-it-works" background={LightGray}>
        <Heading>How It Works</Heading>
        <Subtitle>
          Creating a stunning portfolio and link page is as easy as 1-2-3.
        </Subtitle>
        <FeaturesGrid>
          <FeatureCard>
            <Icon>1️⃣</Icon>
            <h3>Sign Up</h3>
            <p>Sign up for a free account. It takes just a few minutes to get started.</p>
          </FeatureCard>
          <FeatureCard>
            <Icon>2️⃣</Icon>
            <h3>Build Your Page</h3>
            <p>Use our simple editor to add your projects, links, experience, and skills.</p>
          </FeatureCard>
          <FeatureCard>
            <Icon>3️⃣</Icon>
            <h3>Share Your Link</h3>
            <p>Your unique portfolio and link page is live and ready to be shared with everyone.</p>
          </FeatureCard>
        </FeaturesGrid>
      </Section>

 
    </PageContainer>
  );
}
