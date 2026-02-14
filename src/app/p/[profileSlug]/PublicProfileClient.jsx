"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

/* ================= STYLES ================= */
const Container = styled.div`max-width:900px;margin:2rem auto;padding:1rem;color:#0056b3;`;
const Section = styled.div`background:#fff;border-radius:12px;border:1px solid rgba(0,86,179,0.15);padding:1.5rem;margin-bottom:1.5rem;`;
const Title = styled.h1`font-size:2rem;font-weight:700;margin-bottom:0.8rem;`;
const SubTitle = styled.h2`font-size:1.3rem;font-weight:600;margin-bottom:0.5rem;`;
const ListItem = styled.div`margin-bottom:0.5rem;`;
const LinkItem = styled.a`color:#0056b3;text-decoration:underline;display:block;margin-bottom:0.5rem;`;

export default function PublicProfileClient({ profileId }) {
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

  useEffect(() => {
    if (!profileId) return;

    const fetchCollection = async (collectionName, setState) => {
      const q = query(collection(db, collectionName), where("profileId", "==", profileId));
      const snap = await getDocs(q);
      const arr = [];
      snap.forEach((d) => arr.push({ id: d.id, ...d.data() }));
      setState(arr);
    };

    const loadProfile = async () => {
      const docRef = doc(db, "profiles", profileId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setProfile(docSnap.data());

      await Promise.all([
        fetchCollection("certifications", setCertifications),
        fetchCollection("links", setLinks),
        fetchCollection("summaries", setSummary),
        fetchCollection("skills", setSkills),
        fetchCollection("education", setEducation),
        fetchCollection("experience", setExperience),
        fetchCollection("projects", setProjects),
        fetchCollection("biography", setBiography),
      ]);

      setLoading(false);
    };

    loadProfile();
  }, [profileId]);

  if (!profileId || loading) return <Container>Loading profile...</Container>;

  return (
    <Container>
      <Title>{profile?.title || "Public Profile"}</Title>

      {summary.length > 0 && (
        <Section>
          <SubTitle>Summary</SubTitle>
          {summary.map((s) => <p key={s.id}>{s.summary}</p>)}
        </Section>
      )}

      {biography.length > 0 && (
        <Section>
          <SubTitle>Biography</SubTitle>
          {biography.map((b) => <p key={b.id}>{b.text}</p>)}
        </Section>
      )}

      {skills.length > 0 && (
        <Section>
          <SubTitle>Skills</SubTitle>
          {skills.map((s) => <ListItem key={s.id}>{s.name}</ListItem>)}
        </Section>
      )}

      {education.length > 0 && (
        <Section>
          <SubTitle>Education</SubTitle>
          {education.map((e) => (
            <ListItem key={e.id}>{e.degree} - {e.institute} ({e.startDate} - {e.endDate})</ListItem>
          ))}
        </Section>
      )}

      {experience.length > 0 && (
        <Section>
          <SubTitle>Experience</SubTitle>
          {experience.map((e) => (
            <ListItem key={e.id}>{e.role} at {e.company} ({e.startDate} - {e.endDate})</ListItem>
          ))}
        </Section>
      )}

      {projects.length > 0 && (
        <Section>
          <SubTitle>Projects</SubTitle>
          {projects.map((p) => <ListItem key={p.id}>{p.name}</ListItem>)}
        </Section>
      )}

      {certifications.length > 0 && (
        <Section>
          <SubTitle>Certifications</SubTitle>
          {certifications.map((c) => (
            <ListItem key={c.id}>{c.name} - {c.organization} ({c.issueDate} {c.expiryDate && `| Expires: ${c.expiryDate}`})</ListItem>
          ))}
        </Section>
      )}

      {links.length > 0 && (
        <Section>
          <SubTitle>Links</SubTitle>
          {links.map((l) => (
            <LinkItem key={l.id} href={l.url} target="_blank" rel="noopener noreferrer">{l.label}</LinkItem>
          ))}
        </Section>
      )}
    </Container>
  );
}