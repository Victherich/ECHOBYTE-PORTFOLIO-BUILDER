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
  border:none;
  cursor:pointer;
  ${(p)=>p.$delete && `background:#d9534f;`}
`;

/* ---------- MODAL ---------- */

const ModalBackground = styled.div`
  position: fixed;
  inset:0;
  background:rgba(0,0,0,0.45);
  display:flex;
  justify-content:center;
  align-items:center;
`;

const ModalCard = styled.div`
  background:${White};
  width:95%;
  max-width:500px;
  padding:2rem;
  border-radius:10px;
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

export default function EducationPage(){

  const [profiles,setProfiles]=useState([]);
  const [selectedProfile,setSelectedProfile]=useState("");
  const [educations,setEducations]=useState([]);

  const [modal,setModal]=useState(false);
  const [editingId,setEditingId]=useState(null);

  const [loadingProfiles,setLoadingProfiles]=useState(false);
  const [loadingEducation,setLoadingEducation]=useState(false);
  const [saving,setSaving]=useState(false);
  const [deletingId,setDeletingId]=useState(null);

  const [form,setForm]=useState({
    school:"",
    graduationYear:"",
    certificate:"",
  });

  const profilesRef = collection(db,"profiles");
  const eduRef = collection(db,"education");

  /* LOAD PROFILES */
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
      fireSwal("No Profiles","Create profile first.","info");
    }
  };

  useEffect(()=>{
    const unsub=auth.onAuthStateChanged(u=>{
      if(u) loadProfiles();
    });
    return ()=>unsub();
  },[]);

  /* LOAD EDUCATION */
  const loadEducation=async(profileId)=>{
    const user=auth.currentUser;
    if(!user||!profileId) return;

    setLoadingEducation(true);

    const q=query(
      eduRef,
      where("profileId","==",profileId),
      where("userId","==",user.uid)
    );

    const snap=await getDocs(q);
    const arr=[];
    snap.forEach(d=>arr.push({id:d.id,...d.data()}));

    setEducations(arr);
    setLoadingEducation(false);
  };

  useEffect(()=>{
    if(selectedProfile) loadEducation(selectedProfile);
    else setEducations([]);
  },[selectedProfile]);

  /* MODAL */
  const openNew=()=>{
    if(!selectedProfile)
      return fireSwal("Select Profile","Select profile first.","info");

    setEditingId(null);
    setForm({school:"",graduationYear:"",certificate:""});
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

    if(!form.school.trim())
      return fireSwal("Missing","School required.","warning");

    setSaving(true);

    const data={
      ...form,
      userId:user.uid,
      profileId:selectedProfile,
      updatedAt:serverTimestamp(),
    };

    try{
      if(editingId){
        await updateDoc(doc(db,"education",editingId),data);
      }else{
        await addDoc(eduRef,{
          ...data,
          createdAt:serverTimestamp(),
        });
      }

      setModal(false);
      loadEducation(selectedProfile);
      fireSwal("Saved","Education saved.","success");
    }catch(err){
      fireSwal("Error",err.message,"error");
    }

    setSaving(false);
  };

  /* DELETE */

  const del=async(id)=>{
    const c=await Swal.fire({
      title:"Delete this education?",
      icon:"warning",
      showCancelButton:true,
      confirmButtonColor:DarkBlue,
    });

    if(!c.isConfirmed) return;

    setDeletingId(id);

    await deleteDoc(doc(db,"education",id));

    fireSwal("Deleted","Education removed.","success");

    setDeletingId(null);
    loadEducation(selectedProfile);
  };

  /* UI */

  return (
    <Container>
      <HeaderRow>
        <Title>Education</Title>
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
        {loadingEducation && <p>Loading education...</p>}
        {!loadingEducation && educations.length===0 && selectedProfile && (
          <p>No Education created yet.</p>
        )}

        {educations.map(e=>(
          <Item key={e.id}>
            <div>
              <b>{e.school}</b>
              <p>{e.certificate}</p>
              <p>Graduation Year: {e.graduationYear}</p>
            </div>

            <BtnRow>
              <Btn onClick={()=>openEdit(e)}>Edit</Btn>
              <Btn $delete onClick={()=>del(e.id)}>
                {deletingId===e.id ? "Deleting..." : "Delete"}
              </Btn>
            </BtnRow>
          </Item>
        ))}
      </List>

      {modal && (
        <ModalBackground onClick={()=>!saving && setModal(false)}>
          <ModalCard onClick={(e)=>e.stopPropagation()}>

            <h2>{editingId ? "Edit Education":"New Education"}</h2>

            <Label>School Name</Label>
            <Input
              value={form.school}
              disabled={saving}
              onChange={(e)=>setForm({...form,school:e.target.value})}
            />

            <Label>Graduation Year</Label>
            <Input
              value={form.graduationYear}
              disabled={saving}
              onChange={(e)=>setForm({...form,graduationYear:e.target.value})}
            />

            <Label>Certificate Title</Label>
            <Input
              value={form.certificate}
              disabled={saving}
              onChange={(e)=>setForm({...form,certificate:e.target.value})}
            />

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