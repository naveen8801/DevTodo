import { signIn, signOut } from "next-auth/react";

/**
 * Function to handle GitHub sign-in.
 *
 * @return {Promise<void>} A promise that resolves when the sign-in is complete.
 */
export const handleGithubSignIn = async () => {
  await signIn("github");
};

/**
 * Function to handle signing out from Github.
 *
 */

export const handleGithubSignOut = async () => {
  await signOut();
};
