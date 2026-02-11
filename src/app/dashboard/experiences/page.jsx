
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
// } from "firebase/firestore";

// /* ========================================================
//    THEME
// ========================================================= */
// const DarkBlue = "#0056b3";
// const White = "#ffffff";

// /* ========================================================
//    GLOBAL SWAL STYLE
// ========================================================= */
// const fireSwal = (title, text, icon) => {
//   return Swal.fire({
//     title: `<span style="color:${DarkBlue}; font-weight:700;">${title}</span>`,
//     html: `<span style="color:#444">${text}</span>`,
//     icon,
//     confirmButtonColor: DarkBlue,
//   });
// };

// /* ========================================================
//    STYLES
// ========================================================= */

// const Container = styled.div`
//   color: ${DarkBlue};
//   position: relative;
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

//   &:hover {
//     background: #00448a;
//   }
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
//   opacity: ${(p) => (p.disabled ? 0.5 : 1)};
//   pointer-events: ${(p) => (p.disabled ? "none" : "auto")};

//   ${(p) =>
//     p.$delete &&
//     `
//       background:#d9534f;
//     `}
// `;

// /* -------------- MODAL ---------------- */

// const ModalBackground = styled.div`
//   position: fixed;
//   inset: 0;
//   background: rgba(0,0,0,0.45);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 200;
// `;

// const ModalCard = styled.div`
//   background:${White};
//   width: 95%;
//   max-width: 600px;
//   padding: 2rem;
//   border-radius: 14px;
//   max-height:90vh;
//   overflow-y:auto;
//   box-shadow:0 8px 25px rgba(0,0,0,0.25);
// `;

// const Label = styled.label`
//   font-weight:600;
//   margin-top:1rem;
//   display:block;
// `;

// const Input = styled.input`
//   width:100%;
//   padding:12px;
//   border-radius:10px;
//   border:1px solid #c5d9f6;
//   margin-top:6px;
// `;

// const TextArea = styled.textarea`
//   width:100%;
//   padding:12px;
//   border-radius:10px;
//   border:1px solid #c5d9f6;
//   margin-top:6px;
//   resize:vertical;
// `;

// const Select = styled.select`
//   width:100%;
//   padding:12px;
//   border-radius:10px;
//   border:1px solid #c5d9f6;
//   margin-top:6px;
// `;

// const ModalFooter = styled.div`
//   margin-top:1.8rem;
//   display:flex;
//   justify-content:space-between;
// `;

// /* ========================================================
//    PAGE LOGIC
// ========================================================= */

// export default function ExperiencePage() {

//   const user = auth.currentUser;

//   const [profiles, setProfiles] = useState([]);
//   const [docs, setDocs] = useState([]);

//   const [modal, setModal] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [editingId, setEditingId] = useState(null);
//   const [selectedProfile, setSelectedProfile] = useState("");

//   const [blocks, setBlocks] = useState([
//     { jobTitle:"", company:"", duration:"", responsibilities:"", skills:"" }
//   ]);

//   const profilesRef = user ? collection(db,"users",user.uid,"profiles") : null;
//   const expRef = user ? collection(db,"users",user.uid,"experience") : null;

//   useEffect(()=>{
//     loadProfiles();
//     loadDocs();
//   },[]);

//   async function loadProfiles(){
//     if(!profilesRef) return;
//     const arr=[];
//     const snap = await getDocs(profilesRef);
//     snap.forEach(d => arr.push({id:d.id,...d.data()}));
//     setProfiles(arr);
//   }

//   async function loadDocs(){
//     if(!expRef) return;
//     const arr=[];
//     const snap = await getDocs(expRef);
//     snap.forEach(d => arr.push({id:d.id,...d.data()}));
//     setDocs(arr);
//   }

//   /* ---------- MODAL ---------- */

//   function openNew(){
//     setModal(true);
//     setEditingId(null);
//     setSelectedProfile("");
//     setBlocks([{ jobTitle:"",company:"",duration:"",responsibilities:"",skills:"" }]);
//   }

