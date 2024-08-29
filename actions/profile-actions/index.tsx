"use server";
import { createClient } from "@/utils/supabase/server";

export async function AUpdateProfile(profileData: {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .update({
      first_name: profileData.first_name,
      last_name: profileData.last_name,
      email: profileData.email,
      phone: profileData.phone,
    })
    .eq("id", profileData.id);

  if (error) {
    console.log(error);
    return { error: error.message, data: null };
  }
  return { data, error: null };
}


async function validateCurrentPassword(email: string, currentPassword: string) {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: currentPassword,
  });

  if (error) {
    console.error('Current password is incorrect:', error.message);
    return false;
  }

  return true;
}

// Example function to handle form submission
export async function AUpdatePassword({email, currentPassword, newPassword}: {email: string, currentPassword: string, newPassword: string}) {
  console.log({email, currentPassword, newPassword});
  const isCurrentPasswordValid = await validateCurrentPassword(email, currentPassword);
  const supabase = createClient();
  
  if (isCurrentPasswordValid) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) {
      console.log(error);
      return { error: error.message, data: null };
    }
    return { data: "Password updated successfully", error: null };
  } 
  return { error: "Current password is incorrect", data: null };
}