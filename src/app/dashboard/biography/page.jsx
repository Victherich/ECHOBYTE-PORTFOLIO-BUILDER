
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
// } from "firebase/firestore";

// /* ========================================================
//    CONFIG
// ========================================================= */
// const MAX_CHARS = 500;
// const DarkBlue = "#0056b3";
// const White = "#ffffff";

// /* ========================================================
//    SWAL
// ========================================================= */
// const fireSwal = (title, text, icon) =>
//   Swal.fire({
//     title: `<span style="color:${DarkBlue}; font-weight:700;">${title}</span>`,
//     html: `<span style="color:#444">${text}</span>`,
//     icon,
//     confirmButtonColor: DarkBlue,
//   });

// /* ========================================================
//    STYLES
// ========================================================= */

// const Container = styled.div`
//   color: ${DarkBlue};
//   position: relative;
// `;

// const HeaderRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   gap: 1rem;
//   flex-wrap: wrap;
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
//   box-shadow: 0 6px 15px rgba(0, 86, 179, 0.3);
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
// `;

// const List = styled.div`
//   margin-top: 2.5rem;
// `;

// const Item = styled.div`
//   background: ${White};
//   padding: 1.2rem;
//   border-radius: 12px;
//   border: 1px solid rgba(0, 86, 179, 0.15);
//   margin-bottom: 1rem;
//   box-shadow: 0 4px 10px rgba(0, 86, 179, 0.1);
// `;

// const BtnRow = styled.div`
//   margin-top: 1rem;
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

// const TextArea = styled.textarea`
//   width: 100%;
//   padding: 14px;
//   border-radius: 10px;
//   border: 1px solid #c5d9f6;
//   margin-top: 6px;
//   resize: vertical;
// `;

// const Counter = styled.div`
//   margin-top: 6px;
//   text-align: right;
//   font-size: 0.85rem;
//   color: ${(p) => (p.exceeded ? "#d9534f" : "#555")};
// `;

// const ModalFooter = styled.div`
//   margin-top: 1.8rem;
//   display: flex;
//   justify-content: space-between;
// `;

// /* ========================================================
//    PAGE
// ========================================================= */

// export default function Biography() {
//   const user = auth.currentUser;

//   const [profiles, setProfiles] = useState([]);
//   const [selectedProfile, setSelectedProfile] = useState("");
//   const [biographies, setBiographies] = useState([]);

//   const [modal, setModal] = useState(false);
//   const [editingId, setEditingId] = useState(null);

//   const [bio, setBio] = useState("");

//   const profilesRef = user
//     ? collection(db, "users", user.uid, "profiles")
//     : null;

//   const bioRef = user
//     ? collection(db, "users", user.uid, "biography")
//     : null;

//   /* ---------- LOAD PROFILES ---------- */
//   useEffect(() => {
//     loadProfiles();
//   }, []);

//   async function loadProfiles() {
//     if (!profilesRef) return;
//     const snap = await getDocs(profilesRef);
//     const arr = [];
//     snap.forEach((d) => arr.push({ id: d.id, ...d.data() }));
//     setProfiles(arr);
//   }

//   /* ---------- LOAD BIOGRAPHY BY PROFILE ---------- */
//   useEffect(() => {
//     if (selectedProfile) {
//       loadBiography(selectedProfile);
//     } else {
//       setBiographies([]);
//     }
//   }, [selectedProfile]);

//   async function loadBiography(profileId) {
//     if (!bioRef) return;

//     const q = query(bioRef, where("profileId", "==", profileId));
//     const snap = await getDocs(q);

//     const arr = [];
//     snap.forEach((d) => arr.push({ id: d.id, ...d.data() }));
//     setBiographies(arr);
//   }

//   /* ---------- MODAL ---------- */

//   function openNew() {
//     if (!selectedProfile) {
//       return fireSwal(
//         "Select Profile",
//         "Please select a profile first.",
//         "info"
//       );
//     }

//     if (biographies.length > 0) {
//       return fireSwal(
//         "Biography Exists",
//         "You can only create one biography per profile.",
//         "info"
//       );
//     }

//     setModal(true);
//     setEditingId(null);
//     setBio("");
//   }

//   function openEdit(item) {
//     setModal(true);
//     setEditingId(item.id);
//     setBio(item.bio);
//   }

//   /* ---------- SAVE ---------- */

//   async function save() {
//     if (!bio.trim()) {
//       return fireSwal("Missing", "Biography cannot be empty.", "warning");
//     }

//     if (bio.length > MAX_CHARS) {
//       return fireSwal(
//         "Too Long",
//         `Maximum allowed characters is ${MAX_CHARS}.`,
//         "warning"
//       );
//     }

//     const data = {
//       profileId: selectedProfile,
//       bio,
//       updatedAt: Date.now(),
//     };

