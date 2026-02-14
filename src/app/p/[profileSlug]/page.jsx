// import PublicProfileClient from "./PublicProfileClient";


// export default async function PublicProfilePage({ params }) {
//   // NEW in Next.js 15/16
//   const { profileId } = await params;

//   return <PublicProfileClient profileId={profileId} />;
// }



import PublicProfileClient from "./PublicProfileClient";
import { db } from "@/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export default async function PublicProfilePage({ params }) {
  const { profileSlug } = params; // e.g., "john1"

  // Split into username and profileNumber
  const slugMatch = profileSlug.match(/([a-zA-Z0-9]+)(\d+)$/);
  if (!slugMatch) return <div>Invalid profile link</div>;

  const username = slugMatch[1];
  const profileNumber = parseInt(slugMatch[2], 10);

  // Query Firestore for the correct profile
  const profilesRef = collection(db, "profiles");
  const q = query(
    profilesRef,
    where("username", "==", username),
    where("profileNumber", "==", profileNumber)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) return <div>Profile not found</div>;

  const profileId = snapshot.docs[0].id;

  // return <PublicProfileClient profileId={profileId} />;
  return <h1>WORKING</h1>
}