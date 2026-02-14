

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

// Theme colors
const DarkBlue = "#0056b3";
const White = "#FFFFFF";

const Container = styled.div`
  margin-top: 3rem;
  color: ${DarkBlue};
  position: relative;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
`;

const PlusButton = styled.button`
  padding: 5px 20px;
  margin-top: 10px;
  border-radius: 20px;
  font-size: 1rem;
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

/* ---------------- MODAL ---------------- */

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.45);
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
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
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
  const themeDesigns = [
    { id: "1", name: "Default" },
    { id: "2", name: "Blue Theme" },
    { id: "3", name: "Dark Mode" },
    { id: "4", name: "Gold Premium" },
  ];

  const [profiles, setProfiles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("1");
  const [editingId, setEditingId] = useState(null);

  const profilesRef = collection(db, "profiles");
  const [loading, setLoading] = useState(false);

  // Load profiles
  const loadProfiles = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(profilesRef, where("userId", "==", user.uid));
    const snapshot = await getDocs(q);

    const arr = [];
    snapshot.forEach((doc) =>
      arr.push({ id: doc.id, ...doc.data() })
    );

    setProfiles(arr);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) loadProfiles();
    });

    return () => unsubscribe();
  }, []);

  const openNewModal = () => {
    setModalOpen(true);
    setEditingId(null);
    setTitle("");
    setTheme("1");
  };

  const openEditModal = (p) => {
    setModalOpen(true);
    setEditingId(p.id);
    setTitle(p.title);
    setTheme(p.theme);
  };

  const saveProfile = async () => {
    const user = auth.currentUser;
    if (!user) return;

    if (!title.trim()) {
      return Swal.fire("Missing Field", "Profile title is required.", "warning");
    }

    setLoading(true);
    // const loadingAlert=Swal.showLoading();

    if (editingId) {
      await updateDoc(doc(db, "profiles", editingId), {
        title,
        theme,
      });

      Swal.fire("Updated!", "Profile updated successfully.", "success");
   } else {
  // --- Extract username from email ---
  const email = user.email || "";
  const username = email.split("@")[0];

  // --- Find next profile number ---
  const q = query(profilesRef, where("userId", "==", user.uid));
  const snapshot = await getDocs(q);

  let highestNumber = 0;

  snapshot.forEach((doc) => {
    const data = doc.data();
    if (data.profileNumber && data.profileNumber > highestNumber) {
      highestNumber = data.profileNumber;
    }
  });

  const nextProfileNumber = highestNumber + 1;

  // --- Create profile ---
  await addDoc(profilesRef, {
    userId: user.uid,
    username, // extracted from email
    profileNumber: nextProfileNumber,
    title,
    theme,
    createdAt: serverTimestamp(),
  });

  Swal.fire("Created!", "New profile added.", "success");
}

    setModalOpen(false);
    setLoading(false);
    loadProfiles();
  
  };






const deleteProfile = async (profileId) => {
  const confirm = await Swal.fire({
    title: "Delete profile permanently?",
    html: `
      <b>This will delete:</b><br/>
      • Profile<br/>
      • Summary<br/>
      • Biography<br/>
      • Skills<br/>
      • Education<br/>
      • Experience<br/>
      • Projects<br/>
      • Certifications<br/>
      • Personal Info<br/>
      • Links<br/><br/>
      <span style="color:red">This action cannot be undone.</span>
    `,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete everything",
    confirmButtonColor: "#d33",
  });

  if (!confirm.isConfirmed) return;

  // ✅ SHOW LOADING ALERT PROPERLY
  Swal.fire({
    title: "Deleting profile...",
    text: "Please wait while we remove everything.",
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    const collectionsToDelete = [
      "certifications",
      "links",
      "summaries",
      "skills",
      "education",
      "experience",
      "projects",
      "biography",
      "personalInfo",
    ];

    // delete all related entries
    for (const collectionName of collectionsToDelete) {
      const q = query(
        collection(db, collectionName),
        where("profileId", "==", profileId)
      );

      const snap = await getDocs(q);

      const deletePromises = [];
      snap.forEach((d) => {
        deletePromises.push(
          deleteDoc(doc(db, collectionName, d.id))
        );
      });

      await Promise.all(deletePromises);
    }

    // delete profile last
    await deleteDoc(doc(db, "profiles", profileId));

    Swal.fire(
      "Deleted!",
      "Profile and all related data were removed.",
      "success"
    );

    loadProfiles();
  } catch (error) {
    console.error(error);

    Swal.fire(
      "Error",
      "Something went wrong while deleting.",
      "error"
    );
  }
};





  return (
    <Container>
      <Title>Manage Profiles</Title>
      <p>You can create multiple portfolios under your account.</p>

      <PlusButton onClick={openNewModal}>+ Add Profile</PlusButton>

      <ProfilesList>
        <h2>Your Profiles</h2>
        <br />

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
              <p>{p.id}</p>
           <button
  onClick={() => window.open(`/p/${p.username}${p.profileNumber}`, "_blank")}
  style={{
    padding: "6px 12px",
    background: "#0056b3",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>
  Preview
</button>
            </div>

            <BtnRow>
              <Btn $small onClick={() => openEditModal(p)}>
                Edit
              </Btn>
              <Btn $small $delete onClick={() => deleteProfile(p.id)}>
                Delete
              </Btn>
            </BtnRow>
          </ProfileItem>
        ))}
      </ProfilesList>

      {modalOpen && (
        <ModalBackground>
          <ModalCard>
            <h2 style={{ marginBottom: "1rem" }}>
              {editingId ? "Edit Profile" : "Create New Profile"}
            </h2>

            <Label>Profile Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value.toUpperCase())}
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

              <Btn onClick={saveProfile}>
                {editingId ? "Update" : "Create"}
                {loading&&"Loading..."}
              </Btn>
              <Btn $delete onClick={() => setModalOpen(false)}>
                Cancel
              </Btn>
            </ModalFooter>
          </ModalCard>
        </ModalBackground>
      )}
    </Container>
  );
}