//     try {
//       if (editingId) {
//         await updateDoc(
//           doc(db, "users", user.uid, "biography", editingId),
//           data
//         );
//         fireSwal("Updated", "Biography updated.", "success");
//       } else {
//         await addDoc(bioRef, { ...data, createdAt: Date.now() });
//         fireSwal("Created", "Biography saved.", "success");
//       }

//       setModal(false);
//       loadBiography(selectedProfile);
//     } catch (err) {
//       fireSwal("Error", err.message, "error");
//     }
//   }

//   /* ---------- DELETE ---------- */

//   async function del(id) {
//     const c = await Swal.fire({
//       title: "Delete biography?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: DarkBlue,
//     });

//     if (!c.isConfirmed) return;

//     await deleteDoc(doc(db, "users", user.uid, "biography", id));
//     fireSwal("Deleted", "Biography removed.", "success");
//     loadBiography(selectedProfile);
//   }

//   /* ========================================================
//      UI
//   ========================================================== */

//   return (
//     <Container>
//       <HeaderRow>
//         <Title>Biography</Title>
//   </HeaderRow>
//         <Select
//           value={selectedProfile}
//           onChange={(e) => setSelectedProfile(e.target.value)}
//         >
//           <option value="">Select Profile...</option>
//           {profiles.map((p) => (
//             <option key={p.id} value={p.id}>
//               {p.title}
//             </option>
//           ))}
//         </Select>
    

//       <PlusButton onClick={openNew} disabled={!selectedProfile}>
//         +
//       </PlusButton>

//       <List>
//         {!selectedProfile && (
//           <p style={{ opacity: 0.6 }}>Please select a profile.</p>
//         )}

//         {biographies.map((item) => (
//           <Item key={item.id}>
//             <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
//               {item.bio}
//             </p>

//             <BtnRow>
//               <Btn onClick={() => openEdit(item)}>Edit</Btn>
//               <Btn $delete onClick={() => del(item.id)}>
//                 Delete
//               </Btn>
//             </BtnRow>
//           </Item>
//         ))}
//       </List>

//       {modal && (
//         <ModalBackground onClick={() => setModal(false)}>
//           <ModalCard onClick={(e) => e.stopPropagation()}>
//             <h2>{editingId ? "Edit Biography" : "New Biography"}</h2>

//             <Label>Biography</Label>
//             <TextArea
//               rows={6}
//               value={bio}
//               maxLength={MAX_CHARS}
//               onChange={(e) => setBio(e.target.value)}
//             />

//             <Counter exceeded={bio.length > MAX_CHARS}>
//               {bio.length} / {MAX_CHARS}
//             </Counter>

//             <ModalFooter>
//               <Btn onClick={save}>
//                 {editingId ? "Update" : "Create"}
//               </Btn>
//               <Btn $delete onClick={() => setModal(false)}>
//                 Cancel
//               </Btn>
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
const MAX_CHARS = 500;
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

/* ================= STYLES (UNCHANGED) ================= */

const Container = styled.div`
  color: ${DarkBlue};
  position: relative;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
`;

const Select = styled.select`
  width: 260px;
  padding: 12px;
  border-radius: 10px;
  outline:none;
  border: 1px solid #c5d9f6;
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
  transition: 0.3s;
  &:hover {
    background: #00448a;
  }
`;

const List = styled.div`
  margin-top: 2.5rem;
`;

const Item = styled.div`
  background: ${White};
  padding: 1.2rem;
  border-radius: 12px;
  margin-bottom: 1rem;
`;

const BtnRow = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
`;

const Btn = styled.button`
  padding: 8px 15px;
  background: ${DarkBlue};
  color: white;
  border-radius: 8px;
  border:none;
  ${(p) => p.$delete && `background:#d9534f;`}
`;

/* ---------- MODAL ---------- */

const ModalBackground = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display:flex;
  justify-content:center;
  align-items:center;
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
`;

const Counter = styled.div`
  text-align:right;
`;

const ModalFooter = styled.div`
  margin-top:1.8rem;
  display:flex;
  justify-content:space-between;
`;

/* ================= PAGE ================= */

