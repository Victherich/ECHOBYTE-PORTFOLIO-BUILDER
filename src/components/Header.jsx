// "use client";

// import { useState } from "react";
// import styled, { keyframes } from "styled-components";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// // --- STYLED COMPONENTS ---

// const Blue = "#007BFF";
// const DarkBlue = "#0056b3";
// const White = "#FFFFFF";
// const LightGray = "#f8f9fa";

// const slideIn = keyframes`
//   from { transform: translateX(100%); }
//   to { transform: translateX(0); }
// `;

// // const HeaderContainer = styled.header`
// //   background-color: ${White};
// //   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
// //   padding: 1rem 2rem;
// //   display: flex;
// //   justify-content: space-between;
// //   align-items: center;
// //   position: sticky;
// //   top: 0;
// //   z-index: 100;

// //   @media (max-width: 768px) {
// //     padding: 1rem;
// //   }
// // `;

// const HeaderContainer = styled.header`
//   background-color: ${White};
//   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);

//   padding: 1rem 2rem;

//   display: flex;
//   justify-content: space-between;
//   align-items: center;

//   position: sticky;
//   top: 0;

//   z-index: 1000;

//   width: 100%;
//   left: 0;
//   right: 0;

//   transform: none !important;
//   animation: none !important;
//   transition: none !important;

//   @media (max-width: 768px) {
//     padding: 1rem;
//   }
// `;

// const Logo = styled.h1`
//   font-size: 1.5rem;
//   font-weight: bold;
//   color: ${DarkBlue};
//   margin: 0;
//   cursor: pointer;
// `;

// const Nav = styled.nav`
//   display: flex;
//   gap: 2rem;

//   @media (max-width: 768px) {
//     display: none;
//     flex-direction: column;
//     position: absolute;
//     top: 100%;
//     right: 0;
//     width: 100%;
//     background-color: ${White};
//     box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
//     padding: 1rem;
//     gap: 1rem;
//     animation: none;

//     &.open {
//       display: flex;
//       animation: ${slideIn} 0.3s ease-out forwards;
//     }
//   }
// `;

// const NavLink = styled(Link)`
//   color: ${DarkBlue};
//   text-decoration: none;
//   font-weight: 600;
//   transition: color 0.3s ease;
//   cursor: pointer;

//   &:hover {
//     color: ${Blue};
//   }

//   @media (max-width: 768px) {
//     font-size: 1.2rem;
//     padding: 0.5rem 1rem;
//     border-bottom: 1px solid ${LightGray};
//   }
// `;

// const Hamburger = styled.div`
//   display: none;
//   cursor: pointer;
//   z-index: 1001;

//   @media (max-width: 768px) {
//     display: block;
//   }

//   div {
//     width: 25px;
//     height: 3px;
//     background-color: ${DarkBlue};
//     margin: 5px;
//     transition: all 0.3s ease-in-out;
//   }

//   &.open div:nth-child(1) {
//     transform: rotate(-45deg) translate(-5px, 6px);
//   }

//   &.open div:nth-child(2) {
//     opacity: 0;
//   }

//   &.open div:nth-child(3) {
//     transform: rotate(45deg) translate(-5px, -6px);
//   }
// `;

// /* --- MOBILE CLICK-AWAY OVERLAY --- */
// const Overlay = styled.div`
//   display: none;

//   @media (max-width: 768px) {
//     display: ${(props) => (props.$open ? "block" : "none")};
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100vw;
//     height: 100vh;
//     background: rgba(0,0,0,0.45);
//     z-index: 100;
//   }
// `;

// // --- MAIN COMPONENT ---
// export default function Header() {
//   const [isNavOpen, setIsNavOpen] = useState(false);
//   const pathname = usePathname();

//   const toggleNav = () => setIsNavOpen(!isNavOpen);
//   const closeNav = () => setIsNavOpen(false);

//   return (
//     <>
//       {/* CLICK-AWAY OVERLAY */}
//       <Overlay $open={isNavOpen} onClick={closeNav} />

//       <HeaderContainer>
//         <Logo>
//           <Link href="/" onClick={closeNav}>MY PORTFOLIO & LINKS</Link>
//         </Logo>

