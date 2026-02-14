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
//    THEME
// ========================================================= */
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
//   padding: 1rem;
//   border-radius: 12px;
//   border: 1px solid rgba(0, 86, 179, 0.15);
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 1rem;
//   box-shadow: 0 4px 10px rgba(0, 86, 179, 0.1);

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
//   max-height: 90vh;
//   overflow-y: auto;
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

// export default function SkillsPage() {
//   const user = auth.currentUser;

//   const [profiles, setProfiles] = useState([]);
//   const [selectedProfile, setSelectedProfile] = useState("");
//   const [skills, setSkills] = useState([]);

//   const [modal, setModal] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const [skillName, setSkillName] = useState("");
//   const [skillLevel, setSkillLevel] = useState("");

//   const profilesRef = user
//     ? collection(db, "users", user.uid, "profiles")
//     : null;

//   const skillsRef = user
//     ? collection(db, "users", user.uid, "skills")
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

//   /* ---------- LOAD SKILLS BY PROFILE ---------- */
//   useEffect(() => {
//     if (selectedProfile) {
//       loadSkills(selectedProfile);
//     } else {
//       setSkills([]);
//     }
//   }, [selectedProfile]);

//   async function loadSkills(profileId) {
//     if (!skillsRef) return;

//     const q = query(skillsRef, where("profileId", "==", profileId));
//     const snap = await getDocs(q);

//     const arr = [];
//     snap.forEach((d) => arr.push({ id: d.id, ...d.data() }));
//     setSkills(arr);
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

//     setModal(true);
//     setEditingId(null);
//     setSkillName("");
//     setSkillLevel("");
//   }

//   function openEdit(item) {
//     setModal(true);
//     setEditingId(item.id);
//     setSkillName(item.skillName);
//     setSkillLevel(item.level);
//   }

//   /* ---------- SAVE ---------- */

//   async function save() {
//     if (!skillName.trim()) {
//       return fireSwal("Missing", "Please enter a skill name.", "warning");
//     }

//     setLoading(true);

//     const data = {
//       profileId: selectedProfile,
//       skillName,
//       level: skillLevel,
//       updatedAt: Date.now(),
//     };

//     try {
//       if (editingId) {
//         await updateDoc(
//           doc(db, "users", user.uid, "skills", editingId),
//           data
//         );
//         fireSwal("Updated", "Skill updated.", "success");
//       } else {
//         await addDoc(skillsRef, { ...data, createdAt: Date.now() });
//         fireSwal("Created", "Skill added.", "success");
//       }

//       setModal(false);
//       loadSkills(selectedProfile);
//     } catch (err) {
//       fireSwal("Error", err.message, "error");
//     }

//     setLoading(false);
//   }

//   /* ---------- DELETE ---------- */

//   async function del(id) {
//     const c = await Swal.fire({
//       title: "Delete this skill?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: DarkBlue,
//     });

//     if (!c.isConfirmed) return;

//     await deleteDoc(doc(db, "users", user.uid, "skills", id));
//     fireSwal("Deleted", "Skill removed.", "success");
//     loadSkills(selectedProfile);
//   }

//   /* ========================================================
//      UI
//   ========================================================== */

//   return (
//     <Container>
//       <HeaderRow>
//         <Title>Skills</Title>
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

//         {skills.map((item) => (
//           <Item key={item.id}>
//             <div>
//               <strong>{item.skillName}</strong>
//               {item.level && (
//                 <p style={{ margin: "4px 0", color: "#444" }}>
//                   Level: {item.level}
//                 </p>
//               )}
//             </div>

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
//             <h2>{editingId ? "Edit Skill" : "New Skill"}</h2>

//             <Label>Skill Name</Label>
//             <Input
//               value={skillName}
//               onChange={(e) => setSkillName(e.target.value)}
//             />

//             <Label>Skill Level (optional)</Label>
//             <Input
//               value={skillLevel}
//               onChange={(e) => setSkillLevel(e.target.value)}
//               placeholder="Beginner, Intermediate, Expert..."
//             />

//             <ModalFooter>
//               <Btn onClick={save} disabled={loading}>
//                 {loading ? "Saving..." : editingId ? "Update" : "Create"}
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

/* ==================== STYLES (UNCHANGED) ==================== */

const Container = styled.div`
  color: ${DarkBlue};
  position: relative;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
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
  box-shadow: 0 6px 15px rgba(0, 86, 179, 0.3);
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #00448a;
  }
`;

const Select = styled.select`
  width: 260px;
  padding: 12px;
  border-radius: 10px;
  outline:none;
    border: 1px solid #c5d9f6;
`;

const List = styled.div`
  margin-top: 2.5rem;
`;

const Item = styled.div`
  background: ${White};
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1rem;
`;

const BtnRow = styled.div`
  display: flex;
  gap: 1rem;
`;

