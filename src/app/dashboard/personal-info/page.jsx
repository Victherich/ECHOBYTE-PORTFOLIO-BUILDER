
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

// // Theme colors
// const DarkBlue = "#0056b3";
// const White = "#FFFFFF";

// const Container = styled.div`
// //   padding: 2rem;
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
//   align-items: center;
//   margin-bottom: 1rem;
//   box-shadow: 0 4px 10px rgba(0, 86, 179, 0.1);

//  @media(max-width:428px){
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
//   z-index: 200;
// `;

// const ModalCard = styled.div`
//   width: 90%;
//   background: ${White};
//   padding: 2rem;
//   border-radius: 14px;
//   box-shadow: 0 8px 25px rgba(0,0,0,0.25);
//   height:90vh;
//   overflow-y:scroll;
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

// export default function PersonalInfoPage() {
//   const user = auth.currentUser;

//   const [profiles, setProfiles] = useState([]);
//   const [usedProfiles, setUsedProfiles] = useState([]);

//   const [personalInfos, setPersonalInfos] = useState([]);

//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [loading, setLoading]=useState(false);

//   const [selectedProfile, setSelectedProfile] = useState("");

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

//   const profilesRef = user
//     ? collection(db, "users", user.uid, "profiles")
//     : null;

//   const personalInfoRef = user
//     ? collection(db, "users", user.uid, "personalInfo")
//     : null;

//   /* ---------------- LOAD DATA ---------------- */

//   const loadProfiles = async () => {
//     if (!profilesRef) return;
//     const arr = [];
//     const docsSnap = await getDocs(profilesRef);
//     docsSnap.forEach((d) => arr.push({ id: d.id, ...d.data() }));
//     setProfiles(arr);
//   };

//   const loadPersonalInfos = async () => {
//     if (!personalInfoRef) return;
//     const arr = [];
//     const docsSnap = await getDocs(personalInfoRef);
//     docsSnap.forEach((d) => arr.push({ id: d.id, ...d.data() }));
//     setPersonalInfos(arr);

//     setUsedProfiles(arr.map((i) => i.profileId)); // Used profiles
//   };

//   useEffect(() => {
//     loadProfiles();
//     loadPersonalInfos();
//   }, []);

//   /* ---------------- CREATE / EDIT ---------------- */

//   const openNewModal = () => {
//     setModalOpen(true);
//     setEditingId(null);
//     setSelectedProfile("");
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
//   };

//   const openEditModal = (item) => {
//     setModalOpen(true);
//     setEditingId(item.id);
//     setSelectedProfile(item.profileId);
//     setPersonalInfo({ ...item });
//   };

// const savePersonalInfo = async () => {
//   if (!selectedProfile) {
//     return Swal.fire("Missing", "Please select a profile.", "warning");
//   }

//   // Prevent selecting a used profile
//   if (!editingId && usedProfiles.includes(selectedProfile)) {
//     return Swal.fire("Profile Already Used", "Select a different profile.", "error");
//   }

//   setLoading(true);
//   Swal.fire({
//     title: "Saving...",
//     text: "Please wait",
//     allowOutsideClick: false,
//     didOpen: () => {
//       Swal.showLoading();
//     },
//   });

//   try {
//     const data = {
//       ...personalInfo,
//       profileId: selectedProfile,
//       updatedAt: Date.now(),
//     };

//     if (editingId) {
//       const ref = doc(db, "users", user.uid, "personalInfo", editingId);
//       await updateDoc(ref, data);
//       Swal.fire("Updated!", "Personal info updated.", "success");
//     } else {
//       await addDoc(personalInfoRef, { ...data, createdAt: Date.now() });
//       Swal.fire("Created!", "Personal info added.", "success");
//     }

//     setModalOpen(false);
//     loadPersonalInfos();
//   } catch (e) {
//     console.error(e);
//     Swal.fire("Error", "Something went wrong.", "error");
//   }

//   setLoading(false);
// };


//   /* ---------------- DELETE ---------------- */

// const deleteItem = async (id) => {
//   const confirm = await Swal.fire({
//     title: "Delete Personal Info?",
//     text: "This action is permanent.",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonText: "Delete",
//   });

//   if (!confirm.isConfirmed) return;

//   setLoading(true);

//   Swal.fire({
//     title: "Deleting...",
//     text: "Please wait",
//     allowOutsideClick: false,
//     didOpen: () => {
//       Swal.showLoading();
//     },
//   });

//   try {
//     await deleteDoc(doc(db, "users", user.uid, "personalInfo", id));
//     Swal.fire("Deleted!", "Personal info removed.", "success");
//     loadPersonalInfos();
//   } catch (e) {
//     Swal.fire("Error", "Could not delete item.", "error");
//   }

