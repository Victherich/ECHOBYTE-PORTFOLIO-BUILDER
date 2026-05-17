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
  display:flex;
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
`;

const Btn = styled.button`
  padding:8px 15px;
  background:${DarkBlue};
  color:white;
  border-radius:8px;
  cursor:pointer;
  border:none;
  margin-top:10px;
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

export default function ProjectsPage(){

  const [profiles,setProfiles]=useState([]);
  const [selectedProfile,setSelectedProfile]=useState("");
  const [projects,setProjects]=useState([]);

  const [modal,setModal]=useState(false);
  const [editingId,setEditingId]=useState(null);

  const [loadingProjects,setLoadingProjects]=useState(false);
  const [saving,setSaving]=useState(false);
  const [deletingId,setDeletingId]=useState(null);

  const [form,setForm]=useState({
    name:"",
    description:"",
    skillsUsed:"",
    liveLink:"",
  });

  const profilesRef = collection(db,"profiles");
  const projectsRef = collection(db,"projects");

  /* LOAD PROFILES */
  const loadProfiles = async ()=>{
    const user=auth.currentUser;
    if(!user) return;

    const q=query(profilesRef,where("userId","==",user.uid));
    const snap=await getDocs(q);

    const arr=[];
    snap.forEach(d=>arr.push({id:d.id,...d.data()}));
    setProfiles(arr);

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

  /* LOAD PROJECTS */
  const loadProjects=async(profileId)=>{
    const user=auth.currentUser;
    if(!user||!profileId) return;

    setLoadingProjects(true);

    const q=query(
      projectsRef,
      where("profileId","==",profileId),
      where("userId","==",user.uid)
    );

    const snap=await getDocs(q);

    const arr=[];
    snap.forEach(d=>arr.push({id:d.id,...d.data()}));

    setProjects(arr);
    setLoadingProjects(false);
  };

  useEffect(()=>{
    if(selectedProfile) loadProjects(selectedProfile);
    else setProjects([]);
  },[selectedProfile]);

  /* MODAL */

  const openNew=()=>{
    if(!selectedProfile)
      return fireSwal("Select Profile","Please select a profile first.","info");

    setEditingId(null);
    setForm({
      name:"",
      description:"",
      skillsUsed:"",
      liveLink:"",
    });
    setModal(true);
  };

  const openEdit=(item)=>{
    setEditingId(item.id);
    setForm(item);
    setModal(true);
  };

  /* SAVE */

  const save=async()=>{
    const user=auth.currentUser;
    if(!user) return;

    if(!form.name.trim())
      return fireSwal("Missing","Project name is required.","warning");

    setSaving(true);

    const data={
      ...form,
      userId:user.uid,
      profileId:selectedProfile,
      updatedAt:serverTimestamp(),
    };

    try{
      if(editingId){
        await updateDoc(doc(db,"projects",editingId),data);
      }else{
        await addDoc(projectsRef,{
          ...data,
          createdAt:serverTimestamp(),
        });
      }

      setModal(false);
      loadProjects(selectedProfile);
      fireSwal("Saved","Project saved.","success");

    }catch(err){
      fireSwal("Error",err.message,"error");
    }

    setSaving(false);
  };

  /* DELETE */

  const del=async(id)=>{

    const c=await Swal.fire({
      title:"Delete this project?",
      icon:"warning",
      showCancelButton:true,
      confirmButtonColor:DarkBlue,
    });

    if(!c.isConfirmed) return;

    setDeletingId(id);

    await deleteDoc(doc(db,"projects",id));

    fireSwal("Deleted","Project removed.","success");

    setDeletingId(null);
    loadProjects(selectedProfile);
  };

  /* ================= UI ================= */

  return (
    <Container>
      <HeaderRow>
        <Title>Projects</Title>
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
        {loadingProjects && <p>Loading projects...</p>}
         {!loadingProjects && projects.length===0 && selectedProfile && (
          <p>No Education created yet.</p>
        )}

        {projects.map((p)=>(
          <Item key={p.id}>
            <div>
              {Object.entries(p)
                .filter(([key]) =>
                  !["id","userId","profileId","createdAt","updatedAt"].includes(key)
                )
                .map(([key,value])=>(
                  <p key={key}>
                    <strong>
                      {key.replace(/([A-Z])/g," $1").replace(/^./,s=>s.toUpperCase())}:
                    </strong>{" "}
                    {value || "-"}
                  </p>
                ))}
            </div>

            <BtnRow>
              <Btn onClick={()=>openEdit(p)}>Edit</Btn>
              <Btn $delete onClick={()=>del(p.id)}>
                {deletingId===p.id ? "Deleting..." : "Delete"}
              </Btn>
            </BtnRow>
          </Item>
        ))}
      </List>

      {modal && (
        <ModalBackground onClick={()=>!saving && setModal(false)}>
          <ModalCard onClick={(e)=>e.stopPropagation()}>

            <h2>{editingId ? "Edit Project":"New Project"}</h2>

            <Label>Project Name</Label>
            <Input
              value={form.name}
              onChange={(e)=>setForm({...form,name:e.target.value})}
            />

            <Label>Description</Label>
            <TextArea
              rows={3}
              value={form.description}
              onChange={(e)=>setForm({...form,description:e.target.value})}
            />

            <Label>Skills Used</Label>
            <Input
              value={form.skillsUsed}
              onChange={(e)=>setForm({...form,skillsUsed:e.target.value})}
            />

            <Label>Live Link (enter project live link , must start with https://)</Label>
            <Input
              value={form.liveLink}
              onChange={(e)=>setForm({...form,liveLink:e.target.value})}
            />

            <ModalFooter>
              <Btn onClick={save} disabled={saving}>
                {saving ? "Saving..." : editingId ? "Update" : "Create"}
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