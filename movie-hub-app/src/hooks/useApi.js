import config from "@/data/configurations.json";

const useApi = () => {
  const fetchData = async (url) => {
    try {
      if (url) {
        const response = await fetch(`${config.apiBaseUrl}/${url}`, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
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
          body: JSON.stringify(data),
          headers: {
            accept: "application/json",
            "Content-Type": "application/json;charset=utf-8",
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
