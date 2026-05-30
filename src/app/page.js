


// "use client";

// import styled, { keyframes } from "styled-components";
// import { useRouter } from "next/navigation";
// import IdentityRevolutionSection from "@/components/IdentityRevolutionSection";

// // ================= COLORS =================
// const Blue = "#007BFF";
// const DarkBlue = "#0056b3";
// const White = "#FFFFFF";
// const LightGray = "#f8f9fa";

// // ================= ANIMATIONS =================
// const fadeIn = keyframes`
//   from { opacity: 0; transform: translateY(20px); }
//   to { opacity: 1; transform: translateY(0); }
// `;

// const floatGlow = keyframes`
//   0% { transform: translateY(0px); opacity: 0.6; }
//   50% { transform: translateY(-10px); opacity: 0.9; }
//   100% { transform: translateY(0px); opacity: 0.6; }
// `;

// // ================= PAGE =================
// const PageContainer = styled.div`
//   // font-family: "Segoe UI", sans-serif;
//   color: #333;
//   overflow-x: hidden;
// `;

// // ================= SECTION BASE =================
// const Section = styled.section`
//   padding: 6rem 1rem;
//   text-align: center;
//   background: ${(p) => p.$bg || White};
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   position: relative;

//   @media (max-width: 768px) {
//     padding: 4rem 1rem;
//   }
// `;

// // ================= HERO =================
// const HeroSection = styled(Section)`
//   min-height: 90vh;
//   color: ${White};

//   background:
//     radial-gradient(circle at top left, rgba(0,123,255,0.35), transparent 40%),
//     radial-gradient(circle at bottom right, rgba(0,86,179,0.35), transparent 45%),
//     linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)),
//     url("/h1.jpg");

//   background-size: cover;
//   background-position: center;
// `;

// const GlowOrb = styled.div`
//   position: absolute;
//   width: 300px;
//   height: 300px;
//   background: rgba(0, 123, 255, 0.2);
//   filter: blur(80px);
//   border-radius: 50%;
//   animation: ${floatGlow} 6s infinite ease-in-out;
//   top: 10%;
//   left: 5%;
// `;

// const Heading = styled.h2`
//   // font-size: 3rem;
//   font-size: clamp(2rem, 5vw, 4rem);
//   line-height: 0.95;
//   font-weight: 900;
//   letter-spacing: -3px;

//   margin-bottom: 1rem;
//   animation: ${fadeIn} 1s ease-out;

//   @media (max-width: 768px) {
//     font-size: 2rem;
//   }
// `;

// const Subtitle = styled.p`
//   font-size: 1.2rem;
//   max-width: 800px;
//   line-height: 1.7;
//   margin-bottom: 2rem;
//   opacity: 0.9;
//   animation: ${fadeIn} 1s ease-out 0.2s forwards;
// `;

// const Button = styled.button`
//   background: ${Blue};
//   color: white;
//   padding: 0.9rem 2.2rem;
//   border: none;
//   border-radius: 999px;
//   font-weight: 700;
//   cursor: pointer;
//   transition: 0.3s;
//   box-shadow: 0 10px 25px rgba(0,123,255,0.35);

//   &:hover {
//     background: ${DarkBlue};
//     transform: translateY(-2px);
//   }
// `;

// // ================= GRID =================
// const FeaturesGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
//   gap: 2rem;
//   width: 100%;
//   max-width: 1200px;
//   margin-top: 3rem;
// `;

// const FeatureCard = styled.div`
//   background: white;
//   padding: 2rem;
//   border-radius: 18px;
//   box-shadow: 0 10px 25px rgba(0,0,0,0.08);
//   transition: 0.3s ease;

//   &:hover {
//     transform: translateY(-6px);
//     box-shadow: 0 18px 35px rgba(0,0,0,0.12);
//   }

//   h3 {
//     margin-top: 1rem;
//   }

//   p {
//     opacity: 0.8;
//   }
// `;

// const Icon = styled.div`
//   font-size: 2.2rem;
// `;

// // ================= CTA SECTION (NEW) =================
// const CTASection = styled(Section)`
//   background: linear-gradient(135deg, ${DarkBlue}, ${Blue});
//   color: white;
// `;

// const CTATitle = styled.h2`
//   font-size: 2.5rem;
//   margin-bottom: 1rem;
// `;

// const CTAText = styled.p`
//   max-width: 700px;
//   opacity: 0.9;
//   margin-bottom: 2rem;
//   line-height: 1.6;
// `;

// const ButtonGroup = styled.div`
//   display: flex;
//   gap: 1rem;
//   margin-top: 1.5rem;
//   flex-wrap: wrap;
//   justify-content: center;
// `;

