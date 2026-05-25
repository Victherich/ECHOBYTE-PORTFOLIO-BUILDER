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

// /* ================= THEME ================= */
// const DarkBlue = "#0056b3";
// const White = "#ffffff";

// /* ================= MODAL WRAPPER ================= */
// const ModalBackground = styled.div`
//   position: fixed;
//   inset: 0;
//   background: rgba(0,0,0,0.45);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 300;
// `;

// const ModalCard = styled.div`
//   background: ${White};
//   width: 95%;
//   max-width: 650px;
//   padding: 2rem;
//   border-radius: 14px;
//   max-height: 90vh;
//   overflow-y: auto;
// `;

// /* ================= FORM ================= */
// const Label = styled.label`
//   font-weight: 600;
//   display: block;
//   margin-top: 1rem;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 12px;
//   border-radius: 10px;
//   border: 1px solid #c5d9f6;
//   margin-top: 6px;
// `;

// const TextArea = styled.textarea`
//   width: 100%;
//   padding: 12px;
//   border-radius: 10px;
//   border: 1px solid #c5d9f6;
//   margin-top: 6px;
// `;

// const BtnRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-top: 1.5rem;
//   gap: 1rem;
// `;

// const Btn = styled.button`
//   padding: 10px 15px;
//   border: none;
//   border-radius: 10px;
//   cursor: pointer;
//   font-weight: 600;
//   background: ${DarkBlue};
//   color: white;

//   ${(p) => p.$delete && `background:#d9534f;`}
// `;

// /* ================= LIST ================= */
// const Item = styled.div`
//   border: 1px solid #eee;
//   padding: 12px;
//   border-radius: 10px;
//   margin-bottom: 10px;
// `;

// /* ================= COMPONENT ================= */

// export default function ProjectsModal({
//   open,
//   profile,
//   onClose,
//   onSaved,
// }) {
//   const [projects, setProjects] = useState([]);
//   const [innerModal, setInnerModal] = useState(false);
//   const [editingId, setEditingId] = useState(null);

//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     skillsUsed: "",
//     liveLink: "",
//   });

//   const user = auth.currentUser;
//   const projectsRef = collection(db, "projects");

//   /* ================= LOAD ================= */
//   const load = async () => {
//     if (!user || !profile?.id) return;

//     const q = query(
//       projectsRef,
//       where("userId", "==", user.uid),
//       where("profileId", "==", profile.id)
//     );

//     const snap = await getDocs(q);

//     const arr = [];
//     snap.forEach((d) => arr.push({ id: d.id, ...d.data() }));

//     setProjects(arr);
//   };

//   useEffect(() => {
//     if (open && profile) load();
//   }, [open, profile]);

//   /* ================= RESET ================= */
//   const reset = () => {
//     setEditingId(null);
//     setForm({
//       name: "",
//       description: "",
//       skillsUsed: "",
//       liveLink: "",
//     });
//   };

//   /* ================= EDIT ================= */
//   const openEdit = (item) => {
//     setEditingId(item.id);
//     setForm({
//       name: item.name || "",
//       description: item.description || "",
//       skillsUsed: item.skillsUsed || "",
//       liveLink: item.liveLink || "",
//     });
//     setInnerModal(true);
//   };

//   /* ================= SAVE ================= */
//   const save = async () => {
//     if (!user) return;

//     if (!form.name.trim()) {
//       return Swal.fire("Missing", "Project name required", "warning");
//     }

//     const data = {
//       ...form,
//       userId: user.uid,
//       profileId: profile.id,
//       updatedAt: serverTimestamp(),
//     };

//     try {
//       if (editingId) {
//         await updateDoc(doc(db, "projects", editingId), data);
//       } else {
//         await addDoc(projectsRef, {
//           ...data,
//           createdAt: serverTimestamp(),
//         });
//       }

//       reset();
//       setInnerModal(false);
//       load();
//       onSaved?.();

//       Swal.fire("Success", "Project saved", "success");
//     } catch (err) {
//       Swal.fire("Error", err.message, "error");
//     }
//   };

//   /* ================= DELETE ================= */
//   const remove = async (id) => {
//     const c = await Swal.fire({
//       title: "Delete project?",
//       icon: "warning",
//       showCancelButton: true,
//     });

//     if (!c.isConfirmed) return;

//     await deleteDoc(doc(db, "projects", id));
//     load();
//     Swal.fire("Deleted", "Removed successfully", "success");
//   };

//   if (!open) return null;

//   return (
//     <ModalBackground onClick={onClose}>
//       <ModalCard onClick={(e) => e.stopPropagation()}>

//         {/* ================= MAIN MODAL ================= */}
//         <h2>Projects</h2>

//         <Btn onClick={() => {
//           reset();
//           setInnerModal(true);
//         }}>
//           + Add Project
//         </Btn>

//         <div style={{ marginTop: "1.5rem" }}>
//           {projects.map((p) => (
//             <Item key={p.id}>

