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

/* ================= MODAL WRAPPER ================= */
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
  max-height: 90vh;
  overflow-y: auto;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

/* ================= FORM ================= */
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

const BtnRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  gap: 1rem;
`;

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

const Btn2 = styled.button`
  padding: 5px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  background: ${DarkBlue};
  color: white;

  ${(p) => p.$delete && `background:#d9534f;`}
`;

const Item = styled.div`
  border: 1px solid #eee;
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

/* ================= COMPONENT ================= */

export default function LinksModal({
  open,
  profile,
  onClose,
  onSaved,
}) {
  const [links, setLinks] = useState([]);
  const [innerModal, setInnerModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
 const [deletingId, setDeletingId] = useState(null);
 
  const [form, setForm] = useState({
    label: "",
    url: "",
  });

  const user = auth.currentUser;
  const linksRef = collection(db, "links");

  /* ================= LOAD ================= */
  const load = async () => {
    if (!user || !profile?.id) return;

    const q = query(
      linksRef,
      where("userId", "==", user.uid),
      where("profileId", "==", profile.id)
    );

    const snap = await getDocs(q);

    const arr = [];
    snap.forEach((d) => arr.push({ id: d.id, ...d.data() }));

    setLinks(arr);
  };

  useEffect(() => {
    if (open && profile) load();
  }, [open, profile]);

  /* ================= RESET ================= */
  const reset = () => {
    setEditingId(null);
    setForm({
      label: "",
      url: "",
    });
  };

  /* ================= OPEN MODAL ================= */
  const openNew = () => {
    if (!profile?.id)
      return Swal.fire("Select Profile", "Please select a profile first.", "info");

    reset();
    setInnerModal(true);
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setForm({
      label: item.label || "",
      url: item.url || "",
    });
    setInnerModal(true);
  };

  /* ================= SAVE ================= */
  const save = async () => {
    if (!user) return;

    if (!form.label.trim() || !form.url.trim()) {
      return Swal.fire("Missing", "Both fields required", "warning");
    }

    setLoading(true);

    const data = {
      ...form,
      userId: user.uid,
      profileId: profile.id,
      updatedAt: serverTimestamp(),
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, "links", editingId), data);
      } else {
        await addDoc(linksRef, {
          ...data,
          createdAt: serverTimestamp(),
        });
      }

      reset();
      setInnerModal(false);
      load();
      onSaved?.();

      Swal.fire("Success", "Link saved", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }

    setLoading(false);
  };

  /* ================= DELETE ================= */
  const remove = async (id) => {
    const c = await Swal.fire({
      title: "Delete link?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!c.isConfirmed) return;
setDeletingId(id)
    await deleteDoc(doc(db, "links", id));
    load();
    Swal.fire("Deleted", "Link removed", "success");
  };

  if (!open) return null;

  return (
    <ModalBackground onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>

        {/* ================= MAIN MODAL ================= */}
       <TopRow>
         <h2>Links: You can add multiple Links one-after-the-other</h2>

        <Btn onClick={openNew}>
          + Add Link
        </Btn>
       </TopRow>
       <p>
  “Manage all your links in one place. Add any links you want people to access and start entering them one by one — such as your LinkedIn, GitHub, Twitter, YouTube channel, your Payment links, E.T.C.”
</p>

        <div style={{ marginTop: "1.5rem" }}>
          {links.map((l) => (
            <Item key={l.id}>

              <strong>
  {l.label
    ?.split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")}
</strong>
              <p>
                <a href={l.url} target="_blank" rel="noreferrer">
                  {l.url}
                </a>
              </p>

              <div style={{ display: "flex", gap: "10px", marginTop:"10px" }}>
                <Btn2 onClick={() => openEdit(l)}>Edit</Btn2>
                   <Btn2 onClick={() => remove(l.id)}>
  Delete
  {deletingId === l.id ? " Loading..." : ""}
</Btn2>
              </div>

            </Item>
          ))}
        </div>

        <BtnRow>
          <Btn $delete onClick={onClose}>
            Close
          </Btn>
        </BtnRow>

        {/* ================= INNER MODAL ================= */}
        {innerModal && (
          <ModalBackground onClick={() => setInnerModal(false)}>
            <ModalCard onClick={(e) => e.stopPropagation()}>

              <h3>{editingId ? "Edit Link" : "Add Link"}</h3>

              <Label>Label: Give your link a Label or a Name. Use a name that easily tells what the link is about.</Label>
              <Input
                value={form.label}
                onChange={(e) =>
                  setForm({ ...form, label: e.target.value })
                }
              />

              <Label>URL: Enter your link. Link must start with https://</Label>
           <Input
  value={form.url}
  onChange={(e) => {
    let value = e.target.value;

    // enforce prefix always
    if (!value.startsWith("https://")) {
      value = "https://" + value.replace(/^https?:\/\//, "");
    }

    setForm({ ...form, url: value });
  }}

  onKeyDown={(e) => {
    const prefix = "https://";

    // block deleting into the prefix
    if (
      form.url.startsWith(prefix) &&
      e.target.selectionStart <= prefix.length &&
      (e.key === "Backspace" || e.key === "Delete")
    ) {
      e.preventDefault();
    }
  }}
/>

              <BtnRow>
                <Btn onClick={save}>
                  {loading ? "Saving..." : editingId ? "Update" : "Create"}
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