// const CTAButton = styled.button`
//   background: white;
//   color: ${DarkBlue};
//   padding: 0.9rem 2.2rem;
//   border-radius: 999px;
//   border: none;
//   font-weight: 800;
//   cursor: pointer;
//   transition: 0.3s;

//   &:hover {
//     transform: scale(1.05);
//   }
// `;



// // ================= COMPONENT =================
// export default function LandingPage() {
//   const router = useRouter();

//   return (
//     <PageContainer>

//       {/* HERO */}
//       <HeroSection>
//         <GlowOrb />

//         <Heading>
//           Your All-in-One Online Showcase
//         </Heading>

//         <Subtitle>
//           Build a powerful portfolio + link hub to showcase everything you do in one clean, professional page.
//         </Subtitle>

//         <Subtitle>
//           You can create multiple profiles for your diferrent professions.
//         </Subtitle>

//        <ButtonGroup>
//   <Button onClick={() => router.push("/login")}>
//     Get Started Now
//   </Button>

//   <Button onClick={() => router.push("/profiles")}>
//     View Talents
//   </Button>
// </ButtonGroup>
//       </HeroSection>

//    <IdentityRevolutionSection/>

//       {/* HOW IT WORKS */}
//       <Section>
//         <Heading>How It Works</Heading>

//         <FeaturesGrid>
//           <FeatureCard>
//             <Icon>1️⃣</Icon>
//             <h3>Sign Up</h3>
//             <p>Create your account in minutes.</p>
//           </FeatureCard>

//           <FeatureCard>
//             <Icon>2️⃣</Icon>
//             <h3>Build</h3>
//             <p>Create your profile and start filing up each section for your created profile. You can create multiple profiles</p>
//           </FeatureCard>

//           <FeatureCard>
//             <Icon>3️⃣</Icon>
//             <h3>Share</h3>
//             <p>Send your portfolio anywhere. Share your link any where and be found online</p>
//           </FeatureCard>
//         </FeaturesGrid>
//       </Section>


      

//       {/* 🔥 NEW CTA SECTION */}
//       <CTASection>
//         <CTATitle>Ready to build your online identity?</CTATitle>

//         <CTAText>
//           Stop sending scattered links. Create one powerful portfolio that represents everything you do — clean, modern, and professional.
//         </CTAText>

//         <CTAButton onClick={() => router.push("/login")}>
//           Create My Portfolio
//         </CTAButton>
//       </CTASection>

//          {/* FEATURES */}
//       <Section $bg={LightGray}>
//         <Heading>Why Choose This Platform?</Heading>

//         <FeaturesGrid>
//           <FeatureCard>
//             <Icon>📝</Icon>
//             <h3>Simple Editor</h3>
//             <p>No coding required — build fast.</p>
//           </FeatureCard>

//           <FeatureCard>
//             <Icon>🎨</Icon>
//             <h3>Beautiful Designs</h3>
//             <p>Modern templates that stand out.</p>
//           </FeatureCard>

//           <FeatureCard>
//             <Icon>🔗</Icon>
//             <h3>One Smart Link</h3>
//             <p>Everything in one shareable URL.</p>
//           </FeatureCard>
//         </FeaturesGrid>
//       </Section>

//     </PageContainer>
//   );
// }




"use client";

import styled, { keyframes } from "styled-components";
import { useRouter } from "next/navigation";
import IdentityRevolutionSection from "@/components/IdentityRevolutionSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";

/* ================= COLORS ================= */

const Blue = "#2563eb";
const Dark = "#0f172a";
const Text = "#475569";
const Light = "#f8fafc";
const White = "#ffffff";

/* ================= ANIMATION ================= */

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const floatGlow = keyframes`
  0% { transform: translateY(0px); opacity: 0.6; }
  50% { transform: translateY(-10px); opacity: 0.9; }
  100% { transform: translateY(0px); opacity: 0.6; }
`;

/* ================= PAGE ================= */

const PageContainer = styled.div`
  color: ${Dark};
  background: ${White};
  overflow-x: hidden;
`;

/* ================= SECTION BASE ================= */

const Section = styled.section`
  padding: 6rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

/* ================= HERO ================= */

const HeroSection = styled(Section)`
  min-height: 92vh;
  justify-content: center;

  color: white;

  background:
    radial-gradient(circle at top left, rgba(37,99,235,0.35), transparent 45%),
    radial-gradient(circle at bottom right, rgba(59,130,246,0.25), transparent 50%),
    linear-gradient(rgba(2,6,23,0.75), rgba(2,6,23,0.75)),
    url("/h1.jpg");

  background-size: cover;
  background-position: center;
`;

const GlowOrb = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  background: rgba(59, 130, 246, 0.25);
  filter: blur(90px);
  border-radius: 50%;
  animation: ${floatGlow} 6s infinite ease-in-out;
  top: 10%;
  left: 8%;
`;

