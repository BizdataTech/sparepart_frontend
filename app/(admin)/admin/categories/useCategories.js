import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

/**
 * Custom hook for managing category-related operations in the admin panel.
 * Handles fetching, creating, updating, and deleting categories with level-based hierarchy.
 * 
 * @param {string} action - The current action mode ('create' or 'update').
 * @param {string} category_id - ID of the category being updated (if in update mode).
 */
const useCategories = (action, category_id) => {
  // --- State Management ---
  
  const [categories, setCategories] = useState(null); // Full list of categories from API
  const [results, setResults] = useState(null);      // Filtered/search results for display
  const [error, setError] = useState(null);          // General error messages
  
  const [actualCategoryTitle, setActualCategoryTitle] = useState(""); // Original title (for uniqueness check)
  const [categoryTitle, setCategoryTitle] = useState("");              // Current title in form
  
  const [levels, setLevels] = useState([]);          // Available category levels (1, 2, 3...)
  const [selectedLevel, setSelectedLevel] = useState(1); // Currently selected level for new/edit category
  
  const [parents, setParents] = useState([]);        // List of potential parent categories for the selected level
  const [selectedParent, setSelectedParent] = useState(null); // Chosen parent ID
  
  const [errors, setErrors] = useState({});          // Form validation errors
  const [navbar, setNavbar] = useState(false);       // Whether category should appear in main navigation

  const router = useRouter();
  const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  /**
   * Effect for Initialization: If in 'update' mode, fetch the existing category's details.
   */
  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch(
        `${BACKEND_API_URL}/api/auto-categories/${category_id}`,
        {
          method: "GET",
        },
      );
      const data = await response.json();
      if (response.ok) {
        const { title, level, parent } = data.category;
        setActualCategoryTitle(title);
        setCategoryTitle(title);
        setSelectedLevel(level);
        setSelectedParent(parent?._id || null); // Note: parent might be null for level 1
        setParents(data.parents); // Siblings/potential parents
      }
    };
    if (action === "update") fetchCategory();
  }, []);

  // --- Pagination Logic ---
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  /**
   * Handles page changes for the categories table
   * @param {string} action - 'up' or 'down'
   */
  const handlePage = (action) => {
    if (action === "up" && currentPage < totalPages)
      setCurrentPage((prevPage) => prevPage + 1);
    else if (action === "down" && currentPage > 1)
      setCurrentPage((prevPage) => prevPage - 1);
  };

  /**
   * Effect: Fetch paginated categories whenever the page changes.
   */
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        `${BACKEND_API_URL}/api/auto-categories?filter=all&current_page=${currentPage}&search=`,
        {
          method: "GET",
        },
      );
      const data = await response.json();
      if (response.ok) {
        setCategories(data.result);
        setTotalPages(data.total_pages);
      } else throw new Error(data.message);
    };
    fetchCategories();
  }, [currentPage]);

  // Sync results when categories state updates
  useEffect(() => {
    setResults(categories);
  }, [categories]);

  /**
   * Effect: Fetch all available level numeric values (e.g. [1, 2, 3]) on mount.
   */
  useEffect(() => {
    async function fetchLevels() {
      const response = await fetch(
        `${BACKEND_API_URL}/api/auto-categories?filter=level`,
        {
          method: "GET",
        },
      );
      const data = await response.json();
      if (response.ok) {
        setLevels(data.levels);
      }
    }
    fetchLevels();
  }, []);

  /**
   * Updates category title and performs real-time validation for length.
   * @param {string} value - New title
   */
  const handleCategoryTitle = (value) => {
    setCategoryTitle(value);
    setErrors((prevErrors) => {
      let { categoryTitle, ...rest } = prevErrors;
      if (value.trim().length >= 3) return rest;
      return { ...rest, categoryTitle: "Required atleast 3 character" };
    });
  };

  /**
   * Updates selected level and fetches appropriate parent categories.
   * If level 1 is selected, parents are not required.
   * @param {number} level - Numeric level (1, 2, 3...)
   */
  const handleSelectedLevel = async (level) => {
    setSelectedLevel(level);
    setSelectedParent(null); // Reset parent selection when level changes
    
    if (level === 1) {
      setErrors((prevErrors) => {
        const { parent, ...rest } = prevErrors;
        return rest;
      });
      setParents([]);
      return;
    }
    
    try {
      // Fetch categories from the level immediately above the selected level to serve as parents
      const response = await fetch(
        `${BACKEND_API_URL}/api/auto-categories?filter=parent&level=${level}`,
        { method: "GET" },
      );
      const data = await response.json();
      if (response.ok) {
        setParents(data.parentCategories);
      } else throw new Error();
      return;
    } catch (error) {
      setError("Network Error, check your internet connection");
      setParents([]);
      return;
    }
  };

  /**
   * Updates the chosen parent category and clears existing parent errors.
   * @param {string} id - Selected parent's ID
   */
  const handleParent = (id) => {
    setSelectedParent(id);
    setErrors((prevErrors) => {
      const { parent, ...rest } = prevErrors;
      return rest;
    });
  };

  /**
   * Validates form data (including title uniqueness check) and submits to backend.
   * Supports both Create and Update operations.
   */
  const submitCategory = async (event) => {
    let errorObject = {};
    try {
      // Validation: Title Length
      if (categoryTitle.trim().length < 3)
        errorObject.categoryTitle = "Required atleast 3 character";
      else {
        // Validation: Title Uniqueness (checks if another category has the same title)
        const response = await fetch(
          `${BACKEND_API_URL}/api/auto-categories?filter=title&title=${categoryTitle}&actual_title=${actualCategoryTitle}`,
          { method: "GET" },
        );
        const data = await response.json();
        if (response.ok) {
          if (data.matchingCategory)
            errorObject.categoryTitle = "Title already taken";
        } else {
          throw new Error(data.message);
        }
      }
      
      // Validation: Parent requirement for levels > 1
      if (selectedLevel !== 1 && !selectedParent)
        errorObject.parent = "Select one parent for this level";

      // Stop if any errors found
      if (Object.keys(errorObject).length) {
        toast.error("Enter all required data inorder to create a new category");
        return setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          Object.entries(errorObject).forEach(([key, value]) => {
            newErrors[key] = value;
          });
          return newErrors;
        });
      }

      // Prepare request payload
      const data = {
        title: categoryTitle,
        level: selectedLevel,
        isNavItem: navbar,
        parent: selectedParent,
      };
      
      let response;
      if (action === "create") {
        response = await fetch(`${BACKEND_API_URL}/api/auto-categories`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        });
      } else if (action === "update") {
        response = await fetch(
          `${BACKEND_API_URL}/api/auto-categories/${category_id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(data),
          },
        );
      }

      const responseData = await response.json();
      if (response.ok) {
        toast.success(responseData.message);
        router.push("/admin/categories");
      } else throw new Error(responseData.message);
    } catch (error) {
      setError(error.message);
    }
  };

  /**
   * Deletes a category by ID. Can be called from the list view or update view.
   * @param {string} id - ID of the category to delete
   */
  const deleteCategory = async (id) => {
    let deleteid = id || category_id;
    try {
      const response = await fetch(
        `${BACKEND_API_URL}/api/auto-categories/${deleteid}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      const data = await response.json();
      if (response.ok) {
        if (data.delete) {
          // Update local list after deletion
          setCategories(data.categories);
          toast.success(data.message);
          // If deleted from within the update page, redirect back to list
          if (action === "update") router.push("/admin/categories");
        } else toast.error(data.message);
      } else throw new Error(data.message);
    } catch (error) {
      console.log("error:", error.message);
    }
  };

  return {
    action,
    categories: results,
    setResults,
    currentPage,
    totalPages,
    handlePage,
    actualCategoryTitle,
    categoryTitle,
    handleCategoryTitle,
    levels,
    selectedLevel,
    handleSelectedLevel,
    parents,
    selectedParent,
    handleParent,
    submitCategory,
    deleteCategory,
    navbar,
    setNavbar,
    errors,
  };
};

export default useCategories;