//   function openEdit(item){
//     setModal(true);
//     setEditingId(item.id);
//     setSelectedProfile(item.profileId);
//     setBlocks(item.experiences ?? []);
//   }

//   /* ---------- FORM ---------- */

//   function updateBlock(i,key,val){
//     const copy=[...blocks];
//     copy[i][key]=val;
//     setBlocks(copy);
//   }

//   // function addBlock(){
//   //   setBlocks([
//   //     ...blocks,
//   //     { jobTitle:"",company:"",duration:"",responsibilities:"",skills:"" }
//   //   ]);
//   // }

//   /* ---------- SAVE ---------- */

//   async function save(){
    
//     if(!selectedProfile) {
//       return fireSwal("Missing","Please select a profile.","warning");
//     }

//     if(blocks.some(b => !b.jobTitle.trim())){
//       return fireSwal("Missing","Please enter at least one job title.","warning");
//     }

//     setLoading(true);

//     const data = {
//       profileId: selectedProfile,
//       experiences: blocks,
//       updatedAt: Date.now()
//     };

//     try{
//       if(editingId){
//         await updateDoc(doc(db,"users",user.uid,"experience",editingId),data);
//         fireSwal("Updated","Experience updated.","success");
//       } else {
//         await addDoc(expRef,{...data,createdAt:Date.now()});
//         fireSwal("Created","Experience saved.","success");
//       }

//       setModal(false);
//       loadDocs();

//     } catch(err){
//       fireSwal("Error",err.message,"error");
//     }

//     setLoading(false);
//   }

//   /* ---------- DELETE ---------- */

//   async function del(id){
//     const c = await Swal.fire({
//       title:"<span style='color:#0056b3'>Delete?</span>",
//       showCancelButton:true,
//       confirmButtonColor:DarkBlue
//     });

//     if(!c.isConfirmed) return;

//     await deleteDoc(doc(db,"users",user.uid,"experience",id));
//     fireSwal("Deleted","Removed.","success");
//     loadDocs();
//   }

//   /* ========================================================
//      UI
//   ========================================================== */

//   return(
//     <Container>

//       <Title>Experience</Title>
//       <PlusButton onClick={openNew}>+</PlusButton>

//       <List>
//         <h2>Your Experience Entries</h2>
//         <br/>

//         {docs.map(item => (
//           <Item key={item.id}>
//             <div>
//               <strong>{profiles.find(p=>p.id===item.profileId)?.title}</strong>
//               {item.experiences?.map((e,i)=>(
//                 <p key={i} style={{margin:"3px 0",color:"#444"}}>
//                   <b>{e.jobTitle}</b> @ {e.company}
//                 </p>
//               ))}
//             </div>

//             <BtnRow>
//               <Btn $small onClick={()=>openEdit(item)}>Edit</Btn>
//               <Btn $small $delete onClick={()=>del(item.id)}>Delete</Btn>
//             </BtnRow>
//           </Item>
//         ))}
//       </List>

//       {modal && (
//         <ModalBackground onClick={()=>setModal(false)}>
//           <ModalCard onClick={e=>e.stopPropagation()}>

//             <h2 style={{color:DarkBlue}}>
//               {editingId ? "Edit Experience" : "Create Experience"}
//             </h2>

//             <Label>Select Profile</Label>
//             <Select
//               value={selectedProfile}
//               onChange={e=>setSelectedProfile(e.target.value)}
//             >
//               <option value="">Select Profile</option>
//               {profiles.map(p=>(
//                 <option key={p.id} value={p.id}>
//                   {p.title}
//                 </option>
//               ))}
//             </Select>

//             {blocks.map((b,i)=>(
//               <div key={i}>
//                 <Label>Job Title</Label>
//                 <Input value={b.jobTitle} onChange={e=>updateBlock(i,"jobTitle",e.target.value)}/>

