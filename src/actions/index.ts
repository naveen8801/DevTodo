import User from "@/Models/User";
import axios from "axios";
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

/**
 * Retrieves user data from the "/api/user" endpoint using axios.
 *
 * @return {Promise<object>} An object containing the retrieved user data or an error object.
 */
export const getUser = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { error: "No user found with this email " };
    }
    return { data: user };
  } catch (error) {
    return { error: error!.toString() };
  }
};
