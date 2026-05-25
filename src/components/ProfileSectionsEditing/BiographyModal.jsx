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
const MAX_CHARS = 500;
const DarkBlue = "#0056b3";
const White = "#ffffff";

/* ================= STYLES ================= */

const ModalBackground = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display:flex;
  justify-content:center;
  align-items:center;
  z-index: 500;
`;

const ModalCard = styled.div`
  background:${White};
  width:95%;
  max-width:600px;
  padding:2rem;
  border-radius:14px;
`;

const Label = styled.label`
  font-weight:600;
`;

const TextArea = styled.textarea`
  width:100%;
  padding:14px;
  border-radius:10px;
  border:1px solid #c5d9f6;
  margin-top:6px;
  outline: none;

  &:focus {
    border-color: #0056b3;
    box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.2);
  }
`;

const Counter = styled.div`
  text-align:right;
  font-size:0.85rem;
  opacity:0.7;
`;

const BtnRow = styled.div`
  margin-top:1.8rem;
  display:flex;
  justify-content:space-between;
`;

const Btn = styled.button`
  padding: 10px 18px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;

  background: ${DarkBlue};
  color: white;

  ${(p) =>
    p.$delete &&
    `
      background:#d9534f;
    `}
`;

/* ================= MODAL ================= */

export default function BiographyModal({ open, profile, onClose }) {
  const [bio, setBio] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const bioRef = collection(db, "biography");

  /* LOAD EXISTING BIO */
  useEffect(() => {
    if (!open || !profile) return;

    const load = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(
        bioRef,
        where("profileId", "==", profile.id),
        where("userId", "==", user.uid)
      );

      const snap = await getDocs(q);

      if (!snap.empty) {
        const docSnap = snap.docs[0];
        setEditingId(docSnap.id);
        setBio(docSnap.data().bio || "");
      } else {
        setEditingId(null);
        setBio("");
      }
    };

    load();
  }, [open, profile]);

  const save = async () => {
    const user = auth.currentUser;
    if (!user || !profile) return;

    if (!bio.trim()) {
      return Swal.fire("Missing", "Biography cannot be empty", "warning");
    }

    setSaving(true);

    const data = {
      bio,
      userId: user.uid,
      profileId: profile.id,
      updatedAt: serverTimestamp(),
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, "biography", editingId), data);
      } else {
        await addDoc(bioRef, {
          ...data,
          createdAt: serverTimestamp(),
        });
      }

      Swal.fire("Success", "Biography saved", "success");
      onClose();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }

    setSaving(false);
  };

  const remove = async () => {
    if (!editingId) return;

    const confirm = await Swal.fire({
      title: "Delete biography?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    await deleteDoc(doc(db, "biography", editingId));

    Swal.fire("Deleted", "Biography removed", "success");
    onClose();
  };

  if (!open) return null;

  return (
    <ModalBackground onClick={() => !saving && onClose()}>

      <ModalCard onClick={(e) => e.stopPropagation()}>

        <h2>{editingId ? "Edit Biography" : "Create Biography"}</h2>

        <Label>Biography (A little bit about yourself in relation to your profession.)</Label>

        <TextArea
          rows={6}
          value={bio}
          maxLength={MAX_CHARS}
          onChange={(e) => setBio(e.target.value)}
          disabled={saving}
        />

        <Counter>
          {bio.length} / {MAX_CHARS}
        </Counter>

        <BtnRow>

          <Btn onClick={save} disabled={saving}>
            {saving
              ? "Saving..."
              : editingId
              ? "Update"
              : "Create"}
          </Btn>
          <Btn $delete onClick={onClose}>
              Cancel
            </Btn>
{/* 
          {editingId && (
            <Btn $delete onClick={remove} disabled={saving}>
              Delete
            </Btn>
          )} */}

        </BtnRow>

      </ModalCard>

    </ModalBackground>
  );
}