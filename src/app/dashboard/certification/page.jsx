// "use client";

// import { useEffect, useState } from "react";
// import styled from "styled-components";
// import Swal from "sweetalert2";
// import { auth, db } from "@/firebaseConfig";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   updateDoc,
//   deleteDoc,
//   doc,
//   query,
//   where,
//   serverTimestamp,
// } from "firebase/firestore";

// /* ======================================================== */
// const DarkBlue = "#0056b3";
// const White = "#ffffff";

// /* ======================================================== */
// const fireSwal = (title, text, icon) =>
//   Swal.fire({
//     title: `<span style="color:${DarkBlue}; font-weight:700;">${title}</span>`,
//     html: `<span style="color:#444">${text}</span>`,
//     icon,
//     confirmButtonColor: DarkBlue,
//   });

// /* ================= STYLES ================= */
// const Container = styled.div`
//   color: ${DarkBlue};
//   position: relative;
// `;

// const HeaderRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: flex-start;
//   gap: 1rem;
//   flex-wrap: wrap;
//   flex-direction:column;
// `;

// const Title = styled.h1`
//   font-size: 2rem;
//   font-weight: 700;
// `;

// const PlusButton = styled.button`
//   position: fixed;
//   top: 120px;
//   right: 1%;
//   width: 50px;
//   height: 50px;
//   border-radius: 50%;
//   font-size: 2rem;
//   background: ${DarkBlue};
//   color: white;
//   border: none;
//   cursor: pointer;
//   opacity: ${(p) => (p.disabled ? 0.5 : 1)};
//   pointer-events: ${(p) => (p.disabled ? "none" : "auto")};

//   &:hover {
//     background: #00448a;
//   }
// `;

// const Select = styled.select`
//   width: 260px;
//   padding: 12px;
//   border-radius: 10px;
//   border: 1px solid #c5d9f6;
//   outline:none;
// `;

// const List = styled.div`
//   margin-top: 2.5rem;
// `;

// const Item = styled.div`
//   background: ${White};
//   padding: 1rem;
//   border-radius: 12px;
//   border: 1px solid rgba(0, 86, 179, 0.15);
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 1rem;

//   @media (max-width: 428px) {
//     flex-direction: column;
//     gap: 10px;
//   }
// `;

// const BtnRow = styled.div`
//   display: flex;
//   gap: 1rem;
// `;

// const Btn = styled.button`
//   padding: 8px 15px;
//   background: ${DarkBlue};
//   color: ${White};
//   border: none;
//   border-radius: 8px;
//   cursor: pointer;
//   font-weight: 600;

//   ${(p) =>
//     p.$delete &&
//     `
//       background:#d9534f;
//     `}
// `;

// /* ---------- MODAL ---------- */
// const ModalBackground = styled.div`
//   position: fixed;
//   inset: 0;
//   background: rgba(0, 0, 0, 0.45);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 200;
// `;

// const ModalCard = styled.div`
//   background: ${White};
//   width: 95%;
//   max-width: 600px;
//   padding: 2rem;
//   border-radius: 14px;
// `;

// const Label = styled.label`
//   font-weight: 600;
//   margin-top: 1rem;
//   display: block;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 12px;
//   border-radius: 10px;
//   border: 1px solid #c5d9f6;
//   margin-top: 6px;
// `;

// const ModalFooter = styled.div`
//   margin-top: 1.8rem;
//   display: flex;
//   justify-content: space-between;
// `;

// /* ========================================================
//    PAGE
// ========================================================= */
// export default function CertificationsPage() {
//   const [profiles, setProfiles] = useState([]);
//   const [selectedProfile, setSelectedProfile] = useState("");
//   const [certifications, setCertifications] = useState([]);

//   const [modal, setModal] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [deletingId, setDeletingId] = useState(null);

//   const [form, setForm] = useState({
//     name: "",
//     organization: "",
//     issueDate: "",
//     expiryDate: "",
//     credentialUrl: "",
//   });

//   const profilesRef = collection(db, "profiles");
//   const certsRef = collection(db, "certifications");

//   /* ---------- LOAD PROFILES ---------- */
//   useEffect(() => {
//     const unsub = auth.onAuthStateChanged((user) => {
//       if (user) loadProfiles(user.uid);
//     });
//   }, []);

//   const loadProfiles = async (uid) => {
//     setLoading(true);
//     const q = query(profilesRef, where("userId", "==", uid));
//     const snap = await getDocs(q);
//     const arr = [];
//     snap.forEach((d) => arr.push({ id: d.id, ...d.data() }));
//     setProfiles(arr);
//     setLoading(false);
//   };

