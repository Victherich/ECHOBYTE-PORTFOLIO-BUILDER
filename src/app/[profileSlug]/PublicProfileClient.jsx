"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import PersonalDetailsSections from "@/components/PersonalDetailsSections";
import BiographySections from "@/components/BiographySections";
import SkillSections from "@/components/SkillSections";
import EducationSection1 from "@/components/EducationSection1";
import ExperienceSections from "@/components/ExperienceSections";
import ProjectSections from "@/components/ProjectSections";
import EducationSections from "@/components/EducationSections";

/* ================= STYLES ================= */
const Container = styled.div`
  // max-width: 900px;
  // margin: 2rem auto;
  // padding: 1rem;
  color: #0056b3;
`;

const Section = styled.div`
  background: #fff;
  border-radius: 12px;
  border: 1px solid rgba(0, 86, 179, 0.15);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
`;

const SubTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ListItem = styled.div`
  margin-bottom: 0.5rem;
`;

const LinkItem = styled.a`
  color: #0056b3;
  text-decoration: underline;
  display: block;
  margin-bottom: 0.5rem;
`;

export default function PublicProfileClient({ profileSlug }) {
  const [profile, setProfile] = useState(null);
  const [certifications, setCertifications] = useState([]);
  const [links, setLinks] = useState([]);
  const [summary, setSummary] = useState([]);
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [biography, setBiography] = useState([]);
  const [loading, setLoading] = useState(true);
  const [personalInfo, setPersonalInfo]=useState([]);

  useEffect(() => {
    if (!profileSlug) return;

    const fetchCollection = async (collectionName, setState, profileId) => {
      const q = query(
        collection(db, collectionName),
        where("profileId", "==", profileId)
      );

      const snap = await getDocs(q);
      const arr = [];
      snap.forEach((d) => arr.push({ id: d.id, ...d.data() }));
      setState(arr);
    };

    const loadProfile = async () => {
      try {
        // split username + number (john1)
        const slugMatch = profileSlug.match(/([a-zA-Z0-9]+)(\d+)$/);
        if (!slugMatch) {
          setLoading(false);
          return;
        }

        const username = slugMatch[1];
        const profileNumber = parseInt(slugMatch[2], 10);

        // find profile
        const q = query(
          collection(db, "profiles"),
          where("username", "==", username),
          where("profileNumber", "==", profileNumber)
        );

        const snap = await getDocs(q);

        if (snap.empty) {
          setLoading(false);
          return;
        }

        const profileDoc = snap.docs[0];
        const profileId = profileDoc.id;

        setProfile({ id: profileId, ...profileDoc.data() });

        // load all related sections
        await Promise.all([
          fetchCollection("certifications", setCertifications, profileId),
          fetchCollection("links", setLinks, profileId),
          fetchCollection("summaries", setSummary, profileId),
          fetchCollection("skills", setSkills, profileId),
          fetchCollection("education", setEducation, profileId),
          fetchCollection("experience", setExperience, profileId),
          fetchCollection("projects", setProjects, profileId),
          fetchCollection("biography", setBiography, profileId),
          fetchCollection("personalInfo", setPersonalInfo, profileId),
        ]);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    loadProfile();
  }, [profileSlug]);

  if (loading) return <Container>Loading profile...</Container>;
  if (!profile) return <Container>Profile not found</Container>;

  return (
    <Container>
      {/* <Title>{profile?.title || "Public Profile"}</Title> */}

    {personalInfo.length > 0 && (
  <PersonalDetailsSections data={personalInfo[0]} profile={profile} />
)}

  {biography.length > 0 && (
       <BiographySections bio={biography[0].bio}/>
      )}


      {skills.length > 0 && (
       <SkillSections skills={skills}/>
      )}

  {education.length > 0 && (
       <EducationSections education={education}/>
      )}

       {experience.length > 0 && (
     <ExperienceSections experiences={experience}/>
      )}

       {projects.length > 0 && (
       <ProjectSections projects={projects}/>
      )}


      {summary.length > 0 && (
        <Section>
          <SubTitle>Summary</SubTitle>
          {summary.map((s) => <p key={s.id}>{s.summary}</p>)}
        </Section>
      )}

    
      



     

     

      {certifications.length > 0 && (
        <Section>
          <SubTitle>Certifications</SubTitle>
          {certifications.map((c) => (
            <ListItem key={c.id}>
              {c.name} - {c.organization}
            </ListItem>
          ))}
        </Section>
      )}

      {links.length > 0 && (
        <Section>
          <SubTitle>Links</SubTitle>
          {links.map((l) => (
            <LinkItem key={l.id} href={l.url} target="_blank">
              {l.label}
            </LinkItem>
          ))}
        </Section>
      )}
    </Container>
  );
}