import { useEffect, useState } from "react";

const useVehicle = () => {
  let [vehicles, setVehicles] = useState([]);
  let [results, setResults] = useState(null);
  let [currentPage, setCurrentPage] = useState(1);
  let [totalPages, setTotalPages] = useState(0);
  let [selectedVehicle, setSelectedVehicle] = useState(null);

  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    getVehicles();
  }, [currentPage]);

  useEffect(() => {
    setResults(vehicles);
  }, [vehicles]);

  const getVehicles = async () => {
    try {
      let response = await fetch(
        `${BACKEND_URL}/api/auto-vehicles?type=admin&page=${currentPage}&search=`,
        {
          method: "GET",
        },
      );

      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setVehicles(result.result);
      setTotalPages(result.total_pages);
    } catch (error) {
      console.log("errors:", error.message);
    }
  };

  const handlePage = (action) => {
    switch (action) {
      case "up":
        if (currentPage < totalPages) return setCurrentPage(currentPage + 1);
        return;
      case "down":
        if (currentPage > 1) return setCurrentPage(currentPage - 1);
        return;
    }
  };

  return {
    vehicles: results,
    setResults,
    selectedVehicle,
    setSelectedVehicle,
    currentPage,
    totalPages,
    handlePage,
    refetch: getVehicles,
  };
};

export default useVehicle;
