import useSWR from "swr";
import { BASE_URL } from "../../api/instance";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  });

export const useCategories = () => {
  const { data, error, mutate } = useSWR(`${BASE_URL}category/all`, fetcher);

  return {
    categories: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
