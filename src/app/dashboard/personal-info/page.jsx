




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
//   serverTimestamp,
// } from "firebase/firestore";

// /* ---------------- THEME ---------------- */
// const DarkBlue = "#0056b3";
// const White = "#FFFFFF";

// /* ---------------- STYLES ---------------- */
// const Container = styled.div`
//   color: ${DarkBlue};
//   position: relative;
// `;

// const HeaderRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: flex-start;
//   margin-top: 1rem;
//   flex-direction: column;

//   @media (max-width: 480px) {
//     flex-direction: column;
//     align-items: flex-start;
//     gap: 10px;
//   }
// `;

// const Title = styled.h1`
//   font-size: 2rem;
//   font-weight: 700;
// `;

// const ProfileSelect = styled.select`
//   padding: 10px 14px;
//   border-radius: 10px;
//   border: 1px solid #c5d9f6;
//   font-size: 1rem;
//   cursor: pointer;
//   outline: none;

//   &:focus {
//     border-color: ${DarkBlue};
//   }
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
//   transition: 0.3s;

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
//   align-items: flex-start;
//   margin-bottom: 1rem;
//   box-shadow: 0 4px 10px rgba(0, 86, 179, 0.1);

//   @media (max-width: 428px) {
//     flex-direction: column;
//     gap: 10px;
//   }
// `;

// const InfoContent = styled.div`
//   flex: 1;
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
//   width: 90%;
//   max-width: 550px;
//   background: ${White};
//   padding: 2rem;
//   border-radius: 14px;
//   height: 90vh;
//   overflow-y: auto;
//   box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
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

// const ModalFooter = styled.div`
//   margin-top: 1.8rem;
//   display: flex;
//   justify-content: space-between;
// `;

// /* ---------------- COMPONENT ---------------- */

// export default function PersonalInfoPage() {
//   const [profiles, setProfiles] = useState([]);
//   const [selectedProfile, setSelectedProfile] = useState("");
//   const [personalInfos, setPersonalInfos] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingId, setEditingId] = useState(null);

//   const [personalInfo, setPersonalInfo] = useState({
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     nickName: "",
//     email: "",
//     phone: "",
//     dateOfBirth: "",
//     location: "",
//     gender: "",
//     languages: "",
//     nationality: "",
//     hobbies: "",
//     personalTraits: "",
//   });

//   const profilesRef = collection(db, "profiles");
//   const personalInfoRef = collection(db, "personalInfo");

//   /* ---------------- LOAD PROFILES ---------------- */
//   const loadProfiles = async () => {
//     const user = auth.currentUser;
//     if (!user) return;

//     const q = query(profilesRef, where("userId", "==", user.uid));
//     const snap = await getDocs(q);
//     const arr = [];
//     snap.forEach((d) => arr.push({ id: d.id, ...d.data() }));
//     setProfiles(arr);
//   };

//   useEffect(() => {
//     const unsub = auth.onAuthStateChanged((user) => {
//       if (user) loadProfiles();
//     });
//     return () => unsub();
//   }, []);

//   /* ---------------- LOAD PERSONAL INFO ---------------- */
//   const loadPersonalInfos = async (profileId) => {
//     const user = auth.currentUser;
//     if (!user || !profileId) return;

//     const q = query(
//       personalInfoRef,
//       where("profileId", "==", profileId),
//       where("userId", "==", user.uid)
//     );
//     const snap = await getDocs(q);
//     const arr = [];
//     snap.forEach((d) => arr.push({ id: d.id, ...d.data() }));
//     setPersonalInfos(arr);
//   };

//   useEffect(() => {
//     if (selectedProfile) loadPersonalInfos(selectedProfile);
//     else setPersonalInfos([]);
//   }, [selectedProfile]);

//   /* ---------------- MODAL ACTIONS ---------------- */
//   const openNewModal = () => {
//     if (!selectedProfile)
//       return Swal.fire("Select a profile first.");
//     if (personalInfos.length > 0)
//       return Swal.fire("Only one personal info per profile.");

