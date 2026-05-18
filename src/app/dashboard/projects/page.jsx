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
  border-radius:10px;
`;

const Label = styled.label`
  font-weight:600;
`;

const Input = styled.input`
  width:100%;
  padding:12px;
  margin-bottom:10px;
  // border-radius:10px;
  outline:none;
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






const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(6px);
`;

const ModalBox = styled.div`
  width: 95%;
  max-width: 620px;
  background: #ffffff;
  border-radius: 18px;
  padding: 2rem;
  box-shadow: 0 20px 60px rgba(0,0,0,0.25);
  animation: pop 0.2s ease;
  height:95%;
  overflow-y:scroll;

  @keyframes pop {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
`;

const ModalTitle = styled.h2`
  margin: 0 0 1.2rem;
  color: ${DarkBlue};
  font-size: 1.6rem;
`;

const Field = styled.div`
  margin-bottom: 1rem;
`;

const FieldLabel = styled.label`
  font-size: 0.85rem;
  font-weight: 600;
  color: #333;
  display: block;
  margin-bottom: 6px;
`;

const FancyInput = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #d0e2ff;
  outline: none;
  transition: 0.2s;

  &:focus {
    border-color: ${DarkBlue};
    box-shadow: 0 0 0 3px rgba(0,86,179,0.1);
  }
`;

const FancyTextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #d0e2ff;
  outline: none;
  resize: none;

  &:focus {
    border-color: ${DarkBlue};
    box-shadow: 0 0 0 3px rgba(0,86,179,0.1);
  }
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

const FileInput = styled.input`
  margin-top: 6px;
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
  const [viewImage, setViewImage] = useState(null);

  const [form, setForm] = useState({
  name: "",
  description: "",
  skillsUsed: "",
  liveLink: "",
  image: null, // file
  imageUrl: "", // cloudinary url
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



const handleImage = (e) => {
  setForm({ ...form, image: e.target.files[0] });
};



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

  // const save=async()=>{
  //   const user=auth.currentUser;
  //   if(!user) return;

  //   if(!form.name.trim())
  //     return fireSwal("Missing","Project name is required.","warning");

  //   setSaving(true);

  //   const data={
  //     ...form,
  //     userId:user.uid,
  //     profileId:selectedProfile,
  //     updatedAt:serverTimestamp(),
  //   };

  //   try{
  //     if(editingId){
  //       await updateDoc(doc(db,"projects",editingId),data);
  //     }else{
  //       await addDoc(projectsRef,{
  //         ...data,
  //         createdAt:serverTimestamp(),
  //       });
  //     }

  //     setModal(false);
  //     loadProjects(selectedProfile);
  //     fireSwal("Saved","Project saved.","success");

  //   }catch(err){
  //     fireSwal("Error",err.message,"error");
  //   }

  //   setSaving(false);
  // };



const save = async () => {
  const user = auth.currentUser;
  if (!user) return;

  if (!form.name.trim())
    return fireSwal("Missing", "Project name is required.", "warning");

  setSaving(true);

  let imageUrl = form.imageUrl || "";

  try {
    // 1. upload image if new file exists
    if (form.image) {
      const blob = await compressImage(form.image, 80);
      imageUrl = await uploadToCloudinary(blob);
    }

    const data = {
      ...form,
      imageUrl,
      userId: user.uid,
      profileId: selectedProfile,
      updatedAt: serverTimestamp(),
    };

    delete data.image; // remove file before firestore

    if (editingId) {
      await updateDoc(doc(db, "projects", editingId), data);
    } else {
      await addDoc(projectsRef, {
        ...data,
        createdAt: serverTimestamp(),
      });
    }

    setModal(false);
    loadProjects(selectedProfile);
    fireSwal("Saved", "Project saved successfully.", "success");
  } catch (err) {
    fireSwal("Error", err.message, "error");
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

    {p.imageUrl && (
      <img
        src={p.imageUrl}
        alt={p.name}
        onClick={() => setViewImage(p.imageUrl)}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "12px",
          cursor: "zoom-in",
          marginBottom: "10px",
        }}
      />
    )}

    <h3>{p.name}</h3>
    <p>{p.description}</p>
    <p><b>Skills:</b> {p.skillsUsed}</p>
  

    {p.liveLink && (
      <p><b>Live Link: </b><a href={p.liveLink} target="_blank" rel="noreferrer" 
      style={{textDecoration:"underline", fontStyle:"italic"}}>
        {p.liveLink}
      </a></p>
    )}
  </div>

  <BtnRow>
    <Btn onClick={() => openEdit(p)}>Edit</Btn>
    <Btn $delete onClick={() => del(p.id)}>
      {deletingId === p.id ? "Deleting..." : "Delete"}
    </Btn>
  </BtnRow>
</Item>
        ))}
      </List>

      {/* {modal && (
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

            <Label>Project Image</Label>
<Input type="file" accept="image/*" onChange={handleImage} />

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
      )} */}


      {modal && (
  <ModalOverlay onClick={() => !saving && setModal(false)}>
    <ModalBox onClick={(e) => e.stopPropagation()}>

      <ModalTitle>
        {editingId ? "Edit Project" : "Create New Project"}
      </ModalTitle>

      {/* NAME */}
      <Field>
        <FieldLabel>Project Name</FieldLabel>
        <FancyInput
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
      </Field>

      {/* DESCRIPTION */}
      <Field>
        <FieldLabel>Description</FieldLabel>
        <FancyTextArea
          rows={3}
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />
      </Field>

      {/* SKILLS */}
      <Field>
        <FieldLabel>Skills Used</FieldLabel>
        <FancyInput
          value={form.skillsUsed}
          onChange={(e) =>
            setForm({ ...form, skillsUsed: e.target.value })
          }
        />
      </Field>

      {/* LIVE LINK */}
      <Field>
        <FieldLabel>Live Link</FieldLabel>
        <FancyInput
          value={form.liveLink}
          onChange={(e) =>
            setForm({ ...form, liveLink: e.target.value })
          }
        />
      </Field>

      {/* IMAGE UPLOAD */}
      <Field>
        <FieldLabel>Project Image</FieldLabel>
        <FileInput
          type="file"
          accept="image/*"
          onChange={handleImage}
        />

        {/* IMAGE PREVIEW */}
        <ImagePreview>
          {form.image ? (
            <PreviewImg
              src={URL.createObjectURL(form.image)}
            />
          ) : form.imageUrl ? (
            <PreviewImg src={form.imageUrl} />
          ) : (
            <span style={{ color: "#888", fontSize: "0.9rem" }}>
              No image selected
            </span>
          )}
        </ImagePreview>
      </Field>

      {/* BUTTONS */}
      <ModalFooter>
        <Btn onClick={save} disabled={saving}>
          {saving ? "Saving..." : editingId ? "Update" : "Create"}
        </Btn>

        <Btn $delete onClick={() => setModal(false)}>
          Cancel
        </Btn>
      </ModalFooter>

    </ModalBox>
  </ModalOverlay>
)}


      {viewImage && (
  <ModalBackground onClick={() => setViewImage(null)}>
    <img
      src={viewImage}
      alt="project"
      style={{
        maxWidth: "90%",
        maxHeight: "90%",
        borderRadius: "12px",
      }}
    />
  </ModalBackground>
)}
    </Container>
  );
}