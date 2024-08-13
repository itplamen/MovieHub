import config from "@/data/configurations.json";

const useApi = () => {
  const fetchData = async (url) => {
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
      console.error("fetchData error");
      console.error(error);
    }
  };

  return fetchData;
};

export default useApi;
