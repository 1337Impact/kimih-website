// "use client";
// import { createClient } from "@/utils/supabase/client";
// // import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function Page() {
//   const supabase = createClient();
//   const router = useRouter();
//   const [data, setData] = useState<any>();
//   useEffect(() => {
//     supabase.auth.getUser().then((user) => {
//       setData(user);
//     });
//   }, [supabase]);
//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <p>WELCOM BACK {data?.user?.email}</p>
//       <button onClick={async () => {await supabase.auth.signOut(); router.push("/")}}>Sign Out</button>
//     </div>
//   );
// }
