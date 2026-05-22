// "use client";

// import styled, { keyframes } from "styled-components";

// /* ================= ANIMATION ================= */

// const float = keyframes`
//   0% { transform: translateY(0px); }
//   50% { transform: translateY(-6px); }
//   100% { transform: translateY(0px); }
// `;

// /* ================= SECTION ================= */

// const Section = styled.section`
//   width: 100%;
//   padding: 6rem 1.5rem;
//   background: radial-gradient(circle at top, #0b1220, #05070f);
//   color: white;
//   position: relative;
//   overflow: hidden;
// `;

// /* glowing background effect */
// const Glow = styled.div`
//   position: absolute;
//   width: 500px;
//   height: 500px;
//   background: #4f8cff;
//   filter: blur(120px);
//   opacity: 0.25;
//   top: -100px;
//   right: -100px;
// `;

// const Container = styled.div`
//   max-width: 1100px;
//   margin: auto;
//   position: relative;
//   z-index: 2;
// `;

// /* ================= TEXT ================= */

// const Badge = styled.div`
//   display: inline-block;
//   padding: 6px 14px;
//   border-radius: 999px;
//   background: rgba(79, 140, 255, 0.15);
//   border: 1px solid rgba(79, 140, 255, 0.3);
//   color: #7fb0ff;
//   font-size: 0.85rem;
//   margin-bottom: 1.2rem;
// `;

// const Title = styled.h1`
//   font-size: 3rem;
//   font-weight: 800;
//   line-height: 1.2;

//   span {
//     color: #4f8cff;
//   }

//   @media (max-width: 768px) {
//     font-size: 2.2rem;
//   }
// `;

// const Subtitle = styled.p`
//   margin-top: 1.2rem;
//   font-size: 1.1rem;
//   color: rgba(255, 255, 255, 0.75);
//   max-width: 700px;
//   line-height: 1.7;
// `;

// /* ================= GRID ================= */

// const Grid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   gap: 1.5rem;
//   margin-top: 3rem;

//   @media (max-width: 900px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const Card = styled.div`
//   padding: 1.5rem;
//   border-radius: 18px;
//   background: rgba(255, 255, 255, 0.05);
//   border: 1px solid rgba(255, 255, 255, 0.08);
//   backdrop-filter: blur(10px);
//   transition: 0.3s ease;

//   &:hover {
//     transform: translateY(-6px);
//     border-color: rgba(79, 140, 255, 0.4);
//   }
// `;

// const CardTitle = styled.h3`
//   font-size: 1.1rem;
//   margin-bottom: 0.5rem;
// `;

// const CardText = styled.p`
//   font-size: 0.95rem;
//   color: rgba(255, 255, 255, 0.7);
//   line-height: 1.6;
// `;

// /* ================= CTA ================= */

// const CTA = styled.div`
//   margin-top: 3rem;
//   display: flex;
//   gap: 12px;
//   flex-wrap: wrap;
// `;

// const PrimaryButton = styled.button`
//   padding: 14px 22px;
//   border-radius: 12px;
//   border: none;
//   background: #4f8cff;
//   color: white;
//   font-weight: 700;
//   cursor: pointer;

//   animation: ${float} 3s ease-in-out infinite;

//   &:hover {
//     background: #3b74db;
//   }
// `;

// const SecondaryButton = styled.button`
//   padding: 14px 22px;
//   border-radius: 12px;
//   border: 1px solid rgba(255, 255, 255, 0.2);
//   background: transparent;
//   color: white;
//   font-weight: 600;
//   cursor: pointer;

//   &:hover {
//     background: rgba(255, 255, 255, 0.05);
//   }
// `;

// export default function IdentityRevolutionSection() {
//   return (
//     <Section>
//       <Glow />

//       <Container>
//         <Badge>The New Standard of Identity</Badge>

//         <Title>
//           If you don’t have a portfolio, <br />
//           you are invisible in the modern world.
//         </Title>

//         <Subtitle>
//           Your portfolio is no longer just for job seekers. It is your
//           <b> identity, credibility, and proof of existence online</b>.
//           Whether you're a developer, musician, designer, writer,
//           filmmaker, or student — your work deserves a home.
//         </Subtitle>

//         <Grid>
//           <Card>
//             <CardTitle>🎨 Creators</CardTitle>
//             <CardText>
//               Showcase your art, content, and creativity in one place that
//               speaks for you even when you're offline.
//             </CardText>
//           </Card>

