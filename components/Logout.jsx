"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logout } from "../utils/data";

const Logout = () => {
  const [error, setError] = useState(undefined);
  const router = useRouter();
  useEffect(() => {
    const innerLogout = async () => {
      const { success, error } = await logout();
      if (!success) {
        setError(error.message);
      }
      setTimeout(() => router.replace("/"), error ? 4000 : 2000);
    };
    innerLogout();
  }, [router]);

  return (
    <div className="my-14">
      <p className="h1 text-center heading">Logging out...</p>
      {error && <p style={{ color: "#C20000" }}>Error: {error}</p>}
    </div>
  );
};

export default Logout;
