"use client";

import styled from "styled-components";
import { categories } from "../categories";


// Theme colors
const DarkBlue = "#0056b3";
const White = "#FFFFFF";

const ProfileItem = styled.div`
  background: ${White};
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid rgba(0, 86, 179, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  box-shadow: 0 4px 10px rgba(0, 86, 179, 0.1);

  @media (max-width: 428px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const BtnRow = styled.div`
  display: flex;
  gap: 1rem;
  align-items:center;
`;

const Btn = styled.button`
  padding: 8px 15px;
  background: ${DarkBlue};
  color: ${White};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;

  ${(props) =>
    props.$delete &&
    `
      background: #d9534f;
    `}

  ${(props) =>
    props.$small &&
    `
      padding: 6px 10px;
      font-size: 0.85rem;
    `}
`;

const CardLeft = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex: 1;
`;

const ImageBox = styled.div`
  width: 120px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  border: 1px solid rgba(0, 86, 179, 0.15);
  background: #f3f7ff;
`;

const CoverImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;

  position: absolute;
  top: 8px;
  right: 8px;

  border: 2px solid white;
  background: white;
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TitleText = styled.strong`
  font-size: 1rem;
  color: #111827;
`;

const SubText = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: rgba(0, 0, 0, 0.55);
`;

const PreviewBtn = styled.button`
  margin-top: 6px;
  padding: 6px 12px;

  background: #0056b3;
  color: white;

  border: none;
  border-radius: 6px;

  cursor: pointer;
  font-weight: 600;

  transition: 0.2s ease;

  &:hover {
    background: #004494;
    transform: translateY(-1px);
  }
`;


const SectionsWrapper = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 10px;
`;

const SectionCard = styled.div`
  background: linear-gradient(135deg, #f8fbff, #eef5ff);
  border: 1px solid rgba(0, 86, 179, 0.12);
  border-radius: 12px;
  padding: 12px;
  transition: 0.25s ease;
  box-shadow: 0 3px 8px rgba(0, 86, 179, 0.06);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 18px rgba(0, 86, 179, 0.12);
  }
`;

const SectionTitle = styled.h4`
  margin: 0;
  font-size: 0.9rem;
  color: #0f172a;
  font-weight: 700;
`;

const SectionBtn = styled.button`
  margin-top: 8px;
  width: 100%;
  padding: 8px 10px;

  border: none;
  border-radius: 8px;

  background: ${DarkBlue};
  color: white;

  font-size: 0.8rem;
  font-weight: 600;

  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: #004494;
    transform: translateY(-1px);
  }
`;




const sections = [
  {
    title: "Personal Info",
    action: "personalInfo",
  },
  {
    title: "Biography",
    action: "biography",
  },
  {
    title: "Skills",
    action: "skills",
  },
  {
    title: "Education",
    action: "education",
  },
  {
    title: "Experiences",
    action: "experiences",
  },
  {
    title: "Projects",
    action: "projects",
  },
  {
    title: "Certifications",
    action: "certifications",
  },
  {
    title: "Links",
    action: "links",
  },
  {
    title: "Summary",
    action: "summary",
  },
];


export default function ProfileCard({
  p,
  themeDesigns,
  openEditModal,
  deleteProfile,

  setPersonalInfoModal,
  setBiographyModal,
  setSkillsModal,
  setEducationModal,
  setExperiencesModal,
  setProjectsModal,
  setCertificationsModal,
  setLinksModal,
  setSummaryModal,
}){
 return (
  <ProfileItem>

    <div style={{ width: "100%" }}>

      {/* TOP AREA */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >

        <CardLeft>

          <ImageBox>
            <CoverImg
              src={
                p.coverImage ||
                "https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=1200&auto=format&fit=crop"
              }
            />

            <ProfileImg
              src={
                p.profileImage ||
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop"
              }
            />
          </ImageBox>

          <TextBlock>
            <TitleText>{p.title}</TitleText>

            <SubText>
              Theme:{" "}
              {themeDesigns.find((t) => t.id === p.theme)?.name}
            </SubText>

            <SubText>
              Category:{" "}
              {categories.find((c) => c.id === p.categoryId)?.name || "N/A"}
            </SubText>

            <PreviewBtn
              onClick={() =>
                window.open(`/${p.username}${p.profileNumber}`, "_blank")
              }
            >
              Preview Portfolio
            </PreviewBtn>
          </TextBlock>

        </CardLeft>

        <BtnRow>
          <Btn $small onClick={() => openEditModal(p)}>
            Edit Profile
          </Btn>

          <Btn $small $delete onClick={() => deleteProfile(p.id)}>
            Delete Portfolio
          </Btn>
        </BtnRow>

      </div>

  <SectionsWrapper>
    <p style={{fontSize:"small"}}>
      “Tip: Keep your portfolio clean by using short, clear descriptions. Avoid over-explaining.”
    </p>

  {sections.map((section) => (

    <SectionCard key={section.action}>

      <SectionTitle>
        {section.title}
      </SectionTitle>

      <SectionBtn
        onClick={() => {

          const modalPayload = {
            open: true,
            profile: p,
          };

          switch (section.action) {

            case "personalInfo":
              setPersonalInfoModal(modalPayload);
              break;

            case "biography":
              setBiographyModal(modalPayload);
              break;

            case "skills":
              setSkillsModal(modalPayload);
              break;

            case "education":
              setEducationModal(modalPayload);
              break;

            case "experiences":
              setExperiencesModal(modalPayload);
              break;

            case "projects":
              setProjectsModal(modalPayload);
              break;

            case "certifications":
              setCertificationsModal(modalPayload);
              break;

            case "links":
              setLinksModal(modalPayload);
              break;

            case "summary":
              setSummaryModal(modalPayload);
              break;

            default:
              break;
          }

        }}
      >
        Edit Section
      </SectionBtn>

    </SectionCard>

  ))}

</SectionsWrapper>

    </div>

  </ProfileItem>
);
}