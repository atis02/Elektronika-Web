import { FC } from "react";
import { Product } from "../../../../../components/redux/interface";
import { Button, Stack, Typography } from "@mui/material";
import {
  discountGoodsSeeAllButton,
  discountGoodsTitle,
} from "../styles/discoutGoodsStyle";
import { useTranslation } from "react-i18next";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { ProductCart } from "./ProductCart";

type Props = {
  displayedProducts: Product[];
  showAll: boolean;
  handleShowAll: () => void;
  titleBase: string;
};

const GridProducts: FC<Props> = ({
  displayedProducts,
  handleShowAll,
  showAll,
  titleBase,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography sx={discountGoodsTitle}>{t(titleBase)}</Typography>
        <Button
          sx={{
            ...discountGoodsSeeAllButton,
            ...(showAll ? { bgcolor: "#E9A3A8", color: "#000" } : ""),
          }}
          endIcon={
            <KeyboardArrowRightIcon
              sx={{ ...(showAll ? { transform: "rotate(90deg)" } : {}) }}
            />
          }
          onClick={handleShowAll}
        >
          {t("home.seeAll")}
        </Button>
      </Stack>
      <ProductCart displayedProducts={displayedProducts} />
    </>
  );
};

export default GridProducts;
