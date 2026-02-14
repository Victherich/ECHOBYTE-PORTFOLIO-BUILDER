"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styled from "styled-components";
import Swal from "sweetalert2";
import { usePathname } from "next/navigation";


const DarkBlue = "#0056b3";
const LightBg = "#f2f6fb";
// const White = "#ffffff";

/* ---------------- LAYOUT WRAPPER ---------------- */
const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  position: relative;
`;

/* ---------------- SIDEBAR ---------------- */
const Sidebar = styled.div`
  width: 260px;
  background: ${DarkBlue};
  color: white;
  padding: 2rem 1rem;
  transition: 0.35s ease;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: ${(props) => (props.$open ? "0" : "-260px")};
    height: 100vh;
    z-index: 200;
    box-shadow: ${(props) => (props.$open ? "4px 0 15px rgba(0,0,0,0.3)" : "none")};
  }
`;

const MenuItem = styled.p`
  padding: 0.8rem 1rem;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background: rgba(255,255,255,0.25);
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 2rem;
  background: ${LightBg};
  min-height: 100vh;
`;

/* ---------------- OVERLAY (click-away) ---------------- */
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
    z-index: 150;
  }
`;

/* ---------------- HAMBURGER ---------------- */
const Hamburger = styled.div`
  position: fixed;
  top: 60px;
  left: 1%;
  z-index: 250; 
  width: 40px;
  height: 40px;
  background: ${DarkBlue};
  border-radius: 10px;
  color: white;
  font-size: 1.5rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: flex;
  }
`;

/* ---------------- HOME BUTTON ---------------- */
const HomeButton = styled.button`
  position: fixed;
  top: 60px;
  right: 1%;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${DarkBlue};
  color: white;
  font-size: 1.3rem;
  border: none;
  z-index: 250;
  box-shadow: 0 6px 15px rgba(0, 86, 179, 0.3);
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #00448a;
  }
`;

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
const showHomeButton = pathname !== "/dashboard";


  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/login");
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: 50, textAlign: "center" }}>
        <h2>Loading dashboard...</h2>
      </div>
    );
  }

  /* ---------------- SIGN OUT ---------------- */
  const signOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be signed out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: DarkBlue,
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Sign Out",
    }).then((result) => {
      if (result.isConfirmed) {
        auth.signOut();
        Swal.fire("Signed Out", "You have been logged out successfully.", "success");
        router.push("/login");
      }
    });
  };

  /* ---------------- CLOSE SIDEBAR ON MOBILE ---------------- */
  const closeSidebar = () => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <LayoutWrapper>

      {/* HAMBURGER (mobile only) */}
      <Hamburger onClick={() => setSidebarOpen(!sidebarOpen)}>
        ☰
      </Hamburger>

      {/* CLICK-AWAY OVERLAY */}
      <Overlay $open={sidebarOpen} onClick={() => setSidebarOpen(false)} />

      {/* FIXED HOME BUTTON */}

{showHomeButton && (
  <HomeButton
    onClick={() => {
      router.push("/dashboard");
      closeSidebar();
    }}
  >
    🏠
    
  </HomeButton>
)}


      {/* SIDEBAR */}
      <Sidebar $open={sidebarOpen}>
        <h2 style={{ marginBottom: "2rem" }}>Dashboard</h2>

        <Link href="/dashboard" onClick={closeSidebar}><MenuItem>Home</MenuItem></Link>
        <Link href="/dashboard/profiles" onClick={closeSidebar}><MenuItem>My Profiles</MenuItem></Link>
       
        <Link href="/dashboard/personal-info" onClick={closeSidebar}><MenuItem>Personal Info</MenuItem></Link>
        <Link href="/dashboard/biography" onClick={closeSidebar}><MenuItem>Biography</MenuItem></Link>
        <Link href="/dashboard/skills" onClick={closeSidebar}><MenuItem>Skills</MenuItem></Link>
         <Link href="/dashboard/education" onClick={closeSidebar}><MenuItem>Education</MenuItem></Link>
        <Link href="/dashboard/experiences" onClick={closeSidebar}><MenuItem>Experiences</MenuItem></Link>
                <Link href="/dashboard/projects" onClick={closeSidebar}><MenuItem>Projects</MenuItem></Link>
        <Link href="/dashboard/certification" onClick={closeSidebar}><MenuItem>Certification</MenuItem></Link>
       
        <Link href="/dashboard/links" onClick={closeSidebar}><MenuItem>Manage Links</MenuItem></Link>
        <Link href="/dashboard/summary" onClick={closeSidebar}><MenuItem>Summary</MenuItem></Link>
        <Link href="/dashboard/settings" onClick={closeSidebar}><MenuItem>Settings</MenuItem></Link>

        <MenuItem 
          onClick={() => {
            signOut();
            closeSidebar();
          }}
        >
          Logout
        </MenuItem>
      </Sidebar>

      {/* MAIN CONTENT */}
      <Content onClick={closeSidebar}>
        {children}
      </Content>
    </LayoutWrapper>
  );
}
