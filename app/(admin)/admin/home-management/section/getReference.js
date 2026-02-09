const getReference = async (reference_id, data_source) => {
  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  let response = await fetch(
    `${BACKEND_URL}/api/sections/reference/${reference_id}?data_source=${data_source}`,
    {
      method: "GET",
    },
  );
  let result = await response.json();
  if (!response.ok) throw new Error(result.message);
  return `${result.brand || ""} ${result.product_title || ""} ${result.title}`;
};

export default getReference;
