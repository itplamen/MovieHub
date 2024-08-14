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

  const postData = async (url, data) => {
    try {
      if (url && data) {
        const response = await fetch(`${config.apiBaseUrl}/${url}`, {
          method: "POST",
          body: JSON.stringify(data).slice(1, -1),
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${config.apiKey}`,
          },
        });

        const result = await response.json();
        return result;
      }
    } catch (error) {
      console.error("postData error");
      console.error(error);
    }
  };

  return { fetchData, postData };
};

export default useApi;
