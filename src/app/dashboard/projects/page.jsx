"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { auth, db } from "@/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

/* ========================================================
   THEME
========================================================= */
const DarkBlue = "#0056b3";
const White = "#ffffff";

/* ========================================================
   SWAL
========================================================= */
const fireSwal = (title, text, icon) =>
  Swal.fire({
    title: `<span style="color:${DarkBlue}; font-weight:700;">${title}</span>`,
    html: `<span style="color:#444">${text}</span>`,
    icon,
    confirmButtonColor: DarkBlue,
  });

/* ========================================================
   STYLES
========================================================= */
const Container = styled.div`
  color: ${DarkBlue};
  position: relative;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
`;

const PlusButton = styled.button`
  position: fixed;
  top: 120px;
  right: 1%;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 2rem;
  background: ${DarkBlue};
  color: white;
  border: none;
  cursor: pointer;
  opacity: ${(p) => (p.disabled ? 0.5 : 1)};
  pointer-events: ${(p) => (p.disabled ? "none" : "auto")};

  &:hover {
    background: #00448a;
  }
`;

const Select = styled.select`
  width: 260px;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #c5d9f6;
`;

const List = styled.div`
  margin-top: 2.5rem;
`;

const Item = styled.div`
  background: ${White};
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid rgba(0, 86, 179, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  @media (max-width: 428px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const BtnRow = styled.div`
  display: flex;
  gap: 1rem;
`;

const Btn = styled.button`
  padding: 8px 15px;
  background: ${DarkBlue};
  color: ${White};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;

  ${(p) =>
    p.$delete &&
    `
      background:#d9534f;
    `}
`;

/* ---------- MODAL ---------- */
const ModalBackground = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
`;

const ModalCard = styled.div`
  background: ${White};
  width: 95%;
  max-width: 600px;
  padding: 2rem;
  border-radius: 14px;
`;

const Label = styled.label`
  font-weight: 600;
  margin-top: 1rem;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #c5d9f6;
  margin-top: 6px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #c5d9f6;
  margin-top: 6px;
  resize: vertical;
`;

const ModalFooter = styled.div`
  margin-top: 1.8rem;
  display: flex;
  justify-content: space-between;
`;

/* ========================================================
   PAGE
========================================================= */

export default function ProjectsPage() {
  const user = auth.currentUser;

  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState("");
  const [projects, setProjects] = useState([]);

  const [modal, setModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    techStack: "",
    github: "",
    liveLink: "",
  });

  const profilesRef = user
    ? collection(db, "users", user.uid, "profiles")
    : null;

  const projectsRef = user
    ? collection(db, "users", user.uid, "projects")
    : null;

  /* ---------- LOAD PROFILES ---------- */
  useEffect(() => {
    loadProfiles();
  }, []);

  async function loadProfiles() {
    if (!profilesRef) return;
    const snap = await getDocs(profilesRef);
    const arr = [];
    snap.forEach((d) => arr.push({ id: d.id, ...d.data() }));
    setProfiles(arr);
  }

  /* ---------- LOAD PROJECTS BY PROFILE ---------- */
  useEffect(() => {
    if (selectedProfile) loadProjects(selectedProfile);
    else setProjects([]);
  }, [selectedProfile]);

  async function loadProjects(profileId) {
    const q = query(projectsRef, where("profileId", "==", profileId));
    const snap = await getDocs(q);
    const arr = [];
    snap.forEach((d) => arr.push({ id: d.id, ...d.data() }));
    setProjects(arr);
  }

  /* ---------- MODAL ---------- */

  function openNew() {
    if (!selectedProfile)
      return fireSwal("Select Profile", "Please select a profile first.", "info");

    setModal(true);
    setEditingId(null);
    setForm({ name: "", description: "", techStack: "", github: "", liveLink: "" });
  }

  function openEdit(item) {
    setModal(true);
    setEditingId(item.id);
    setForm(item);
  }

  /* ---------- SAVE ---------- */
  async function save() {
    if (!form.name.trim()) return fireSwal("Missing", "Project name is required.", "warning");

    setLoading(true);

    const data = {
      ...form,
      profileId: selectedProfile,
      updatedAt: Date.now(),
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, "users", user.uid, "projects", editingId), data);
        fireSwal("Updated", "Project updated.", "success");
      } else {
        await addDoc(projectsRef, { ...data, createdAt: Date.now() });
        fireSwal("Created", "Project added.", "success");
      }

      setModal(false);
      loadProjects(selectedProfile);
    } catch (err) {
      fireSwal("Error", err.message, "error");
    }

    setLoading(false);
  }

  /* ---------- DELETE ---------- */
  async function del(id) {
    const c = await Swal.fire({
      title: "Delete this project?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: DarkBlue,
    });

    if (!c.isConfirmed) return;

    await deleteDoc(doc(db, "users", user.uid, "projects", id));
    fireSwal("Deleted", "Project removed.", "success");
    loadProjects(selectedProfile);
  }

  /* ========================================================
     UI
  ========================================================== */

  return (
    <Container>
      <HeaderRow>
        <Title>Projects</Title>
 </HeaderRow>
        <Select
          value={selectedProfile}
          onChange={(e) => setSelectedProfile(e.target.value)}
        >
          <option value="">Select Profile...</option>
          {profiles.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </Select>
     

      <PlusButton onClick={openNew} disabled={!selectedProfile}>
        +
      </PlusButton>

      <List>
        {!selectedProfile && (
          <p style={{ opacity: 0.6 }}>Please select a profile.</p>
        )}

        {projects.map((p) => (
          <Item key={p.id}>
            <div>
              <b>{p.name}</b>
              <p>{p.description}</p>
              <p>Tech: {p.techStack}</p>
              {p.github && <p>GitHub: <a href={p.github} target="_blank">{p.github}</a></p>}
              {p.liveLink && <p>Live: <a href={p.liveLink} target="_blank">{p.liveLink}</a></p>}
            </div>

            <BtnRow>
              <Btn onClick={() => openEdit(p)}>Edit</Btn>
              <Btn $delete onClick={() => del(p.id)}>Delete</Btn>
            </BtnRow>
          </Item>
        ))}
      </List>

      {modal && (
        <ModalBackground onClick={() => setModal(false)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <h2>{editingId ? "Edit Project" : "New Project"}</h2>

            <Label>Project Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <Label>Description</Label>
            <TextArea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <Label>Tech Stack (comma separated)</Label>
            <Input
              value={form.techStack}
              onChange={(e) => setForm({ ...form, techStack: e.target.value })}
            />

            <Label>GitHub Link</Label>
            <Input
              value={form.github}
              onChange={(e) => setForm({ ...form, github: e.target.value })}
            />

            <Label>Live Link</Label>
            <Input
              value={form.liveLink}
              onChange={(e) => setForm({ ...form, liveLink: e.target.value })}
            />

            <ModalFooter>
              <Btn onClick={save} disabled={loading}>
                {loading ? "Saving..." : editingId ? "Update" : "Create"}
              </Btn>
              <Btn $delete onClick={() => setModal(false)}>Cancel</Btn>
            </ModalFooter>
          </ModalCard>
        </ModalBackground>
      )}
    </Container>
  );
}
