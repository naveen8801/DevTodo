import User from "@/Models/User";
import connectDB from "@/utils/ConnectDB";
import axios from "axios";
import { signIn, signOut } from "next-auth/react";
import { revalidatePath } from "next/cache";

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
 * Retrieves a user by their email address and returns an object containing either the user data or an error message.
 *
 * @param {string} email - The email address of the user to retrieve
 * @return {Promise<{ data: User } | { error: string }>} An object containing either the user data or an error message
 */
export const getUser = async (email: string) => {
  try {
    connectDB();
    const user = await User.findOne({ email });
    if (!user) {
      return { error: "No user found with this email " };
    }
    revalidatePath("/dashboard");
    return { data: user };
  } catch (error) {
    return { error: error!.toString() };
  }
};
