import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  return (
    <div>
      <h1>Dashboard</h1>
      <p>WELCOM BACK {data.user?.email}</p>
    </div>
  );
}
