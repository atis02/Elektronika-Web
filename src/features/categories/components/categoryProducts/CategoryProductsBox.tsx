import { FC } from "react";
import Grid from "@mui/material/Grid2";
import { AnimatePresence } from "framer-motion";
import { Product } from "../../../../components/redux/interface";
import { ProductCart } from "../../../home/components/discountedGoods/components/ProductCart";

interface CategoryProductsBoxProps {
  products: Product[] | undefined;
}

const CategoryProductsBox: FC<CategoryProductsBoxProps> = ({ products }) => {
  return (
    <Grid container spacing={2}>
      <AnimatePresence>
        <ProductCart displayedProducts={products || []} />
      </AnimatePresence>
    </Grid>
  );
};

export default CategoryProductsBox;
