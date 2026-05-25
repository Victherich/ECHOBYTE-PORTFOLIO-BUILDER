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

/* ================= MODAL WRAPPER ================= */
const ModalBackground = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
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

/* ================= UI ================= */
const Container = styled.div`
  color: ${DarkBlue};
`;

const HeaderRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 2rem;
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
`;

const Select = styled.select`
  width: 260px;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #c5d9f6;
`;

const List = styled.div`
  margin-top: 2rem;
`;

const Item = styled.div`
  background: ${White};
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const CertLeft = styled.div`
  display: flex;
  gap: 1rem;
`;

const CertImage = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 12px;
  object-fit: cover;
`;

const BtnRow = styled.div`
  display: flex;
  gap: 1rem;
  align-items:center;
`;

const Btn = styled.button`
  padding: 8px 15px;
  background: ${DarkBlue};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  ${(p) => p.$delete && `background:#d9534f;`}
`;

/* ================= INNER MODAL ================= */
const Field = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-weight: 600;
  display: block;
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #c5d9f6;
          outline: none;

  &:focus {
    border-color: #0056b3;
    box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.2);
  }
`;

const Preview = styled.img`
  width: 100%;
  max-height: 220px;
  object-fit: cover;
  border-radius: 12px;
  margin-top: 10px;
`;



/* ================= COMPONENT ================= */
export default function CertificationsModal({
  open,
  profile,
  onClose,
}) {
  const [certs, setCerts] = useState([]);
  const [innerModal, setInnerModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    organization: "",
    issueDate: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const certRef = collection(db, "certifications");

  /* ================= LOAD ================= */
  const load = async () => {
    const user = auth.currentUser;
    if (!user || !profile?.id) return;

    const q = query(
      certRef,
      where("userId", "==", user.uid),
      where("profileId", "==", profile.id)
    );

    const snap = await getDocs(q);

    const arr = [];
    snap.forEach((d) => arr.push({ id: d.id, ...d.data() }));
    setCerts(arr);
  };

  useEffect(() => {
    if (open && profile) load();
  }, [open, profile]);

  /* ================= RESET ================= */
  const reset = () => {
    setEditingId(null);
    setForm({
      name: "",
      organization: "",
      issueDate: "",
      image: null,
    });
    setPreview(null);
  };

  /* ================= IMAGE ================= */
  const compressImage = (file, quality = 80) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          canvas.width = img.width * 0.8;
          canvas.height = img.height * 0.8;

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          canvas.toBlob(
            (blob) => resolve(blob),
            "image/jpeg",
            quality / 100
          );
        };
      };
    });
  };

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "echobyte_digital_store_upload");
    data.append("folder", "certifications");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/ddh4wrbok/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const json = await res.json();
    return json.secure_url;
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm({ ...form, image: file });
    setPreview(URL.createObjectURL(file));
  };

  /* ================= OPEN ================= */
  const openNew = () => {
    reset();
    setInnerModal(true);
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      organization: item.organization,
      issueDate: item.issueDate,
      image: null,
    });
    setPreview(item.image);
    setInnerModal(true);
  };

  /* ================= SAVE ================= */
  const save = async () => {
    const user = auth.currentUser;
    if (!user) return;

    if (!form.name.trim())
  return fireSwal("Missing", "Certification name is required", "warning");

if (!form.organization.trim())
  return fireSwal("Missing", "Organization is required", "warning");

if (!form.issueDate)
  return fireSwal("Missing", "Issue date is required", "warning");

// IMPORTANT: image required for BOTH create + edit (if no existing preview)
if (!editingId && !form.image && !preview)
  return fireSwal("Missing", "Certification image is required", "warning");

    setLoading(true);

    let imageUrl = preview || "";

    try {
      if (form.image) {
        const compressed = await compressImage(form.image, 80);
        imageUrl = await uploadToCloudinary(compressed);
      }

      const data = {
        name: form.name,
        organization: form.organization,
        issueDate: form.issueDate,
        image: imageUrl,
        userId: user.uid,
        profileId: profile.id,
        updatedAt: serverTimestamp(),
      };

      if (editingId) {
        await updateDoc(doc(db, "certifications", editingId), data);
      } else {
        await addDoc(certRef, {
          ...data,
          createdAt: serverTimestamp(),
        });
      }

      setInnerModal(false);
      load();
      fireSwal("Success", "Saved successfully", "success");
    } catch (err) {
      fireSwal("Error", err.message, "error");
    }

    setLoading(false);
  };

  /* ================= DELETE ================= */
  const remove = async (id) => {
    const c = await Swal.fire({
      title: "Delete?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!c.isConfirmed) return;

    setDeletingId(id);
    await deleteDoc(doc(db, "certifications", id));
    setDeletingId(null);

    load();
  };

  if (!open) return null;

  return (
    <ModalBackground onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>

       <TopRow>
         <h2>Certifications: You can add multiple Certifications one-after-the-other</h2>

        <Btn onClick={openNew}>+ Add Certification</Btn>

       </TopRow>

        <List>
          {certs.map((c) => (
            <Item key={c.id}>
              <CertLeft>
                <CertImage src={c.image} />
                <div>
                  <b>{c.name.charAt(0).toUpperCase() + c.name.slice(1)}</b>
<p>{c.organization.charAt(0).toUpperCase() + c.organization.slice(1)}</p>
                  <p>{c.issueDate}</p>
                </div>
              </CertLeft>

              <BtnRow>
                <Btn onClick={() => openEdit(c)}>Edit</Btn>
                <Btn
                  $delete
                  onClick={() => remove(c.id)}
                >
                  {deletingId === c.id ? "Deleting..." : "Delete"}
                </Btn>
              </BtnRow>
            </Item>
          ))}
        </List>

        {/* INNER MODAL */}
        {innerModal && (
          <ModalBackground onClick={() => setInnerModal(false)}>
            <ModalCard onClick={(e) => e.stopPropagation()}>

              <h3>{editingId ? "Edit" : "Add"} Certification</h3>

              <Field>
                <Label>Name of the Certification</Label>
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
              </Field>

              <Field>
                <Label>Organization: Which organisation issued the certificate to you?</Label>
                <Input
                  value={form.organization}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      organization: e.target.value,
                    })
                  }
                />
              </Field>

              <Field>
                <Label>Issued Date: </Label>
                <Input
                  type="date"
                  value={form.issueDate}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      issueDate: e.target.value,
                    })
                  }
                />
              </Field>

              <Field>
  <Label>Image: Upload Image of the Certificate</Label>

  <input
    id="certUpload"
    type="file"
    accept="image/*"
    onChange={handleImage}
    style={{ display: "none" }}
  />

  {/* ALWAYS show upload button */}
  <Btn
    onClick={() =>
      document.getElementById("certUpload").click()
    }
  >
    Upload / Change New Image
  </Btn>

  {/* preview only when available */}
  {preview && <Preview src={preview} />}
</Field>

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