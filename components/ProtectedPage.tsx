"use client";

import { useAuth, useUser } from "@clerk/nextjs";

const ProtectedPage = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <div>Please sign in</div>;

  return <div>Welcome, {user?.fullName}!</div>;
};

export default ProtectedPage;
