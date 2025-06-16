import { FC } from "react";
import { AnimatePresence } from "framer-motion";
import { Product } from "../../../../components/redux/interface";
import { ProductCart } from "../../../home/components/discountedGoods/components/ProductCart";
import ProductViewModel from "../../../products/presentation/ProductViewModel";
import { Button, Stack } from "@mui/material";
import { mainColor } from "../../../home/components/goodOfWeek/style/weekGoodsStyle";
import { MoreHorizOutlined } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const handleAddMore = () => {
    if (hasMore && !ProductViewModel.loading) {
      loadMore();
    }
  };
  return (
    <AnimatePresence>
      <ProductCart displayedProducts={products || []} />
      <Stack alignItems="center">
        <Button
          sx={{
            bgcolor: mainColor,
            color: "#fff",
            gap: 1,
            textTransform: "revert",
            "&.Mui-disabled": {
              bgcolor: "lightgray",
              color: "#464646",
            },
          }}
          onClick={handleAddMore}
          disabled={products && products.length > 12}
        >
          {t("home.addMore")}

          <MoreHorizOutlined />
        </Button>
      </Stack>
    </AnimatePresence>
  );
};

export default CategoryProductsBox;
