"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import useCategories from "./useCategories";
import { CaretRight, CaretLeft } from "phosphor-react";
import ShimmerContainer from "@/components/admin/ShimmerContainer";
import SearchSection from "@/components/admin/SearchSection";
import EmptyRow from "@/components/admin/EmptyRow";
import Category from "./Category";

const Categories = () => {
  const {
    deleteCategory,
    categories,
    setResults,
    currentPage,
    totalPages,
    handlePage,
  } = useCategories();
  const router = useRouter();

  const handleEdit = (id) => {
    router.push(
      `categories/category-management?action=update&category_id=${id}`,
    );
  };

  return (
    <section className="a-section--container pb-8">
      <div>
        {categories === null ? (
          <ShimmerContainer />
        ) : (
          <div className="w-full max-w-full min-h-[88svh] flex flex-col gap-4">
            <div className="flex flex-row justify-between items-center">
              <SearchSection
                placeholder="Search for categories"
                type="categories"
                setResults={setResults}
              />
              <Link
                className="a-text--button ml-auto !text-[1.2rem] text-white bg-black/80 hover:bg-black !py-3 transition !rounded-[.3rem]"
                href="categories/category-management?action=create"
              >
                Add new category
              </Link>
            </div>

            {/* Table */}
            <div className="w-full a-text--body a-section--box !p-0 border-0 border-neutral-300 bg-white">
              <div className="grid grid-cols-4 gap-8 py-4 px-4 border-0 border-neutral-200 font-semibold text-neutral-700">
                <div>Category Title</div>
                <div className="text-center">Level</div>
                <div className="text-center">Parent</div>
                <div className="text-end">Actions</div>
              </div>

              {categories.map((category) => (
                <Category
                  category={category}
                  editCategory={() => handleEdit(category._id)}
                  deleteCategory={() => deleteCategory(category._id)}
                />
              ))}
              {categories.length === 0 && <EmptyRow text="No result found" />}
            </div>
            <div className="flex justify-end items-center  gap-8 mt-auto">
              <CaretLeft
                className={`w-[1.5rem] h-[1.5rem] cursor-pointer ${
                  currentPage == 1 ? "text-neutral-300" : ""
                }`}
                weight="bold"
                onClick={() => handlePage("down")}
              />
              <div className="text-[1.4rem]">{currentPage}</div>
              <CaretRight
                className={`w-[1.5rem] h-[1.5rem] cursor-pointer ${
                  currentPage === totalPages ? "text-neutral-300" : ""
                }`}
                weight="bold"
                onClick={() => handlePage("up")}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;
