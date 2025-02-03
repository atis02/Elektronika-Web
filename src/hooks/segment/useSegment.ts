import useSWR, { mutate } from "swr";
import { BASE_URL } from "../../api/instance";

const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch segments: ${response.statusText}`);
  }

  return response.json();
};

export const useSegment = () => {
  const { data, error } = useSWR(`${BASE_URL}segment/all`, fetcher);

  return {
    segment: data?.segments || [], // Ensure segment is always an array
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};