//           <Card>
//             <CardTitle>🎧 Musicians & Artists</CardTitle>
//             <CardText>
//               Your sound, your style, your journey — all in a personal space
//               that builds your audience and brand.
//             </CardText>
//           </Card>

//           <Card>
//             <CardTitle>💼 Professionals</CardTitle>
//             <CardText>
//               Don’t just say what you do. Prove it. Let your work speak louder
//               than your CV ever could.
//             </CardText>
//           </Card>
//         </Grid>

//         <CTA>
//           <PrimaryButton>Build Your Portfolio</PrimaryButton>
//           <SecondaryButton>Explore Examples</SecondaryButton>
//         </CTA>
//       </Container>
//     </Section>
//   );
// }




"use client";

import styled, { keyframes } from "styled-components";
import { useRouter } from "next/navigation";

/* ================= ANIMATION ================= */

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0px); }
`;

/* ================= SECTION ================= */

const Section = styled.section`
  width: 100%;
  padding: 6rem 1.5rem;

  background: linear-gradient(180deg, #f7faff 0%, #ffffff 100%);
  color: #0f172a;

  position: relative;
  overflow: hidden;
`;

const Glow = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;

  background: radial-gradient(circle, #4f8cff, transparent 70%);
  filter: blur(120px);
  opacity: 0.15;

  top: -120px;
  right: -120px;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: auto;
  position: relative;
  z-index: 2;
`;

/* ================= BADGE ================= */

const Badge = styled.div`
  display: inline-block;
  padding: 6px 14px;

  border-radius: 999px;
  background: #eef5ff;
  border: 1px solid #d9e6ff;

  color: #2563eb;
  font-size: 0.85rem;

  margin-bottom: 1.2rem;
`;

/* ================= TEXT ================= */

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.2;
  color: #0f172a;

  span {
    color: #2563eb;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Subtitle = styled.p`
  margin-top: 1.2rem;
  font-size: 1.1rem;
  color: #475569;

  max-width: 700px;
  line-height: 1.7;
`;

/* ================= GRID ================= */

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 3rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  padding: 1.5rem;
  border-radius: 18px;

  background: white;
  border: 1px solid #e5eaf2;

  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);

  transition: 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 15px 40px rgba(37, 99, 235, 0.12);
    border-color: #cfe0ff;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #0f172a;
`;

const CardText = styled.p`
  font-size: 0.95rem;
  color: #64748b;
  line-height: 1.6;
`;

/* ================= CTA ================= */

const CTA = styled.div`
  margin-top: 3rem;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
  padding: 14px 22px;
  border-radius: 12px;
  border: none;

  background: #2563eb;
  color: white;

  font-weight: 700;
  cursor: pointer;

  animation: ${float} 3s ease-in-out infinite;

  box-shadow: 0 10px 25px rgba(37, 99, 235, 0.25);

  &:hover {
    background: #1d4ed8;
  }
`;

const SecondaryButton = styled.button`
  padding: 14px 22px;
  border-radius: 12px;

  border: 1px solid #cbd5e1;
  background: white;

  color: #0f172a;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #f1f5f9;
  }
`;

/* ================= COMPONENT ================= */

export default function IdentityRevolutionSection() {
    const router = useRouter();
    
  return (
    <Section>
      <Glow />

      <Container>
        <Badge>The New Standard of Identity</Badge>

        <Title>
          Your portfolio is your <span>digital identity</span> in the modern world.
        </Title>

        <Subtitle>
          Today, your work speaks before you do. Whether you're a developer,
          musician, designer, writer, filmmaker, or student — your portfolio
          is how the world understands your value.
        </Subtitle>

        <Grid>
          <Card>
            <CardTitle>🎨 Creators</CardTitle>
            <CardText>
              Showcase your creativity in a structured identity that grows your
              visibility and audience.
            </CardText>
          </Card>

          <Card>
            <CardTitle>🎧 Musicians & Artists</CardTitle>
            <CardText>
              Let your sound, visuals, and journey live in one place that
              represents your brand.
            </CardText>
          </Card>

          <Card>
            <CardTitle>💼 Professionals</CardTitle>
            <CardText>
              Don’t just describe your skills — prove them with real work,
              projects, and achievements.
            </CardText>
          </Card>
        </Grid>

        <CTA>
          <PrimaryButton onClick={() => router.push("/login")}>Build Your Portfolio</PrimaryButton>
          <SecondaryButton onClick={() => router.push("/profiles")}>Explore Examples</SecondaryButton>
        </CTA>
      </Container>
    </Section>
  );
}