//               <strong>{p.name}</strong>
//               <p>{p.description}</p>
//               <p><b>Skills:</b> {p.skillsUsed}</p>
//               <p><b>Link:</b> {p.liveLink}</p>

//               <div style={{ display: "flex", gap: "10px" }}>
//                 <button onClick={() => openEdit(p)}>Edit</button>
//                 <button onClick={() => remove(p.id)}>Delete</button>
//               </div>

//             </Item>
//           ))}
//         </div>

//         <BtnRow>
//           <Btn $delete onClick={onClose}>
//             Close
//           </Btn>
//         </BtnRow>

//         {/* ================= INNER MODAL ================= */}
//         {innerModal && (
//           <ModalBackground onClick={() => setInnerModal(false)}>
//             <ModalCard onClick={(e) => e.stopPropagation()}>

//               <h3>{editingId ? "Edit Project" : "Add Project"}</h3>

//               <Label>Project Name</Label>
//               <Input
//                 value={form.name}
//                 onChange={(e) =>
//                   setForm({ ...form, name: e.target.value })
//                 }
//               />

//               <Label>Description</Label>
//               <TextArea
//                 rows={3}
//                 value={form.description}
//                 onChange={(e) =>
//                   setForm({ ...form, description: e.target.value })
//                 }
//               />

//               <Label>Skills Used</Label>
//               <Input
//                 value={form.skillsUsed}
//                 onChange={(e) =>
//                   setForm({ ...form, skillsUsed: e.target.value })
//                 }
//               />

//               <Label>Live Link</Label>
//               <Input
//                 value={form.liveLink}
//                 onChange={(e) =>
//                   setForm({ ...form, liveLink: e.target.value })
//                 }
//               />

//               <BtnRow>
//                 <Btn onClick={save}>
//                   {editingId ? "Update" : "Create"}
//                 </Btn>

//                 <Btn $delete onClick={() => setInnerModal(false)}>
//                   Cancel
//                 </Btn>
//               </BtnRow>

//             </ModalCard>
//           </ModalBackground>
//         )}

//       </ModalCard>
//     </ModalBackground>
//   );
// }






"use client";

import { useEffect, useState, useRef } from "react";
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

/* ================= IMAGE HELPERS ================= */

const compressImage = (file, quality = 80) => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

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
  data.append("folder", "portfolioprojects");

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

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const ImagePreview = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 180px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px dashed #c5d9f6;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7fbff;
`;

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HiddenInput = styled.input`
  display: none;
`;

const UploadButton = styled.button`
  margin-top: 10px;
  padding: 10px 15px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  background: ${DarkBlue};
  color: white;