const Btn = styled.button`
  padding: 8px 15px;
  background: ${DarkBlue};
  color: white;
  border:none;
  border-radius:10px;
  margin-top:10px;
  cursor:pointer;
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

const Input = styled.input`
  width:100%;
  padding:12px;
`;

const ModalFooter = styled.div`
  margin-top:1.8rem;
  display:flex;
  justify-content:space-between;
`;

/* ================= PAGE ================= */

export default function SkillsPage() {

  const [profiles,setProfiles]=useState([]);
  const [selectedProfile,setSelectedProfile]=useState("");
  const [skills,setSkills]=useState([]);

  const [modal,setModal]=useState(false);
  const [editingId,setEditingId]=useState(null);

  const [loadingProfiles,setLoadingProfiles]=useState(false);
  const [loadingSkills,setLoadingSkills]=useState(false);
  const [saving,setSaving]=useState(false);
  const [deletingId,setDeletingId]=useState(null);

  const [skillName,setSkillName]=useState("");
  const [skillLevel,setSkillLevel]=useState("");

  const profilesRef = collection(db,"profiles");
  const skillsRef = collection(db,"skills");

  /* ---------- LOAD PROFILES ---------- */

  const loadProfiles = async ()=>{
    const user=auth.currentUser;
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

  /* ---------- LOAD SKILLS ---------- */

  const loadSkills = async(profileId)=>{
    const user=auth.currentUser;
    if(!user||!profileId) return;

    setLoadingSkills(true);

    const q=query(
      skillsRef,
      where("profileId","==",profileId),
      where("userId","==",user.uid)
    );

    const snap=await getDocs(q);

    const arr=[];
    snap.forEach(d=>arr.push({id:d.id,...d.data()}));

    setSkills(arr);
    setLoadingSkills(false);
  };

  useEffect(()=>{
    if(selectedProfile) loadSkills(selectedProfile);
    else setSkills([]);
  },[selectedProfile]);

  /* ---------- MODAL ---------- */

  const openNew=()=>{
    if(!selectedProfile)
      return fireSwal("Select Profile","Please select profile first.","info");

    setEditingId(null);
    setSkillName("");
    setSkillLevel("");
    setModal(true);
  };

  const openEdit=(item)=>{
    setEditingId(item.id);
    setSkillName(item.skillName);
    setSkillLevel(item.level);
    setModal(true);
  };

  /* ---------- SAVE ---------- */

  const save=async()=>{
    const user=auth.currentUser;
    if(!user) return;

    if(!skillName.trim())
      return fireSwal("Missing","Enter skill name.","warning");

    setSaving(true);

    const data={
      userId:user.uid,
      profileId:selectedProfile,
      skillName,
      level:skillLevel,
      updatedAt:serverTimestamp(),
    };

    try{
      if(editingId){
        await updateDoc(doc(db,"skills",editingId),data);
      }else{
        await addDoc(skillsRef,{
          ...data,
          createdAt:serverTimestamp(),
        });
      }

      setModal(false);
      loadSkills(selectedProfile);
      fireSwal("Saved","Skill saved.","success");

    }catch(err){
      fireSwal("Error",err.message,"error");
    }

    setSaving(false);
  };

  /* ---------- DELETE ---------- */

  const del=async(id)=>{

    const c=await Swal.fire({
      title:"Delete this skill?",
      icon:"warning",
      showCancelButton:true,
      confirmButtonColor:DarkBlue,
    });

    if(!c.isConfirmed) return;

    setDeletingId(id);

    await deleteDoc(doc(db,"skills",id));

    fireSwal("Deleted","Skill removed.","success");

    setDeletingId(null);
    loadSkills(selectedProfile);
  };

  /* ================= UI ================= */

  return (
    <Container>
      <HeaderRow>
        <Title>Skills</Title>
      </HeaderRow>

      <Select
        value={selectedProfile}
        onChange={(e)=>setSelectedProfile(e.target.value)}
      >
        <option value="">Select Profile...</option>
        {profiles.map(p=>(
          <option key={p.id} value={p.id}>{p.title}</option>
        ))}
      </Select>

      <PlusButton onClick={openNew} >
        +
      </PlusButton>

      <List>
        {!selectedProfile && <p>Please select a profile.</p>}
        {loadingSkills && <p>Loading skills...</p>}
        {!loadingSkills && skills.length===0 && selectedProfile && (
          <p>No skills created yet.</p>
        )}

        {skills.map(item=>(
          <Item key={item.id}>
            <div>
              <strong>{item.skillName}</strong>
              {item.level && <p>Level: {item.level}</p>}
            </div>

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
            <h2>{editingId ? "Edit Skill":"New Skill"}</h2>

            <Label>Skill Name</Label>
            <Input
              value={skillName}
              disabled={saving}
              onChange={(e)=>setSkillName(e.target.value)}
            />

            <Label>Skill Level</Label>
            <Input
              value={skillLevel}
              disabled={saving}
              onChange={(e)=>setSkillLevel(e.target.value)}
            />

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