//     setEditingId(null);
//     setPersonalInfo({
//       firstName: "",
//       middleName: "",
//       lastName: "",
//       nickName: "",
//       email: "",
//       phone: "",
//       dateOfBirth: "",
//       location: "",
//       gender: "",
//       languages: "",
//       nationality: "",
//       hobbies: "",
//       personalTraits: "",
//     });
//     setModalOpen(true);
//   };

//   const openEditModal = (item) => {
//     setEditingId(item.id);
//     setPersonalInfo(item);
//     setModalOpen(true);
//   };

//   const savePersonalInfo = async () => {
//     const user = auth.currentUser;
//     if (!user || !selectedProfile)
//       return Swal.fire("Select a profile first.");

//     const data = {
//       ...personalInfo,
//       userId: user.uid,            // Important for rules
//       profileId: selectedProfile,  // Important for querying
//       updatedAt: serverTimestamp(),
//     };

//     try {
//       if (editingId) {
//         await updateDoc(doc(db, "personalInfo", editingId), data);
//       } else {
//         await addDoc(personalInfoRef, {
//           ...data,
//           createdAt: serverTimestamp(),
//         });
//       }

//       Swal.fire("Saved!", "", "success");
//       setModalOpen(false);
//       loadPersonalInfos(selectedProfile);
//     } catch (err) {
//       Swal.fire("Error", err.message, "error");
//     }
//   };

//   /* ---------------- DELETE ---------------- */
//   const deleteInfo = async (id) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "This personal info will be permanently deleted.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: DarkBlue,
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "Cancel",
//     });

//     if (result.isConfirmed) {
//       try {
//         await deleteDoc(doc(db, "personalInfo", id));
//         Swal.fire("Deleted!", "Personal info has been deleted.", "success");
//         loadPersonalInfos(selectedProfile);
//       } catch (err) {
//         Swal.fire("Error", err.message, "error");
//       }
//     }
//   };

//   /* ---------------- RENDER ---------------- */
//   return (
//     <Container>
//       <HeaderRow>
//         <Title>Personal Information</Title>
//         <ProfileSelect
//           value={selectedProfile}
//           onChange={(e) => setSelectedProfile(e.target.value)}
//         >
//           <option value="">Select Profile...</option>
//           {profiles.map((p) => (
//             <option key={p.id} value={p.id}>
//               {p.title}
//             </option>
//           ))}
//         </ProfileSelect>
//       </HeaderRow>

//       <PlusButton onClick={openNewModal}>+</PlusButton>

//       <List>
//         {!selectedProfile && <p>Please select a profile.</p>}

//         {personalInfos.map((item) => (
//           <Item key={item.id}>
//             <InfoContent>
//               <strong style={{ fontSize: "1.1rem" }}>
//                 {item.firstName} {item.lastName}
//               </strong>

//               {Object.entries(item)
//                 .filter(
//                   ([key]) =>
//                     !["id", "userId", "profileId", "createdAt", "updatedAt"].includes(
//                       key
//                     )
//                 )
//                 .map(([key, value]) => (
//                   <p
//                     key={key}
//                     style={{ margin: "4px 0", color: "#333", fontSize: "0.95rem" }}
//                   >
//                     <strong style={{ opacity: 0.7 }}>
//                       {key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}:
//                     </strong>{" "}
//                     {value || "-"}
//                   </p>
//                 ))}
//             </InfoContent>

//             <BtnRow>
//               <Btn onClick={() => openEditModal(item)}>Edit</Btn>
//               <Btn $delete onClick={() => deleteInfo(item.id)}>Delete</Btn>
//             </BtnRow>
//           </Item>
//         ))}
//       </List>

//       {modalOpen && (
//         <ModalBackground>
//           <ModalCard>
//             <h2>{editingId ? "Edit" : "New"} Personal Info</h2>

//             {Object.entries(personalInfo)
//               .filter(
//                 ([key]) =>
//                   !["id", "userId", "profileId", "createdAt", "updatedAt"].includes(
//                     key
//                   )
//               )
//               .map(([key, value]) => (
//                 <div key={key}>
//                   <Label>{key.replace(/([A-Z])/g, " $1")}</Label>
//                   <Input
//                     value={value}
//                     onChange={(e) =>
//                       setPersonalInfo({ ...personalInfo, [key]: e.target.value })
//                     }
//                   />
//                 </div>
//               ))}