`;


/* ================= COMPONENT ================= */

export default function ProjectsModal({
  open,
  profile,
  onClose,
  onSaved,
}) {
  const [projects, setProjects] = useState([]);
  const [innerModal, setInnerModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
 const [loading, setLoading]=useState(false)
  const [deletingId, setDeletingId] = useState(null);
  const fileRef = useRef(null);
  const MAX_CHARS = 300;
  const PREFIX = "https://";

  const [form, setForm] = useState({
    name: "",
    description: "",
    skillsUsed: "",
    liveLink: "",
    image: null,
    imageUrl: "",
  });

  const user = auth.currentUser;
  const projectsRef = collection(db, "projects");

  /* ================= LOAD ================= */
  const load = async () => {
    if (!user || !profile?.id) return;

    const q = query(
      projectsRef,
      where("userId", "==", user.uid),
      where("profileId", "==", profile.id)
    );

    const snap = await getDocs(q);

    const arr = [];
    snap.forEach((d) => arr.push({ id: d.id, ...d.data() }));

    setProjects(arr);
  };

  useEffect(() => {
    if (open && profile) load();
  }, [open, profile]);

  /* ================= RESET ================= */
  const reset = () => {
    setEditingId(null);
    setForm({
      name: "",
      description: "",
      skillsUsed: "",
      liveLink: "",
      image: null,
      imageUrl: "",
      
    });

      // clear file input
  if (fileRef.current) {
    fileRef.current.value = "";
  }
  };

  /* ================= IMAGE HANDLER ================= */
  const handleImage = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  /* ================= EDIT ================= */
  const openEdit = (item) => {
  if (fileRef.current) {
    fileRef.current.value = "";
  }

  setEditingId(item.id);

  setForm({
    name: item.name || "",
    description: item.description || "",
    skillsUsed: item.skillsUsed || "",
    liveLink: item.liveLink || "",
    image: null,
    imageUrl: item.imageUrl || "",
  });

  setInnerModal(true);
};

  /* ================= SAVE ================= */
  const save = async () => {
    if (!user) return;

      // REQUIRED FIELDS CHECK
  if (!form.name.trim()) {
    return Swal.fire("Missing", "Project name required", "warning");
  }

  if (!form.description.trim()) {
    return Swal.fire("Missing", "Description is required", "warning");
  }

  if (!form.skillsUsed.trim()) {
    return Swal.fire("Missing", "Skills used is required", "warning");
  }

  // liveLink is OPTIONAL → skip

  if (!editingId && !form.image && !form.imageUrl) {
    return Swal.fire("Missing", "Project image is required", "warning");
  }

    let imageUrl = form.imageUrl || "";
setLoading(true);
    try {
      if (form.image) {
        const blob = await compressImage(form.image, 80);
        imageUrl = await uploadToCloudinary(blob);
      }

      const data = {
        name: form.name,
        description: form.description,
        skillsUsed: form.skillsUsed,
        liveLink: form.liveLink,
        imageUrl,
        userId: user.uid,
        profileId: profile.id,
        updatedAt: serverTimestamp(),
      };

      if (editingId) {
        await updateDoc(doc(db, "projects", editingId), data);
      } else {
        await addDoc(projectsRef, {
          ...data,
          createdAt: serverTimestamp(),
        });
      }

      reset();
      setInnerModal(false);
      load();
      onSaved?.();

      Swal.fire("Success", "Project saved", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }finally{
        setLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const remove = async (id) => {
    const c = await Swal.fire({
      title: "Delete project?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!c.isConfirmed) return;
setDeletingId(id);
    await deleteDoc(doc(db, "projects", id));
    load();
    Swal.fire("Deleted", "Removed successfully", "success");
  };

  if (!open) return null;

  return (
    <ModalBackground onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>

        {/* ================= MAIN MODAL ================= */}
       <TopRow>
         <h2>Projects: You can add multiple Projects one-after-the-other</h2>

        <Btn
  onClick={() => {
    reset();
    setInnerModal(true);
  }}
>
  + Add Project
</Btn>
        </TopRow>

        <div style={{ marginTop: "1.5rem" }}>
          {projects.map((p) => (
            <Item key={p.id}>

              {p.imageUrl && (
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  style={{
                    width: "100%",
                    height: "160px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "10px",
                  }}
                />
              )}

             <strong>
  {p.name.charAt(0).toUpperCase() +
    p.name.slice(1)}
</strong>

<p>
  {p.description.charAt(0).toUpperCase() +
    p.description.slice(1)}
</p>

<p>
  <b>Skills:</b>{" "}
  {p.skillsUsed.charAt(0).toUpperCase() +
    p.skillsUsed.slice(1)}
</p>
              <div style={{ display: "flex", gap: "10px", marginTop:"10px" }}>
                <Btn2 onClick={() => openEdit(p)}>Edit</Btn2>
                  <Btn2 onClick={() => remove(p.id)}>
  Delete
  {deletingId === p.id ? " Loading..." : ""}
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

              <h3>{editingId ? "Edit Project" : "Add Project"}</h3>

              <Label>Name of the Project</Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <Label>Brief Description of the Project</Label>
       <TextArea
  rows={3}
  value={form.description}
  maxLength={MAX_CHARS}
  onChange={(e) =>
    setForm({
      ...form,
      description: e.target.value.slice(0, MAX_CHARS),
    })
  }
/>

<div
  style={{
    textAlign: "right",
    marginTop: "6px",
    fontSize: "0.85rem",
    color: form.description.length >= MAX_CHARS ? "#d9534f" : "#555",
  }}
>
  {form.description.length} / {MAX_CHARS}
</div>

              <Label>Skills Used: Mention the Skills you used in the Project. Seperate them by comma ( , )</Label>
              <Input
                value={form.skillsUsed}
                onChange={(e) =>
                  setForm({ ...form, skillsUsed: e.target.value })
                }
              />

              <Label>Live Link: Enter a clickable link to a website or video or pictures or folder or files that shows the Project. Link must start with https://</Label>
             <Input
  value={form.liveLink}
  onChange={(e) => {
    let value = e.target.value;

    // always force prefix
    if (!value.startsWith(PREFIX)) {
      value = PREFIX + value.replace(/^https?:\/\//, "");
    }

    setForm({ ...form, liveLink: value });
  }}

  onKeyDown={(e) => {
    // prevent deleting into prefix
    const el = e.target;
    const prefixLength = PREFIX.length;

    if (
      form.liveLink.startsWith(PREFIX) &&
      el.selectionStart <= prefixLength &&
      (e.key === "Backspace" || e.key === "Delete")
    ) {
      e.preventDefault();
    }
  }}
/>

              <Label>Image: Upload an image of the Project</Label>

<HiddenInput
  ref={fileRef}
  type="file"
  accept="image/*"
  onChange={handleImage}
/>

<UploadButton
  type="button"
  onClick={() => fileRef.current?.click()}
>
  {form.image ? "Change New Image" : "Upload New Image"}
</UploadButton>

              <ImagePreview>
                {form.image ? (
                  <PreviewImg src={URL.createObjectURL(form.image)} />
                ) : form.imageUrl ? (
                  <PreviewImg src={form.imageUrl} />
                ) : (
                  <span>No image</span>
                )}
              </ImagePreview>

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