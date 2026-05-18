// "use client"; // required because we use hooks

// import styled, { keyframes } from "styled-components";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import Image from "next/image";
// import { useRouter } from "next/navigation";


// // --- STYLED COMPONENTS ---

// const Blue = "#007BFF";
// const DarkBlue = "#0056b3";
// const White = "#FFFFFF";
// const LightGray = "#f8f9fa";

// // Keyframes for animations
// const fadeIn = keyframes`
//   from { opacity: 0; transform: translateY(20px); }
//   to { opacity: 1; transform: translateY(0); }
// `;

// const fadeAndScale = keyframes`
//   from { opacity: 0; transform: scale(0.9); }
//   to { opacity: 1; transform: scale(1); }
// `;

// const PageContainer = styled.div`
//   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//   color: #333;
//   overflow-x: hidden;
// `;

// // --- SECTIONS ---
// const Section = styled.section`
//   padding: 6rem 1rem;
//   text-align: center;
//   background-color: ${(props) => props.background || White};
//   min-height: 80vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;

//   @media (max-width: 768px) {
//     padding: 4rem 1rem;
//   }
// `;

// const HeroSection = styled(Section)`
//   color: ${White};
//   background: linear-gradient(
//       rgba(0, 0, 0, 0.6),
//       rgba(0, 0, 0, 0.6)
//     ),
//     url("/h1.jpg");
//   background-size: cover;
//   background-position: center;
// `;

// const Heading = styled.h2`
//   font-size: 3rem;
//   color: ${(props) => props.color || DarkBlue};
//   margin-bottom: 1rem;
//   animation: ${fadeIn} 1s ease-out;

//   @media (max-width: 768px) {
//     font-size: 2rem;
//   }
// `;

// const Subtitle = styled.p`
//   font-size: 1.2rem;
//   color: ${(props) => props.color || "#666"};
//   max-width: 800px;
//   margin-bottom: 2rem;
//   line-height: 1.6;
//   animation: ${fadeIn} 1s ease-out 0.3s forwards;

//   @media (max-width: 768px) {
//     font-size: 1rem;
//   }
// `;

// const Button = styled.button`
//   background-color: ${Blue};
//   color: ${White};
//   padding: 0.8rem 2rem;
//   border: none;
//   border-radius: 50px;
//   font-size: 1rem;
//   font-weight: bold;
//   cursor: pointer;
//   transition: all 0.3s ease;
//   box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);

//   &:hover {
//     background-color: ${DarkBlue};
//     transform: translateY(-2px);
//     box-shadow: 0 6px 20px rgba(0, 123, 255, 0.4);
//   }
// `;

// const FeaturesGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//   gap: 2rem;
//   margin-top: 3rem;
//   width: 100%;
//   max-width: 1200px;
// `;

// const FeatureCard = styled.div`
//   background-color: ${White};
//   padding: 2rem;
//   border-radius: 15px;
//   box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
//   transition: transform 0.3s ease, box-shadow 0.3s ease;
//   animation: ${fadeAndScale} 0.8s ease-out;

//   &:hover {
//     transform: translateY(-5px);
//     box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
//   }
// `;

// const Icon = styled.span`
//   font-size: 2.5rem;
//   color: ${Blue};
//   margin-bottom: 1rem;
//   display: block;
// `;

// // --- MAIN COMPONENT ---
// export default function LandingPage() {
//   const router = useRouter();

//   return (
//     <PageContainer>


//       {/* HERO SECTION */}
//       <HeroSection>
//         <Heading color={White}>
//           Your All-in-One Online Showcase: Build a Portfolio & Manage All Your Links
//         </Heading>
//         <Subtitle color={White}>
//           Create a stunning online portfolio and a single link to share all your important websites, social media, and projects. It's the simplest way to showcase everything you do.
//         </Subtitle>
//         <Button onClick={() => router.push("/login")}>Get Started Now</Button>
//       </HeroSection>