//             <ModalFooter>
//               <Btn onClick={savePersonalInfo}>
//                 {editingId ? "Update" : "Create"}
//               </Btn>
//               <Btn $delete onClick={() => setModalOpen(false)}>Cancel</Btn>
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

/* -------------------- THEME -------------------- */
const DarkBlue = "#0056b3";
const White = "#FFFFFF";

/* -------------------- STYLES -------------------- */
const Container = styled.div`color: ${DarkBlue}; position: relative;`;
const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 1rem;
  flex-direction: column;
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;
const Title = styled.h1`font-size: 2rem; font-weight: 700;`;
const ProfileSelect = styled.select`
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #c5d9f6;
  font-size: 1rem;
  cursor: pointer;
  outline: none;
  &:focus {
    border-color: ${DarkBlue};
  }
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
const List = styled.div`margin-top: 2.5rem;`;
const Item = styled.div`
  background: ${White};
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid rgba(0, 86, 179, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  box-shadow: 0 4px 10px rgba(0, 86, 179, 0.1);
  @media (max-width: 428px) {
    flex-direction: column;
    gap: 10px;
  }
`;
const InfoContent = styled.div``;
const BtnRow = styled.div`display: flex; gap: 1rem;`;
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
const ModalBackground = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
`;
const ModalCard = styled.div`
  width: 90%;
  max-width: 550px;
  background: ${White};
  padding: 2rem;
  border-radius: 14px;
  height: 90vh;
  overflow-y: auto;
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
const ModalFooter = styled.div`
  margin-top: 1.8rem;
  display: flex;
  justify-content: space-between;
`;

/* -------------------- COMPONENT -------------------- */
export default function PersonalInfoPage() {
  const user = auth.currentUser;

  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState("");
  const [personalInfos, setPersonalInfos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loadingProfiles, setLoadingProfiles] = useState(false);
  const [loadingInfos, setLoadingInfos] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    nickName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    location: "",
    gender: "",
    languages: "",
    nationality: "",
    hobbies: "",
    personalTraits: "",
  });

  const profilesRef = collection(db, "profiles");
  const personalInfoRef = collection(db, "personalInfo");

  /* ---------------- LOAD PROFILES ---------------- */
  const loadProfiles = async () => {
    if (!user) return;
    setLoadingProfiles(true);
    try {
      const q = query(profilesRef, where("userId", "==", user.uid));
      const snap = await getDocs(q);
      const arr = [];
      snap.forEach((d) => arr.push({ id: d.id, ...d.data() }));
      setProfiles(arr);

      if (arr.length === 0) {
        Swal.fire({
          icon: "info",
          title: "No Profiles Found",
          text: "Please create a profile first before adding personal info.",
        });
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoadingProfiles(false);
    }
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      if (u) loadProfiles();
    });
    return () => unsub();
  }, []);

  /* ---------------- LOAD PERSONAL INFO ---------------- */
  const loadPersonalInfos = async (profileId) => {
    if (!user || !profileId) return;
    setLoadingInfos(true);
    try {
      const q = query(
        personalInfoRef,
        where("profileId", "==", profileId),
        where("userId", "==", user.uid)
      );
      const snap = await getDocs(q);
      const arr = [];
      snap.forEach((d) => arr.push({ id: d.id, ...d.data() }));
      setPersonalInfos(arr);
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoadingInfos(false);
    }
  };

  useEffect(() => {
    if (selectedProfile) loadPersonalInfos(selectedProfile);
    else setPersonalInfos([]);
  }, [selectedProfile]);

  /* ---------------- MODAL ---------------- */
  const openNewModal = () => {
    if (!selectedProfile) return Swal.fire("Select a profile first.");
    if (personalInfos.length > 0)
      return Swal.fire(
        "Already Exists",
        "You can only create one personal info per profile. Edit the existing one.",
        "info"
      );

    setEditingId(null);
    setPersonalInfo({
      firstName: "",
      middleName: "",
      lastName: "",
      nickName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      location: "",
      gender: "",
      languages: "",
      nationality: "",
      hobbies: "",
      personalTraits: "",
    });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingId(item.id);
    setPersonalInfo(item);
    setModalOpen(true);
  };

  const savePersonalInfo = async () => {
    if (!user || !selectedProfile) return Swal.fire("Select a profile first.");
    setSaving(true);
    const data = {
      ...personalInfo,
      userId: user.uid,
      profileId: selectedProfile,
      updatedAt: serverTimestamp(),
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, "personalInfo", editingId), data);
      } else {
        await addDoc(personalInfoRef, { ...data, createdAt: serverTimestamp() });
      }
      Swal.fire("Saved!", "", "success");
      setModalOpen(false);
      loadPersonalInfos(selectedProfile);
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- DELETE ---------------- */
  const deleteInfo = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This personal info will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: DarkBlue,
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      setDeletingId(id);
      try {
        await deleteDoc(doc(db, "personalInfo", id));
        Swal.fire("Deleted!", "Personal info has been deleted.", "success");
        loadPersonalInfos(selectedProfile);
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      } finally {
        setDeletingId(null);
      }
    }
  };

  /* ---------------- RENDER ---------------- */
  return (
    <Container>
      <HeaderRow>
        <Title>Personal Information</Title>

        <ProfileSelect
          value={selectedProfile}
          onChange={(e) => setSelectedProfile(e.target.value)}
          disabled={loadingProfiles || profiles.length === 0}
        >
          <option value="">Select Profile...</option>
          {profiles.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </ProfileSelect>
      </HeaderRow>

      <PlusButton onClick={openNewModal} disabled={loadingProfiles || profiles.length === 0}>
        +
      </PlusButton>

      <List>
        {loadingInfos && <p>Loading personal info...</p>}
        {!loadingInfos && !selectedProfile && <p>Please select a profile.</p>}
        {!loadingInfos && selectedProfile && personalInfos.length === 0 && (
          <p>No personal info created yet for this profile.</p>
        )}

        {personalInfos.map((item) => (
          <Item key={item.id}>
            <InfoContent>
              <strong style={{ fontSize: "1.1rem" }}>
                {item.firstName} {item.lastName}
              </strong>

              {Object.entries(item)
                .filter(
                  ([key]) =>
                    !["id", "userId", "profileId", "createdAt", "updatedAt"].includes(key)
                )
                .map(([key, value]) => (
                  <p
                    key={key}
                    style={{ margin: "4px 0", color: "#333", fontSize: "0.95rem" }}
                  >
                    <strong style={{ opacity: 0.7 }}>
                      {key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}:
                    </strong>{" "}
                    {value || "-"}
                  </p>
                ))}
            </InfoContent>

            <BtnRow>
              <Btn $small onClick={() => openEditModal(item)} disabled={saving || deletingId}>
                {saving && editingId === item.id ? "Saving..." : "Edit"}
              </Btn>
              <Btn
                $delete
                $small
                onClick={() => deleteInfo(item.id)}
                disabled={saving || deletingId === item.id}
              >
                {deletingId === item.id ? "Deleting..." : "Delete"}
              </Btn>
            </BtnRow>
          </Item>
        ))}
      </List>

      {modalOpen && (
        <ModalBackground>
          <ModalCard>
            <h2>{editingId ? "Edit" : "New"} Personal Info</h2>

            {Object.entries(personalInfo)
              .filter(
                ([key]) =>
                  !["id", "userId", "profileId", "createdAt", "updatedAt"].includes(key)
              )
              .map(([key, value]) => (
                <div key={key}>
                  <Label>{key.replace(/([A-Z])/g, " $1")}</Label>
                  <Input
                    value={value}
                    onChange={(e) =>
                      setPersonalInfo({ ...personalInfo, [key]: e.target.value })
                    }
                    disabled={saving}
                  />
                </div>
              ))}

            <ModalFooter>
              <Btn onClick={savePersonalInfo} disabled={saving}>
                {saving ? (editingId ? "Updating..." : "Creating...") : editingId ? "Update" : "Create"}
              </Btn>
              <Btn $delete onClick={() => setModalOpen(false)} disabled={saving}>
                Cancel
              </Btn>
            </ModalFooter>
          </ModalCard>
        </ModalBackground>
      )}
    </Container>
  );
}