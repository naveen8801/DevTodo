import { signIn, signOut } from "next-auth/react";

export const handleGithubSignIn = async () => {
  await signIn("github");
};

export const handleGithubSignOut = async () => {
  await signOut();
};
