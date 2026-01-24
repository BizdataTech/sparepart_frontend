"use client";

import { Spinner } from "phosphor-react";
import { useEffect, useRef, useState } from "react";

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
      console.log(result.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="a-section--box w-1/2 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="a-section--title">Select / Update Logo</div>
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
          <img src={preview} className="h-[10rem] object-contain" />
        )}
      </div>
      <button
        className={`a-text--button text-neutral-900 bg-neutral-50 self-end transition-colors ${!file || loading ? "!cursor-not-allowed hover:bg-neutral-50 !opacity/10" : "hover:bg-green-100/80 "}`}
        onClick={submitLogo}
        disabled={loading || !file}
      >
        {loading ? (
          <Spinner className="w-[2rem] h-[2rem] animate-spin" />
        ) : (
          "Submit Logo"
        )}
      </button>
    </section>
  );
};

export default Logo;
