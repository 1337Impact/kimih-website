"use client";
import { AUpdateProfile } from "@/actions/profile-actions";
import updateProfile from "@/utils/zod/settings/update-profile-schema";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

export default function PersonalInfoForm({ user }: any) {
  const [userData, setUserData] = useState(user);
  const [userError, setUserError] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });
  const [successError, setSuccessError] = useState({
    success: false,
    error: false,
  });

  const handleReset = () => {
    setUserData(user);
    setUserError({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
    });
    setSuccessError({
      success: false,
      error: false,
    });
  };

  const handleUserChanges = (e: any) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleProfileUpdate = async (e: any) => {
    e.preventDefault();
    setUserError({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
    });
    const result = updateProfile.safeParse(userData);
    if (!result.success) {
      result.error.errors.forEach((err) => {
        setUserError((prev) => ({ ...prev, [err.path[0]]: err.message }));
      });
      return;
    }
    if (!user) return;
    const res = await AUpdateProfile({ ...userData, id: user.id });
    if (res.error) {
      setSuccessError({ success: false, error: true });
      setUserData(user);
    } else {
      setSuccessError({ success: true, error: false });
      console.log("User data:", userData, res);
    }
  };
  return (
    <div className="rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Personal Informations
        </h3>
        {successError.success && (
          <p className="mb-1 flex items-center gap-1 text-xs font-medium text-green-600 opacity-70">
            <FaCheckCircle />
            Profile updated successfully
          </p>
        )}
        {successError.error && (
          <p className="mb-1 flex items-center gap-1 text-xs font-medium text-tred opacity-70">
            <FaCheckCircle />
            Error updateding profile. Please try again.
          </p>
        )}
      </div>
      <div className="p-7">
        <form onSubmit={handleProfileUpdate}>
          <div className="mb-5 flex flex-col gap-5 sm:flex-row">
            <div className="w-full sm:w-1/2">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="first_name"
              >
                First Name
              </label>
              <div className="relative">
                <input
                  className="w-full rounded border border-stroke bg-tgray px-3 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  type="text"
                  name="first_name"
                  id="first_name"
                  placeholder="Jhon"
                  value={userData?.first_name}
                  onChange={handleUserChanges}
                />
              </div>
              {userError.first_name && (
                <p className="-mb-[8px] text-xs font-medium text-tred">
                  {userError.first_name}
                </p>
              )}
            </div>
            <div className="w-full sm:w-1/2">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="last_name"
              >
                Last Name
              </label>
              <div className="relative">
                <input
                  className="w-full rounded border border-stroke bg-tgray px-3 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  type="text"
                  name="last_name"
                  id="last_name"
                  placeholder="Doe"
                  value={userData?.last_name}
                  onChange={handleUserChanges}
                />
              </div>
              {userError.last_name && (
                <p className="-mb-[8px] text-xs font-medium text-tred">
                  {userError.last_name}
                </p>
              )}
            </div>
          </div>
          <div className="mb-5 flex flex-col gap-5 sm:flex-row">
            <div className="w-full sm:w-1/2">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                className="w-full rounded border border-stroke bg-tgray px-3 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="text"
                name="phone"
                id="phone"
                placeholder="+990 3343 7865"
                value={userData?.phone}
                onChange={handleUserChanges}
              />
              {userError.phone && (
                <p className="-mb-[8px] text-xs font-medium text-tred">
                  {userError.phone}
                </p>
              )}
            </div>
            <div className="w-full sm:w-1/2">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-4 top-4 text-slate-500">
                  <MdOutlineEmail size={20} />
                </span>
                <input
                  className="w-full cursor-not-allowed rounded border border-stroke bg-slate-200 py-3 pl-11 pr-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-form-strokedark dark:text-white dark:focus:border-primary"
                  type="text"
                  name="email"
                  id="email"
                  disabled
                  placeholder="example@mail.com"
                  value={userData?.email}
                  onChange={handleUserChanges}
                />
                {userError.email && (
                  <p className="-mb-[8px] text-xs font-medium text-tred">
                    {userError.email}
                  </p>
                )}
              </div>
            </div>
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
              disabled={userData === user}
              className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-tgray hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
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