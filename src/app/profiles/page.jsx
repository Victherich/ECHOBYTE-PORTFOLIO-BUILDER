"use client";

import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { db } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { categories } from "@/components/categories";
import ProfileSearchHero from "@/components/ProfileSearchHero";

/* ================= COLORS ================= */
const Blue = "#007BFF";
const DarkBlue = "#0056b3";
const LightBg = "#f5f9ff";

/* ================= ANIMATION ================= */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

/* ================= PAGE ================= */
const Page = styled.div`
  min-height: 100vh;
  background: radial-gradient(circle at top, #ffffff, ${LightBg});
  padding: 3rem 1rem;
  font-family: "Segoe UI", sans-serif;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
`;

/* ================= HEADER ================= */
const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  animation: ${fadeIn} 0.6s ease;
`;

const Title = styled.h1`
  font-size: 2.8rem;
  color: ${DarkBlue};
  margin-bottom: 0.5rem;
  font-weight: 800;
`;

const Subtitle = styled.p`
  color: #666;
  max-width: 650px;
  margin: auto;
  line-height: 1.6;
`;

/* ================= GRID ================= */
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

/* ================= CARD ================= */
const Card = styled.div`
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(10px);
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 12px 30px rgba(0,0,0,0.08);
  transition: 0.3s ease;
  animation: ${fadeIn} 0.6s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 18px 40px rgba(0,0,0,0.12);
  }
`;

/* ================= IMAGE HEADER ================= */
// const Cover = styled.div`
//   height: 120px;
//   background: linear-gradient(135deg, ${Blue}, ${DarkBlue});
//   position: relative;
// `;

const Cover = styled.div`
  height: 140px;

  position: relative;

  background-image:
    linear-gradient(
      rgba(0,0,0,0.45),
      rgba(0,0,0,0.45)
    ),
    url(${(p) => p.$image || "/h1.jpg"});

  background-size: cover;
  background-position: center;

//   overflow: hidden;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
  position: absolute;
  bottom: -40px;
  left: 20px;
  background: white;
`;

const AvatarFallback = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #e6f0ff;
  border: 4px solid white;
  position: absolute;
  bottom: -40px;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  color: ${DarkBlue};
`;

/* ================= CONTENT ================= */
const Content = styled.div`
  padding: 3rem 1.2rem 1.5rem;
`;

const TitleName = styled.h2`
  margin: 0;
  font-size: 1.3rem;
  color: #111;
  font-weight: 800;
`;

const Username = styled.p`
//   margin: 5px 0;
  color: ${DarkBlue};
  font-weight: 600;
`;

const Tag = styled.span`
  display: inline-block;
  margin-top: 6px;
  background: rgba(0,123,255,0.1);
  color: ${DarkBlue};
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
`;

/* ================= INFO ================= */
const Info = styled.p`
  font-size: 0.7rem;
  color: #111;
//   margin: 4px 0;
`;

/* ================= BUTTON ================= */
const Button = styled.button`
  width: 100%;
  margin-top: 0.3rem;
  padding: 10px;
  border: none;
  border-radius: 10px;
  background: ${DarkBlue};
  color: white;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: #00448a;
  }
`;

/* ================= EMPTY ================= */
const Empty = styled.div`
  text-align: center;
  color: #777;
  margin-top: 4rem;
`;

/* ================= PAGE ================= */
export default function PublicProfilesPage() {
  const router = useRouter();
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState("");
const [category, setCategory] = useState("");


  useEffect(() => {
    const load = async () => {
      const [profileSnap, personalSnap] = await Promise.all([
        getDocs(collection(db, "profiles")),
        getDocs(collection(db, "personalInfo")),
      ]);

      const profilesData = profileSnap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      const personalData = personalSnap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      // 🔥 MERGE LOGIC (VERY IMPORTANT)
      const merged = profilesData.map((p) => {
        const personal = personalData.find(
          (info) => info.profileId === p.id
        );

        return {
          ...p,
          personal,
        };
      });

      setProfiles(merged);
    };

    load();
  }, []);




  const filteredProfiles = profiles.filter((p) => {
  const fullText =
    `${p.title} ${p.username} ${p.personal?.email || ""}`.toLowerCase();

  const matchesSearch = fullText.includes(search.toLowerCase());

  const matchesCategory = category
    ? p.categoryId === category
    : true;

  return matchesSearch && matchesCategory;
});



  return (
    <Page>
      <Container>

        {/* <Header>
          <Title>Discover Creators</Title>
          <Subtitle>
            Explore amazing portfolios, talents, and professionals from around the world.
          </Subtitle>
        </Header> */}

        <ProfileSearchHero
  search={search}
  setSearch={setSearch}
  category={category}
  setCategory={setCategory}
/>

        {profiles.length === 0 ? (
          <Empty>No profiles available yet.</Empty>
        ) : (
          <Grid>
            {filteredProfiles.map((p) => (
              <Card key={p.id}>

                <Cover $image={p.coverImage}>
                  {p.profileImage ? (
                    <Avatar src={p.profileImage} />
                  ) : (
                    <AvatarFallback>
                      {p.title?.charAt(0) || "P"}
                    </AvatarFallback>
                  )}
                </Cover>

                <Content>

                  <TitleName>{p.title}</TitleName>
                  <Username>@{p.username}</Username>


                  <Tag>
                  
                      {/* Category:{" "} */}
                      {categories.find((c) => c.id === p.categoryId)?.name || "N/A"}
                  
                  </Tag>

                  {/* <Info><b>Theme:</b> {p.theme}</Info> */}
            
                      {p.personal ? (
                    <>
                      <Info>
                        {p.personal.firstName} {p.personal.lastName}
                      </Info>
                      <Info>{p.personal.email}</Info>
                      <Info>{p.personal.location}</Info>
                      {/* <Info>{p.personal.phone}</Info> */}
                    </>
                  ) : (
                    <Info>No personal info added</Info>
                  )}

             

                  <Button onClick={() => router.push(`/${p.username}${p.profileNumber}`)}>
                    View Profile
                  </Button>

                </Content>

              </Card>
            ))}
          </Grid>
        )}

      </Container>
    </Page>
  );
}