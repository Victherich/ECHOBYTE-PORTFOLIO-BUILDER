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

/* ================= SWAL ================= */
const fireSwal = (title, text, icon) =>
  Swal.fire({
    title: `<span style="color:${DarkBlue}; font-weight:700;">${title}</span>`,
    html: `<span style="color:#444">${text}</span>`,
    icon,
    confirmButtonColor: DarkBlue,
  });

/* ================= MODAL UI ================= */
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
`;



const AddSummaryRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

/* ================= UI ================= */
const Btn = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  background: ${DarkBlue};
  color: white;

  ${(p) => p.$delete && `background:#d9534f;`}
`;

const BtnRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  gap: 1rem;
`;

const Item = styled.div`
  border: 1px solid #eee;
  padding: 1.2rem;
  border-radius: 12px;
  margin-bottom: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  border: 1px solid #c5d9f6;
  margin-top: 6px;
  resize: vertical;
           outline: none;

  &:focus {
    border-color: #0056b3;
    box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.2);
  }
`;

const Label = styled.label`
  font-weight: 600;
  display: block;
  margin-top: 1rem;
`;

const Counter = styled.div`
  text-align: right;
  margin-top: 6px;
  font-size: 0.85rem;
  color: ${(p) => (p.$danger ? "#d9534f" : "#555")};
`;

/* ================= MAIN COMPONENT ================= */
export default function SummaryModal({
  open,
  profile,
  onClose,
  onSaved,
}) {
  const [summary, setSummary] = useState(null);
  const [innerModal, setInnerModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [text, setText] = useState("");
const [loading, setLoading]=useState(false)

  const MAX_CHARS = 300;

  const user = auth.currentUser;
  const summaryRef = collection(db, "summaries");

  /* ================= LOAD ================= */
  const load = async () => {
    if (!user || !profile?.id) return;

    const q = query(
      summaryRef,
      where("userId", "==", user.uid),
      where("profileId", "==", profile.id)
    );

    const snap = await getDocs(q);

    let item = null;
    snap.forEach((d) => (item = { id: d.id, ...d.data() }));

    setSummary(item);
  };

  useEffect(() => {
    if (open && profile) load();
  }, [open, profile]);

  /* ================= RESET ================= */
  const reset = () => {
    setEditingId(null);
    setText("");
  };

  /* ================= OPEN EDIT ================= */
  const openEdit = () => {
    if (!summary) return;

    setEditingId(summary.id);
    setText(summary.summary || "");
    setInnerModal(true);
  };

  /* ================= SAVE ================= */
  const save = async () => {
    if (!text.trim())
      return fireSwal("Missing", "Summary cannot be empty.", "warning");

    if (text.length > MAX_CHARS)
      return fireSwal(
        "Too Long",
        `Max ${MAX_CHARS} characters allowed.`,
        "warning"
      );

    const data = {
      summary: text,
      profileId: profile.id,
      userId: user.uid,
      updatedAt: serverTimestamp(),
    };
    setLoading(true);

    try {
      if (editingId) {
        await updateDoc(doc(db, "summaries", editingId), data);
      } else {
        await addDoc(summaryRef, {
          ...data,
          createdAt: serverTimestamp(),
        });
      }

      setInnerModal(false);
      load();
      onSaved?.();

      fireSwal("Success", "Summary saved.", "success");
    } catch (err) {
      fireSwal("Error", err.message, "error");
    }finally{
      setLoading(false)
    }
  };

  /* ================= DELETE ================= */
  const remove = async () => {
    if (!summary) return;

    const c = await Swal.fire({
      title: "Delete summary?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: DarkBlue,
    });

    if (!c.isConfirmed) return;
setLoading(true)
    await deleteDoc(doc(db, "summaries", summary.id));

    setSummary(null);

    fireSwal("Deleted", "Summary removed.", "success");
  setLoading(false);
  };

  if (!open) return null;

  return (
    <ModalBackground onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>

        {/* ================= MAIN MODAL ================= */}
        <h2>Summary: Write a summary for this portfolio</h2>

       {!summary ? (
  <AddSummaryRow>
    <Btn
      onClick={() => {
        reset();
        setInnerModal(true);
      }}
    >
      + Add Summary
    </Btn>
  </AddSummaryRow>
) : (
          <Item>
            <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
              {summary.summary}
            </p>

            <BtnRow>
              <Btn onClick={openEdit}>Edit</Btn>
              <Btn $delete onClick={remove}>
                Delete
                {loading?" Loading...":""}
              </Btn>
            </BtnRow>
          </Item>
        )}

        <BtnRow>
          <Btn $delete onClick={onClose}>
            Close
          </Btn>
        </BtnRow>

        {/* ================= INNER MODAL ================= */}
        {innerModal && (
          <ModalBackground onClick={() => setInnerModal(false)}>
            <ModalCard onClick={(e) => e.stopPropagation()}>

              <h3>{editingId ? "Edit Summary" : "Add Summary"}</h3>

              <Label>Summary: Write a summary for this portfolio</Label>

              <TextArea
                rows={6}
                value={text}
                maxLength={MAX_CHARS}
                onChange={(e) => setText(e.target.value)}
              />

              <Counter $danger={text.length > MAX_CHARS}>
                {text.length} / {MAX_CHARS}
              </Counter>

              <BtnRow>
                <Btn onClick={save}>
                  {editingId ? "Update" : "Create"}
              {loading?" Loading...":""}
                </Btn>

                <Btn $delete onClick={() => setInnerModal(false)}>
                  Cancel
                </Btn>
              </BtnRow>

            </ModalCard>
          </ModalBackground>
        )}

      </ModalCard>
    </ModalBackground>
  );
}