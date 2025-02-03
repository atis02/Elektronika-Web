// Products.tsx
import { FC } from "react";
import { Typography } from "@mui/material";

interface ProductsProps {
  selectedSubcategory: any;
}

const Products: FC<ProductsProps> = ({ selectedSubcategory }) => {
  return (
    <div>
      <Typography>Products for {selectedSubcategory.title_tm}</Typography>
      {/* Add logic to display products here */}
    </div>
  );
};

export default Products;
