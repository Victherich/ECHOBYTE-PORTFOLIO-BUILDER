// "use client";

// import styled from "styled-components";

// /* ================= HERO ================= */

// const Wrapper = styled.section`
//   border-radius: 24px;
//   overflow: hidden;
//   background: white;
//   // box-shadow: 0 20px 40px rgba(0, 86, 179, 0.15);
//     border: 1px solid rgba(0, 86, 179, 0.2);
//   margin-bottom: 2rem;
// `;

// const Hero = styled.div`
//   position: relative;
//   height: 320px;
//   background: url("https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80")
//     center/cover no-repeat;
// `;

// const Overlay = styled.div`
//   position: absolute;
//   inset: 0;
//   background: linear-gradient(
//     to top,
//     rgba(0, 0, 0, 0.7),
//     rgba(0, 0, 0, 0.25)
//   );
// `;

// const HeroContent = styled.div`
//   position: absolute;
//   bottom: 20px;
//   left: 24px;
//   display: flex;
//   align-items: center;
//   gap: 1rem;
//   color: white;
// `;

// const ProfileImage = styled.div`
//   width: 90px;
//   height: 90px;
//   border-radius: 50%;
//   background: white;
//   color: #0056b3;
//   font-size: 2rem;
//   font-weight: 700;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border: 4px solid white;
// `;

// const Identity = styled.div``;

// const Name = styled.h2`
//   margin: 0;
//   font-size: 2rem;
//   font-weight: 700;
// `;

// const Nick = styled.p`
//   margin: 4px 0;
//   font-size: 0.9rem;
//   opacity: 0.9;
// `;

// const Meta = styled.p`
//   margin: 0;
//   font-size: 0.85rem;
//   opacity: 0.85;
// `;

// /* ================= INFO ================= */

// const Body = styled.div`
//   padding: 1.5rem;
// `;

// const Grid = styled.div`
//   display: grid;
//   gap: 1rem;
//   grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
// `;

// const Card = styled.div`
//   background: #f8fbff;
//   border: 1px solid rgba(0, 86, 179, 0.1);
//   border-radius: 14px;
//   padding: 1rem;
// `;

// const Label = styled.p`
//   margin: 0;
//   font-size: 0.75rem;
//   color: #6b7280;
//   text-transform: uppercase;
// `;

// const Value = styled.p`
//   margin-top: 6px;
//   font-size: 0.95rem;
//   font-weight: 600;
//   color: #111827;
// `;

// const Tags = styled.div`
//   margin-top: 1.5rem;
//   display: flex;
//   flex-wrap: wrap;
//   gap: 0.5rem;
// `;

// const Tag = styled.span`
//   background: rgba(0, 86, 179, 0.08);
//   border: 1px solid rgba(0, 86, 179, 0.15);
//   color: #0056b3;
//   padding: 6px 12px;
//   border-radius: 999px;
//   font-size: 0.85rem;
// `;

// /* ================= COMPONENT ================= */

// export default function PersonalDetailsSection1({ data }) {
//   if (!data) return null;

//   const fullName =
//     [data.firstName, data.middleName, data.lastName]
//       .filter(Boolean)
//       .join(" ") || "Personal Information";

//   const fields = [
//     { label: "Email", value: data.email },
//     { label: "Phone", value: data.phone },
//     { label: "Date of Birth", value: data.dateOfBirth },
//     { label: "Gender", value: data.gender },
//     { label: "Nationality", value: data.nationality },
//     { label: "Languages", value: data.languages },
//   ].filter((f) => f.value);

//   const tags = [data.hobbies, data.personalTraits].filter(Boolean);

//   return (
//     <Wrapper>
//       <Hero>
//         <Overlay />
//         <HeroContent>
//           <ProfileImage>
//             {data.firstName?.charAt(0)?.toUpperCase() || "P"}
//           </ProfileImage>

