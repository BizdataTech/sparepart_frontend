const useResults = async (query, data_source) => {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  let response = await fetch(
    `${BACKEND_URL}/api/sections/search/${data_source}?query=${query}`,
    {
      method: "GET",
    },
  );
  let result = await response.json();
  if (!response.ok) throw Error(result.message);
  return result.result;
};

export default useResults;
