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

// // Theme colors
// const DarkBlue = "#0056b3";
// const White = "#FFFFFF";

// const Container = styled.div`

// margin-top:3rem;
//   color: ${DarkBlue};
//   position: relative;
// `;

// const Title = styled.h1`
//   font-size: 2rem;
//   font-weight: 700;
// `;

// const PlusButton = styled.button`
// padding:5px 20px;
// margin-top:10px;
//   border-radius: 20px;
//   font-size: 1rem;
//   background: ${DarkBlue};
//   color: white;
//   border: none;
//   box-shadow: 0 6px 15px rgba(0, 86, 179, 0.3);
//   cursor: pointer;
//   transition: 0.3s;

//   &:hover {
//     background: #00448a;
//   }
// `;

// const ProfilesList = styled.div`
//   margin-top: 2.5rem;
// `;

// const ProfileItem = styled.div`
//   background: ${White};
//   padding: 1rem;
//   border-radius: 12px;
//   border: 1px solid rgba(0, 86, 179, 0.15);
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 1rem;
//   box-shadow: 0 4px 10px rgba(0, 86, 179, 0.1);

//   @media(max-width:428px){
//   flex-direction:column;
//   gap:10px;
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

//   ${(props) =>
//     props.$delete &&
//     `
//       background: #d9534f;
//     `}

//   ${(props) =>
//     props.$small &&
//     `
//       padding: 6px 10px;
//       font-size: 0.85rem;
//     `}
// `;


// /* --------------------- MODAL ---------------------- */
// const ModalBackground = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   background: rgba(0,0,0,0.45);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 50;
// `;

// const ModalCard = styled.div`
//   width: 420px;
//   background: ${White};
//   padding: 2rem;
//   border-radius: 14px;
//   box-shadow: 0 8px 25px rgba(0,0,0,0.25);
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
//   font-size: 1rem;
//   margin-top: 6px;

//   &:focus {
//     border-color: ${DarkBlue};
//   }
// `;

// const Select = styled.select`
//   width: 100%;
//   padding: 12px;
//   border-radius: 10px;
//   border: 1px solid #c5d9f6;
//   font-size: 1rem;
//   margin-top: 6px;

//   &:focus {
//     border-color: ${DarkBlue};
//   }
// `;

// const ModalFooter = styled.div`
//   margin-top: 1.8rem;
//   display: flex;
//   justify-content: space-between;
// `;

// /* -------------------------------------------------- */

// export default function ProfilePage() {

//   // FIX: Must be an array, not an object
//   const themeDesigns = [
//     { id: "1", name: "Default" },
//     { id: "2", name: "Blue Theme" },
//     { id: "3", name: "Dark Mode" },
//     { id: "4", name: "Gold Premium" },
//   ];

//   const user = auth.currentUser;

//   const [profiles, setProfiles] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [title, setTitle] = useState("");
//   const [theme, setTheme] = useState("1");
//   const [editingId, setEditingId] = useState(null);

//   const profilesRef = user
//     ? collection(db, "users", user.uid, "profiles")
//     : null;

//   // Load profiles
//   const loadProfiles = async () => {
//     if (!profilesRef) return;

//     const arr = [];
//     const docsSnap = await getDocs(profilesRef);

//     docsSnap.forEach((d) => arr.push({ id: d.id, ...d.data() }));
//     setProfiles(arr);
//   };

//   useEffect(() => {
//     loadProfiles();
//   }, []);

//   // Open modal for new profile
//   const openNewModal = () => {
//     setModalOpen(true);
//     setEditingId(null);
//     setTitle("");
//     setTheme("1");
//   };

//   // Open modal for editing
//   const openEditModal = (p) => {
//     setModalOpen(true);
//     setEditingId(p.id);
//     setTitle(p.title);
//     setTheme(p.theme);
//   };

//   // Save or Update
//   const saveProfile = async () => {
//     if (!title.trim()) {
//       return Swal.fire("Missing Field", "Profile title is required.", "warning");
//     }

//     if (editingId) {
//       const ref = doc(db, "users", user.uid, "profiles", editingId);
//       await updateDoc(ref, { title, theme });
//       Swal.fire("Updated!", "Profile updated successfully.", "success");
//     } else {
//       await addDoc(profilesRef, { title, theme, createdAt: Date.now() });
//       Swal.fire("Created!", "New profile added.", "success");
//     }

//     setModalOpen(false);
//     loadProfiles();
//   };

//   // Delete profile
//   const deleteProfile = async (id) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "This profile will be permanently deleted.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Delete",
//     });

//     if (!confirm.isConfirmed) return;

//     await deleteDoc(doc(db, "users", user.uid, "profiles", id));
//     Swal.fire("Deleted!", "Profile removed.", "success");
//     loadProfiles();
//   };

//   return (
//     <Container>
//       <Title>Manage Profiles</Title>
// <p>You can create or add multiple profiles; meaning multiple portfolios</p>
//       {/* Floating + Button */}
//       <PlusButton onClick={openNewModal}>+ Add Profile</PlusButton>

//       {/* LIST */}
//       <ProfilesList>
//         <h2>Your Profiles</h2> 

// <br/>
//         {profiles.length === 0 && (
//           <p style={{ opacity: 0.7 }}>No profiles created yet.</p>
//         )}

//         {profiles.map((p) => (
//           <ProfileItem key={p.id}>
//             <div>
//               <strong>{p.title}</strong>
//               <p style={{ opacity: 0.6, margin: 0 }}>
//                 Theme: {themeDesigns.find((t) => t.id === p.theme)?.name}
//               </p>
//             </div>

//             <BtnRow>
//   <Btn $small onClick={() => openEditModal(p)}>Edit</Btn>
// <Btn $small $delete onClick={() => deleteProfile(p.id)}>Delete</Btn>

//             </BtnRow>
//           </ProfileItem>
//         ))}
//       </ProfilesList>

//       {/* ------------------ MODAL ------------------ */}
//       {modalOpen && (
//         <ModalBackground>
//           <ModalCard>
//             <h2 style={{ marginBottom: "1rem" }}>
//               {editingId ? "Edit Profile" : "Create New Profile"}
//             </h2>

//             <Label>Profile Title</Label>
//             <Input
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="Enter profile title"
//             />

//             <Label>Theme Design</Label>
//             <Select value={theme} onChange={(e) => setTheme(e.target.value)}>
//               {themeDesigns.map((t) => (
//                 <option key={t.id} value={t.id}>
//                   {t.name}
//                 </option>
//               ))}
//             </Select>

//             <ModalFooter>
//             <Btn onClick={saveProfile}>{editingId ? "Update" : "Create"}</Btn>
// <Btn $delete onClick={() => setModalOpen(false)}>Cancel</Btn>

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

  const deleteProfile = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This profile will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!confirm.isConfirmed) return;

    await deleteDoc(doc(db, "profiles", id));
    Swal.fire("Deleted!", "Profile removed.", "success");
    loadProfiles();
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