//                 <Label>Company</Label>
//                 <Input value={b.company} onChange={e=>updateBlock(i,"company",e.target.value)}/>

//                 <Label>Duration</Label>
//                 <Input value={b.duration} onChange={e=>updateBlock(i,"duration",e.target.value)}/>

//                 <Label>Responsibilities</Label>
//                 <TextArea rows={2} value={b.responsibilities} onChange={e=>updateBlock(i,"responsibilities",e.target.value)}/>

//                 <Label>Skills</Label>
//                 <TextArea rows={2} value={b.skills} onChange={e=>updateBlock(i,"skills",e.target.value)}/>
//                 <hr/>
//               </div>
//             ))}

//             {/* <Btn style={{marginTop:"1rem"}} onClick={addBlock}>+ Add More Experience</Btn> */}

//             <ModalFooter>
//               <Btn disabled={loading} onClick={save}>
//                 {loading ? "Saving..." : (editingId ? "Update" : "Create")}
//               </Btn>
//               <Btn $delete onClick={()=>setModal(false)}>Cancel</Btn>
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
} from "firebase/firestore";

/* ========================================================
   THEME
========================================================= */
const DarkBlue = "#0056b3";
const White = "#ffffff";

/* ========================================================
   SWAL
========================================================= */
const fireSwal = (title, text, icon) =>
  Swal.fire({
    title: `<span style="color:${DarkBlue}; font-weight:700;">${title}</span>`,
    html: `<span style="color:#444">${text}</span>`,
    icon,
    confirmButtonColor: DarkBlue,
  });

/* ========================================================
   STYLES
========================================================= */

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
  opacity: ${(p) => (p.disabled ? 0.5 : 1)};
  pointer-events: ${(p) => (p.disabled ? "none" : "auto")};

  &:hover {
    background: #00448a;
  }
`;

const Select = styled.select`
  width: 260px;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #c5d9f6;
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
  box-shadow: 0 4px 10px rgba(0, 86, 179, 0.1);

  @media (max-width: 428px) {
    flex-direction: column;
    gap: 10px;
  }
`;

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
  max-height: 90vh;
  overflow-y: auto;
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

const TextArea = styled.textarea`
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

/* ========================================================
   PAGE
========================================================= */

