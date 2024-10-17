"use client";

import GithubSignInButton from "./github-auth-button";
import GoogleSignInButton from "./google-auth-button";

export default function UserAuthForm() {
  return (
    <>
      <GithubSignInButton />
      <GoogleSignInButton />
    </>
  );
}
