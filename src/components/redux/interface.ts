export interface Product {
  id: string;
  brand: {
    nameTm: string;
  };
  imageOne: string;
  imageTwo: string;
  barcode: string;
  imageThree: string;
  imageFour: string;
  imageFive: string;
  brand_id: number;
  category: string;
  categoryId: string;
  color: string;
  created_at: string;
  productCategory: {
    nameTm: string;
    nameEn: string;
    nameRu: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  product: {
    id: string;
    productQuantity: number;
    properties: [
      {
        key: string;
        id: string;
        name: string;
        value: string;
        productId: string;
      }
    ];
  };
  depth: number;
  desc_en?: string;
  desc_ru?: string;
  desc_tm?: string;
  discount_percentage: number;
  discounted_price: number;
  height: number;
  images: string[];
  is_active: boolean;
  old_price: number;
  price: number;
  properties: Record<string, string | number>;
  rating: number;
  segment: string;
  segment_id: number;
  size: string;
  stock: number;
  tags: string[];
  nameTm?: string;
  nameEn?: string;
  nameRu?: string;
  sellPrice: number;
  discount_pricePercent: number;
  discount_priceTMT: number;
  descriptionTm: string;
  descriptionEn: string;
  descriptionRu: string;

  productQuantity: number;
  updated_at: string;
  views: number;
  weight: number;
  width: number;
  product_code: string;
}
export interface Product2 {
  id: string;
  imageUrl: string;
  title_tm: string;
  title_ru: string;
  title_en: string;
  desc_tm?: string;
  desc_ru?: string;
  desc_en?: string;
}
