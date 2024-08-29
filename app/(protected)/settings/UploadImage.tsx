"use client";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useCallback, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import uploadImage from "@/utils/upload-image";

export default function ProfileImage({ userId, oldAvatar }: { userId: string, oldAvatar?: string }) {
  const supabase = createClient();
  const [imageFile, setImgFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successError, setSuccessError] = useState({
    success: false,
    error: false,
  });

  const handleReset = () => {
    setImgFile(null);
    setImage(null);
  };

  const handleUploadClick = async (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("File size should be less than 10mb");
        return;
      }
      setImgFile(file);
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        setImage(reader.result as string);
      };
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!imageFile || !userId) {
      setSuccessError({ success: false, error: true });
      return;
    }
    const { data, error } = await uploadImage(
      imageFile,
      "avatars",
      "profiles",
      userId,
      oldAvatar
    );
    console.log("Data:", data);
    if (error) {
      setSuccessError({ success: false, error: true });
      console.log("User Error:", error);
      setImage(null);
      return;
    }
    setSuccessError({ success: true, error: false });
  };

  return (
    <div className="rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Your Photo</h3>
        {successError.success && (
          <p className="mb-1 flex items-center gap-1 text-xs font-medium text-green-600 opacity-70">
            <FaCheckCircle />
            Profile image updated successfully
          </p>
        )}
        {successError.error && (
          <p className="mb-1 flex items-center gap-1 text-xs font-medium text-tred opacity-70">
            <FaCheckCircle />
            Error updateding profile image. Please try again.
          </p>
        )}
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <div
            id="FileUpload"
            className="relative mb-5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-tgray px-4 py-4 dark:bg-meta-4 sm:py-5"
          >
            {image ? (
              <Image
                width={400}
                height={400}
                src={image}
                alt="product image"
                className="h-full w-full object-cover"
              />
            ) : (
              <>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                  onChange={handleUploadClick}
                />
                <div className="flex flex-col items-center justify-center text-center space-y-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                    <IoCloudUploadOutline size={24} />
                  </span>
                  <p>
                    <span className="text-primary">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="mt-1">webp, PNG or JPG</p>
                  {error && <p className="text-xs text-tred">{error}</p>}
                  <p>max: 10mb</p>
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={handleReset}
              className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
              type="button"
            >
              Cancel
            </button>
            <button
              className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-tgray hover:bg-opacity-90"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
