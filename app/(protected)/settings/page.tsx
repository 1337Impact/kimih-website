import { createClient } from "@/utils/supabase/server";
import PasswordForm from "./PasswordForm";
import PersonalInfoForm from "./PersonalInfoForm";
import ProfileImage from "./UploadImage";

const getUser = async () => {
  const supabase = createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    console.log("error getting user:", userError);
    return null;
  }
  if (!userData || !userData.user) return null;
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userData.user.id)
    .single();
  if (error) {
    console.log("error getting user:", error);
    return null;
  }
  return data;
};

const Settings = async () => {
  const user = await getUser();
  if (!user) {
    return null;
  }

  return (
        <div className="w-full">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 md:col-span-4">
              <PersonalInfoForm user={user} />
            </div>
            <div className="col-span-6 md:col-span-2">
              <ProfileImage
                oldAvatar={user.avatar_url || undefined}
                userId={user.id}
              />
            </div>
            <div className="col-span-6 md:col-span-6">
              <PasswordForm user={user} />
            </div>
          </div>
        </div>
      );
};

export default Settings;
