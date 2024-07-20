import config from "@/data/configurations.json";

const useFetch = (url) => {
  const fetchData = async () => {
    try {
      if (url) {
        const response = await fetch(`${config.apiBaseUrl}/${url}`, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${config.apiKey}`,
          },
        });

        const result = await response.json();
        return result;
      }
    } catch (error) {
      console.error("useFetch error");
      console.error(error);
    }
  };

  return fetchData;
};

export default useFetch;
