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

/* ================= FORM ================= */


const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

/* ================= LIST ================= */
const Item = styled.div`
  border: 1px solid #eee;
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

/* ================= COMPONENT ================= */

export default function EducationModal({
  open,
  profile,
  onClose,
  onSaved,
}) {
  const [educations, setEducations] = useState([]);
  const [innerModal, setInnerModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading]=useState(false)

  const [form, setForm] = useState({
    school: "",
    graduationYear: "",
    certificate: "",
  });

  const user = auth.currentUser;
  const eduRef = collection(db, "education");

  /* ================= LOAD ================= */
  const load = async () => {
    if (!user || !profile?.id) return;

    const q = query(
      eduRef,
      where("userId", "==", user.uid),
      where("profileId", "==", profile.id)
    );

    const snap = await getDocs(q);

    const arr = [];
    snap.forEach((d) => arr.push({ id: d.id, ...d.data() }));

    setEducations(arr);
  };

  useEffect(() => {
    if (open && profile) load();
  }, [open, profile]);

  /* ================= RESET ================= */
  const reset = () => {
    setEditingId(null);
    setForm({
      school: "",
      graduationYear: "",
      certificate: "",
    });
  };

  /* ================= OPEN EDIT ================= */
  const openEdit = (item) => {
    setEditingId(item.id);
    setForm({
      school: item.school,
      graduationYear: item.graduationYear,
      certificate: item.certificate,
    });
    setInnerModal(true);
  };

  /* ================= SAVE ================= */
  const save = async () => {
    if (!user) return;

    if (!form.school.trim()) {
      return Swal.fire("Missing", "School is required", "warning");
    }
     if (!form.certificate.trim()) {
      return Swal.fire("Missing", "Certificate is required", "warning");
    }

    const data = {
      ...form,
      userId: user.uid,
      profileId: profile.id,
      updatedAt: serverTimestamp(),
    };

    setLoading(true);

    try {
      if (editingId) {
        await updateDoc(doc(db, "education", editingId), data);
      } else {
        await addDoc(eduRef, {
          ...data,
          createdAt: serverTimestamp(),
        });
      }

      reset();
      setInnerModal(false);
      load();
      onSaved?.();

      Swal.fire("Success", "Education saved", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }finally{
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const remove = async (id) => {
    const c = await Swal.fire({
      title: "Delete education?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!c.isConfirmed) return;
setDeletingId(id);
    await deleteDoc(doc(db, "education", id));
    load();
    Swal.fire("Deleted", "Removed successfully", "success");
    setLoading(false)
  };

  if (!open) return null;

  return (
    <ModalBackground onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>

        {/* ================= MAIN MODAL ================= */}
       <TopRow>
         <h2>Education: You can add multiple Education one-after-the-other</h2>

        <Btn onClick={() => {
          reset();
          setInnerModal(true);
        }}>
          + Add Education
        </Btn>
       </TopRow>

        <div style={{ marginTop: "1.5rem" }}>
          {educations.map((e) => (
            <Item key={e.id}>
             <strong>
  {e.school.charAt(0).toUpperCase() +
    e.school.slice(1)}
</strong>

<p>
  {e.certificate.charAt(0).toUpperCase() +
    e.certificate.slice(1)}
</p>
              <p>{e.graduationYear}</p>

              <div style={{ display: "flex", gap: "10px", marginTop:"10px" }}>
                <Btn2 onClick={() => openEdit(e)}>Edit</Btn2>
                  <Btn2 onClick={() => remove(e.id)}>
  Delete
  {deletingId === e.id ? " Loading..." : ""}
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

              <h3>{editingId ? "Edit Education" : "Add Education"}</h3>

              <Label>School Complete Name with it's Location</Label>
              <Input
                value={form.school}
                onChange={(e) =>
                  setForm({ ...form, school: e.target.value })
                }
              />

              <Label>Graduation Year</Label>
              <Input
                value={form.graduationYear}
                onChange={(e) =>
                  setForm({ ...form, graduationYear: e.target.value })
                }
              />

              <Label>Certificate Obtained</Label>
              <Input
                value={form.certificate}
                onChange={(e) =>
                  setForm({ ...form, certificate: e.target.value })
                }
              />

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