//   setLoading(false);
// };




// const HIDDEN_FIELDS = [
//   "id",
//   "createdAt",
//   "updatedAt",
//   "profileId"
// ];



//   /* ---------------- RENDER ---------------- */

//   return (
//     <Container>
//       <Title>Personal Information</Title>

//       <PlusButton onClick={openNewModal}>+</PlusButton>

//       <List>
//         <h2>Your Personal Info Entries</h2>
// <br/>
//         {personalInfos.length === 0 && (
//           <p style={{ opacity: 0.7 }}>No personal info created yet.</p>
//         )}

//         {personalInfos.map((item) => (
//           <Item key={item.id}>
//             <div>
//               <strong>{item.firstName} {item.lastName}</strong>
//               <p style={{ opacity: 0.6, margin: 0 }}>
//                 Profile: {profiles.find((p) => p.id === item.profileId)?.title}
//               </p>
//               <p style={{ margin: 0, color:"#333" }}>
//             Email: {item.email}
//               </p>
//               <p style={{ margin: 0 , color:"#333"}}>
//             Phone: {item.phone}
//               </p>
//             </div>

//             <BtnRow>
//               <Btn $small onClick={() => openEditModal(item)}>Edit</Btn>
//               <Btn $small $delete onClick={() => deleteItem(item.id)}>Delete</Btn>
//             </BtnRow>
//           </Item>
//         ))}
//       </List>

//       {/* ------------ MODAL ------------- */}
//       {modalOpen && (
//         <ModalBackground>
//           <ModalCard>
//             <h2>{editingId ? "Edit Personal Info" : "Create New Personal Info"}</h2>

//             {/* SELECT PROFILE */}
//             <Label>Select Profile</Label>
//             <Select
//               value={selectedProfile}
//               onChange={(e) => setSelectedProfile(e.target.value)}
//             >
//               <option value="">Select Profile</option>

//               {profiles.map((p) => (
//                 <option
//                   key={p.id}
//                   value={p.id}
//                   disabled={
//                     !editingId && usedProfiles.includes(p.id)
//                   }
//                 >
//                   {p.title}
//                   {usedProfiles.includes(p.id) && " (Already Used)"}
//                 </option>
//               ))}
//             </Select>

//             {/* PERSONAL INFO FIELDS */}
//           {Object.entries(personalInfo)
//   .filter(([key]) => !HIDDEN_FIELDS.includes(key))
//   .map(([key, value]) => (
//     <div key={key}>
//       <Label>{key.replace(/([A-Z])/g, " $1")}</Label>
//       <Input
//         value={value}
//         onChange={(e) =>
//           setPersonalInfo({ ...personalInfo, [key]: e.target.value })
//         }
//       />
//     </div>
// ))}


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
} from "firebase/firestore";

/* ----------------------------------------------------
   THEME
---------------------------------------------------- */
const DarkBlue = "#0056b3";
const White = "#FFFFFF";

/* ----------------------------------------------------
   STYLES
---------------------------------------------------- */
const Container = styled.div`
  color: ${DarkBlue};
  position: relative;
`;

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

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
`;

const ProfileSelect = styled.select`
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #c5d9f6;
  font-size: 1rem;
  cursor: pointer;
  outline:none;

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
  align-items: flex-start;
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

/* ----------------------------------------------------
   COMPONENT
---------------------------------------------------- */

