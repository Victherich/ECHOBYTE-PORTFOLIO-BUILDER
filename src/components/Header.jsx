"use client";

import { useState } from "react";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";

// --- STYLED COMPONENTS ---

const Blue = "#007BFF";
const DarkBlue = "#0056b3";
const White = "#FFFFFF";
const LightGray = "#f8f9fa";

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

const HeaderContainer = styled.header`
  background-color: ${White};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${DarkBlue};
  margin: 0;
  cursor: pointer;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 100%;
    right: 0;
    width: 100%;
    background-color: ${White};
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    gap: 1rem;
    animation: none;

    &.open {
      display: flex;
      animation: ${slideIn} 0.3s ease-out forwards;
    }
  }
`;

const NavLink = styled(Link)`
  color: ${DarkBlue};
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: ${Blue};
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid ${LightGray};
  }
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;
  z-index: 1001;

  @media (max-width: 768px) {
    display: block;
  }

  div {
    width: 25px;
    height: 3px;
    background-color: ${DarkBlue};
    margin: 5px;
    transition: all 0.3s ease-in-out;
  }

  &.open div:nth-child(1) {
    transform: rotate(-45deg) translate(-5px, 6px);
  }

  &.open div:nth-child(2) {
    opacity: 0;
  }

  &.open div:nth-child(3) {
    transform: rotate(45deg) translate(-5px, -6px);
  }
`;

/* --- MOBILE CLICK-AWAY OVERLAY --- */
const Overlay = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${(props) => (props.$open ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.45);
    z-index: 100;
  }
`;

// --- MAIN COMPONENT ---
export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const closeNav = () => setIsNavOpen(false);

  return (
    <>
      {/* CLICK-AWAY OVERLAY */}
      <Overlay $open={isNavOpen} onClick={closeNav} />

      <HeaderContainer>
        <Logo>
          <Link href="/" onClick={closeNav}>MY PORTFOLIO & LINKS</Link>
        </Logo>

        <Nav className={isNavOpen ? "open" : ""}>
          {/* Close menu on every link click */}
          <NavLink href="/" onClick={closeNav}>Home</NavLink>
          <NavLink href="/profiles" onClick={closeNav}>See Talents & Creators</NavLink>
          <NavLink href="/contact" onClick={closeNav}>Contact</NavLink>
        </Nav>

        <Hamburger onClick={toggleNav} className={isNavOpen ? "open" : ""}>
          <div></div>
          <div></div>
          <div></div>
        </Hamburger>
      </HeaderContainer>
    </>
  );
}
