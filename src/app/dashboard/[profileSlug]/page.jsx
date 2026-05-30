import PublicProfileClient from "./PublicProfileClient";

export default async function PublicProfilePage({ params }) {
  const { profileSlug } = await params; // Next.js 16

  return <PublicProfileClient profileSlug={profileSlug} />;
}