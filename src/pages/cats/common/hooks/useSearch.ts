import { useQuery } from "react-query";
import { useQueryParams } from "../../../../common/hooks/useQueryParams";

const useSearch = () => {
  const { params } = useQueryParams();

  const fetchImage = async () => {
    const imageId = params.image_id;

    if (!imageId) {
      return { image: null };
    }

    const response = await fetch(
      `https://api.thecatapi.com/v1/images/${imageId}`
    );

    const data = await response.json();
    const image = data;
    console.log(image);

    return { image };
  };

  const { isLoading, isFetching, data, refetch } = useQuery(
    ["image", params.image_id],
    fetchImage,
    {
      cacheTime: 0,
    }
  );

  return {
    isImageLoading: isLoading || isFetching,
    image: data?.image,
    refetchImage: refetch,
  };
};

export { useSearch };
