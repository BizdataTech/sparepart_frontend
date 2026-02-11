import { useEffect, useState } from "react";
import { toast } from "sonner";

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

  const deleteSection = async (id) => {
    try {
      let response = await fetch(`${BACKEND_URL}/api/sections/${id}`, {
        method: "DELETE",
      });
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      toast.success(result.message);
      getSections();
    } catch (error) {
      console.log(error.message);
      toast.error("Failed : Section failed to delete");
    }
  };

  return { sections, deleteSection, refetch: getSections };
};

export default useSection;
