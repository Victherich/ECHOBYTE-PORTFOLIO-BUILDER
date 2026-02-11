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
} from "firebase/firestore";

// Theme colors
const DarkBlue = "#0056b3";
const White = "#FFFFFF";

const Container = styled.div`
//   padding: 2rem;
  color: ${DarkBlue};
  position: relative;
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

const ProfilesList = styled.div`
  margin-top: 2.5rem;
`;

const ProfileItem = styled.div`
  background: ${White};
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid rgba(0, 86, 179, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  box-shadow: 0 4px 10px rgba(0, 86, 179, 0.1);

  @media(max-width:428px){
  flex-direction:column;
  gap:10px;
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

  ${(props) =>
    props.$delete &&
    `
      background: #d9534f;
    `}

  ${(props) =>
    props.$small &&
    `
      padding: 6px 10px;
      font-size: 0.85rem;
    `}
`;


/* --------------------- MODAL ---------------------- */
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
`;

const ModalCard = styled.div`
  width: 420px;
  background: ${White};
  padding: 2rem;
  border-radius: 14px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.25);
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
  font-size: 1rem;
  margin-top: 6px;

  &:focus {
    border-color: ${DarkBlue};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #c5d9f6;
  font-size: 1rem;
  margin-top: 6px;

  &:focus {
    border-color: ${DarkBlue};
  }
`;

const ModalFooter = styled.div`
  margin-top: 1.8rem;
  display: flex;
  justify-content: space-between;
`;

/* -------------------------------------------------- */

export default function ProfilePage() {

  // FIX: Must be an array, not an object
  const themeDesigns = [
    { id: "1", name: "Default" },
    { id: "2", name: "Blue Theme" },
    { id: "3", name: "Dark Mode" },
    { id: "4", name: "Gold Premium" },
  ];

  const user = auth.currentUser;

  const [profiles, setProfiles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("1");
  const [editingId, setEditingId] = useState(null);

  const profilesRef = user
    ? collection(db, "users", user.uid, "profiles")
    : null;

  // Load profiles
  const loadProfiles = async () => {
    if (!profilesRef) return;

    const arr = [];
    const docsSnap = await getDocs(profilesRef);

    docsSnap.forEach((d) => arr.push({ id: d.id, ...d.data() }));
    setProfiles(arr);
  };

  useEffect(() => {
    loadProfiles();
  }, []);

  // Open modal for new profile
  const openNewModal = () => {
    setModalOpen(true);
    setEditingId(null);
    setTitle("");
    setTheme("1");
  };

  // Open modal for editing
  const openEditModal = (p) => {
    setModalOpen(true);
    setEditingId(p.id);
    setTitle(p.title);
    setTheme(p.theme);
  };

  // Save or Update
  const saveProfile = async () => {
    if (!title.trim()) {
      return Swal.fire("Missing Field", "Profile title is required.", "warning");
    }

    if (editingId) {
      const ref = doc(db, "users", user.uid, "profiles", editingId);
      await updateDoc(ref, { title, theme });
      Swal.fire("Updated!", "Profile updated successfully.", "success");
    } else {
      await addDoc(profilesRef, { title, theme, createdAt: Date.now() });
      Swal.fire("Created!", "New profile added.", "success");
    }

    setModalOpen(false);
    loadProfiles();
  };

  // Delete profile
  const deleteProfile = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This profile will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!confirm.isConfirmed) return;

    await deleteDoc(doc(db, "users", user.uid, "profiles", id));
    Swal.fire("Deleted!", "Profile removed.", "success");
    loadProfiles();
  };

  return (
    <Container>
      <Title>Manage Profiles</Title>

      {/* Floating + Button */}
      <PlusButton onClick={openNewModal}>+</PlusButton>

      {/* LIST */}
      <ProfilesList>
        <h2>Your Profiles</h2>
<br/>
        {profiles.length === 0 && (
          <p style={{ opacity: 0.7 }}>No profiles created yet.</p>
        )}

        {profiles.map((p) => (
          <ProfileItem key={p.id}>
            <div>
              <strong>{p.title}</strong>
              <p style={{ opacity: 0.6, margin: 0 }}>
                Theme: {themeDesigns.find((t) => t.id === p.theme)?.name}
              </p>
            </div>

            <BtnRow>
  <Btn $small onClick={() => openEditModal(p)}>Edit</Btn>
<Btn $small $delete onClick={() => deleteProfile(p.id)}>Delete</Btn>

            </BtnRow>
          </ProfileItem>
        ))}
      </ProfilesList>

      {/* ------------------ MODAL ------------------ */}
      {modalOpen && (
        <ModalBackground>
          <ModalCard>
            <h2 style={{ marginBottom: "1rem" }}>
              {editingId ? "Edit Profile" : "Create New Profile"}
            </h2>

            <Label>Profile Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter profile title"
            />

            <Label>Theme Design</Label>
            <Select value={theme} onChange={(e) => setTheme(e.target.value)}>
              {themeDesigns.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </Select>

            <ModalFooter>
            <Btn onClick={saveProfile}>{editingId ? "Update" : "Create"}</Btn>
<Btn $delete onClick={() => setModalOpen(false)}>Cancel</Btn>

            </ModalFooter>
          </ModalCard>
        </ModalBackground>
      )}
    </Container>
  );
}
