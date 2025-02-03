import { FC } from "react";

interface SubcategoryProductsProps {
  // subcategory: SubcategoryProps;
  subcategory: any;
}

const SubcategoryProducts: FC<SubcategoryProductsProps> = ({ subcategory }) => {
  return <div>Products for {subcategory.title_en}</div>;
};

export default SubcategoryProducts;