//         <Nav className={isNavOpen ? "open" : ""}>
//           {/* Close menu on every link click */}
//           <NavLink href="/" onClick={closeNav}>Home</NavLink>
//           <NavLink href="/profiles" onClick={closeNav}>See Talents & Creators</NavLink>
//           <NavLink href="/contact" onClick={closeNav}>Contact</NavLink>
//         </Nav>

//         <Hamburger onClick={toggleNav} className={isNavOpen ? "open" : ""}>
//           <div></div>
//           <div></div>
//           <div></div>
//         </Hamburger>
//       </HeaderContainer>
//     </>
//   );
// }




"use client";

import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

/* ================= COLORS ================= */

const Blue = "#2563eb";
const Dark = "#0f172a";
const Border = "#e5eaf2";
const White = "#ffffff";

/* ================= HEADER ================= */

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;

  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  border-bottom: 1px solid ${Border};
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: auto;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1.35rem 1.5rem;
`;

/* ================= LOGO ================= */

const Logo = styled.div`
  font-size: 1.2rem;
  font-weight: 800;
  color: ${Dark};
  cursor: pointer;

  span {
    color: ${Blue};
  }
`;

/* ================= NAV ================= */

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 70px;
    right: 0;

    width: 75%;
    height: calc(100vh - 70px);

    background: white;
    border-left: 1px solid ${Border};

    flex-direction: column;
    padding: 2rem;

    transform: translateX(${(p) => (p.$open ? "0" : "100%")});
    transition: 0.3s ease;
  }
`;

/* ================= LINKS ================= */

const NavLink = styled(Link)`
  text-decoration: none;
  font-weight: 600;
  color: ${(p) => (p.$active ? Blue : Dark)};
  position: relative;

  &:hover {
    color: ${Blue};
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -6px;
    width: ${(p) => (p.$active ? "100%" : "0")};
    height: 2px;
    background: ${Blue};
    transition: 0.3s;
  }
`;

/* ================= BUTTON ================= */

const Hamburger = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }

  div {
    width: 25px;
    height: 3px;
    background: ${Dark};
    margin: 5px;
    transition: 0.3s;
  }

  &.open div:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  &.open div:nth-child(2) {
    opacity: 0;
  }

  &.open div:nth-child(3) {
    transform: rotate(-45deg) translate(6px, -6px);
  }
`;

/* ================= OVERLAY ================= */

const Overlay = styled.div`
  display: ${(p) => (p.$open ? "block" : "none")};

  position: fixed;
  inset: 0;

  background: rgba(0, 0, 0, 0.4);
  z-index: 99;
`;

/* ================= COMPONENT ================= */

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const userRef = doc(db, "users", user.uid);

        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data());
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setUserData(null);
    }
  });

  return () => unsubscribe();
}, []);

  return (
    <>
      {/* OVERLAY */}
      <Overlay $open={open} onClick={() => setOpen(false)} />

      <HeaderContainer>
        <Inner>
          {/* LOGO */}
          <Link href="/" onClick={() => setOpen(false)}>
            <Logo>
              My<span>Portfolio</span>
            </Logo>
          </Link>

          {/* NAV */}
          <Nav $open={open}>
            <NavLink
              href="/"
              $active={pathname === "/"}
              onClick={() => setOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              href="/profiles"
              $active={pathname === "/profiles"}
              onClick={() => setOpen(false)}
            >
              Discover
            </NavLink>

            <NavLink
              href="/contact"
              $active={pathname === "/contact"}
              onClick={() => setOpen(false)}
            >
              Contact
            </NavLink>

           <NavLink
  href={userData ? "/login" : "/login"}
  $active={
    pathname === "/login" ||
    pathname === "/login"
  }
  onClick={() => setOpen(false)}
>
  {userData
    ? `Hi ${userData.name?.split(" ")[0]}`
    : "SignUp/Login"}
</NavLink>
          </Nav>

          {/* HAMBURGER */}
          <Hamburger
            onClick={() => setOpen(!open)}
            className={open ? "open" : ""}
          >
            <div />
            <div />
            <div />
          </Hamburger>
        </Inner>
      </HeaderContainer>

      {/* spacer so content doesn't go under fixed header */}
      <div style={{ height: "70px" }} />
    </>
  );
}