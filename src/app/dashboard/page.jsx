"use client";

import { useEffect, useState } from "react";
import { auth, db,} from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import ProfilePage from "@/components/Profiles";
import SubscriptionComponent from "@/components/SubscriptionComponent";


// THEME COLORS
const DarkBlue = "#0056b3";
const White = "#FFFFFF";
// const SoftBg = "#f4f8ff";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  // gap: 2.5rem;
  // padding: 1rem;
  color: ${DarkBlue};
`;

const Greeting = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${DarkBlue};
`;

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${DarkBlue};
  margin-top: 2rem;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
`;

const MenuGrid = styled.div`
margin-top:1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;

  @media(max-width:768px){
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }
`;

const Card = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "clickable",
})`
  background: ${White};
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(0, 86, 179, 0.15);
  box-shadow: 0 6px 15px rgba(0, 86, 179, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: ${(props) => (props.clickable ? "pointer" : "default")};

  &:hover {
    transform: ${(props) => (props.clickable ? "translateY(-6px)" : "none")};
    box-shadow: ${(props) =>
      props.clickable
        ? "0 10px 22px rgba(0, 86, 179, 0.18)"
        : "0 6px 15px rgba(0, 86, 179, 0.1)"};
  }
`;


const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  color: ${DarkBlue};
`;

const CardValue = styled.p`
  margin: 0.5rem 0 0 0;
  font-size: 1rem;
//   font-weight: bold;
  color: ${DarkBlue};
`;

const MenuCard = styled(Card).withConfig({
  shouldForwardProp: (prop) => prop !== "clickable",
})`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 110px;
  text-align: center;
  background: linear-gradient(135deg, ${White}, #e6f0ff);
  border-left: 5px solid ${DarkBlue};
`;

const DashboardHome = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);



const signOut = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You will be signed out of your account.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#0056b3",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Sign Out"
  }).then((result) => {
    if (result.isConfirmed) {
      auth.signOut();
      Swal.fire("Signed Out", "You have been logged out successfully.", "success");
      router.push("/login");
    }
  });
};




  if (loading) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h2>Loading dashboard...</h2>
      </div>
    );
  }

  if (!userData) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h2>No user data found.</h2>
      </div>
    );
  }

  return (
    <Container>
      <Greeting>Welcome back, {userData.name || userData.email} 👋</Greeting>

      {/* User Info Cards */}
      <SectionTitle>Your Primary Details</SectionTitle>
      <CardsGrid>
        <Card>
          <CardTitle>Full Name</CardTitle>
          <CardValue>{userData.name}</CardValue>
        </Card>

        <Card>
          <CardTitle>Email</CardTitle>
          <CardValue>{userData.email}</CardValue>
        </Card>

        <Card>
          <CardTitle>Phone</CardTitle>
          <CardValue>{userData.phone}</CardValue>
        </Card>

      
      </CardsGrid>
<SubscriptionComponent/>
      <ProfilePage/>


      {/* MENU CARDS SECTION */}
      {/* <SectionTitle>Sections</SectionTitle> */}
{/* <p>Open each section and start creating and updating your details for any of your profiles</p> */}
      {/* <MenuGrid>
  

        <MenuCard clickable onClick={() => router.push("/dashboard/personal-info")}>
          <CardTitle>Personal Info</CardTitle>
        </MenuCard>

        <MenuCard clickable onClick={() => router.push("/dashboard/biography")}>
          <CardTitle>Biography</CardTitle>
        </MenuCard>


        <MenuCard clickable onClick={() => router.push("/dashboard/skills")}>
          <CardTitle>Skills</CardTitle>
        </MenuCard>

        <MenuCard clickable onClick={() => router.push("/dashboard/education")}>
          <CardTitle>Education</CardTitle>
        </MenuCard>

            <MenuCard clickable onClick={() => router.push("/dashboard/experiences")}>
          <CardTitle>Experiences</CardTitle>
        </MenuCard>

        <MenuCard clickable onClick={() => router.push("/dashboard/projects")}>
          <CardTitle>Projects</CardTitle>
        </MenuCard>

         <MenuCard clickable onClick={() => router.push("/dashboard/certification")}>
          <CardTitle>Certifications</CardTitle>
        </MenuCard>

        <MenuCard clickable onClick={() => router.push("/dashboard/links")}>
          <CardTitle>Manage Links</CardTitle>
        </MenuCard>

        <MenuCard clickable onClick={() => router.push("/dashboard/summary")}>
          <CardTitle>Summary</CardTitle>
        </MenuCard>

        <MenuCard clickable onClick={() => signOut()}>
          <CardTitle>Logout</CardTitle>
        </MenuCard>
      </MenuGrid> */}
    </Container>
  );
};

export default DashboardHome;
