import User from "@/models/User";
import connectDB from "@/utils/ConnectDB";
import axios from "axios";
import { signIn, signOut } from "next-auth/react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
export const handleGetUser = async (email: string) => {
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

/**
 * Function to handle updating user installation ID.
 *
 * @param {string} email - The user's email
 * @param {string} installation_id - The new installation ID
 * @return {Promise<{ data: User } | { error: string }>} The updated user data or an error message
 */
export const handleUpdateUserInstallationId = async (
  email: string,
  installation_id: string
) => {
  try {
    connectDB();
    const user = await User.findOneAndUpdate(
      { email },
      { installationId: installation_id },
      { new: true }
    );
    revalidatePath("/dashboard");
    return { data: user };
  } catch (error) {
    return { error: error!.toString() };
  }
};

/**
 * Function to get all repo from through user's github account (user must have installed DevTodo github app)
 *
 * @param {string} installation_id - The installation ID of github app
 * @return {Promise<{ data: any } | { error: string }>} Response from github API
 */
export const handleGetRepositoryList = async (installation_id: string) => {
  try {
    const { data } = await axios.get(
      `/api/repo?installation_id=${installation_id}`
    );
    return { data: data.data };
  } catch (error) {
    return { error: error!.toString() };
  }
};

/**
 * Function to search a repo for TODOs comments
 *
 * @param {string} repoId - Name of repo
 * @return {Promise<{ data: any } | { error: string }>} Response from github API
 */
export const handleSearchRepo = async (repoId: string) => {
  try {
    const { data } = await axios.get(`/api/repo/${repoId}`);
    return { data: data.data };
  } catch (error) {
    console.log({ error });
    return { error: error!.toString() };
  }
};
