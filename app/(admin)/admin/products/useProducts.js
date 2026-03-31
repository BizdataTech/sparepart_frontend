import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

/**
 * Custom hook for managing product-related operations in the admin panel.
 * Handles fetching, creating, updating, and form state management for products.
 * 
 * @param {Object} product - Optional product object for edit mode.
 */
const useProducts = (product = null) => {
  // --- State Management ---
  
  // Tracks only the fields that have been changed (used for PATCH updates)
  let [updateData, setUpdateData] = useState({});
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  
  // List of images (objects containing url, public_id, and/or file)
  const [images, setImages] = useState([]);
  
  // Fitment/Vehicle compatibility data
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  
  // For 'aftermarket' products, this references the original 'genuine' product
  const [genuineReference, setGenuineReference] = useState(null);
  
  // Form validation errors
  const [errors, setErrors] = useState({});
  
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const router = useRouter();

  // Loading state for API submissions
  const [apiLoading, setApiLoading] = useState(false);

  // Default structure for product general information
  let generalDataSchema = {
    product_title: "",
    product_type: "genuine", // 'genuine' or 'aftermarket'
    description: "",
    price: 0,
    stock: 0,
  };

  // Admin-specific fields like internal part numbers
  let adminFieldSchema = {
    part_number: "",
  };

  // --- Pagination & List State ---
  const [products, setProducts] = useState(null);
  const [results, setResults] = useState(null);
  let [currentPage, setCurrentPage] = useState(1);
  let [totalPages, setTotalPages] = useState(1);

  /**
   * Handles page navigation for the products list
   * @param {string} action - 'up' to increment, 'down' to decrement
   */
  const controlPage = async (action) => {
    if (action === "up" && currentPage < totalPages)
      setCurrentPage((prevPage) => prevPage + 1);
    else if (action === "down" && currentPage > 1)
      setCurrentPage((prevPage) => prevPage - 1);
  };

  // Refetch products whenever the current page changes
  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  // Sync results when products state is updated
  useEffect(() => {
    setResults(products);
  }, [products]);

  /**
   * Fetches a paginated list of products for the admin table
   */
  const fetchProducts = async () => {
    try {
      let response = await fetch(
        `${BACKEND_URL}/api/auto-products?filter=admin-products&current_page=${currentPage}&search=`,
        {
          method: "GET",
        },
      );
      let data = await response.json();
      if (!response.ok) throw new Error(data.message);
      else {
        setProducts(data.result);
        setTotalPages(data.total_pages);
      }
    } catch (error) {
      console.log("error:", error.message);
    }
  };

  // Fetch all categories on component mount
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

  // Fetch all brands on component mount
  useEffect(() => {
    let getBrands = async () => {
      try {
        let response = await fetch(`${BACKEND_URL}/api/brands?search=`, {
          method: "GET",
        });
        let result = await response.json();
        if (!response.ok) throw new Error(result.message);
        setBrands(result.result);
      } catch (error) {
        console.log("error:", error.message);
      }
    };
    getBrands();
  }, []);

  /**
   * Handles category selection and resets related fields
   * @param {Object} category - The selected category object
   */
  const handleCategory = (category) => {
    setSelectedCategory(category);
    setGenuineReference(null);
    setUpdateData((prev) => ({
      ...prev,
      category: category._id,
      genuine_reference: null,
    }));
    // Clear category error if exists
    setErrors((prev) => {
      let { category, ...rest } = prev;
      return rest;
    });
  };

  /**
   * Handles brand selection
   * @param {Object} brand - The selected brand object
   */
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

  /**
   * Filters categories to find sub-categories of a specific parent
   * @param {string} id - Parent category ID
   */
  const getChildCategories = (id) => {
    return categories.filter((category) => {
      if (category.parent && category.parent._id === id) return category;
    });
  };

  // --- Form Input Handling ---
  let [generalData, setGeneralData] = useState(generalDataSchema);
  let [adminFields, setAdminFields] = useState(adminFieldSchema);

  // Initialization: If a product is provided (Edit Mode), populate the form
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

      // If it's an aftermarket product, fetch its genuine reference details
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

  // Reset reference if product type changes to genuine
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

  /**
   * Generic input handler for text/number/select fields
   * Updates state based on the field name and clears errors on interaction
   */
  let handleInput = (event) => {
    let { name, value } = event.target;
    
    // Update appropriate state object based on field categorization
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
    
    // Track changes for the update request
    setUpdateData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field if user has typed something
    if (value.trim().length) {
      setErrors((prev) => {
        let { [name]: _, ...rest } = prev;
        return rest;
      });
    }
    return;
  };

  /**
   * Sets the genuine product reference for aftermarket products
   * @param {Object} reference_object - The product object to reference
   */
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

  /**
   * Adds an image to the preview list and update payload
   * @param {Object} image_object - Contains file object and preview URL
   */
  const handleImages = (image_object) => {
    setImages((prev) => [...prev, image_object]);
    if (product) {
      setUpdateData((prev) => ({
        ...prev,
        images: [...(prev.images || []), image_object.file],
      }));
    }
    // Clear image error
    if (!images.length)
      return setErrors((prev) => {
        let { images, ...rest } = prev;
        return rest;
      });
  };

  // --- Image Management (Delete/Update) ---
  
  // Tracks IDs of existing images that the user wants to delete
  let [cancelledIDs, setCancelledIDs] = useState([]);

  // Sync deleted image IDs with the update payload
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

  /**
   * Removes an image from the UI and schedules it for deletion or ignores it if newly added
   * @param {Event} e - Click event
   * @param {Object} image - Image object to remove
   */
  const cancelImage = (e, image) => {
    e.stopPropagation();
    if (image.public_id) {
      // Existing image on server
      setCancelledIDs((prev) => [...prev, image.public_id]);
    } else {
      // Newly added image (not yet upoloaded)
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

  // --- Vehicle Compatibility (Fitments) ---
  
  const vehicleRef = useRef(false); // Tracks if vehicle selection has been interacted with

  // Sync fitments changes to update payload
  useEffect(() => {
    if (!vehicleRef.current) return;
    setUpdateData((prev) => ({
      ...prev,
      fitments: selectedVehicles,
    }));
  }, [selectedVehicles]);

  /**
   * Adds a vehicle to the product's compatibility list
   * @param {Object} vehicle - Vehicle object
   */
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

  /**
   * Removes a vehicle from compatibility list
   * @param {string} id - Vehicle ID
   */
  const removeVehicle = (id) => {
    if (!vehicleRef.current) vehicleRef.current = true;
    setSelectedVehicles((prev) => {
      return prev.filter((pv) => pv._id !== id);
    });
  };

  // --- Submission Logic ---

  /**
   * Validates and submits the product data to the backend.
   * Handles both Creation (POST) and Update (PATCH).
   */
  const createProduct = async () => {
    let error_obj = {};
    let data = {
      ...generalData,
      ...adminFields,
      category: selectedCategory?._id || null,
      brand: selectedBrand?._id || null,
    };
    
    // Basic Validation
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

    // If there are errors, stop submission and display them
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
        // --- Update Flow (PATCH) ---
        console.log("update data:", updateData);
        if (!Object.keys(updateData).length)
          return toast.warning(
            "Updation Dismissed : No new data detected to update product data",
          );

        // Append only modified fields to FormData
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

        setApiLoading(true);
        response = await fetch(
          `${BACKEND_URL}/api/auto-products/${product._id}`,
          {
            method: "PATCH",
            body: formData,
            credentials: "include",
          },
        );
        setApiLoading(false);
      } else {
        // --- Creation Flow (POST) ---
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
          credentials: "include",
          body: formData,
        });
        setApiLoading(false);
      }

      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      
      toast.success(result.message);
      router.push("/admin/products");
    } catch (error) {
      console.log(error.message);
      toast.error("Failed : Something went wrong!");
    }
  };

  // Return all necessary states and handlers for the Product components
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
    brands,
    selectedBrand,
    handleBrand,
    categories,
    selectedCategory,
    handleCategory,
    products: results,
    setResults,
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

