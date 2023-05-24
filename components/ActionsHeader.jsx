"use client";

import useUser from "@/hooks/useUser";
import { getCurrentUser } from "@/utils/data";
import Link from "next/link";
import { useEffect, useState } from "react";

const ActionsHeader = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const getName = async () => {
      const { data } = await getCurrentUser();
      if (data !== null) {
        setName(data.meta.name);
      }
    };
    getName();
  }, [name]);

  const { user, loading } = useUser();

  if (loading) {
    //loading
    return <p>Loading...</p>;
  }

  if (!user) {
    //user is not logged in
    return (
      <div className="space-x-10 my-5 drop-shadow-lg flex">
        <Link href="/" className="hover:text-black">
          Home
        </Link>
        <Link href="/login" className="hover:text-black">
          Create List
        </Link>
        <Link href="/login" className="hover:text-black">
          My Lists
        </Link>
        <Link href="/login" className="hover:text-black pl-20">
          Login
        </Link>
        <Link href="/register" className="hover:text-black">
          Register
        </Link>
      </div>
    );
  }

  // user is logged in
  return (
    <div className="space-x-10 my-5 drop-shadow-lg flex">
      <Link href="/" className="hover:text-black">
        Home
      </Link>
      <Link href="/list/create" className="hover:text-black">
        Create List
      </Link>
      <Link href={`/user/${user.id}`} className="hover:text-black">
        My Lists
      </Link>
      <Link href="logout" className="hover:text-black pl-20">
        Logout
      </Link>
      <p>{name}</p>
    </div>
  );
};

export default ActionsHeader;