const Heading = styled.h1`
  font-size: clamp(2.2rem, 5vw, 4.2rem);
  font-weight: 900;
  letter-spacing: -2px;
  line-height: 1.05;

  max-width: 900px;
  animation: ${fadeIn} 0.8s ease-out;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  max-width: 750px;
  margin-top: 1.2rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.8);
  animation: ${fadeIn} 1s ease-out;
`;

/* ================= BUTTONS ================= */

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content:center;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
  background: ${Blue};
  color: white;

  padding: 0.9rem 2.2rem;
  border-radius: 999px;
  border: none;

  font-weight: 700;
  cursor: pointer;

  transition: 0.25s ease;

  box-shadow: 0 12px 30px rgba(37,99,235,0.35);

  &:hover {
    transform: translateY(-2px);
    background: #1d4ed8;
  }
`;

const SecondaryButton = styled.button`
  background: rgba(255,255,255,0.1);
  color: white;

  padding: 0.9rem 2.2rem;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.25);

  font-weight: 600;
  cursor: pointer;

  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255,255,255,0.2);
  }
`;

/* ================= HOW IT WORKS ================= */

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 1100px;
  margin-top: 3rem;
`;

const Card = styled.div`
  background: ${White};
  border: 1px solid #e5e7eb;
  border-radius: 18px;

  padding: 2rem;

  text-align: left;

  box-shadow: 0 10px 25px rgba(2,6,23,0.05);

  transition: 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 40px rgba(37,99,235,0.12);
    border-color: #c7d2fe;
  }
`;

const Icon = styled.div`
  font-size: 1.8rem;
  margin-bottom: 0.8rem;
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const CardText = styled.p`
  color: ${Text};
  line-height: 1.6;
  font-size: 0.95rem;
`;

/* ================= CTA ================= */

const CTASection = styled(Section)`
  background: linear-gradient(135deg, #0f172a, #1e3a8a);
  color: white;
`;

const CTATitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 800;
`;

const CTAText = styled.p`
  max-width: 700px;
  margin-top: 1rem;
  color: rgba(255,255,255,0.8);
  line-height: 1.6;
`;

const CTAButton = styled.button`
  margin-top: 2rem;
  padding: 1rem 2.2rem;

  border-radius: 999px;
  border: none;

  background: white;
  color: ${Dark};

  font-weight: 800;
  cursor: pointer;

  transition: 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

/* ================= COMPONENT ================= */

export default function LandingPage() {
  const router = useRouter();

  return (
    <PageContainer>

      {/* HERO */}
      <HeroSection>
        <GlowOrb />

        {/* <Heading>
          Build Your Digital Identity in One Place
        </Heading> */}

         <Heading>
           Your All-in-One Online Showcase
       </Heading>

         <Subtitle>
           Build a powerful portfolio + link hub to showcase everything you do in one clean, professional page.
         </Subtitle>

         <Subtitle>
           You can create multiple profiles for your diferrent professions.
       </Subtitle>

    

        <ButtonGroup>
          <PrimaryButton onClick={() => router.push("/login")}>
            Get Started
          </PrimaryButton>

          <SecondaryButton onClick={() => router.push("/profiles")}>
            Explore Profiles
          </SecondaryButton>
        </ButtonGroup>
      </HeroSection>

      {/* IDENTITY SECTION */}
      <IdentityRevolutionSection />

      {/* HOW IT WORKS */}
      <Section>
        <h2 style={{ fontSize: "2.2rem", fontWeight: 800 }}>
          How It Works
        </h2>

        <Grid>
          <Card>
            <Icon>1️⃣</Icon>
            <CardTitle>Sign Up</CardTitle>
            <CardText>Create your account in seconds.</CardText>
          </Card>

          <Card>
            <Icon>2️⃣</Icon>
            <CardTitle>Build Profile</CardTitle>
            <CardText>
              Add multiple portfolios for different skills or careers.
            </CardText>
          </Card>

          <Card>
            <Icon>3️⃣</Icon>
            <CardTitle>Share Anywhere</CardTitle>
            <CardText>
              One link to showcase everything you do.
            </CardText>
          </Card>
        </Grid>
      </Section>
<PricingSection/>
      <FeaturesSection/>

      {/* CTA */}
      <CTASection>
        <CTATitle>Start building your identity today</CTATitle>

        <CTAText>
          Don’t just exist online — be discoverable, memorable, and professional.
        </CTAText>
<ButtonGroup>
   <CTAButton onClick={() => router.push("/login")}>
          Create Portfolio
        </CTAButton>
          <CTAButton onClick={() => router.push("/profiles")}>
          Discover Talents
        </CTAButton>

</ButtonGroup>
     
      </CTASection>

    </PageContainer>
  );
}