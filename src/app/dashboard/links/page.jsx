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
  serverTimestamp
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
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
  flex-direction:column;
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
  box-shadow: 0 6px 15px rgba(0, 86, 179, 0.3);
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
  outline:none;
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
  box-shadow: 0 4px 10px rgba(0, 86, 179, 0.1);

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
  max-height: 90vh;
  overflow-y: auto;
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

const ModalFooter = styled.div`
  margin-top: 1.8rem;
  display: flex;
  justify-content: space-between;
`;

/* ========================================================
   PAGE
========================================================= */

/* ========================================================
   PAGE
========================================================= */
export default function LinksPage() {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState("");
  const [links, setLinks] = useState([]);
  const [modal, setModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ label: "", url: "" });

  const user = auth.currentUser;
  const profilesRef = collection(db, "profiles");
  const linksRef = collection(db, "links"); // flat structure

  /* ---------- LOAD PROFILES ---------- */
  useEffect(() => {
    if (user) loadProfiles(user.uid);
  }, [user]);

  const loadProfiles = async (uid) => {
    setLoading(true);
    const q = query(profilesRef, where("userId", "==", uid));
    const snap = await getDocs(q);
    const arr = [];
    snap.forEach((d) => arr.push({ id: d.id, ...d.data() }));
    setProfiles(arr);
    setLoading(false);
  };

  /* ---------- LOAD LINKS BY PROFILE ---------- */
  useEffect(() => {
    if (selectedProfile) loadLinks(selectedProfile);
    else setLinks([]);
  }, [selectedProfile]);

  const loadLinks = async (profileId) => {
    if (!user) return;
    setLoading(true);
    const q = query(
      linksRef,
      where("profileId", "==", profileId),
      where("userId", "==", user.uid)
    );
    const snap = await getDocs(q);
    const arr = [];
    snap.forEach((d) => arr.push({ id: d.id, ...d.data() }));
    setLinks(arr);
    setLoading(false);
  };

  /* ---------- MODAL ---------- */
  const openNew = () => {
    if (!selectedProfile) return fireSwal("Select Profile", "Please select a profile first.", "info");
    setModal(true);
    setEditingId(null);
    setForm({ label: "", url: "" });
  };

  const openEdit = (item) => {
    setModal(true);
    setEditingId(item.id);
    setForm({ label: item.label, url: item.url });
  };

  /* ---------- SAVE ---------- */
  const save = async () => {
    if (!form.label.trim() || !form.url.trim())
      return fireSwal("Missing", "Please enter both label and URL.", "warning");

    setLoading(true);

    const data = {
      ...form,
      profileId: selectedProfile,
      userId: user.uid,
      updatedAt: serverTimestamp(),
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, "links", editingId), data);
        fireSwal("Updated", "Link updated.", "success");
      } else {
        await addDoc(linksRef, { ...data, createdAt: serverTimestamp() });
        fireSwal("Created", "Link added.", "success");
      }
      setModal(false);
      loadLinks(selectedProfile);
    } catch (err) {
      fireSwal("Error", err.message, "error");
    }

    setLoading(false);
  };

  /* ---------- DELETE ---------- */
  const del = async (id) => {
    const c = await Swal.fire({
      title: "Delete this link?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: DarkBlue,
    });
    if (!c.isConfirmed) return;

    await deleteDoc(doc(db, "links", id));
    fireSwal("Deleted", "Link removed.", "success");
    loadLinks(selectedProfile);
  };

  /* ================= UI ================= */
  return (
    <Container>
      <HeaderRow>
        <Title>Links</Title>
        <Select value={selectedProfile} onChange={(e) => setSelectedProfile(e.target.value)}>
          <option value="">Select Profile...</option>
          {profiles.map((p) => (
            <option key={p.id} value={p.id}>{p.title}</option>
          ))}
        </Select>
      </HeaderRow>

      <PlusButton onClick={openNew} >+</PlusButton>

      <List>
        {!selectedProfile && <p style={{ opacity: 0.6 }}>Please select a profile.</p>}
        {loading && <p>Loading...</p>}
         {!loading && links.length===0 && selectedProfile && (
          <p>No Links created yet.</p>
        )}

        {links.map((item) => (
          <Item key={item.id}>
            <div>
              <strong>{item.label}</strong>
              <p><a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a></p>
            </div>
            <BtnRow>
              <Btn onClick={() => openEdit(item)}>Edit</Btn>
              <Btn $delete onClick={() => del(item.id)}>Delete</Btn>
            </BtnRow>
          </Item>
        ))}
      </List>

      {modal && (
        <ModalBackground onClick={() => !loading && setModal(false)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <h2>{editingId ? "Edit Link" : "New Link"}</h2>
            <Label>Label</Label>
            <Input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} />
            <Label>URL</Label>
            <Input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
            <ModalFooter>
              <Btn onClick={save} disabled={loading}>{loading ? "Saving..." : editingId ? "Update" : "Create"}</Btn>
              <Btn $delete onClick={() => setModal(false)}>Cancel</Btn>
            </ModalFooter>
          </ModalCard>
        </ModalBackground>
      )}
    </Container>
  );
}