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

/* ================= STYLES (UNCHANGED) ================= */

const Container = styled.div`
  color: ${DarkBlue};
  position: relative;
`;

const HeaderRow = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
`;

const Title = styled.h1`
  font-size:2rem;
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
  margin-top:2.5rem;
`;

const Item = styled.div`
  background:${White};
  padding:1rem;
  border-radius:12px;
  margin-bottom:1rem;
`;

const BtnRow = styled.div`
  display:flex;
  gap:1rem;
  margin-top:10px;
`;

const Btn = styled.button`
  padding:8px 15px;
  background:${DarkBlue};
  color:white;
  border-radius:8px;
  border:none;
  cursor:pointer;
  ${(p)=>p.$delete && `background:#d9534f;`}
`;

/* ---------- MODAL ---------- */

const ModalBackground = styled.div`
  position:fixed;
  inset:0;
  background:rgba(0,0,0,0.45);
  display:flex;
  justify-content:center;
  align-items:center;
  z-index:100;
`;

const ModalCard = styled.div`
  background:${White};
  width:95%;
  max-width:600px;
  padding:2rem;
  max-height:90vh;
  overflow-y:auto;
  border-radius:10px;
`;

const Label = styled.label`
  font-weight:600;
`;

const Input = styled.input`
  width:100%;
  padding:12px;
`;

const TextArea = styled.textarea`
  width:100%;
  padding:12px;
`;

const ModalFooter = styled.div`
  margin-top:1.8rem;
  display:flex;
  justify-content:space-between;