//           <Identity>
//             <Name>{fullName}</Name>
//             {data.nickName && <Nick>“{data.nickName}”</Nick>}
//             <Meta>
//               {data.location || "Location"} • {data.email || "Email"}
//             </Meta>
//           </Identity>
//         </HeroContent>
//       </Hero>

//       <Body>
//         <Grid>
//           {fields.map((f, i) => (
//             <Card key={i}>
//               <Label>{f.label}</Label>
//               <Value>{f.value}</Value>
//             </Card>
//           ))}
//         </Grid>

//         {tags.length > 0 && (
//           <Tags>
//             {tags.map((t, i) => (
//               <Tag key={i}>{t}</Tag>
//             ))}
//           </Tags>
//         )}
//       </Body>
//     </Wrapper>
//   );
// }


"use client";

import styled from "styled-components";

/* ================= WRAPPER ================= */

// const Wrapper = styled.section`
//   position: relative;
//   overflow: hidden;
//   border-radius: 32px;
//   padding: 3rem;
//   color: white;

//   /* BACKGROUND IMAGE + BLUE OVERLAY */
//   background:
//     linear-gradient(
//       135deg,
//       rgba(0, 86, 179, 0.9) 0%,
//       rgba(10, 109, 217, 0.5) 45%,
//       rgba(59, 141, 255, 0.3) 100%
//     ),
//     url("https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600&auto=format&fit=crop")
//       center/cover no-repeat;

//   border: 1px solid rgba(255, 255, 255, 0.08);

//   box-shadow:
//     0 20px 60px rgba(0, 86, 179, 0.28),
//     inset 0 1px 0 rgba(255, 255, 255, 0.12);

//   backdrop-filter: blur(4px);

//   @media (max-width: 768px) {
//     padding: 2rem 1.5rem;
//   }
// `;


const Wrapper = styled.section`
  position: relative;
  overflow: hidden;
  border-radius: 32px;
  padding: 3rem;
  color: white;

  /* dynamic cover image */
  background: ${({ $cover }) =>
    $cover
      ? `
        linear-gradient(
          135deg,
          rgba(0, 86, 179, 0.9) 0%,
          rgba(10, 109, 217, 0.6) 45%,
          rgba(59, 141, 255, 0.35) 100%
        ),
        url(${$cover}) center/cover no-repeat
      `
      : `
        linear-gradient(
          135deg,
          rgba(0, 86, 179, 0.9) 0%,
          rgba(10, 109, 217, 0.6) 45%,
          rgba(59, 141, 255, 0.35) 100%
        )
      `};

  border: 1px solid rgba(255, 255, 255, 0.08);

  box-shadow:
    0 20px 60px rgba(0, 86, 179, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

/* ================= DECORATIVE GLOWS ================= */

const Glow = styled.div`
  position: absolute;
  width: 350px;
  height: 350px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  top: -120px;
  right: -120px;
  filter: blur(10px);
`;

const Glow2 = styled.div`
  position: absolute;
  width: 240px;
  height: 240px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  bottom: -80px;
  left: -80px;
  filter: blur(10px);
`;

/* ================= HERO ================= */

const Hero = styled.div`
  position: relative;
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  flex-wrap: wrap;
`;

const Left = styled.div`
  flex: 1;
  min-width: 280px;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;

  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.18);

  padding: 8px 16px;
  border-radius: 999px;

  font-size: 0.82rem;
  font-weight: 600;

  backdrop-filter: blur(12px);
  margin-bottom: 1.3rem;
`;

const Name = styled.h1`
  margin: 0;
  font-size: clamp(2.8rem, 5vw, 4.6rem);
  line-height: 0.95;
  font-weight: 900;
  letter-spacing: -3px;

  text-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
`;

const Nick = styled.p`
  margin: 1rem 0 0;
  font-size: 1.08rem;
  color: rgba(255, 255, 255, 0.9);
