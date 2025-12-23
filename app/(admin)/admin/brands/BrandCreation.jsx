import { Upload, Spinner } from "phosphor-react";

const BrandCreation = ({ utils }) => {
  const {
    status,
    brandName,
    handleBrandName,
    fileInputRef,
    openSystemFiles,
    handleFileChange,
    previewURL,
    submitBrand,
    errors,
  } = utils;
  return (
    <section className="flex items-start justify-between">
      <div className="flex flex-col gap-[1.5rem] w-1/2">
        <div className="w-1/2 space-y-1">
          <div className="flex items-end justify-between">
            <label htmlFor="" className="a-text--label">
              Brand Name
            </label>
            {errors.brand_name && (
              <div className="a-text--error">{errors.brand_name}</div>
            )}
          </div>

          <input
            type="text"
            className="a-input"
            placeholder="Eg: Skoda"
            value={brandName}
            onChange={handleBrandName}
          />
        </div>
        <div className="space-y-1">
          <div className="flex items-end justify-between">
            <div className="a-text--label">Brand Image</div>
            {errors.brand_image && (
              <div className="a-text--error">{errors.brand_image}</div>
            )}
          </div>
          <div
            className="border border-neutral-200 h-[20rem] bg-white flex items-center justify-center cursor-pointer relative"
            onClick={openSystemFiles}
          >
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            {previewURL ? (
              <div className="absolute inset-0">
                <img
                  src={previewURL}
                  alt="brand preview image"
                  className="w-full h-full object-contain"
                />
                <div className="bg-black/40 absolute inset-0"></div>
                <div className="absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] z-10 text-white text-[1.8rem] font-medium w-full text-center">
                  Click here to change the preview image
                </div>
              </div>
            ) : (
              <div className="a-text--label !text-[1.6rem] !flex items-center gap-0">
                Upload image from your device{" "}
                <Upload className="w-[4rem] h-[2rem]" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="">
        <button
          className="a-text--button text-white bg-black"
          onClick={submitBrand}
        >
          {status !== "idle" ? (
            <div className="flex items-center gap-4">
              Creating Brand
              <Spinner className="w-[2rem] h-[2rem] animate-spin" />
            </div>
          ) : (
            "Create Brand"
          )}
        </button>
      </div>
    </section>
  );
};

export default BrandCreation;
