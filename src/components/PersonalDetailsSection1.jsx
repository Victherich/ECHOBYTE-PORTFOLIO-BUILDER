"use client";

import styled from "styled-components";

/* ================= HERO ================= */

const Wrapper = styled.section`
  border-radius: 24px;
  overflow: hidden;
  background: white;
  // box-shadow: 0 20px 40px rgba(0, 86, 179, 0.15);
    border: 1px solid rgba(0, 86, 179, 0.2);
  margin-bottom: 2rem;
`;

const Hero = styled.div`
  position: relative;
  height: 320px;
  background: url("https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80")
    center/cover no-repeat;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0.25)
  );
`;

const HeroContent = styled.div`
  position: absolute;
  bottom: 20px;
  left: 24px;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
`;

const ProfileImage = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: white;
  color: #0056b3;
  font-size: 2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid white;
`;

const Identity = styled.div``;

const Name = styled.h2`
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
`;

const Nick = styled.p`
  margin: 4px 0;
  font-size: 0.9rem;
  opacity: 0.9;
`;

const Meta = styled.p`
  margin: 0;
  font-size: 0.85rem;
  opacity: 0.85;
`;

/* ================= INFO ================= */

const Body = styled.div`
  padding: 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
`;

const Card = styled.div`
  background: #f8fbff;
  border: 1px solid rgba(0, 86, 179, 0.1);
  border-radius: 14px;
  padding: 1rem;
`;

const Label = styled.p`
  margin: 0;
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: uppercase;
`;

const Value = styled.p`
  margin-top: 6px;
  font-size: 0.95rem;
  font-weight: 600;
  color: #111827;
`;

const Tags = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  background: rgba(0, 86, 179, 0.08);
  border: 1px solid rgba(0, 86, 179, 0.15);
  color: #0056b3;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.85rem;
`;

/* ================= COMPONENT ================= */

export default function PersonalDetailsSection1({ data }) {
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
    <Wrapper>
      <Hero>
        <Overlay />
        <HeroContent>
          <ProfileImage>
            {data.firstName?.charAt(0)?.toUpperCase() || "P"}
          </ProfileImage>

          <Identity>
            <Name>{fullName}</Name>
            {data.nickName && <Nick>“{data.nickName}”</Nick>}
            <Meta>
              {data.location || "Location"} • {data.email || "Email"}
            </Meta>
          </Identity>
        </HeroContent>
      </Hero>

      <Body>
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
      </Body>
    </Wrapper>
  );
}