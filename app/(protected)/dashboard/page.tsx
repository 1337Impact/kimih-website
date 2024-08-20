"use client";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function Page() {
  const supabase = createClient();
  const [data, setData] = useState<any>();
  useEffect(() => {
    supabase.auth.getUser().then((user) => {
      setData(user);
    });
  }, []);
  return (
    <div>
      <h1>Dashboard</h1>
      <p>WELCOM BACK {data?.user?.email}</p>
      <button onClick={async () => await supabase.auth.signOut()}>Sign Out</button>
    </div>
  );
}
