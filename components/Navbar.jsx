"use client";

import useUser from "@/hooks/useUser";
import Link from "next/link";

const ActionsFooter = () => {
  const { user, loading } = useUser();
  if (loading) {
    return <p className="w-[390px] lg:w-[500px] mx-auto px-[46px];">Loading</p>;
  }

  return (
    <div className="flex justify-between">
      <Link href="/profile">Profile</Link>
      <Link href="/logout">Logout</Link>
    </div>
  );
};

export default ActionsFooter;
