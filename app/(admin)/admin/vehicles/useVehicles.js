import { useEffect, useState } from "react";
import { toast } from "sonner";

const useVehicle = () => {
  let [vehicles, setVehicles] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  let [totalPages, setTotalPages] = useState(0);
  let dataSchema = {
    make: "",
    model: "",
    start_year: "",
    end_year: "",
    engine: "",
  };
  let [data, setData] = useState(dataSchema);
  let [state, setState] = useState("idle");
  let [errors, setErrors] = useState({});

  // update variables
  let [selectedVehicle, setSelectedVehicle] = useState(null);

  let BACKEND_URL = "http://localhost:4000"; //|| process.env.NEXT_PUBLIC_BACKEND_URL

  useEffect(() => {
    async function getVehicles() {
      try {
        let response = await fetch(
          `${BACKEND_URL}/api/auto-vehicles?type=admin&page=${currentPage}`,
          {
            method: "GET",
          }
        );

        let result = await response.json();
        if (!response.ok) throw new Error(result.message);
        setVehicles(result.vehicles);
        setTotalPages(result.total_pages);
      } catch (error) {
        console.log("errors:", error.message);
      }
    }
    getVehicles();
  }, [currentPage]);

  // handling form on vehicle select
  useEffect(() => {
    if (selectedVehicle) {
      let v = vehicles.find((v) => v._id === selectedVehicle);
      setData(
        v
          ? {
              make: v.make,
              model: v.model,
              start_year: v.start_year,
              end_year: v.end_year,
              engine: v.engine,
            }
          : dataSchema
      );
    } else setData(dataSchema);
  }, [selectedVehicle]);

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

  const handleInputs = (event) => {
    let { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors?.response) {
      setErrors((prev) => {
        let { response, ...rest } = prev;
        return rest;
      });
    }
  };

  let handleVehicle = (_id) => {
    setSelectedVehicle((prev) => (prev === _id ? null : _id));
  };

  const submitVehicle = async () => {
    try {
      setState("loading");
      let response = null;
      if (selectedVehicle) {
        response = await fetch(
          `${BACKEND_URL}/api/auto-vehicles/${selectedVehicle}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
      } else {
        response = await fetch(`${BACKEND_URL}/api/auto-vehicles`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }

      setState("idle");
      let result = await response.json();
      if (response.status === 400) {
        return setErrors((prev) => ({
          ...prev,
          response: result.message,
        }));
      }
      if (!response.ok) throw new Error(result.message);

      setVehicles((prev) => {
        if (selectedVehicle) {
          return vehicles.map((v) =>
            v._id == selectedVehicle ? result.vehicle : v
          );
        }
        return [...prev, result.vehicle];
      });
      setSelectedVehicle(null);
      setData(dataSchema);
      toast.success("Vehicle Added");
    } catch (error) {
      console.log("error:", error.message);
    }
  };

  return {
    vehicles,
    data,
    handleInputs,
    submitVehicle,
    state,
    currentPage,
    totalPages,
    handlePage,
    update: {
      selectedVehicle,
      handleVehicle,
    },
    errors,
  };
};

export default useVehicle;
