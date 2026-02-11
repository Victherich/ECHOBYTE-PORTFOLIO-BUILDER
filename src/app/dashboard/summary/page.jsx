
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
   CONFIG
========================================================= */
const MAX_CHARS = 300;
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
`;

const List = styled.div`
  margin-top: 2.5rem;
`;

const Item = styled.div`
  background: ${White};
  padding: 1.2rem;
  border-radius: 12px;
  border: 1px solid rgba(0, 86, 179, 0.15);
  margin-bottom: 1rem;
  box-shadow: 0 4px 10px rgba(0, 86, 179, 0.1);
`;

const BtnRow = styled.div`
  margin-top: 1rem;
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  border: 1px solid #c5d9f6;
  margin-top: 6px;
  resize: vertical;
`;

const Counter = styled.div`
  margin-top: 6px;
  text-align: right;
  font-size: 0.85rem;
  color: ${(p) => (p.exceeded ? "#d9534f" : "#555")};
`;

const ModalFooter = styled.div`
  margin-top: 1.8rem;
  display: flex;
  justify-content: space-between;
`;

/* ========================================================
   PAGE
========================================================= */

export default function SummaryPage() {
  const user = auth.currentUser;

  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState("");
  const [summaries, setSummaries] = useState([]);

  const [modal, setModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [summary, setSummary] = useState("");

  const profilesRef = user
    ? collection(db, "users", user.uid, "profiles")
    : null;

  const summaryRef = user
    ? collection(db, "users", user.uid, "summary")
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

  /* ---------- LOAD SUMMARY BY PROFILE ---------- */
  useEffect(() => {
    if (selectedProfile) {
      loadSummary(selectedProfile);
    } else {
      setSummaries([]);
    }
  }, [selectedProfile]);

  async function loadSummary(profileId) {
    if (!summaryRef) return;

    const q = query(summaryRef, where("profileId", "==", profileId));
    const snap = await getDocs(q);

    const arr = [];
    snap.forEach((d) => arr.push({ id: d.id, ...d.data() }));
    setSummaries(arr);
  }

  /* ---------- MODAL ---------- */

  function openNew() {
    if (!selectedProfile) {
      return fireSwal(
        "Select Profile",
        "Please select a profile first.",
        "info"
      );
    }

    if (summaries.length > 0) {
      return fireSwal(
        "Summary Exists",
        "You can only create one summary per profile.",
        "info"
      );
    }

    setModal(true);
    setEditingId(null);
    setSummary("");
  }

  function openEdit(item) {
    setModal(true);
    setEditingId(item.id);
    setSummary(item.summary);
  }

  /* ---------- SAVE ---------- */

  async function save() {
    if (!summary.trim()) {
      return fireSwal("Missing", "Summary cannot be empty.", "warning");
    }

    if (summary.length > MAX_CHARS) {
      return fireSwal(
        "Too Long",
        `Maximum allowed characters is ${MAX_CHARS}.`,
        "warning"
      );
    }

    const data = {
      profileId: selectedProfile,
      summary,
      updatedAt: Date.now(),
    };

    try {
      if (editingId) {
        await updateDoc(
          doc(db, "users", user.uid, "summary", editingId),
          data
        );
        fireSwal("Updated", "Summary updated.", "success");
      } else {
        await addDoc(summaryRef, { ...data, createdAt: Date.now() });
        fireSwal("Created", "Summary saved.", "success");
      }

      setModal(false);
      loadSummary(selectedProfile);
    } catch (err) {
      fireSwal("Error", err.message, "error");
    }
  }

  /* ---------- DELETE ---------- */

  async function del(id) {
    const c = await Swal.fire({
      title: "Delete summary?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: DarkBlue,
    });

    if (!c.isConfirmed) return;

    await deleteDoc(doc(db, "users", user.uid, "summary", id));
    fireSwal("Deleted", "Summary removed.", "success");
    loadSummary(selectedProfile);
  }

  /* ========================================================
     UI
  ========================================================== */

  return (
    <Container>
      <HeaderRow>
        <Title>Summary</Title>
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

        {summaries.map((item) => (
          <Item key={item.id}>
            <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
              {item.summary}
            </p>

            <BtnRow>
              <Btn onClick={() => openEdit(item)}>Edit</Btn>
              <Btn $delete onClick={() => del(item.id)}>
                Delete
              </Btn>
            </BtnRow>
          </Item>
        ))}
      </List>

      {modal && (
        <ModalBackground onClick={() => setModal(false)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <h2>{editingId ? "Edit Summary" : "New Summary"}</h2>

            <Label>Summary</Label>
            <TextArea
              rows={5}
              value={summary}
              maxLength={MAX_CHARS}
              onChange={(e) => setSummary(e.target.value)}
            />

            <Counter exceeded={summary.length > MAX_CHARS}>
              {summary.length} / {MAX_CHARS}
            </Counter>

            <ModalFooter>
              <Btn onClick={save}>
                {editingId ? "Update" : "Create"}
              </Btn>
              <Btn $delete onClick={() => setModal(false)}>
                Cancel
              </Btn>
            </ModalFooter>
          </ModalCard>
        </ModalBackground>
      )}
    </Container>
  );
}
