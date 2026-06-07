// "use client";

// import styled from "styled-components";
// import Link from "next/link";

// /* ================= COLORS ================= */

// const Blue = "#2563eb";
// const Dark = "#0f172a";
// const Text = "#475569";
// const Light = "#f8fafc";

// /* ================= SECTION ================= */

// const Section = styled.section`
//   padding: 5px;
//   background: ${Light};
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   text-align: center;
// `;

// /* ================= HEADER ================= */

// const Badge = styled.div`
//   padding: 5px;
//   border-radius: 999px;
//   background: rgba(37, 99, 235, 0.1);
//   color: ${Blue};
//   font-weight: 600;
//   font-size: 0.85rem;
//   margin-bottom: 5px;
// `;

// const Title = styled.h2`
//   font-size: clamp(2rem, 4vw, 3rem);
//   font-weight: 900;
//   color: ${Dark};
//   letter-spacing: -1px;
//   margin: 0;
// `;

// const Subtitle = styled.p`
//   margin-top: 5px;
//   max-width: 750px;
//   color: ${Text};
//   line-height: 1.7;
// `;

// /* ================= PRICING CARD ================= */

// const Card = styled.div`
//   margin-top: 5px;
//   background: white;
//   border: 1px solid #e5e7eb;
//   border-radius: 18px;

//   padding: 5px;
//   width: 100%;
//   max-width: 420px;

//   box-shadow: 0 10px 25px rgba(2, 6, 23, 0.05);
// `;

// /* ================= PRICE ================= */

// const Price = styled.div`
//   font-size: 2rem;
//   font-weight: 900;
//   color: ${Dark};
// `;

// const SubPrice = styled.div`
//   font-size: 0.9rem;
//   color: ${Text};
//   margin-top: 5px;
// `;

// /* ================= FEATURES ================= */

// const List = styled.ul`
//   list-style: none;
//   padding: 0;
//   margin-top: 5px;

//   display: flex;
//   flex-direction: column;
//   gap: 5px;

//   color: ${Text};
//   font-size: 0.95rem;
// `;

// /* ================= BUTTONS ================= */

// const ButtonRow = styled.div`
//   margin-top: 5px;
//   display: flex;
//   flex-direction: column;
//   gap: 5px;
// `;

// const PrimaryButton = styled(Link)`
//   padding: 5px;
//   border-radius: 10px;
//   background: ${Blue};
//   color: white;
//   font-weight: 700;
//   text-decoration: none;
//   text-align: center;

//   &:hover {
//     opacity: 0.9;
//   }
// `;

// const SecondaryButton = styled(Link)`
//   padding: 5px;
//   border-radius: 10px;
//   border: 1px solid ${Blue};
//   color: ${Blue};
//   font-weight: 700;
//   text-decoration: none;
//   text-align: center;

//   &:hover {
//     background: rgba(37, 99, 235, 0.08);
//   }
// `;

// /* ================= COMPONENT ================= */

// export default function PricingSection() {
//   return (
//     <Section>

//       <Badge>Simple Pricing</Badge>

//       <Title>One Plan. Everything Included.</Title>

//       <Subtitle>
//         Build your full professional portfolio with no limits.
//         Pay once per year and focus on your growth.
//       </Subtitle>

//       <Card>

//         <Price>₦1000 / $2</Price>
//         <SubPrice>per year (billed annually)</SubPrice>

//         <List>
//           <li>✔ Unlimited portfolio pages</li>
//           <li>✔ Multiple profiles</li>
//           <li>✔ Custom themes</li>
//           <li>✔ Shareable public link</li>
//           <li>✔ Mobile optimized design</li>
//         </List>

//         <ButtonRow>
//           <PrimaryButton href="/signup">
//             Get Started
//           </PrimaryButton>

//           <SecondaryButton href="/login">
//             I already have an account
//           </SecondaryButton>
//         </ButtonRow>

//       </Card>

//     </Section>
//   );
// }



"use client";

import styled from "styled-components";
import Link from "next/link";

