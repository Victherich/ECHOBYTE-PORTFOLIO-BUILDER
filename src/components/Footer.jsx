"use client";

import styled from "styled-components";
import Link from "next/link";

// --- STYLED COMPONENTS ---
const DarkBlue = "#0056b3";
const White = "#FFFFFF";

const FooterContainer = styled.footer`
  background-color: ${DarkBlue};
  color: ${White};
  padding: 1rem 1rem;
  text-align: center;
`;

const FooterText = styled.p`
  margin: 0.1rem 0;
  font-size: 0.9rem;
  opacity: 0.8;
`;

// --- MAIN COMPONENT ---
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer id="contact">
        <FooterText>
        <Link href="/privacypolicy" style={{ textDecoration: "underline", color: White }}>
          Privacy Policy
        </Link>
      </FooterText>
      <FooterText>
        <Link href="/termsandconditions" style={{ textDecoration: "underline", color: White }}>
          Terms and Conditions
        </Link>
      </FooterText>
    

      <FooterText>Email: echobyteconcept@gmail.com</FooterText>
      <FooterText>Phone: +234 706 348 0314, +234 816 886 4508</FooterText>
      <FooterText>&copy; {currentYear} ECHOBYTE CONCEPT. All rights reserved.</FooterText>
    </FooterContainer>
  );
}
