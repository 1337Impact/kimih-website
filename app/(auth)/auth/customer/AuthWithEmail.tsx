import { useState } from "react";
import { checkUserByEmail, loginWithEmail } from "./utils";
import { useRouter } from "next/navigation";

const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export default function AuthWithEmail() {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: false,
    password: false,
  });
  const [isExisting, setExisting] = useState(false);

  const handleChange = (e: any) => {
    if (e.target.id === "email") {
      setData({ ...data, email: e.target.value.toLocaleLowerCase() });
      return;
    }
    setData({ ...data, [e.target.id]: e.target.value });
  };


  const handleFormSubmit = async (e: any) => {
    setError({ email: false, password: false });
    e.preventDefault();
    if (isExisting) {
      if (!validateEmail(data.email) || (isExisting && !data.password)) {
        setError({ email: false, password: true });
        return;
      }
      try {
        const user = await loginWithEmail(data.email, data.password);
        router.push("/profile");
      } catch (error) {
        console.error(error);
        setError({ email: false, password: true });
      }
    } else {
      if (!validateEmail(data.email)) {
        setError({ email: true, password: false });
        return;
      }
      const isUser = await checkUserByEmail(data.email);
      if (!isUser) {
        router.push(`/create-account?email=${data.email}`);
        return;
      }
      setExisting(true);
    }
  };
  return (
    <form onSubmit={handleFormSubmit} className="">
      <input
        className="w-full rounded-lg p-2 border-2 border-gray-700"
        placeholder="Enter your email"
        name="email"
        id="email"
        value={data.email}
        onChange={handleChange}
      />
      {error.email && (
        <p className="text-red-500 text-sm">Please enter a valid email</p>
      )}
      {isExisting && (
        <>
          <input
            className="mt-2 w-full rounded-lg p-2 border-2 border-gray-700"
            placeholder="Enter your password"
            name="password"
            id="password"
            type="password"
            value={data.password}
            onChange={handleChange}
          />
          {error.password && (
            <p className="text-red-500 text-sm">
              Please enter a valid email and password
            </p>
          )}
        </>
      )}
      <button
        type="submit"
        className="mt-3 w-full rounded-lg p-[9px] bg-gray-900 text-white border-2 border-gray-700 hover:bg-gray-800"
      >
        {isExisting ? "Login" : "Continue"}
      </button>
    </form>
  );
}
