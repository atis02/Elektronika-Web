import { useState, useEffect } from "react";
import axios from "axios"; // Or your preferred HTTP client

interface UseProductResult {
  products: any[] | null;
  isLoading: boolean;
  isError: boolean;
}

export const useProduct = (categoryId?: string): UseProductResult => {
  const [products, setProducts] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const params = categoryId ? { category_id: categoryId } : {};
        const response = await axios.get<{ data: any[] }>(`/api/products`, {
          params,
        });

        setProducts(response.data.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return { products, isLoading, isError };
};
