import { useEffect, useState } from "react";

const useSection = () => {
  const [sections, setSections] = useState(null);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    getSections();
  }, []);

  const getSections = async () => {
    try {
      let response = await fetch(`${BACKEND_URL}/api/sections`, {
        method: "GET",
      });
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      console.log("sections:", result.sections);
      setSections(result.sections);
    } catch (error) {
      console.log(error.message);
    }
  };

  return { sections, refetch: getSections };
};

export default useSection;
