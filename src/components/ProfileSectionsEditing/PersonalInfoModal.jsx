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
  doc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";



const personalInfoFields = [
  { key: "firstName", label: "First Name" },
  { key: "middleName", label: "Middle Name" },
  { key: "lastName", label: "Last Name" },
  { key: "nickName", label: "Nick Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "dateOfBirth", label: "Date Of Birth" },
  { key: "location", label: "Location" },
  { key: "gender", label: "Gender" },
  { key: "languages", label: "Languages" },
  { key: "nationality", label: "Nationality" },
  { key: "hobbies", label: "Hobbies" },
  { key: "personalTraits", label: "Personal Traits" },
];


const optionalFields = new Set([
  "nickName",
  "dateOfBirth",
  "phone",
  "location",
  "languages",
  "nationality",
  "personalTraits",
]);


const DarkBlue = "#0056b3";
const White = "#FFFFFF";

const ModalBackground = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 500;
`;

const ModalCard = styled.div`
  width: 90%;
  max-width: 550px;
  background: ${White};
  padding: 2rem;
  border-radius: 14px;
  height: 90vh;
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
  outline: none;

  &:focus {
    border-color: #0056b3;
    box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.2);
  }
`;

const BtnRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const Btn = styled.button`
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  background: ${DarkBlue};
  color: white;
  cursor: pointer;

  ${(props) =>
    props.$delete &&
    `
      background:#d9534f;
    `}
`;

export default function PersonalInfoModal({
  open,
  onClose,
  profile,
}) {
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    if (open && profile) {
      loadPersonalInfo();
    }
  }, [open, profile]);

  const loadPersonalInfo = async () => {
    const user = auth.currentUser;
    if (!user || !profile) return;

    try {
      const q = query(
        collection(db, "personalInfo"),
        where("profileId", "==", profile.id),
        where("userId", "==", user.uid)
      );

      const snap = await getDocs(q);

      if (!snap.empty) {
        const data = snap.docs[0];

        setEditingId(data.id);

        setPersonalInfo(data.data());
      } else {
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
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };



  
 const savePersonalInfo = async () => {
  const user = auth.currentUser;

  if (!user || !profile) return;

  // 🔴 validation
    const missingFields = Object.entries(personalInfo)
  .filter(([key, value]) => {
    if (optionalFields.has(key)) return false;
    return value == null || String(value).trim() === "";
  })
  .map(([key]) => key);

  if (missingFields.length > 0) {
    Swal.fire(
      "Missing Fields",
      `Please fill: ${missingFields.join(", ")}`,
      "warning"
    );
    return;
  }

  setLoading(true);

  try {
    const data = {
      ...personalInfo,
      userId: user.uid,
      profileId: profile.id,
      updatedAt: serverTimestamp(),
    };

    if (editingId) {
      await updateDoc(doc(db, "personalInfo", editingId), data);
    } else {
      await addDoc(collection(db, "personalInfo"), {
        ...data,
        createdAt: serverTimestamp(),
      });
    }

    Swal.fire(
      "Success",
      editingId ? "Personal info updated" : "Personal info created",
      "success"
    );

    onClose();
  } catch (err) {
    Swal.fire("Error", err.message, "error");
  } finally {
    setLoading(false);
  }
};



  if (!open) return null;

  return (
    <ModalBackground onClick={onClose}>

      <ModalCard  onClick={(e) => e.stopPropagation()}>

        <h2>
          {editingId ? "Edit" : "Create"} Personal Info
        </h2>

{personalInfoFields.map(({ key, label }) => (
  <div key={key}>
    <Label>{label}</Label>

    <Input
      value={personalInfo[key] || ""}
      onChange={(e) =>
        setPersonalInfo({
          ...personalInfo,
          [key]: e.target.value,
        })
      }
    />
  </div>
))}

        <BtnRow>

          <Btn onClick={savePersonalInfo}>
            {loading
              ? "Saving..."
              : editingId
              ? "Update"
              : "Create"}
          </Btn>

          <Btn $delete onClick={onClose}>
            Cancel
          </Btn>

        </BtnRow>

      </ModalCard>

    </ModalBackground>
  );
}