export default function PersonalInfoPage() {
  const user = auth.currentUser;

  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState("");
  const [personalInfos, setPersonalInfos] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

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

  const profilesRef = user ? collection(db, "users", user.uid, "profiles") : null;
  const personalInfoRef = user ? collection(db, "users", user.uid, "personalInfo") : null;

  /* ---------------- LOAD PROFILES ---------------- */
  const loadProfiles = async () => {
    if (!profilesRef) return;
    const snap = await getDocs(profilesRef);
    const arr = [];
    snap.forEach((d) => arr.push({ id: d.id, ...d.data() }));
    setProfiles(arr);
  };

  useEffect(() => {
    loadProfiles();
  }, []);

  /* ---------------- LOAD PERSONAL INFO ---------------- */
  const loadPersonalInfos = async (profileId) => {
    if (!personalInfoRef || !profileId) return;
    const q = query(personalInfoRef, where("profileId", "==", profileId));
    const docsSnap = await getDocs(q);

    const arr = [];
    docsSnap.forEach((d) => arr.push({ id: d.id, ...d.data() }));
    setPersonalInfos(arr);
  };

  /* Load when profile changes */
  useEffect(() => {
    if (selectedProfile) loadPersonalInfos(selectedProfile);
  }, [selectedProfile]);

  /* ---------------- NEW + EDIT MODAL ---------------- */
  const openNewModal = () => {
    if (!selectedProfile)
      return Swal.fire("Select a profile first.");

     // 🚫 Block if personal info already exists for this profile
  if (personalInfos.length > 0) {
    return Swal.fire({
      icon: "info",
      title: "Personal Info Exists",
      text: "You can only create one personal info per profile. Please edit the existing one.",
    });
  }

    setModalOpen(true);
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
  };

  const openEditModal = (item) => {
    setModalOpen(true);
    setEditingId(item.id);
    setPersonalInfo(item);
  };

  const savePersonalInfo = async () => {
    if (!selectedProfile) return Swal.fire("Select a profile first.");

    Swal.fire({
      title: "Saving...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const data = {
      ...personalInfo,
      profileId: selectedProfile,
      updatedAt: Date.now(),
    };

    try {
      if (editingId) {
        await updateDoc(
          doc(db, "users", user.uid, "personalInfo", editingId),
          data
        );
      } else {
        await addDoc(personalInfoRef, {
          ...data,
          createdAt: Date.now(),
        });
      }

      Swal.fire("Saved!", "Personal info saved.", "success");
      setModalOpen(false);
      loadPersonalInfos(selectedProfile);
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  /* ---------------- DELETE ---------------- */
  const deleteInfo = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete this personal info?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!confirm.isConfirmed) return;

    await deleteDoc(doc(db, "users", user.uid, "personalInfo", id));
    Swal.fire("Deleted!", "", "success");
    loadPersonalInfos(selectedProfile);
  };

  /* ----------------------------------------------------
     RENDER
  ---------------------------------------------------- */

  useEffect(()=>{
    if(!selectedProfile){
        setPersonalInfos([])
    }
  },[selectedProfile, setPersonalInfos])

  return (
    <Container>

      {/* ---------- TOP HEADER WITH PROFILE SELECTOR ---------- */}
      <HeaderRow>
        <Title>Personal Information</Title>

        <ProfileSelect
          value={selectedProfile}
          onChange={(e) => setSelectedProfile(e.target.value)}
        >
          <option value="">Select Profile...</option>
          {profiles.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </ProfileSelect>
      </HeaderRow>

      <PlusButton onClick={openNewModal}>+</PlusButton>

      <List>
        {!selectedProfile && (
          <p style={{ opacity: 0.6 }}>Please select a profile.</p>
        )}

    

{personalInfos.map((item) => {
  const HIDDEN_VIEW_FIELDS = ["id", "profileId", "createdAt", "updatedAt"];

  return (
    <Item key={item.id}>
      <div>
        <strong style={{ fontSize: "1.1rem" }}>
          {item.firstName} {item.lastName}
        </strong>

        {Object.entries(item)
          .filter(([key]) => !HIDDEN_VIEW_FIELDS.includes(key))
          .map(([key, value]) => (
            <p
              key={key}
              style={{
                margin: "4px 0",
                color: "#333",
                fontSize: "0.95rem",
              }}
            >
              <strong style={{ opacity: 0.7 }}>
                {key.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase())}:
              </strong>{" "}
              {value}
            </p>
        ))}
      </div>

      <BtnRow>
        <Btn $small onClick={() => openEditModal(item)}>Edit</Btn>
        <Btn $small $delete onClick={() => deleteInfo(item.id)}>Delete</Btn>
      </BtnRow>
    </Item>
  );
})}
      </List>

      {/* ---------- ADD / EDIT MODAL ---------- */}
      {modalOpen && (
        <ModalBackground>
          <ModalCard>
            <h2>{editingId ? "Edit" : "New"} Personal Info</h2>

            {/* PERSONAL INFO FIELDS */}
            {Object.entries(personalInfo)
              .filter(([key]) => !["id", "updatedAt", "createdAt", "profileId"].includes(key))
              .map(([key, value]) => (
                <div key={key}>
                  <Label>{key.replace(/([A-Z])/g, " $1")}</Label>
                  <Input
                    value={value}
                    onChange={(e) =>
                      setPersonalInfo({ ...personalInfo, [key]: e.target.value })
                    }
                  />
                </div>
              ))}

            <ModalFooter>
              <Btn onClick={savePersonalInfo}>
                {editingId ? "Update" : "Create"}
              </Btn>
              <Btn $delete onClick={() => setModalOpen(false)}>Cancel</Btn>
            </ModalFooter>
          </ModalCard>
        </ModalBackground>
      )}
    </Container>
  );
}
