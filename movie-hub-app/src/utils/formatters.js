const SEARCH_PARAMS = [
  {
    key: "sortBy",
    value: "sort_by",
  },
  {
    key: "genreId",
    value: "with_genres",
  },
  {
    key: "year",
    value: "year",
  },
];

export const formatText = (text) => {
  return text.length === 2
    ? text.toUpperCase()
    : text.charAt(0).toUpperCase() + text.slice(1);
};

export const formatUrl = (url, params) => {
  let result = url;

  for (let key in params) {
    if (params.hasOwnProperty(key)) {
      const urlParam = `{${key}}`;
      const urlValue = params[key];

      result = result.replace(urlParam, urlValue);
    }
  }

  return result;
};

export const formatDiscoverUrl = (url, params) => {
  let result = url;

  for (let key in params) {
    if (
      params.hasOwnProperty(key) &&
      SEARCH_PARAMS.find((x) => x.key === key)
    ) {
      const urlParam = `{${key}}`;
      const urlValue = params[key];

      if (urlValue) {
        result = result.replace(urlParam, urlValue);
      } else {
        const queryParamRemove = `&${
          SEARCH_PARAMS.find((x) => x.key === key).value
        }=${urlParam}`;
        result = result.replace(queryParamRemove, "");
      }
    }
  }

  return result;
};