`;

/* ================= PAGE ================= */

export default function ExperiencePage() {

  const [profiles,setProfiles]=useState([]);
  const [selectedProfile,setSelectedProfile]=useState("");
  const [experiences,setExperiences]=useState([]);

  const [modal,setModal]=useState(false);
  const [editingId,setEditingId]=useState(null);

  const [loadingProfiles,setLoadingProfiles]=useState(false);
  const [loadingExperience,setLoadingExperience]=useState(false);
  const [saving,setSaving]=useState(false);
  const [deletingId,setDeletingId]=useState(null);

  const [blocks,setBlocks]=useState([
    { jobTitle:"", company:"",location:"", duration:"", responsibilities:"", skills:"" },
  ]);

  const profilesRef = collection(db,"profiles");
  const expRef = collection(db,"experience");

  /* ---------- LOAD PROFILES ---------- */

  const loadProfiles = async()=>{
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

  /* ---------- LOAD EXPERIENCES ---------- */

  const loadExperiences=async(profileId)=>{
    const user=auth.currentUser;
    if(!user||!profileId) return;

    setLoadingExperience(true);

    const q=query(
      expRef,
      where("profileId","==",profileId),
      where("userId","==",user.uid)
    );

    const snap=await getDocs(q);
    const arr=[];
    snap.forEach(d=>arr.push({id:d.id,...d.data()}));

    setExperiences(arr);
    setLoadingExperience(false);
  };

  useEffect(()=>{
    if(selectedProfile) loadExperiences(selectedProfile);
    else setExperiences([]);
  },[selectedProfile]);

  /* ---------- MODAL ---------- */

  const openNew=()=>{
    if(!selectedProfile)
      return fireSwal("Select Profile","Please select a profile first.","info");

    setEditingId(null);
    setBlocks([
      { jobTitle:"", company:"",location:"", duration:"", responsibilities:"", skills:"" },
    ]);
    setModal(true);
  };

  const openEdit = (item) => {
  setEditingId(item.id);

  const normalized =
    (item.experiences || []).map((exp) => ({
      jobTitle: exp.jobTitle || "",
      company: exp.company || "",
      location: exp.location || "",
      duration: exp.duration || "",
      responsibilities: exp.responsibilities || "",
      skills: exp.skills || "",
    }));

  setBlocks(normalized);

  setModal(true);
};

  /* ---------- FORM ---------- */

  const updateBlock=(i,key,val)=>{
    const copy=[...blocks];
    copy[i][key]=val;
    setBlocks(copy);
  };

  /* ---------- SAVE ---------- */

  const save=async()=>{
    const user=auth.currentUser;
    if(!user) return;

    if(blocks.some(b=>!b.jobTitle.trim()))
      return fireSwal("Missing","Please enter at least one job title.","warning");

    setSaving(true);

    const data={
      userId:user.uid,
      profileId:selectedProfile,
      experiences:blocks,
      updatedAt:serverTimestamp(),
    };

    try{
      if(editingId){
        await updateDoc(doc(db,"experience",editingId),data);
      }else{
        await addDoc(expRef,{
          ...data,
          createdAt:serverTimestamp(),
        });
      }

      setModal(false);
      loadExperiences(selectedProfile);
      fireSwal("Saved","Experience saved.","success");
    }catch(err){
      fireSwal("Error",err.message,"error");
    }

    setSaving(false);
  };

  /* ---------- DELETE ---------- */

  const del=async(id)=>{

    const c=await Swal.fire({
      title:"Delete this experience?",
      icon:"warning",
      showCancelButton:true,
      confirmButtonColor:DarkBlue,
    });

    if(!c.isConfirmed) return;

    setDeletingId(id);

    await deleteDoc(doc(db,"experience",id));

    fireSwal("Deleted","Experience removed.","success");

    setDeletingId(null);
    loadExperiences(selectedProfile);
  };

  /* ================= UI ================= */

  return (
    <Container>
      <HeaderRow>
        <Title>Experience</Title>
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

      <PlusButton onClick={openNew}>
        +
      </PlusButton>

      <List>
        {!selectedProfile && <p>Please select a profile.</p>}
        {loadingExperience && <p>Loading experience...</p>}
        {!loadingExperience && experiences.length===0 && selectedProfile && (
          <p>No Experiences created yet.</p>
        )}

        {experiences.map(item=>(
          <Item key={item.id}>
           <div>
  {item.experiences?.map((exp, i) => (
    <div key={i} style={{ marginBottom: "10px" }}>
      {Object.entries(exp).map(([key, value]) => (
        <p
          key={key}
          style={{
            margin: "4px 0",
            color: "#333",
            fontSize: "0.95rem",
          }}
        >
          <strong style={{ opacity: 0.7 }}>
            {key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (s) => s.toUpperCase())}
            :
          </strong>{" "}
          {value || "-"}
        </p>
      ))}
      <hr style={{ opacity: 0.2 }} />
    </div>
  ))}
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
            <h2>{editingId ? "Edit Experience":"New Experience"}</h2>

            {blocks.map((b,i)=>(
              <div key={i}>
                <Label>Job Title</Label>
                <Input value={b.jobTitle}
                  onChange={(e)=>updateBlock(i,"jobTitle",e.target.value)} />

                <Label>Company</Label>
                <Input value={b.company}
                  onChange={(e)=>updateBlock(i,"company",e.target.value)} />

                   <Label>Location</Label>
                <Input value={b.location}
                  onChange={(e)=>updateBlock(i,"location",e.target.value)} />

                <Label>Duration</Label>
                <Input value={b.duration}
                  onChange={(e)=>updateBlock(i,"duration",e.target.value)} />

                <Label>Responsibilities</Label>
                <TextArea rows={2}
                  value={b.responsibilities}
                  onChange={(e)=>updateBlock(i,"responsibilities",e.target.value)} />

                <Label>Skills</Label>
                <TextArea rows={2}
                  value={b.skills}
                  onChange={(e)=>updateBlock(i,"skills",e.target.value)} />
                <hr/>
              </div>
            ))}

            <ModalFooter>
              <Btn onClick={save} disabled={saving}>
                {saving ? "Saving..." : editingId ? "Update":"Create"}
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