export default function Biography() {

  const [profiles,setProfiles]=useState([]);
  const [selectedProfile,setSelectedProfile]=useState("");
  const [biographies,setBiographies]=useState([]);

  const [loadingProfiles,setLoadingProfiles]=useState(false);
  const [loadingBio,setLoadingBio]=useState(false);
  const [saving,setSaving]=useState(false);
  const [deletingId,setDeletingId]=useState(null);

  const [modal,setModal]=useState(false);
  const [editingId,setEditingId]=useState(null);
  const [bio,setBio]=useState("");

  const profilesRef = collection(db,"profiles");
  const bioRef = collection(db,"biography");

  /* ---------- LOAD PROFILES ---------- */
  const loadProfiles = async ()=>{
    const user = auth.currentUser;
    if(!user) return;

    setLoadingProfiles(true);

    const q=query(profilesRef,where("userId","==",user.uid));
    const snap=await getDocs(q);

    const arr=[];
    snap.forEach(d=>arr.push({id:d.id,...d.data()}));

    setProfiles(arr);
    setLoadingProfiles(false);

    if(arr.length===0){
      fireSwal("No Profiles","Create a profile first.","info");
    }
  };

  useEffect(()=>{
    const unsub=auth.onAuthStateChanged(u=>{
      if(u) loadProfiles();
    });
    return ()=>unsub();
  },[]);

  /* ---------- LOAD BIO ---------- */
  const loadBiography=async(profileId)=>{
    const user=auth.currentUser;
    if(!user||!profileId) return;

    setLoadingBio(true);

    const q=query(
      bioRef,
      where("profileId","==",profileId),
      where("userId","==",user.uid)
    );

    const snap=await getDocs(q);
    const arr=[];
    snap.forEach(d=>arr.push({id:d.id,...d.data()}));

    setBiographies(arr);
    setLoadingBio(false);
  };

  useEffect(()=>{
    if(selectedProfile) loadBiography(selectedProfile);
    else setBiographies([]);
  },[selectedProfile]);

  /* ---------- MODAL ---------- */

  const openNew=()=>{
     if (!selectedProfile){
Swal.fire("Select a profile first.");
return;
     } 
 

    if(biographies.length>0)
      return fireSwal("Biography Exists","Only one biography allowed.","info");

    setEditingId(null);
    setBio("");
    setModal(true);
  };

  const openEdit=(item)=>{
    setEditingId(item.id);
    setBio(item.bio);
    setModal(true);
  };

  /* ---------- SAVE ---------- */

  const save=async()=>{
    const user=auth.currentUser;
    if(!user) return;

    if(!bio.trim())
      return fireSwal("Missing","Biography empty.","warning");

    setSaving(true);

    const data={
      bio,
      profileId:selectedProfile,
      userId:user.uid,
      updatedAt:serverTimestamp(),
    };

    try{
      if(editingId){
        await updateDoc(doc(db,"biography",editingId),data);
      }else{
        await addDoc(bioRef,{
          ...data,
          createdAt:serverTimestamp(),
        });
      }

      setModal(false);
      loadBiography(selectedProfile);
      fireSwal("Saved","Biography saved.","success");
    }catch(err){
      fireSwal("Error",err.message,"error");
    }

    setSaving(false);
  };

  /* ---------- DELETE ---------- */

  const del=async(id)=>{
    const c=await Swal.fire({
      title:"Delete biography?",
      icon:"warning",
      showCancelButton:true,
    });

    if(!c.isConfirmed) return;

    setDeletingId(id);

    await deleteDoc(doc(db,"biography",id));

    fireSwal("Deleted","Biography removed.","success");

    setDeletingId(null);
    loadBiography(selectedProfile);
  };

  /* ================= UI ================= */

  return (
    <Container>
      <Title>Biography</Title>

      <Select
        value={selectedProfile}
        onChange={(e)=>setSelectedProfile(e.target.value)}
      >
        <option value="">Select Profile...</option>
        {profiles.map(p=>(
          <option key={p.id} value={p.id}>{p.title}</option>
        ))}
      </Select>

      <PlusButton onClick={openNew}>
        +
      </PlusButton>

      <List>
        {loadingBio && <p>Loading biography...</p>}

        {!loadingBio && biographies.length===0 && selectedProfile && (
          <p>No biography created yet.</p>
        )}
{!loadingBio && !selectedProfile && <p>Please select a profile.</p>}
        {biographies.map(item=>(
          <Item key={item.id}>
            <p>{item.bio}</p>

            <BtnRow>
              <Btn onClick={()=>openEdit(item)}>Edit</Btn>
              <Btn $delete onClick={()=>del(item.id)}>
                {deletingId===item.id ? "Deleting..." : "Delete"}
              </Btn>
            </BtnRow>
          </Item>
        ))}
      </List>

      {modal && (
        <ModalBackground onClick={()=>!saving && setModal(false)}>
          <ModalCard onClick={(e)=>e.stopPropagation()}>

            <h2>{editingId ? "Edit Biography":"New Biography"}</h2>

            <Label>Biography</Label>

            <TextArea
              rows={6}
              value={bio}
              disabled={saving}
              maxLength={MAX_CHARS}
              onChange={(e)=>setBio(e.target.value)}
            />

            <Counter>
              {bio.length} / {MAX_CHARS}
            </Counter>

            <ModalFooter>
              <Btn onClick={save} disabled={saving}>
                {saving
                  ? editingId ? "Updating..." : "Creating..."
                  : editingId ? "Update" : "Create"}
              </Btn>

              <Btn $delete disabled={saving} onClick={()=>setModal(false)}>
                Cancel
              </Btn>
            </ModalFooter>

          </ModalCard>
        </ModalBackground>
      )}
    </Container>
  );
}