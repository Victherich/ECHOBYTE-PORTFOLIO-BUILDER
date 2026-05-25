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
  serverTimestamp,
} from "firebase/firestore";

/* ================= THEME ================= */
const DarkBlue = "#0056b3";
const White = "#ffffff";

/* ================= STYLES ================= */

const ModalBackground = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 300;
`;

const ModalCard = styled.div`
  background: ${White};
  width: 95%;
  max-width: 650px;
  padding: 2rem;
  border-radius: 14px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  height: 95%;
  overflow-y: auto;
`;

const InnerModal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 400;
`;

const InnerCard = styled.div`
  background: ${White};
  width: 90%;
  max-width: 500px;
  padding: 2rem;
  border-radius: 14px;
`;

const Label = styled.label`
  font-weight: 600;
  display: block;
  margin-top: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #c5d9f6;
  margin-top: 6px;
   outline: none;

  &:focus {
    border-color: #0056b3;
    box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.2);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #c5d9f6;
  margin-top: 6px;
   outline: none;

  &:focus {
    border-color: #0056b3;
    box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.2);
  }
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddBtn = styled.button`
  background: ${DarkBlue};
  color: white;
  padding: 8px 14px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const Item = styled.div`
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 10px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Btn = styled.button`
  padding: 6px 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: ${DarkBlue};
  color: white;

  ${(p) => p.$delete && `background:#d9534f;`}
`;

/* ================= COMPONENT ================= */

export default function SkillsModal({
  open,
  profile,
  onClose,
  onSaved,
}) {
  const [skills, setSkills] = useState([]);

  // inner modal
  const [innerOpen, setInnerOpen] = useState(false);
const [deletingId, setDeletingId]=useState(null);
  const [editingId, setEditingId] = useState(null);
  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [loading, setLoading]=useState(false);

  const user = auth.currentUser;
  const skillsRef = collection(db, "skills");

  /* ---------- LOAD ---------- */
  const loadSkills = async () => {
    if (!user || !profile?.id) return;

    const q = query(
      skillsRef,
      where("profileId", "==", profile.id),
      where("userId", "==", user.uid)
    );

    const snap = await getDocs(q);

    const arr = [];
    snap.forEach((d) => arr.push({ id: d.id, ...d.data() }));

    setSkills(arr);
  };

  useEffect(() => {
    if (open && profile) loadSkills();
  }, [open, profile]);

  /* ---------- RESET ---------- */
  const resetForm = () => {
    setEditingId(null);
    setSkillName("");
    setSkillLevel("");
  };

  /* ---------- OPEN ADD ---------- */
  const openAdd = () => {
    resetForm();
    setInnerOpen(true);
  };

  /* ---------- OPEN EDIT ---------- */
  const openEdit = (item) => {
    setEditingId(item.id);
    setSkillName(item.skillName);
    setSkillLevel(item.level || "");
    setInnerOpen(true);
  };

  /* ---------- SAVE ---------- */
  const save = async () => {
    if (!user || !profile) return;

    if (!skillName.trim()) {
      return Swal.fire("Missing", "Skill name is required", "warning");
    }

     if (!skillLevel.trim()) {
      return Swal.fire("Missing", "Skill Level is required", "warning");
    }

    const data = {
      userId: user.uid,
      profileId: profile.id,
      skillName,
      level: skillLevel,
      updatedAt: serverTimestamp(),
    };

    setLoading(true)

    try {
      if (editingId) {
        await updateDoc(doc(db, "skills", editingId), data);
      } else {
        await addDoc(skillsRef, {
          ...data,
          createdAt: serverTimestamp(),
        });
      }

      setInnerOpen(false);
      resetForm();
      loadSkills();
      onSaved?.();

      Swal.fire("Success", "Skill saved", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }finally{
      setLoading(false)
    }
  };

  /* ---------- DELETE ---------- */
  const remove = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete skill?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;
setDeletingId(id)
    await deleteDoc(doc(db, "skills", id));
    loadSkills();

    Swal.fire("Deleted", "Skill removed", "success");
    setLoading(false);
  };

  if (!open) return null;

  return (
    <ModalBackground onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>

        {/* HEADER */}
        <TopRow>
          <h2>Skills: You can add multiple Skills one-after-the-other</h2>

          <AddBtn onClick={openAdd}>+ Add Skill</AddBtn>
        </TopRow>

        {/* LIST */}
        {skills.map((s) => (
          <Item key={s.id}>
            <div>
              <strong>
  {s.skillName.charAt(0).toUpperCase() +
    s.skillName.slice(1)}
</strong>
              <p style={{ margin: 0, fontSize: "0.85rem" }}>
                {s.level}
              </p>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <Btn onClick={() => openEdit(s)}>Edit</Btn>
                  <Btn onClick={() => remove(s.id)}>
  Delete
  {deletingId === s.id ? " Loading..." : ""}
</Btn>
            </div>
          </Item>
        ))}

        {/* OUTER CLOSE */}
        <div style={{ marginTop: "1.5rem" }}>
      
          <Btn $delete onClick={onClose}>Close</Btn>
        </div>

        {/* INNER MODAL (ADD / EDIT) */}
        {innerOpen && (
          <InnerModal onClick={() => setInnerOpen(false)}>
            <InnerCard onClick={(e) => e.stopPropagation()}>

              <h3>{editingId ? "Edit Skill" : "Add Skill"}</h3>

              <Label>Skill Name</Label>
              <Input
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
              />

              <Label>Skill Level</Label>
            <Select
  value={skillLevel}
  onChange={(e) => setSkillLevel(e.target.value)}
>
  <option value="">Select Skill Level</option>
  <option value="Beginner">Beginner</option>
  <option value="Intermediate">Intermediate</option>
  <option value="Expert">Expert</option>
</Select>

              <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "space-between" }}>
                <Btn onClick={save}>
                  {editingId ? "Update" : "Create"}
                  {loading?" Loading...":""}
                </Btn>

                <Btn $delete onClick={() => setInnerOpen(false)}>
                  Cancel
                </Btn>
              </div>

            </InnerCard>
          </InnerModal>
        )}

      </ModalCard>
    </ModalBackground>
  );
}