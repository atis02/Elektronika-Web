import useSWR from "swr";
import { BASE_URL } from "../../api/instance";
import { Product } from "../../components/redux/interface";

// Fetching function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Types for brand, subcategory, and product properties
// interface Brand {
//   id: number;
//   imageUrl: string;
//   title_tm: string;
//   title_ru: string;
//   title_en: string;
//   desc_tm: string;
//   desc_ru: string;
//   desc_en: string;
// }

// interface Subcategory {
//   id: number;
//   imageUrl: string;
//   title_tm: string;
//   title_ru: string;
//   title_en: string;
//   desc_tm: string;
//   desc_ru: string;
//   desc_en: string;
//   category_id: number;
// }

// interface Property {
//   id: number;
//   title_tm: string;
//   title_ru: string;
//   title_en: string;
//   value_tm: string;
//   value_ru: string;
//   value_en: string;
//   type: string;
//   product_id: number;
// }

// interface Product {
//   id: number;
//   title_tm: string;
//   title_ru: string;
//   title_en: string;
//   imageUrl: string;
//   createdAt: string;
//   updatedAt: string;
//   price: number;
//   discount_percentage: number;
//   stock: number;
//   brand: Brand[];
//   subcategories: Subcategory[];
//   properties: Property[];
//   images: string[]; // Product images
//   discount_pricePercent:number;
//   imageOne:string
// }

interface UseProductResponse {
  products: Product[] | undefined;
  totalProducts: number | undefined;
  lastAddedDiscountedProducts: Product[];
  isLoading: boolean;
  isError: boolean;
  mutate: () => void;
}

export const useProduct = (
  limit: number = 1300,
  page: number = 1
): UseProductResponse => {
  const { data, error, mutate } = useSWR(
    `${BASE_URL}product/all?limit=${limit}&page=${page}`,
    fetcher
  );

  // Function to get last added discounted products
  const getLastAddedDiscountedProducts = (
    products: Product[] | undefined,
    limit: number
  ): Product[] => {
    if (!products || products.length === 0) {
      return [];
    }

    // Sort products by created_at in descending order (newest first)
    const sortedProducts = [...products].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    // Filter discounted products (discount_percentage > 0)
    const discountedProducts = sortedProducts.filter(
      (product: Product) => product.discount_pricePercent >= 0
    );

    // Return the first 'limit' number of products
    return discountedProducts.slice(0, limit);
  };

  return {
    products: data?.products,
    totalProducts: data?.totalItems, // Assuming the backend includes a total count
    lastAddedDiscountedProducts: data?.products
      ? getLastAddedDiscountedProducts(data.products, 4)
      : [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