`;

const Meta = styled.div`
  margin-top: 1.7rem;

  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const MetaCard = styled.div`
  background: rgba(255, 255, 255, 0.12);

  backdrop-filter: blur(16px);

  border: 1px solid rgba(255, 255, 255, 0.14);

  padding: 14px 18px;
  border-radius: 20px;

  min-width: 170px;

  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
`;

const MetaLabel = styled.p`
  margin: 0;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.72;
`;

const MetaValue = styled.p`
  margin: 6px 0 0;
  font-size: 0.95rem;
  font-weight: 600;
`;

/* ================= PROFILE IMAGE ================= */

const ProfileWrapper = styled.div`
  position: relative;
`;

const ProfileRing = styled.div`
  width: 260px;
  height: 260px;
  border-radius: 50%;
  padding: 7px;

  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0.4)
  );

  box-shadow:
    0 25px 45px rgba(0, 0, 0, 0.22),
    0 0 0 12px rgba(255, 255, 255, 0.06);

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  display: block;
`;

const InitialAvatar = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  background: white;
  color: #0056b3;

  font-size: 5rem;
  font-weight: 800;
`;

/* ================= BOTTOM ================= */

const Bottom = styled.div`
  position: relative;
  z-index: 2;

  margin-top: 3rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.12);

  backdrop-filter: blur(16px);

  border: 1px solid rgba(255, 255, 255, 0.14);

  padding: 1rem;
  border-radius: 22px;

  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.16);
  }
`;

const Label = styled.p`
  margin: 0;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.7;
`;

const Value = styled.p`
  margin: 0.55rem 0 0;
  font-size: 1rem;
  font-weight: 600;
`;

const Tags = styled.div`
  margin-top: 1.7rem;

  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const Tag = styled.span`
  padding: 10px 16px;
  border-radius: 999px;

  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.14);

  backdrop-filter: blur(12px);

  font-size: 0.85rem;
  font-weight: 500;
`;

/* ================= COMPONENT ================= */

export default function PersonalDetailsSection1({ data, profile }) {
  if (!data) return null;

  const fullName =
    [data.firstName, data.middleName, data.lastName]
      .filter(Boolean)
      .join(" ") || "Personal Information";

  const fields = [
    { label: "Email", value: data.email },
    { label: "Phone", value: data.phone },
    { label: "Date of Birth", value: data.dateOfBirth },
    { label: "Gender", value: data.gender },
    { label: "Nationality", value: data.nationality },
    { label: "Languages", value: data.languages },
  ].filter((f) => f.value);

  const tags = [data.hobbies, data.personalTraits].filter(Boolean);

  return (
    <Wrapper $cover={profile?.coverImage}>
      <Glow />
      <Glow2 />

      <Hero>
        <Left>
          <Badge>✨ Personal Profile</Badge>

          <Name>{fullName}</Name>

          {data.nickName && <Nick>“{data.nickName}”</Nick>}

          <Meta>
            {data.location && (
              <MetaCard>
                <MetaLabel>Location</MetaLabel>
                <MetaValue>{data.location}</MetaValue>
              </MetaCard>
            )}

            {data.email && (
              <MetaCard>
                <MetaLabel>Email</MetaLabel>
                <MetaValue>{data.email}</MetaValue>
              </MetaCard>
            )}
          </Meta>
        </Left>

        <ProfileWrapper>
          <ProfileRing>
           <ProfileImage
  src={
    profile?.profileImage ||
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop"
  }
  alt={fullName}
/>
          </ProfileRing>
        </ProfileWrapper>
      </Hero>

      <Bottom>
        <Grid>
          {fields.map((f, i) => (
            <Card key={i}>
              <Label>{f.label}</Label>
              <Value>{f.value}</Value>
            </Card>
          ))}
        </Grid>

        {tags.length > 0 && (
          <Tags>
            {tags.map((t, i) => (
              <Tag key={i}>{t}</Tag>
            ))}
          </Tags>
        )}
      </Bottom>
    </Wrapper>
  );
}