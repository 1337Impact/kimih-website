import { createClient } from "../supabase/client";
import convertImageToWebP from "./convert-to-webp";

export default async function uploadImage(
  file: File,
  storage_name: string,
  table: string,
  id: string,
  oldAvatar?: string,
) {
  const supabase = createClient();
  const filePath = `${id}-${Math.random()}.webp`;
  try {
    // Convert image to WebP
    const result = await convertImageToWebP(file);

    // Upload image to storage
    const { data, error: uploadError } = await supabase.storage
      .from(storage_name)
      .upload(filePath, result as File);
    if (uploadError || !data) {
      return { error: "error uploading image", data: null };
    }

    // Update user with new avatar
    const { error: userError } = await supabase
      // @ts-ignore
      .from(table)
      .update({
        avatar_url: `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/${data.fullPath}`,
      })
      .eq("id", id);
    if (userError) {
      await supabase.storage.from(storage_name).remove([data.path]);
      return { error: "error updating user", data: null };
    }

    // Remove old avatar from storage
    if (oldAvatar) {
      console.log("Old Avatar:", oldAvatar);
      const av = oldAvatar.split("/").pop();
      console.log("Old Avatar:", av);
      await supabase.storage.from(storage_name).remove([av as string]);
    }

    return {
      error: null,
      data: `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/${data.fullPath}`,
    };
  } catch (error) {
    return { error: "error converting Image to WebP", data: null };
  }
}

export async function uploadBusinessImages(
  id: string,
  files: File[],
  deleteImages: (string | null)[],
  oldImages: string[],
) {
  console.log("Uploading Images: ", files);
  console.log("Old Images: ", deleteImages);
  const supabase = createClient();
  const updloadedImages: string[] = oldImages;

  try {
    for (let i = 0; i < files.length; i++) {
      if (!files[i]) continue;
      const filePath = `${files[i].name}-${Math.random()}.webp`;
      // Convert image to WebP
      const result = await convertImageToWebP(files[i]);

      // Upload image to storage
      const { data, error: uploadError } = await supabase.storage
        .from("business-images")
        .upload(filePath, result as File);
      if (uploadError || !data) {
        console.log("Error uploading image: ", uploadError);
        throw { error: "error uploading image" };
      }
      updloadedImages.push(
        `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/${data.fullPath}`,
      );
    }

    console.log("Uploaded Images: ", updloadedImages);

    // Update user with new avatar
    const { error: userError } = await supabase
      // @ts-ignore
      .from("business")
      .update({
        images: updloadedImages,
      })
      .eq("id", id);
    if (userError) {
      return { error: "error uploading images", data: null };
    }

    // Remove old avatar from storage
    if (deleteImages && deleteImages.length) {
      deleteImages.forEach(async (oldImage) => {
        if (!oldImage) return;
        const oldI = oldImage.split("/").pop();
        console.log("Old Avatar:", oldI);
        await supabase.storage.from("business-images").remove([oldI as string]);
      });
    }

    return {
      error: null,
      data: updloadedImages,
    };
  } catch (error) {
    return { error: "error uploading image", data: null };
  }
}