//       {/* FEATURES SECTION */}
//       <Section id="features">
//         <Heading>Why Choose ECHOBYTE?</Heading>
//         <FeaturesGrid>
//           <FeatureCard>
//             <Icon>📝</Icon>
//             <h3>Intuitive Editor</h3>
//             <p>An easy-to-use editor lets you build and customize your pages without any coding. </p>
//           </FeatureCard>
//           <FeatureCard>
//             <Icon>🎨</Icon>
//             <h3>Stunning Designs</h3>
//             <p>Choose from our different design themes and professional templates to quickly create a beautiful page that matches your style.</p>
//           </FeatureCard>
//           <FeatureCard>
//             <Icon>🔗</Icon>
//             <h3>Centralized Online Hub</h3>
//             <p>Get a single, professional link that serves as your online resume and a central place for everyone to find your work and social media.</p>
//           </FeatureCard>
//           <FeatureCard>
//             <Icon>💻</Icon>
//             <h3>Showcase Your Projects</h3>
//             <p>Showcase your work with live projects, photos, and videos. Whether it's code, design, or art, you can make your work stand out.</p>
//           </FeatureCard>
//           <FeatureCard>
//             <Icon>🌐</Icon>
//             <h3>Unified Link Manager</h3>
//             <p>Combine all your social media profiles and links into one clean page. Perfect for Instagram bios or sharing with your network.</p>
//           </FeatureCard>
//         </FeaturesGrid>
//       </Section>

//       {/* HOW IT WORKS SECTION */}
//       <Section id="how-it-works" background={LightGray}>
//         <Heading>How It Works</Heading>
//         <Subtitle>
//           Creating a stunning portfolio and link page is as easy as 1-2-3.
//         </Subtitle>
//         <FeaturesGrid>
//           <FeatureCard>
//             <Icon>1️⃣</Icon>
//             <h3>Sign Up</h3>
//             <p>Sign up for a free account. It takes just a few minutes to get started.</p>
//           </FeatureCard>
//           <FeatureCard>
//             <Icon>2️⃣</Icon>
//             <h3>Build Your Page</h3>
//             <p>Use our simple editor to add your projects, links, experience, and skills.</p>
//           </FeatureCard>
//           <FeatureCard>
//             <Icon>3️⃣</Icon>
//             <h3>Share Your Link</h3>
//             <p>Your unique portfolio and link page is live and ready to be shared with everyone.</p>
//           </FeatureCard>
//         </FeaturesGrid>
//       </Section>

 
//     </PageContainer>
//   );
// }





"use client";

import styled, { keyframes } from "styled-components";
import { useRouter } from "next/navigation";

// ================= COLORS =================
const Blue = "#007BFF";
const DarkBlue = "#0056b3";
const White = "#FFFFFF";
const LightGray = "#f8f9fa";

// ================= ANIMATIONS =================
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const floatGlow = keyframes`
  0% { transform: translateY(0px); opacity: 0.6; }
  50% { transform: translateY(-10px); opacity: 0.9; }
  100% { transform: translateY(0px); opacity: 0.6; }
`;

// ================= PAGE =================
const PageContainer = styled.div`
  // font-family: "Segoe UI", sans-serif;
  color: #333;
  overflow-x: hidden;
`;

// ================= SECTION BASE =================
const Section = styled.section`
  padding: 6rem 1rem;
  text-align: center;
  background: ${(p) => p.$bg || White};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

// ================= HERO =================
const HeroSection = styled(Section)`
  min-height: 90vh;
  color: ${White};

  background:
    radial-gradient(circle at top left, rgba(0,123,255,0.35), transparent 40%),
    radial-gradient(circle at bottom right, rgba(0,86,179,0.35), transparent 45%),
    linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)),
    url("/h1.jpg");

  background-size: cover;
  background-position: center;
`;

const GlowOrb = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  background: rgba(0, 123, 255, 0.2);
  filter: blur(80px);
  border-radius: 50%;
  animation: ${floatGlow} 6s infinite ease-in-out;
  top: 10%;
  left: 5%;
`;

