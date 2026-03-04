"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const BannerSection = ({ section }) => {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [route, setRoute] = useState("/");
  useEffect(() => {
    const getData = async () => {
      try {
        let response = await fetch(
          `${BACKEND_URL}/api/sections/${section.section_type}?data_source=${section.data_source}&reference_id=${section.reference_id}`,
          {
            method: "GET",
          },
        );
        let result = await response.json();
        if (!response.ok) throw new Error(result.message);
        setRoute(result.result);
      } catch (error) {
        console.log(error.message);
      }
    };
    getData();
  }, []);

  const getHeight = () => {
    switch (section.banner_type) {
      case "main":
        return "h-[13rem] lg:h-[45rem] md:rounded-[2rem] object-fill lg:object-cover";
      case "mini":
        return "h-[10rem] lg:h-[35rem] md:rounded-[2rem] object-cover lg:object-cover";
    }
  };
  return (
    <section className="w-full">
      {section.data_source !== "none" ? (
        <Link href={route}>
          <img
            src={section.secure_url}
            alt="banner image"
            className={`w-full ${getHeight()}  `}
          />
        </Link>
      ) : (
        <div></div>
      )}
    </section>
  );
};

export default BannerSection;
