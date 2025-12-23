"use client";

import ProfileSidebar from "@/components/client/ProfileSidebar";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const ProfileLayout = ({ children }) => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (user === false) router.push("/");
  }, [user]);

  if (user === null) return <div>loading..</div>;
  return (
    <main className="w-[85%] mx-auto flex gap-8 py-[12rem]">
      <ProfileSidebar />
      <div className="bg-white w-full p-6 shadow-sm">{children}</div>
      <div id="container--modal"></div>
    </main>
  );
};

export default ProfileLayout;
