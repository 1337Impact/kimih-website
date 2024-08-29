"use client";
import { AUpdatePassword } from "@/actions/profile-actions";
import { updatePassword } from "@/utils/zod/settings/update-profile-schema";
import { useState } from "react";
import { BiHide } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";

export default function PasswordForm({ user }: { user: any }) {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [hidePassword, setHidePassword] = useState({
    currentPassword: true,
    newPassword: true,
    confirmPassword: true,
  });
  const [passwordError, setPasswordError] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [successError, setSuccessError] = useState({
    success: false,
    error: false,
  });

  const handleReset = () => {
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordError({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setSuccessError({
      success: false,
      error: false,
    });
  };

  const handlePasswordChanges = (e: any) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handlePasswordUpdate = async (e: any) => {
    e.preventDefault();
    setPasswordError({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    const result = updatePassword.safeParse(passwordData);
    if (!result.success) {
      result.error.errors.forEach((err) => {
        setPasswordError((prev) => ({ ...prev, [err.path[0]]: err.message }));
      });
      return;
    }
    if (passwordData.confirmPassword !== passwordData.newPassword) {
      setPasswordError((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }
    if (!user) return;
    const res = await AUpdatePassword({
      email: user.email,
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    });
    if (res.error) {
      setSuccessError({ success: false, error: true });
      console.log("password error:", res);
    } else {
      setSuccessError({ success: true, error: false });
    }
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    console.log("password data:", passwordData, res);
  };
  return (
    <div className="rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Password</h3>
        {successError.success && (
          <p className="mb-1 flex items-center gap-1 text-xs font-medium text-green-600 opacity-70">
            <FaCheckCircle />
            Password updated successfully
          </p>
        )}
        {successError.error && (
          <p className="mb-1 flex items-center gap-1 text-xs font-medium text-tred opacity-70">
            <FaCheckCircle />
            Error updateding password. Please try again.
          </p>
        )}
      </div>
      <div className="p-7">
        <form onSubmit={handlePasswordUpdate}>
          <div className="mb-5 flex flex-col gap-5">
            <div className="w-full">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="first_name"
              >
                Current Password
              </label>
              <div className="relative">
                <input
                  className="w-full rounded border border-stroke bg-tgray px-3 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  type={hidePassword.currentPassword ? "password" : "text"}
                  name="currentPassword"
                  id="currentPassword"
                  placeholder="********"
                  value={passwordData?.currentPassword}
                  onChange={handlePasswordChanges}
                />
                <BiHide
                  className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer text-black dark:text-white"
                  onClick={() =>
                    setHidePassword({
                      ...hidePassword,
                      currentPassword: !hidePassword.currentPassword,
                    })
                  }
                />
              </div>
              {passwordError.currentPassword && (
                <p className="-mb-[8px] text-xs font-medium text-tred">
                  {passwordError.currentPassword}
                </p>
              )}
            </div>
            <div className="flex w-full gap-2">
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="first_name"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    className="w-full rounded border border-stroke bg-tgray px-3 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type={hidePassword.newPassword ? "password" : "text"}
                    name="newPassword"
                    id="newPassword"
                    placeholder="********"
                    value={passwordData?.newPassword}
                    onChange={handlePasswordChanges}
                  />
                  <BiHide
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer text-black dark:text-white"
                    onClick={() =>
                      setHidePassword({
                        ...hidePassword,
                        newPassword: !hidePassword.newPassword,
                      })
                    }
                  />
                </div>
                {passwordError.newPassword && (
                  <p className="-mb-[8px] text-xs font-medium text-tred">
                    {passwordError.newPassword}
                  </p>
                )}
              </div>
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="first_name"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    className="w-full rounded border border-stroke bg-tgray px-3 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type={hidePassword.confirmPassword ? "password" : "text"}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="********"
                    value={passwordData?.confirmPassword}
                    onChange={handlePasswordChanges}
                  />
                  <BiHide
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer text-black dark:text-white"
                    onClick={() =>
                      setHidePassword({
                        ...hidePassword,
                        confirmPassword: !hidePassword.confirmPassword,
                      })
                    }
                  />
                </div>
                {passwordError.confirmPassword && (
                  <p className="-mb-[8px] text-xs font-medium text-tred">
                    {passwordError.confirmPassword}
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
              disabled={
                passwordData.confirmPassword.length &&
                passwordData.newPassword.length &&
                passwordData.currentPassword.length
                  ? false
                  : true
              }
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