const Heading = styled.h2`
  // font-size: 3rem;
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 0.95;
  font-weight: 900;
  letter-spacing: -3px;

  margin-bottom: 1rem;
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  max-width: 800px;
  line-height: 1.7;
  margin-bottom: 2rem;
  opacity: 0.9;
  animation: ${fadeIn} 1s ease-out 0.2s forwards;
`;

const Button = styled.button`
  background: ${Blue};
  color: white;
  padding: 0.9rem 2.2rem;
  border: none;
  border-radius: 999px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 10px 25px rgba(0,123,255,0.35);

  &:hover {
    background: ${DarkBlue};
    transform: translateY(-2px);
  }
`;

// ================= GRID =================
const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin-top: 3rem;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 18px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
  transition: 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 35px rgba(0,0,0,0.12);
  }

  h3 {
    margin-top: 1rem;
  }

  p {
    opacity: 0.8;
  }
`;

const Icon = styled.div`
  font-size: 2.2rem;
`;

// ================= CTA SECTION (NEW) =================
const CTASection = styled(Section)`
  background: linear-gradient(135deg, ${DarkBlue}, ${Blue});
  color: white;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const CTAText = styled.p`
  max-width: 700px;
  opacity: 0.9;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const CTAButton = styled.button`
  background: white;
  color: ${DarkBlue};
  padding: 0.9rem 2.2rem;
  border-radius: 999px;
  border: none;
  font-weight: 800;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

// ================= COMPONENT =================
export default function LandingPage() {
  const router = useRouter();

  return (
    <PageContainer>

      {/* HERO */}
      <HeroSection>
        <GlowOrb />

        <Heading>
          Your All-in-One Online Showcase
        </Heading>

        <Subtitle>
          Build a powerful portfolio + link hub to showcase everything you do in one clean, professional page.
        </Subtitle>

        <Subtitle>
          You can create multiple profiles for your diferrent professions.
        </Subtitle>

        <Button onClick={() => router.push("/login")}>
          Get Started Now
        </Button>
      </HeroSection>

   

      {/* HOW IT WORKS */}
      <Section>
        <Heading>How It Works</Heading>

        <FeaturesGrid>
          <FeatureCard>
            <Icon>1️⃣</Icon>
            <h3>Sign Up</h3>
            <p>Create your account in minutes.</p>
          </FeatureCard>

          <FeatureCard>
            <Icon>2️⃣</Icon>
            <h3>Build</h3>
            <p>Create your profile and start filing up each section for your created profile. You can create multiple profiles</p>
          </FeatureCard>

          <FeatureCard>
            <Icon>3️⃣</Icon>
            <h3>Share</h3>
            <p>Send your portfolio anywhere. Share your link any where and be found online</p>
          </FeatureCard>
        </FeaturesGrid>
      </Section>

      {/* 🔥 NEW CTA SECTION */}
      <CTASection>
        <CTATitle>Ready to build your online identity?</CTATitle>

        <CTAText>
          Stop sending scattered links. Create one powerful portfolio that represents everything you do — clean, modern, and professional.
        </CTAText>

        <CTAButton onClick={() => router.push("/login")}>
          Create My Portfolio
        </CTAButton>
      </CTASection>

         {/* FEATURES */}
      <Section $bg={LightGray}>
        <Heading>Why Choose This Platform?</Heading>

        <FeaturesGrid>
          <FeatureCard>
            <Icon>📝</Icon>
            <h3>Simple Editor</h3>
            <p>No coding required — build fast.</p>
          </FeatureCard>

          <FeatureCard>
            <Icon>🎨</Icon>
            <h3>Beautiful Designs</h3>
            <p>Modern templates that stand out.</p>
          </FeatureCard>

          <FeatureCard>
            <Icon>🔗</Icon>
            <h3>One Smart Link</h3>
            <p>Everything in one shareable URL.</p>
          </FeatureCard>
        </FeaturesGrid>
      </Section>

    </PageContainer>
  );
}