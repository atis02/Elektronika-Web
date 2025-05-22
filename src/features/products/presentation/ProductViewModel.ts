import { makeAutoObservable } from "mobx";
import axios from "axios";
import { BASE_URL } from "../../../api/instance";
import { Product } from "../../../components/redux/interface";

interface Filters {
  categoryId: string | null | undefined;
  subCategoryId: string | null | undefined;
  segmentId: string | null | undefined;
  brandId: string | null | undefined;
  minPrice: number | null | undefined;
  maxPrice: number | null | undefined;
  sortBy: string | null | undefined;
  sortOrder: string | null | undefined;
  statusId: string | null | undefined;
}
interface Brands {
  id: string;
  nameTm: string;
}

interface Properties {
  keyEn: string;
  keyRu: string;
  keyTm: string;
  valueEn: string[];
  valueRu: string[];
  valueTm: string[];
}
interface ApiResponse {
  products: Product[];
  totalItems: number;
  uniqueBrands: Brands[];
  properties: Properties[];
  minPrice: number;
  maxPrice: number;
}

class ProductViewModel {
  products: Product[] = [];
  uniqueBrands: Brands[] = [];
  properties: Properties[] = [];
  minPrice: number = 0;
  maxPrice: number = 0;
  loading: boolean = false;
  error: string | null = null;
  totalProducts: number | null = null;
  currentPage: number = 1;
  limit: number = 20;
  filters: Filters = {
    categoryId: null,
    subCategoryId: null,
    segmentId: null,
    brandId: null,
    minPrice: 0,
    maxPrice: 0,
    statusId: null,
    sortBy: "alphabet",
    sortOrder: "ASC",
  };
  selectedProduct: Product | null = null;
  constructor() {
    makeAutoObservable(this);
  }
  setSelectedProduct = (product: Product | null) => {
    this.selectedProduct = product;
  };

  setFilters = (filters: Filters) => {
    console.log(filters);
    this.products = [];
    this.filters = filters;
    this.currentPage = 1;
  };
  setCurrentPage = (page: number) => {
    this.currentPage = page;
  };
  setLimit = (limit: number) => {
    this.limit = limit;
  };
  clearFilters = () => {
    this.filters = {
      categoryId: null,
      subCategoryId: null,
      segmentId: null,
      brandId: null,
      minPrice: null,
      maxPrice: null,
      statusId: null,
      sortBy: "alphabet",
      sortOrder: "ASC",
    };
    this.currentPage = 1;
    this.products = [];
    this.totalProducts = null;
  };

  async fetchFilteredProducts(): Promise<any[]> {
    this.loading = true;
    this.error = null;

    try {
      const queryParams = new URLSearchParams({
        page: String(this.currentPage),
        limit: String(this.limit),
      });

      if (this.filters.categoryId)
        queryParams.append("categoryId", String(this.filters.categoryId));
      if (this.filters.subCategoryId)
        queryParams.append("subCategoryId", String(this.filters.subCategoryId));
      if (this.filters.segmentId)
        queryParams.append("segmentId", String(this.filters.segmentId));
      if (this.filters.brandId)
        queryParams.append("brandId", String(this.filters.brandId));
      if (this.filters.minPrice)
        queryParams.append("minPrice", String(this.filters.minPrice));
      if (this.filters.maxPrice)
        queryParams.append("maxPrice", String(this.filters.maxPrice));
      if (this.filters.sortBy)
        queryParams.append("sortBy", String(this.filters.sortBy));
      if (this.filters.sortOrder)
        queryParams.append("sortOrder", String(this.filters.sortOrder));
      if (this.filters.statusId)
        queryParams.append("statusId", String(this.filters.statusId));

      const url = `${BASE_URL}product/all?${queryParams.toString()}`;

      const response = await axios.get(url);
      const data: ApiResponse = response.data;

      this.products = Array.isArray(data.products) ? data.products : [];

      this.totalProducts = data.totalItems;
      this.uniqueBrands = data.uniqueBrands;
      this.properties = data.properties;
      return this.products;
    } catch (error: any) {
      console.error("Error fetching products:", error);
      this.error = "Failed to load products. Please try again.";
      return [];
    } finally {
      this.loading = false;
    }
  }

  fetchProductById = async (productId: string) => {
    // Changed to arrow function
    this.loading = true;
    this.error = null;
    try {
      const url = `${BASE_URL}product/getOne?id=${productId}`; // Changed this line
      const response = await axios.get(url);
      this.selectedProduct = response.data;
    } catch (error: any) {
      console.error("Error fetching product by ID:", error);
      this.error = "Failed to load product details. Please try again.";
      this.selectedProduct = null;
    } finally {
      this.loading = false;
    }
  };
}
export default new ProductViewModel();
