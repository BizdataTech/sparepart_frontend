import { DotsThreeVertical, Spinner } from "phosphor-react";
import { useEffect, useRef, useState } from "react";

const Category = ({ category, editCategory, deleteCategory }) => {
  let [box, setBox] = useState(false);
  let [loading, setLoading] = useState(false);
  let boxRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setBox(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div
      key={category._id}
      className="grid grid-cols-4 gap-8 py-4 px-4 border-b-0 border-neutral-200 last:border-b-0 text-neutral-800 items-center even:bg-neutral-100"
    >
      <div className="truncate font-medium">{category.title}</div>
      <div className="text-center">{category.level}</div>
      <div className="text-center font-medium">
        {category?.parent?.title ? category?.parent?.title : "-"}
      </div>

      {/* 3-dot button with dropdown */}
      <div className="text-center relative mr-6">
        <button
          className="cursor-pointer w-full flex justify-end"
          onClick={() => setBox(true)}
        >
          <DotsThreeVertical size={20} weight="bold" />
        </button>

        {box && (
          <div
            className="absolute top-full right-4 bg-white border border-neutral-200 rounded shadow-md z-10"
            ref={boxRef}
          >
            <ul className="flex flex-col">
              <li>
                <button
                  onClick={editCategory}
                  disabled={loading}
                  className="w-full hover:bg-neutral-100 cursor-pointer px-4 py-2"
                >
                  Edit
                </button>
              </li>
              <li>
                <button
                  onClick={async () => {
                    setLoading(true);
                    await deleteCategory();
                    setBox(false);
                    setLoading(false);
                  }}
                  disabled={loading}
                  className={`w-full text-red-700 hover:bg-neutral-100 ${loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"} px-4 py-2`}
                >
                  {loading ? (
                    <div className="flex items-center gap-1">
                      Deleting{" "}
                      <Spinner className="w-[1.5rem] h-[1.5rem] animate-spin" />
                    </div>
                  ) : (
                    "Delete"
                  )}
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