//   /* ---------- LOAD CERTIFICATIONS ---------- */
//   useEffect(() => {
//     if (selectedProfile) loadCertifications(selectedProfile);
//     else setCertifications([]);
//   }, [selectedProfile]);

//   const loadCertifications = async (profileId) => {
//     const user = auth.currentUser;
//     if (!user || !profileId) return;
//     setLoading(true);
//     const q = query(certsRef, where("profileId", "==", profileId), where("userId", "==", user.uid));
//     const snap = await getDocs(q);
//     const arr = [];
//     snap.forEach((d) => arr.push({ id: d.id, ...d.data() }));
//     setCertifications(arr);
//     setLoading(false);
//   };

//   /* ---------- MODAL ---------- */
//   const openNew = () => {
//     if (!selectedProfile) return fireSwal("Select Profile", "Please select a profile first.", "info");
//     setModal(true);
//     setEditingId(null);
//     setForm({ name: "", organization: "", issueDate: "", expiryDate: "", credentialUrl: "" });
//   };

//   const openEdit = (item) => {
//     setModal(true);
//     setEditingId(item.id);
//     setForm(item);
//   };

//   /* ---------- SAVE ---------- */
//   const save = async () => {
//     if (!form.name.trim()) return fireSwal("Missing", "Certificate name is required.", "warning");
//     if (!form.organization.trim()) return fireSwal("Missing", "Organization is required.", "warning");

//     setLoading(true);
//     const user = auth.currentUser;
//     if (!user) return;

//     const data = {
//       ...form,
//       profileId: selectedProfile,
//       userId: user.uid,
//       updatedAt: serverTimestamp(),
//     };

//     try {
//       if (editingId) {
//         await updateDoc(doc(db, "certifications", editingId), data);
//         fireSwal("Updated", "Certification updated.", "success");
//       } else {
//         await addDoc(certsRef, { ...data, createdAt: serverTimestamp() });
//         fireSwal("Created", "Certification added.", "success");
//       }

//       setModal(false);
//       loadCertifications(selectedProfile);
//     } catch (err) {
//       fireSwal("Error", err.message, "error");
//     }

//     setLoading(false);
//   };

//   /* ---------- DELETE ---------- */
//   const del = async (id) => {
//     const c = await Swal.fire({
//       title: "Delete this certification?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: DarkBlue,
//     });
//     if (!c.isConfirmed) return;

//     setDeletingId(id);
//     await deleteDoc(doc(db, "certifications", id));
//     fireSwal("Deleted", "Certification removed.", "success");
//     setDeletingId(null);
//     loadCertifications(selectedProfile);
//   };

//   /* ================= UI ================= */
//   return (
//     <Container>
//       <HeaderRow>
//         <Title>Certifications</Title>

//         <Select value={selectedProfile} onChange={(e) => setSelectedProfile(e.target.value)}>
//           <option value="">Select Profile...</option>
//           {profiles.map((p) => (
//             <option key={p.id} value={p.id}>
//               {p.title}
//             </option>
//           ))}
//         </Select>
//       </HeaderRow>

//       <PlusButton onClick={openNew} >
//         +
//       </PlusButton>

//       <List>
//         {!selectedProfile && <p style={{ opacity: 0.6 }}>Please select a profile.</p>}
//         {loading && <p>Loading...</p>}
//            {!loading && certifications.length===0 && selectedProfile && (
//           <p>No Certifications created yet.</p>
//         )}

//         {certifications.map((c) => (
//           <Item key={c.id}>
//             <div>
//               <b>{c.name}</b> - {c.organization}
//               <p>
//                 Issued: {c.issueDate} {c.expiryDate && `| Expires: ${c.expiryDate}`}
//               </p>
//               {c.credentialUrl && (
//                 <p>
//                   Credential: <a href={c.credentialUrl} target="_blank">{c.credentialUrl}</a>
//                 </p>
//               )}
//             </div>

//             <BtnRow>
//               <Btn onClick={() => openEdit(c)}>Edit</Btn>
//               <Btn $delete onClick={() => del(c.id)}>
//                 {deletingId === c.id ? "Deleting..." : "Delete"}
//               </Btn>
//             </BtnRow>
//           </Item>
//         ))}
//       </List>

//       {modal && (
//         <ModalBackground onClick={() => !loading && setModal(false)}>
//           <ModalCard onClick={(e) => e.stopPropagation()}>
//             <h2>{editingId ? "Edit Certification" : "New Certification"}</h2>

//             <Label>Certificate Name</Label>
//             <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />

//             <Label>Organization</Label>
//             <Input value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} />

//             <Label>Issue Date</Label>
//             <Input type="date" value={form.issueDate} onChange={(e) => setForm({ ...form, issueDate: e.target.value })} />

//             <Label>Expiry Date (Optional)</Label>
//             <Input type="date" value={form.expiryDate} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} />

