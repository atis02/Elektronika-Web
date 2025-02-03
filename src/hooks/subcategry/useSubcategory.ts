import useSWR from "swr";
import { BASE_URL } from "../../api/instance";

const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch subcategories: ${response.statusText}`);
  }

  return response.json();
};

export const useSubcategories = (selectedCategoryId: string | null) => {
  const { data, error } = useSWR(`${BASE_URL}subCategory/all`, fetcher);

  const filteredSubcategories =
    data?.subCategories.filter((sub: any) => sub.categoryId === selectedCategoryId) || [];
  
  return {
    subcategories: filteredSubcategories, // Ensure subcategories is always an array
    isLoading: !error && !data,
    isError: !!error,
  };
};