const Blue = "#2563eb";
const BlueDark = "#1d4ed8";
const Dark = "#0f172a";
const Text = "#64748b";
const Light = "#f8fafc";

const Section = styled.section`
  padding: 6rem 1.5rem;
  background: ${Light};
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  text-align: center;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.1);
  color: ${Blue};
  font-size: 0.875rem;
  font-weight: 700;
`;

const Title = styled.h2`
  margin: 1rem 0 0.75rem;
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.1;
  font-weight: 900;
  color: ${Dark};
  letter-spacing: -0.04em;
`;

const Subtitle = styled.p`
  max-width: 700px;
  margin: 0 auto;
  color: ${Text};
  font-size: 1.125rem;
  line-height: 1.8;
`;

const Card = styled.div`
  position: relative;
  margin: 4rem auto 0;
  max-width: 480px;
  padding: 2.5rem;
  background: white;
  border-radius: 24px;
  border: 1px solid #e2e8f0;
  box-shadow:
    0 20px 40px rgba(15, 23, 42, 0.08),
    0 2px 8px rgba(15, 23, 42, 0.04);
`;

const PopularTag = styled.div`
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);

  background: ${Blue};
  color: white;
  padding: 0.45rem 1rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
`;

const Price = styled.div`
  font-size: 2rem;
  font-weight: 900;
  color: ${Dark};
  line-height: 1;
`;

const Currency = styled.span`
  font-size: 1.5rem;
  vertical-align: top;
`;

const SubPrice = styled.p`
  margin-top: 0.75rem;
  color: ${Text};
  font-size: 0.95rem;
`;

const Divider = styled.div`
  height: 1px;
  background: #e2e8f0;
  margin: 2rem 0;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  text-align: left;
`;

const Feature = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  color: ${Dark};
  font-size: 1rem;
  font-weight: 500;
`;

const Check = styled.span`
  color: ${Blue};
  font-weight: 700;
  font-size: 1.1rem;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  margin-top: 2rem;
`;

const PrimaryButton = styled(Link)`
  padding: 1rem 1.25rem;
  border-radius: 12px;
  background: ${Blue};
  color: white;
  text-decoration: none;
  font-weight: 700;
  transition: all 0.2s ease;

  &:hover {
    background: ${BlueDark};
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled(Link)`
  padding: 1rem 1.25rem;
  border-radius: 12px;
  border: 1px solid #dbeafe;
  color: ${Blue};
  text-decoration: none;
  font-weight: 700;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(37, 99, 235, 0.05);
  }
`;

export default function PricingSection() {
  return (
    <Section>
      <Container>
        <Badge>Simple Pricing</Badge>

        <Title>One Plan. Everything Included.</Title>

        <Subtitle>
          Create and manage your professional portfolio with no limits.
          One affordable annual subscription gives you access to every
          feature you need to showcase your work and grow your career.
        </Subtitle>

        <Card>
          <PopularTag>Best Value</PopularTag>

   <Price>
            <Currency>$</Currency>2 USD Annually
          </Price>
            <Price>
            0R
          </Price>
          <Price>
            <Currency>₦</Currency>1,000 Annually
          </Price>
         


          <Divider />

          <List>
            <Feature>
              <Check>✓</Check>
              Unlimited Portfolios
            </Feature>

            <Feature>
              <Check>✓</Check>
              Multiple professional profiles
            </Feature>

            <Feature>
              <Check>✓</Check>
              Multiple themes and layouts
            </Feature>

            <Feature>
              <Check>✓</Check>
              Shareable public portfolio link
            </Feature>

            <Feature>
              <Check>✓</Check>
              Fully mobile-optimized experience
            </Feature>
          </List>

          <ButtonRow>
            <PrimaryButton href="/signup">
              Start Building Your Portfolio
            </PrimaryButton>

            <SecondaryButton href="/login">
              Sign In
            </SecondaryButton>
          </ButtonRow>
        </Card>
      </Container>
    </Section>
  );
}