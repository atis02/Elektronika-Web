// useCategoryProductsLog.tsx
import { useEffect } from "react";

interface UseCategoryProductsLogProps {
  category: any | null; // Receive the full category object
  products: any[] | null | undefined;
  isLoading: boolean;
  isError: boolean;
}

export const useCategoryProductsLog = ({
  category,
  products,
  isLoading,
  isError,
}: UseCategoryProductsLogProps) => {
  useEffect(() => {
    if (category && products && !isLoading && !isError) {
    } else if (category && isLoading) {
      console.log("Loading products...");
    } else if (category && isError) {
      console.log("Error Fetching Products...");
    } else if (category) {
      console.log(
        `No products found for category "${category.title_en}" (ID: ${category.id}).`
      );
    }
  }, [category, products, isLoading, isError]);
};
