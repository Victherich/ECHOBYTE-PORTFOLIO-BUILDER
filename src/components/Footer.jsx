// "use client";

// import styled from "styled-components";
// import Link from "next/link";

// // --- STYLED COMPONENTS ---
// const DarkBlue = "#0056b3";
// const White = "#FFFFFF";

// const FooterContainer = styled.footer`
//   background-color: ${DarkBlue};
//   color: ${White};
//   padding: 1rem 1rem;
//   text-align: center;
// `;

// const FooterText = styled.p`
//   margin: 0.1rem 0;
//   font-size: 0.9rem;
//   opacity: 0.8;
// `;

// // --- MAIN COMPONENT ---
// export default function Footer() {
//   const currentYear = new Date().getFullYear();

//   return (
//     <FooterContainer id="contact">
//         <FooterText>
//         <Link href="/privacypolicy" style={{ textDecoration: "underline", color: White }}>
//           Privacy Policy
//         </Link>
//       </FooterText>
//       <FooterText>
//         <Link href="/termsandconditions" style={{ textDecoration: "underline", color: White }}>
//           Terms and Conditions
//         </Link>
//       </FooterText>
    

//       <FooterText>Email: echobyteconcept@gmail.com</FooterText>
//       <FooterText>Phone: +234 706 348 0314, +234 816 886 4508</FooterText>
//       <FooterText>&copy; {currentYear} ECHOBYTE CONCEPT. All rights reserved.</FooterText>
//     </FooterContainer>
//   );
// }


"use client";

import styled from "styled-components";
import Link from "next/link";

/* ================= COLORS ================= */

const Blue = "#2563eb";
const Dark = "#0f172a";
const Text = "#64748b";
const Border = "#e2e8f0";
const Bg = "#ffffff";

/* ================= FOOTER ================= */

const FooterContainer = styled.footer`
  background: ${Bg};
  border-top: 1px solid ${Border};

  padding: 1.2rem 1rem; /* ⬅ compact height */

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;

  text-align: center;
`;

/* ================= BRAND ================= */

const Brand = styled.div`
  font-weight: 800;
  font-size: 1rem;
  color: ${Dark};

  span {
    color: ${Blue};
  }
`;

/* ================= LINKS ================= */

const LinkRow = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const FooterLink = styled(Link)`
  font-size: 0.85rem;
  color: ${Text};
  text-decoration: none;
  transition: 0.2s ease;

  &:hover {
    color: ${Blue};
  }
`;

/* ================= TEXT ================= */

const FooterText = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: ${Text};
  line-height: 1.4;
`;

/* ================= COMPONENT ================= */

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <FooterContainer>

      {/* BRAND */}
      <Brand>
        ECHO<span>BYTE</span>
      </Brand>

      {/* LINKS */}
      <LinkRow>
        <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
        <FooterLink href="/terms-conditions">Terms</FooterLink>
        <FooterLink href="/contact">Contact</FooterLink>
      </LinkRow>

      {/* CONTACT */}
      <FooterText>
        echobyteconcept@gmail.com · +234 706 348 0314 · +234 816 886 4508
      </FooterText>

   <FooterText>
  To build your portfolio, visit:{" "}
  <a
    // href="https://myportfolio.echobyteconcept.com/"
     href="https://myportfolioechobyte.vercel.app/"
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: "#2563eb", textDecoration: "underline" }}
  >
    myportfolioechobyte.vercel.app
  </a>
</FooterText>

      {/* COPYRIGHT */}
      <FooterText>
        © {year} EchoByte Concept. All rights reserved.
      </FooterText>

    </FooterContainer>
  );
}