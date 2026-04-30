import { useSession } from "next-auth/react";

const ProtectedPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <div>Please sign in</div>;

  return <div>Welcome, {session.user?.name}!</div>;
};

export default ProtectedPage;
