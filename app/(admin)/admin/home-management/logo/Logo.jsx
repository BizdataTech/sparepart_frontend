"use client";

import { Spinner } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const Logo = () => {
  let [file, setFile] = useState(null);
  let [preview, setPreview] = useState(null);
  let [loading, setLoading] = useState(false);
  let inputRef = useRef(null);

  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    let getLogo = async () => {
      try {
        let response = await fetch(`${BACKEND_URL}/api/admin/home/logo`, {
          method: "GET",
        });
        let result = await response.json();
        if (!response.ok) throw new Error(result.message);
        setPreview(result.logo);
      } catch (error) {
        console.log(error.message);
      }
    };
    getLogo();
  }, []);

  const handleInput = (e) => {
    let file = e.target.files[0];
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const submitLogo = async () => {
    try {
      if (!file) return;
      const formData = new FormData();
      formData.append("logo", file);
      setLoading(true);
      let response = await fetch(`${BACKEND_URL}/api/admin/home/logo`, {
        method: "POST",
        body: formData,
      });
      setLoading(false);
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      toast.success(result.message);
      setFile(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="w-2/6 space-y-2">
      <div className="a-section--title">Select / Update Logo</div>
      <div className="a-section--box flex flex-col gap-4">
        <div className="flex items-center justify-end">
          <button
            className="a-text--button bg-neutral-100 hover:bg-neutral-200 transition-colors active:bg-neutral-100"
            onClick={() => inputRef.current.click()}
          >
            {!file ? "Select Logo" : "Update Logo"}
          </button>
          <input
            type="file"
            className="hidden"
            ref={inputRef}
            onChange={handleInput}
          />
        </div>
        <div>
          {!preview ? (
            <img
              src="/admin/empty.webp"
              className="w-full h-[20rem] object-cover opacity-50"
            />
          ) : (
            <img src={preview} className="h-[20rem] w-full object-contain" />
          )}
        </div>
        <button
          className={`py-4 text-[1.4rem] font-medium bg-black text-white transition-colors ${!file || loading ? "!cursor-not-allowed hover:bg-neutral-700 flex justify-center" : "cursor-pointer"}`}
          onClick={submitLogo}
          disabled={loading || !file}
        >
          {loading ? (
            <Spinner className="w-[2rem] h-[2rem] animate-spin" />
          ) : (
            "Submit Logo"
          )}
        </button>
      </div>
    </section>
  );
};

export default Logo;
