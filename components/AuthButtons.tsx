"use client";

import { signIn, signOut, useSession } from "next-auth/react";

const AuthButtons = () => {
  const { data: session } = useSession();

  return session ? (
    <button className="chrome-btn header-action cursor-pointer" onClick={() => signOut()}>Sign out</button>
  ) : (
    <button className="chrome-btn header-action cursor-pointer" onClick={() => signIn("google")}>Sign in with Google</button>
  );
};

export default AuthButtons;
