export const formatText = (text) => {
  return text.length === 2
    ? text.toUpperCase()
    : text.charAt(0).toUpperCase() + text.slice(1);
};

export const formatUrl = (url, type, id) => {
  return type && id
    ? url.replace("{type}", type).replace("{id}", id)
    : type
    ? url.replace("{type}", type)
    : url;
};
