"use client";

import ProfileSidebar from "@/components/client/ProfileSidebar";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const ProfileLayout = ({ children }) => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (user === false) router.replace("/");
  }, [user]);

  if (user === null)
    return <div className="fixed inset-0 bg-white z-100"></div>;
  return (
    <main className="flex flex-col md:flex-row gap-8 pt-[15rem] md:pt-[18rem] pb-[4rem]">
      <ProfileSidebar />
      <div className="bg-white w-full p-6 shadow-sm">{children}</div>
      <div id="container--modal"></div>
    </main>
  );
};

export default ProfileLayout;