export default function ExperiencePage() {
  const user = auth.currentUser;

  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState("");
  const [experiences, setExperiences] = useState([]);

  const [modal, setModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [blocks, setBlocks] = useState([
    { jobTitle: "", company: "", duration: "", responsibilities: "", skills: "" },
  ]);

  const profilesRef = user
    ? collection(db, "users", user.uid, "profiles")
    : null;

  const expRef = user
    ? collection(db, "users", user.uid, "experience")
    : null;

  /* ---------- LOAD PROFILES ---------- */
  useEffect(() => {
    loadProfiles();
  }, []);

  async function loadProfiles() {
    if (!profilesRef) return;
    const snap = await getDocs(profilesRef);
    const arr = [];
    snap.forEach((d) => arr.push({ id: d.id, ...d.data() }));
    setProfiles(arr);
  }

  /* ---------- LOAD EXPERIENCES BY PROFILE ---------- */
  useEffect(() => {
    if (selectedProfile) {
      loadExperiences(selectedProfile);
    } else {
      setExperiences([]);
    }
  }, [selectedProfile]);

  async function loadExperiences(profileId) {
    if (!expRef) return;

    const q = query(expRef, where("profileId", "==", profileId));
    const snap = await getDocs(q);

    const arr = [];
    snap.forEach((d) => arr.push({ id: d.id, ...d.data() }));
    setExperiences(arr);
  }

  /* ---------- MODAL ---------- */

  function openNew() {
    if (!selectedProfile) {
      return fireSwal("Select Profile", "Please select a profile first.", "info");
    }

    setModal(true);
    setEditingId(null);
    setBlocks([
      { jobTitle: "", company: "", duration: "", responsibilities: "", skills: "" },
    ]);
  }

  function openEdit(item) {
    setModal(true);
    setEditingId(item.id);
    setBlocks(item.experiences || []);
  }

  /* ---------- FORM ---------- */

  function updateBlock(i, key, val) {
    const copy = [...blocks];
    copy[i][key] = val;
    setBlocks(copy);
  }

  /* ---------- SAVE ---------- */

  async function save() {
    if (blocks.some((b) => !b.jobTitle.trim())) {
      return fireSwal("Missing", "Please enter at least one job title.", "warning");
    }

    setLoading(true);

    const data = {
      profileId: selectedProfile,
      experiences: blocks,
      updatedAt: Date.now(),
    };

    try {
      if (editingId) {
        await updateDoc(
          doc(db, "users", user.uid, "experience", editingId),
          data
        );
        fireSwal("Updated", "Experience updated.", "success");
      } else {
        await addDoc(expRef, { ...data, createdAt: Date.now() });
        fireSwal("Created", "Experience saved.", "success");
      }

      setModal(false);
      loadExperiences(selectedProfile);
    } catch (err) {
      fireSwal("Error", err.message, "error");
    }

    setLoading(false);
  }

  /* ---------- DELETE ---------- */

  async function del(id) {
    const c = await Swal.fire({
      title: "Delete this experience?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: DarkBlue,
    });

    if (!c.isConfirmed) return;

    await deleteDoc(doc(db, "users", user.uid, "experience", id));
    fireSwal("Deleted", "Experience removed.", "success");
    loadExperiences(selectedProfile);
  }

  /* ========================================================
     UI
  ========================================================== */

  return (
    <Container>
      <HeaderRow>
        <Title>Experience</Title>

       
      </HeaderRow>
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

      <PlusButton onClick={openNew} disabled={!selectedProfile}>
        +
      </PlusButton>

      <List>
        {!selectedProfile && (
          <p style={{ opacity: 0.6 }}>Please select a profile.</p>
        )}

        {experiences.map((item) => (
          <Item key={item.id}>
            <div>
              {item.experiences?.map((e, i) => (
                <p key={i}>
                  <b>{e.jobTitle}</b> @ {e.company}
                </p>
              ))}
            </div>

            <BtnRow>
              <Btn onClick={() => openEdit(item)}>Edit</Btn>
              <Btn $delete onClick={() => del(item.id)}>
                Delete
              </Btn>
            </BtnRow>
          </Item>
        ))}
      </List>

      {modal && (
        <ModalBackground onClick={() => setModal(false)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <h2>{editingId ? "Edit Experience" : "New Experience"}</h2>

            {blocks.map((b, i) => (
              <div key={i}>
                <Label>Job Title</Label>
                <Input
                  value={b.jobTitle}
                  onChange={(e) => updateBlock(i, "jobTitle", e.target.value)}
                />

                <Label>Company</Label>
                <Input
                  value={b.company}
                  onChange={(e) => updateBlock(i, "company", e.target.value)}
                />

                <Label>Duration</Label>
                <Input
                  value={b.duration}
                  onChange={(e) => updateBlock(i, "duration", e.target.value)}
                />

                <Label>Responsibilities</Label>
                <TextArea
                  rows={2}
                  value={b.responsibilities}
                  onChange={(e) =>
                    updateBlock(i, "responsibilities", e.target.value)
                  }
                />

                <Label>Skills</Label>
                <TextArea
                  rows={2}
                  value={b.skills}
                  onChange={(e) => updateBlock(i, "skills", e.target.value)}
                />
                <hr />
              </div>
            ))}

            <ModalFooter>
              <Btn onClick={save} disabled={loading}>
                {loading ? "Saving..." : editingId ? "Update" : "Create"}
              </Btn>
              <Btn $delete onClick={() => setModal(false)}>
                Cancel
              </Btn>
            </ModalFooter>
          </ModalCard>
        </ModalBackground>
      )}
    </Container>
  );
}
