import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const useProducts = (product = null) => {
  let [updateData, setUpdateData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [genuineReference, setGenuineReference] = useState(null);
  const [errors, setErrors] = useState({});
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const router = useRouter();

  const [apiLoading, setApiLoading] = useState(false);

  let generalDataSchema = {
    product_title: "",
    product_type: "genuine",
    description: "",
    price: 0,
    stock: 0,
  };

  let adminFieldSchema = {
    part_number: "",
  };

  // getting all products
  const [products, setProducts] = useState(null);
  let [currentPage, setCurrentPage] = useState(1);
  let [totalPages, setTotalPages] = useState(1);

  const controlPage = async (action) => {
    if (action === "up" && currentPage < totalPages)
      setCurrentPage((prevPage) => prevPage + 1);
    else if (action === "down" && currentPage > 1)
      setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      let response = await fetch(
        `${BACKEND_URL}/api/auto-products?filter=admin-products&current_page=${currentPage}`,
        {
          method: "GET",
        },
      );
      let data = await response.json();
      if (!response.ok) throw new Error(data.message);
      else {
        setProducts(data.products);
        setTotalPages(data.total_pages);
      }
    } catch (error) {
      console.log("error:", error.message);
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch(
        `${BACKEND_URL}/api/auto-categories?filter=product-category`,
        {
          method: "GET",
        },
      );
      const data = await response.json();
      setCategories(data.categories);
    };
    getCategories();
  }, []);

  useEffect(() => {
    let getBrands = async () => {
      try {
        let response = await fetch(`${BACKEND_URL}/api/brands`, {
          method: "GET",
        });
        let result = await response.json();
        if (!response.ok) throw new Error(result.message);
        setBrands(result.brands);
      } catch (error) {
        console.log("error:", error.message);
      }
    };
    getBrands();
  }, []);

  const handleCategory = (category) => {
    setSelectedCategory(category);
    setGenuineReference(null);
    setUpdateData((prev) => ({
      ...prev,
      category: category._id,
      genuine_reference: null,
    }));
    setErrors((prev) => {
      let { category, ...rest } = prev;
      return rest;
    });
  };

  const handleBrand = (brand) => {
    setSelectedBrand(brand);
    setUpdateData((prev) => ({
      ...prev,
      brand: brand._id,
    }));
    setErrors((prev) => {
      let { brand, ...rest } = prev;
      return rest;
    });
  };

  const getChildCategories = (id) => {
    return categories.filter((category) => {
      if (category.parent && category.parent._id === id) return category;
    });
  };

  // handle input fields
  let [generalData, setGeneralData] = useState(generalDataSchema);
  let [adminFields, setAdminFields] = useState(adminFieldSchema);

  useEffect(() => {
    if (product) {
      setGeneralData({
        product_title: product.product_title,
        product_type: product.product_type,
        description: product.description,
        price: String(product.price),
        stock: String(product.available_stock),
      });
      setAdminFields({
        part_number: product.part_number,
      });
      setSelectedCategory(product.category);
      setSelectedBrand(product.brand);

      setImages(
        product.images.map((file) => ({
          url: file.url,
          public_id: file.public_id,
        })),
      );
      setSelectedVehicles(product.fitments);

      try {
        if (product.genuine_reference) {
          const getReferenceObject = async () => {
            let response = await fetch(
              `${BACKEND_URL}/api/auto-products/${product.genuine_reference}?filter=genuine-update`,
              {
                method: "GET",
              },
            );
            let result = await response.json();
            if (!response.ok) throw new Error(result.message);
            setGenuineReference(result.product);
          };
          getReferenceObject();
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  }, [product]);

  useEffect(() => {
    setErrors((prev) => {
      if (prev.reference) {
        let { reference, ...rest } = prev;
        return rest;
      }
      return prev;
    });
    if (generalData.product_type === "genuine") {
      setGenuineReference(null);
    }
  }, [generalData.product_type]);

  let handleInput = (event) => {
    let { name, value } = event.target;
    if (Object.keys(generalDataSchema).includes(name))
      setGeneralData((prev) => ({
        ...prev,
        [name]: value,
      }));
    else if (Object.keys(adminFieldSchema).includes(name))
      setAdminFields((prev) => ({
        ...prev,
        [name]: value,
      }));
    setUpdateData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (value.trim().length) {
      setErrors((prev) => {
        let { [name]: _, ...rest } = prev;
        return rest;
      });
    }
    return;
  };

  const handleGenuineReference = (reference_object) => {
    setGenuineReference(reference_object);
    setUpdateData((prev) => ({
      ...prev,
      genuine_reference: reference_object._id,
    }));
    setErrors((prev) => {
      let { reference, ...rest } = prev;
      return rest;
    });
  };

  const handleImages = (image_object) => {
    setImages((prev) => [...prev, image_object]);
    if (product) {
      setUpdateData((prev) => ({
        ...prev,
        images: [...(prev.images || []), image_object.file],
      }));
    }
    if (!images.length)
      return setErrors((prev) => {
        let { images, ...rest } = prev;
        return rest;
      });
  };

  // image update
  let [cancelledIDs, setCancelledIDs] = useState([]);

  useEffect(() => {
    setImages((prev) => {
      return prev.filter((file) => !cancelledIDs.includes(file.public_id));
    });
    setUpdateData((prev) => {
      let new_update = { ...prev };
      if (!cancelledIDs.length) delete new_update.cancelledIDs;
      else new_update.cancelledIDs = cancelledIDs;
      return new_update;
    });
  }, [cancelledIDs]);

  const cancelImage = (e, image) => {
    e.stopPropagation();
    if (image.public_id) {
      setCancelledIDs((prev) => [...prev, image.public_id]);
    } else {
      setImages((prev) => prev.filter((obj) => obj.preview !== image.preview));
      setUpdateData((prev) => {
        let new_update = { ...prev };
        if (new_update.images.length === 1) delete new_update.images;
        else
          new_update.images = new_update.images.filter(
            (file) => file.preview !== image.preview,
          );
        return new_update;
      });
    }
  };

  const vehicleRef = useRef(false);

  useEffect(() => {
    if (!vehicleRef.current) return;
    setUpdateData((prev) => ({
      ...prev,
      fitments: selectedVehicles,
    }));
  }, [selectedVehicles]);

  const selectVehicle = (vehicle) => {
    if (!vehicleRef.current) vehicleRef.current = true;
    setSelectedVehicles((prev) => [...prev, vehicle]);
    if (!selectedVehicles.length) {
      setErrors((prev) => {
        let { fitments, ...rest } = prev;
        return rest;
      });
    }
  };

  const removeVehicle = (id) => {
    if (!vehicleRef.current) vehicleRef.current = true;
    setSelectedVehicles((prev) => {
      return prev.filter((pv) => pv._id !== id);
    });
  };

  const createProduct = async () => {
    let error_obj = {};
    let data = {
      ...generalData,
      ...adminFields,
      category: selectedCategory?._id || null,
      brand: selectedBrand?._id || null,
    };
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === "string" && !value.trim())
        error_obj[key] = `${key.split("_").join(" ")} required`;
      else if (typeof value === "number" && value <= 0)
        error_obj[key] = `invalid ${key} entry`;
      else if (value === null) error_obj[key] = "select one value";
    });

    if (!images.length) error_obj.images = "required atleast one image";
    if (!selectedVehicles.length)
      error_obj.fitments =
        "required to choose atleast one fitment matching this product";
    if (data.product_type !== "genuine" && data.category && !genuineReference)
      error_obj.reference = "genuine product reference required";

    if (Object.keys(error_obj).length)
      return setErrors((prev) => {
        let new_errors = { ...prev };
        Object.entries(error_obj).forEach(([key, value]) => {
          new_errors[key] = value;
        });
        return new_errors;
      });

    let formData = new FormData();
    let response;

    try {
      if (product) {
        console.log("update data:", updateData);
        if (!Object.keys(updateData).length)
          return toast.warning(
            "Updation Dismissed : No new data detected to update product data",
          );

        Object.entries(updateData).forEach(([key, value]) => {
          if (key === "images")
            value.forEach((file) => formData.append("image", file));
          else if (key === "cancelledIDs")
            formData.append("cancelledIDs", JSON.stringify(value));
          else if (key === "fitments")
            formData.append(
              "fitments",
              JSON.stringify(value.map((v) => v._id)),
            );
          else formData.append(key, value);
        });

        // update request
        setApiLoading(true);
        response = await fetch(
          `${BACKEND_URL}/api/auto-products/${product._id}`,
          {
            method: "PATCH",
            body: formData,
          },
        );
        setApiLoading(false);
      } else {
        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, value.trim());
        });
        if (genuineReference !== null)
          formData.append("genuine_reference", genuineReference._id);
        images.forEach((image) => formData.append("image", image.file));
        let fitments = selectedVehicles.map((vehicle) => vehicle._id);
        formData.append("fitments", JSON.stringify(fitments));

        setApiLoading(true);
        response = await fetch(`${BACKEND_URL}/api/auto-products`, {
          method: "POST",
          body: formData,
        });
        setApiLoading(false);
      }

      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      console.log(result.message);
      toast.success(result.message);
      router.push("/admin/products");
    } catch (error) {
      console.log(error.message);
      toast.error("Failed : Something went wrong!");
    }
  };

  const deleteAllProducts = async () => {
    try {
      let response = await fetch(`${BACKEND_URL}/api/products`, {
        method: "DELETE",
      });
      let data = await response.json();
      if (!response.ok) throw new Error(data.message);
      else {
        toast.success(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return {
    data: {
      generalData,
      adminFields,
      handleInput,
    },
    images,
    handleImages,
    cancelImage,
    controlPage,
    currentPage,
    totalPages,
    deleteAllProducts,
    brands,
    selectedBrand,
    handleBrand,
    categories,
    selectedCategory,
    handleCategory,
    products,
    reference: {
      genuineReference,
      handleGenuineReference,
    },
    vehicle_utility_object: {
      selectedVehicles,
      selectVehicle,
      removeVehicle,
    },
    getChildCategories,
    createProduct,
    apiLoading,
    errors,
    refetch: fetchProducts,
  };
};

export default useProducts;
