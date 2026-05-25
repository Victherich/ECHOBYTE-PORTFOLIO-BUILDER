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
  max-width: 750px;
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  margin-top: 6px;
  border: 1px solid #c5d9f6;
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

/* ================= ITEM ================= */
const Item = styled.div`
  border: 1px solid #eee;
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

/* ================= COMPONENT ================= */

export default function ExperienceModal({
  open,
  profile,
  onClose,
  onSaved,
}) {
  const [experiences, setExperiences] = useState([]);
  const [innerModal, setInnerModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading]=useState(false)
  const [deletingId, setDeletingId] = useState(null);

  const [blocks, setBlocks] = useState([
    {
      jobTitle: "",
      company: "",
      location: "",
      duration: "",
      responsibilities: "",
      skills: "",
    },
  ]);

  const user = auth.currentUser;
  const expRef = collection(db, "experience");

  /* ================= LOAD ================= */
  const load = async () => {
    if (!user || !profile?.id) return;

    const q = query(
      expRef,
      where("userId", "==", user.uid),
      where("profileId", "==", profile.id)
    );

    const snap = await getDocs(q);

    const arr = [];
    snap.forEach((d) => arr.push({ id: d.id, ...d.data() }));

    setExperiences(arr);
  };

  useEffect(() => {
    if (open && profile) load();
  }, [open, profile]);

  /* ================= RESET ================= */
  const reset = () => {
    setEditingId(null);
    setBlocks([
      {
        jobTitle: "",
        company: "",
        location: "",
        duration: "",
        responsibilities: "",
        skills: "",
      },
    ]);
  };

  /* ================= EDIT ================= */
  const openEdit = (item) => {
    setEditingId(item.id);

    const normalized = (item.experiences || []).map((e) => ({
      jobTitle: e.jobTitle || "",
      company: e.company || "",
      location: e.location || "",
      duration: e.duration || "",
      responsibilities: e.responsibilities || "",
      skills: e.skills || "",
    }));

    setBlocks(normalized.length ? normalized : [normalized]);
    setInnerModal(true);
  };

  const updateBlock = (i, key, val) => {
    const copy = [...blocks];
    copy[i][key] = val;
    setBlocks(copy);
  };

  /* ================= SAVE ================= */
  const save = async () => {
    if (!user) return;

    // if (blocks.some((b) => !b.jobTitle.trim())) {
    //   return Swal.fire("Missing", "Job title required", "warning");
    // }
    if(!blocks[0].jobTitle||!blocks[0].company||!blocks[0].location||!blocks[0].duration||!blocks[0].responsibilities||!blocks[0].skills){
      return Swal.fire("Missing", "All fields are required", "warning");
    }


    setLoading(true)

    const data = {
      userId: user.uid,
      profileId: profile.id,
      experiences: blocks,
      updatedAt: serverTimestamp(),
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, "experience", editingId), data);
      } else {
        await addDoc(expRef, {
          ...data,
          createdAt: serverTimestamp(),
        });
      }

      reset();
      setInnerModal(false);
      load();
      onSaved?.();

      Swal.fire("Success", "Experience saved", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }finally{
      setLoading(false)
    }
  };

  /* ================= DELETE ================= */
  const remove = async (id) => {
    const c = await Swal.fire({
      title: "Delete experience?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!c.isConfirmed) return;
setDeletingId(id);
    await deleteDoc(doc(db, "experience", id));
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
         <h2>Experience: You can add multiple Experiences one-after-the-other</h2>

        <Btn
          onClick={() => {
            reset();
            setInnerModal(true);
          }}
        >
          + Add Experience
        </Btn>
      </TopRow>

        <div style={{ marginTop: "1.5rem" }}>
          {experiences.map((item) => (
            <Item key={item.id}>
              {item.experiences?.map((exp, i) => (
                <div key={i} style={{ marginBottom: "10px" }}>
                <strong>
  {exp.jobTitle.charAt(0).toUpperCase() +
    exp.jobTitle.slice(1)}
</strong>

<p>
  {exp.company.charAt(0).toUpperCase() +
    exp.company.slice(1)}
</p>

<p>
  {exp.location.charAt(0).toUpperCase() +
    exp.location.slice(1)}
</p>

<p>
  {exp.duration.charAt(0).toUpperCase() +
    exp.duration.slice(1)}
</p>
                  <hr />
                </div>
              ))}

              <div style={{ display: "flex", gap: "10px" }}>
                <Btn2 onClick={() => openEdit(item)}>Edit</Btn2>
                <Btn2 onClick={() => remove(item.id)}>
  Delete
  {deletingId === item.id ? " Loading..." : ""}
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

              <h3>{editingId ? "Edit Experience" : "Add Experience"}</h3>

              {blocks.map((b, i) => (
                <div key={i}>
                  <Label>Job Title / Position / Role</Label>
                  <Input
                    value={b.jobTitle}
                    onChange={(e) =>
                      updateBlock(i, "jobTitle", e.target.value)
                    }
                  />

                  <Label>Company / Organisation / Establishment (Mention the company full name where you performed the Role / Job / Position)</Label>
                  <Input
                    value={b.company}
                    onChange={(e) =>
                      updateBlock(i, "company", e.target.value)
                    }
                  />

                  <Label>Location of the Company / Organisation / Establishment
                  </Label>
                  <Input
                    value={b.location}
                    onChange={(e) =>
                      updateBlock(i, "location", e.target.value)
                    }
                  />

                  <Label>Duration: Mention the duration you performed the Role / Job / Position</Label>
                  <Input
                    value={b.duration}
                    onChange={(e) =>
                      updateBlock(i, "duration", e.target.value)
                    }
                  />

                  <Label>Responsibilities: Mention Your Responsibilities in the Role. Seperate them with comma ( , )</Label>
                  <TextArea
                    rows={2}
                    value={b.responsibilities}
                    onChange={(e) =>
                      updateBlock(i, "responsibilities", e.target.value)
                    }
                  />

                  <Label>Skills: Mention the Skills you used in the Role. Seperate them with comma ( , )</Label>
                  <TextArea
                    rows={2}
                    value={b.skills}
                    onChange={(e) =>
                      updateBlock(i, "skills", e.target.value)
                    }
                  />
                </div>
              ))}

              <BtnRow>
                <Btn onClick={save}>
                  Save
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