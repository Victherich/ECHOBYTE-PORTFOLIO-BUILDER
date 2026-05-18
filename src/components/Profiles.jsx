

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
  z-index: 400;
`;

const ModalCard = styled.div`
  width: 420px;
  background: ${White};
  padding: 2rem;
  border-radius: 14px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
  overflow-y:scroll;
  height:95%;
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


const CardLeft = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex: 1;
`;

const ImageBox = styled.div`
  width: 120px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  border: 1px solid rgba(0, 86, 179, 0.15);
  background: #f3f7ff;
`;

const CoverImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;

  position: absolute;
  top: 8px;
  right: 8px;

  border: 2px solid white;
  background: white;
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TitleText = styled.strong`
  font-size: 1rem;
  color: #111827;
`;

const SubText = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: rgba(0, 0, 0, 0.55);
`;

const PreviewBtn = styled.button`
  margin-top: 6px;
  padding: 6px 12px;

  background: #0056b3;
  color: white;

  border: none;
  border-radius: 6px;

  cursor: pointer;
  font-weight: 600;

  transition: 0.2s ease;

  &:hover {
    background: #004494;
    transform: translateY(-1px);
  }
`;

/* -------------------------------------------------- */

export default function ProfilePage() {
  const themeDesigns = [
    { id: "1", name: "Default" },
    // { id: "2", name: "Blue Theme" },
    // { id: "3", name: "Dark Mode" },
    // { id: "4", name: "Gold Premium" },
  ];

  const [formData, setFormData] = useState({
  profileImage: null,
  coverImage: null,
});

const [profilePreview, setProfilePreview] = useState(null);
const [coverPreview, setCoverPreview] = useState(null);

  const [profiles, setProfiles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("1");
  const [editingId, setEditingId] = useState(null);

  const profilesRef = collection(db, "profiles");
  const [loading, setLoading] = useState(false);


  const handleProfileImage = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    Swal.fire("Error", "Only images allowed", "error");
    return;
  }

  setFormData((prev) => ({
    ...prev,
    profileImage: file,
  }));

  setProfilePreview(URL.createObjectURL(file));
};


const handleCoverImage = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    Swal.fire("Error", "Only images allowed", "error");
    return;
  }

  setFormData((prev) => ({
    ...prev,
    coverImage: file,
  }));

  setCoverPreview(URL.createObjectURL(file));
};




const compressImage = (file, maxSizeKB = 100) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = document.createElement("img");
      img.src = e.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");

        const MAX_WIDTH = 900;
        const scale = img.width > MAX_WIDTH ? MAX_WIDTH / img.width : 1;

        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        let quality = 0.7;

        const compress = () => {
          canvas.toBlob(
            (blob) => {
              if (!blob) return reject("Compression failed");

              if (blob.size / 1024 <= maxSizeKB || quality <= 0.1) {
                resolve(blob);
              } else {
                quality -= 0.1;
                compress();
              }
            },
            "image/jpeg",
            quality
          );
        };

        compress();
      };
    };

    reader.readAsDataURL(file);
  });
};




const uploadToCloudinary = async (blob, folder) => {
  const data = new FormData();
  data.append("file", blob, "image.jpg");
  data.append("upload_preset", "echobyte_digital_store_upload");
  data.append("folder", folder);

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/ddh4wrbok/image/upload",
    {
      method: "POST",
      body: data,
    }
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error?.message || "Upload failed");
  }

  return json.secure_url;
};



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
      // await updateDoc(doc(db, "profiles", editingId), {
      //   title,
      //   theme,
      // });

      const current = profiles.find((p) => p.id === editingId);

let profileUrl = current?.profileImage;
let coverUrl = current?.coverImage;

if (formData.profileImage) {
  const blob = await compressImage(formData.profileImage, 100);
  profileUrl = await uploadToCloudinary(blob, "portfolioprofiles/profile");
}

if (formData.coverImage) {
  const blob = await compressImage(formData.coverImage, 100);
  coverUrl = await uploadToCloudinary(blob, "portfolioprofiles/cover");
}

await updateDoc(doc(db, "profiles", editingId), {
  title,
  theme,
  profileImage: profileUrl,
  coverImage: coverUrl,
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
  // await addDoc(profilesRef, {
  //   userId: user.uid,
  //   username, // extracted from email
  //   profileNumber: nextProfileNumber,
  //   title,
  //   theme,
  //   createdAt: serverTimestamp(),
  // });

  const compressedProfile = formData.profileImage
  ? await compressImage(formData.profileImage, 100)
  : null;

const compressedCover = formData.coverImage
  ? await compressImage(formData.coverImage, 100)
  : null;

let profileUrl = "";
let coverUrl = "";

if (compressedProfile) {
  profileUrl = await uploadToCloudinary(
    compressedProfile,
    "portfolioprofiles/profile"
  );
}

if (compressedCover) {
  coverUrl = await uploadToCloudinary(
    compressedCover,
    "portfolioprofiles/cover"
  );
}

await addDoc(profilesRef, {
  userId: user.uid,
  username,
  profileNumber: nextProfileNumber,
  title,
  theme,

  profileImage: profileUrl,
  coverImage: coverUrl,

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

      {/* LEFT SIDE */}
      <CardLeft>

        {/* IMAGE BLOCK */}
        <ImageBox>
          <CoverImg
            src={
              p.coverImage ||
              "https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=1200&auto=format&fit=crop"
            }
          />

          <ProfileImg
            src={
              p.profileImage ||
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop"
            }
          />
        </ImageBox>

        {/* TEXT */}
        <TextBlock>
          <TitleText>{p.title}</TitleText>

          <SubText>
            Theme:{" "}
            {themeDesigns.find((t) => t.id === p.theme)?.name}
          </SubText>

          <SubText>{p.id}</SubText>

          <PreviewBtn
            onClick={() =>
              window.open(
                `/${p.username}${p.profileNumber}`,
                "_blank"
              )
            }
          >
            Preview
          </PreviewBtn>
        </TextBlock>

      </CardLeft>

      {/* RIGHT SIDE BUTTONS */}
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



            <Label>Profile Image</Label>
<Input type="file" accept="image/*" onChange={handleProfileImage} />

{profilePreview && (
  <img
    src={profilePreview}
    style={{
      width: "70px",
      height: "70px",
      borderRadius: "50%",
      objectFit: "cover",
      marginTop: "10px",
    }}
  />
)}

<Label>Cover Image</Label>
<Input type="file" accept="image/*" onChange={handleCoverImage} />

{coverPreview && (
  <img
    src={coverPreview}
    style={{
      width: "100%",
      height: "100px",
      borderRadius: "10px",
      objectFit: "cover",
      marginTop: "10px",
    }}
  />
)}

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
