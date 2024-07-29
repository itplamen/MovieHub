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
