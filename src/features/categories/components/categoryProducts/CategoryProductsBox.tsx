import { FC, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid2";
import { AnimatePresence } from "framer-motion";
import { Product } from "../../../../components/redux/interface";
import { ProductCart } from "../../../home/components/discountedGoods/components/ProductCart";
import ProductViewModel from "../../../products/presentation/ProductViewModel";

interface CategoryProductsBoxProps {
  products: Product[] | undefined;
  loadMore: () => void;
  hasMore: boolean;
}

const CategoryProductsBox: FC<CategoryProductsBoxProps> = ({
  products,
  loadMore,
  hasMore,
}) => {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 300 >=
          document.documentElement.offsetHeight &&
        hasMore &&
        !ProductViewModel.loading
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, ProductViewModel.loading]);

  return (
    <Grid container spacing={2}>
      <AnimatePresence>
        <ProductCart displayedProducts={products || []} />
        {hasMore && <div ref={loaderRef} style={{ height: "50px" }} />}
      </AnimatePresence>
    </Grid>
  );
};

export default CategoryProductsBox;
