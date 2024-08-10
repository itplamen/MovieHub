import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import config from "@/data/configurations.json";
import constants from "@/data/constants.json";
import useLocalStorage from "@/hooks/useLocalStorage";

const Favorites = ({ details, type }) => {
  const { data, saveData, removeData } = useLocalStorage(constants.Favorites);
  const [isFavorie, setIsFavorie] = useState(false);

  useEffect(() => {
    setIsFavorie(
      data && data.length > 0 ? data.some((x) => x.key === details.id) : false
    );
  }, [data]);

  const addFavorite = () => {
    saveData({
      key: details.id,
      value: {
        type: type,
        posterImg: `${config.imgBaseUrl}/${config.imageSizes.w500}/${details.poster_path}`,
      },
    });
    setIsFavorie(true);
  };

  const removeFavorite = () => {
    removeData({ key: details.id });
    setIsFavorie(false);
  };

  return (
    <Button
      variant={`${isFavorie ? "" : "outline-"}primary`}
      onClick={isFavorie ? removeFavorite : addFavorite}
    >
      <i class={`bi bi-heart${isFavorie ? "-fill" : ""}`}></i>{" "}
      <span>{`${isFavorie ? "In" : "Add to"} Favorites`}</span>
    </Button>
  );
};

export default Favorites;
