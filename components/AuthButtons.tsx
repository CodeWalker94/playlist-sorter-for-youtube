"use client";

import { SignInButton, UserButton, Show } from "@clerk/nextjs";

const AuthButtons = () => {
  return (
    <>
      <Show when="signed-out">
        <SignInButton mode="modal">
          <button className="chrome-btn header-action cursor-pointer">
            Sign in with Google
          </button>
        </SignInButton>
      </Show>
      <Show when="signed-in">
        <UserButton />
      </Show>
    </>
  );
};

export default AuthButtons;