//             <Label>Credential URL (Optional)</Label>
//             <Input value={form.credentialUrl} onChange={(e) => setForm({ ...form, credentialUrl: e.target.value })} />

//             <ModalFooter>
//               <Btn onClick={save} disabled={loading}>
//                 {loading ? "Saving..." : editingId ? "Update" : "Create"}
//               </Btn>
//               <Btn $delete disabled={loading} onClick={() => setModal(false)}>Cancel</Btn>
//             </ModalFooter>
//           </ModalCard>
//         </ModalBackground>
//       )}
//     </Container>
//   );
// }



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

/* ======================================================== */
const DarkBlue = "#0056b3";
const White = "#ffffff";

/* ======================================================== */
const fireSwal = (title, text, icon) =>
  Swal.fire({
    title: `<span style="color:${DarkBlue}; font-weight:700;">${title}</span>`,
    html: `<span style="color:#444">${text}</span>`,
    icon,
    confirmButtonColor: DarkBlue,
  });

/* ================= STYLES ================= */

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
  flex-direction: column;
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
  z-index: 100;

  &:hover {
    background: #00448a;
  }
`;

const Select = styled.select`
  width: 260px;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #c5d9f6;
  outline: none;
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
  gap: 1rem;

  @media (max-width: 428px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const CertLeft = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const CertImage = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 12px;
  object-fit: cover;
  border: 1px solid rgba(0, 86, 179, 0.15);
`;

const CertInfo = styled.div``;

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
  overflow-y:scroll;
  height:95%;
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

const PreviewImage = styled.img`
  width: 100%;
  max-height: 220px;
  object-fit: cover;
  border-radius: 12px;
  margin-top: 1rem;
`;

/* ========================================================
   PAGE
========================================================= */

export default function CertificationsPage() {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState("");
  const [certifications, setCertifications] = useState([]);

  const [modal, setModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    name: "",
    organization: "",
    issueDate: "",
    image: null,
  });

  const profilesRef = collection(db, "profiles");
  const certsRef = collection(db, "certifications");

  /* ========================================================
     IMAGE COMPRESSION
  ======================================================== */

  const compressImage = (file, maxSizeKB = 100) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (e) => {
        const img = document.createElement("img");

        img.src = e.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");

          const MAX_WIDTH = 900;

          const scaleSize =
            img.width > MAX_WIDTH ? MAX_WIDTH / img.width : 1;

          canvas.width = img.width * scaleSize;
          canvas.height = img.height * scaleSize;

          const ctx = canvas.getContext("2d");

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          let quality = 0.7;

          const compressLoop = () => {
            canvas.toBlob(
              (blob) => {
                if (!blob) {
                  reject(new Error("Compression failed"));
                  return;
                }

                const sizeKB = blob.size / 1024;

                if (sizeKB <= maxSizeKB || quality <= 0.1) {
                  resolve(blob);
                } else {
                  quality -= 0.1;
                  compressLoop();
                }
              },
              "image/jpeg",
              quality
            );
          };

          compressLoop();
        };
      };
    });
  };

  /* ========================================================
     CLOUDINARY
  ======================================================== */

  const uploadToCloudinary = async (fileBlob) => {
    const cloudData = new FormData();

    cloudData.append("file", fileBlob, "certificate.jpg");

    cloudData.append("upload_preset", "echobyte_digital_store_upload");

    cloudData.append("folder", "portfoliocertifications");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/ddh4wrbok/image/upload",
      {
        method: "POST",
        body: cloudData,
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error?.message || "Upload failed");
    }

    return data.secure_url;
  };

  /* ========================================================
     LOAD PROFILES
  ======================================================== */

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) loadProfiles(user.uid);
    });

    return () => unsub();
  }, []);

  const loadProfiles = async (uid) => {
    const q = query(profilesRef, where("userId", "==", uid));

    const snap = await getDocs(q);

    const arr = [];

    snap.forEach((d) => arr.push({ id: d.id, ...d.data() }));

    setProfiles(arr);
  };

  /* ========================================================
     LOAD CERTIFICATIONS
  ======================================================== */

  useEffect(() => {
    if (selectedProfile) {
      loadCertifications(selectedProfile);
    } else {
      setCertifications([]);
    }
  }, [selectedProfile]);

  const loadCertifications = async (profileId) => {
    const user = auth.currentUser;

    if (!user) return;

    const q = query(
      certsRef,
      where("profileId", "==", profileId),
      where("userId", "==", user.uid)
    );

    const snap = await getDocs(q);

    const arr = [];

    snap.forEach((d) => arr.push({ id: d.id, ...d.data() }));

    setCertifications(arr);
  };

  /* ========================================================
     IMAGE HANDLE
  ======================================================== */

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      fireSwal("Invalid", "Only image files allowed.", "error");
      return;
    }

    setForm({
      ...form,
      image: file,
    });

    setPreview(URL.createObjectURL(file));
  };

  /* ========================================================
     MODAL
  ======================================================== */

  const openNew = () => {
    if (!selectedProfile) {
      return fireSwal(
        "Select Profile",
        "Please select a profile first.",
        "info"
      );
    }

    setModal(true);

    setEditingId(null);

    setPreview(null);

    setForm({
      name: "",
      organization: "",
      issueDate: "",
      image: null,
    });
  };

  const openEdit = (item) => {
    setModal(true);

    setEditingId(item.id);

    setPreview(item.image);

    setForm({
      ...item,
      image: null,
    });
  };

  /* ========================================================
     SAVE
  ======================================================== */

  const save = async () => {
    if (!form.name.trim()) {
      return fireSwal(
        "Missing",
        "Certificate name required.",
        "warning"
      );
    }

    if (!form.organization.trim()) {
      return fireSwal(
        "Missing",
        "Organization required.",
        "warning"
      );
    }

    const user = auth.currentUser;

    if (!user) return;

    try {
      setLoading(true);

      let imageUrl = preview || "";

      if (form.image) {
        const compressed = await compressImage(form.image, 100);

        imageUrl = await uploadToCloudinary(compressed);
      }

      const data = {
        name: form.name,
        organization: form.organization,
        issueDate: form.issueDate,
        image: imageUrl,
        profileId: selectedProfile,
        userId: user.uid,
        updatedAt: serverTimestamp(),
      };

      if (editingId) {
        await updateDoc(
          doc(db, "certifications", editingId),
          data
        );

        fireSwal("Updated", "Certification updated.", "success");
      } else {
        await addDoc(certsRef, {
          ...data,
          createdAt: serverTimestamp(),
        });

        fireSwal("Created", "Certification added.", "success");
      }

      setModal(false);

      loadCertifications(selectedProfile);
    } catch (err) {
      console.error(err);

      fireSwal("Error", err.message, "error");
    }

    setLoading(false);
  };

  /* ========================================================
     DELETE
  ======================================================== */

  const del = async (id) => {
    const c = await Swal.fire({
      title: "Delete certification?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: DarkBlue,
    });

    if (!c.isConfirmed) return;

    setDeletingId(id);

    await deleteDoc(doc(db, "certifications", id));

    fireSwal("Deleted", "Certification removed.", "success");

    setDeletingId(null);

    loadCertifications(selectedProfile);
  };

  /* ========================================================
     UI
  ======================================================== */

  return (
    <Container>
      <HeaderRow>
        <Title>Certifications</Title>

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
      </HeaderRow>

      <PlusButton onClick={openNew}>+</PlusButton>

      <List>
        {!selectedProfile && (
          <p style={{ opacity: 0.6 }}>
            Please select a profile.
          </p>
        )}

        {!loading &&
          certifications.map((c) => (
            <Item key={c.id}>
              <CertLeft>
                <CertImage
                  src={
                    c.image ||
                    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                  }
                />

                <CertInfo>
                  <b>{c.name}</b>
                  <p>{c.organization}</p>
                  <p>Issued: {c.issueDate}</p>
                </CertInfo>
              </CertLeft>

              <BtnRow>
                <Btn onClick={() => openEdit(c)}>
                  Edit
                </Btn>

                <Btn $delete onClick={() => del(c.id)}>
                  {deletingId === c.id
                    ? "Deleting..."
                    : "Delete"}
                </Btn>
              </BtnRow>
            </Item>
          ))}
      </List>

      {modal && (
        <ModalBackground
          onClick={() => !loading && setModal(false)}
        >
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <h2>
              {editingId
                ? "Edit Certification"
                : "New Certification"}
            </h2>

            <Label>Certificate Name</Label>

            <Input
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />

            <Label>Organization</Label>

            <Input
              value={form.organization}
              onChange={(e) =>
                setForm({
                  ...form,
                  organization: e.target.value,
                })
              }
            />

            <Label>Issue Date</Label>

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

            <Label>Certificate Image</Label>

            <Input type="file" accept="image/*" onChange={handleImage} />

            {preview && <PreviewImage src={preview} />}

            <ModalFooter>
              <Btn onClick={save}>
                {loading
                  ? "Saving..."
                  : editingId
                  ? "Update"
                  : "Create"}
              </Btn>

              <Btn
                $delete
                disabled={loading}
                onClick={() => setModal(false)}
              >
                Cancel
              </Btn>
            </ModalFooter>
          </ModalCard>
        </ModalBackground>
      )}
    </Container>
  );
}