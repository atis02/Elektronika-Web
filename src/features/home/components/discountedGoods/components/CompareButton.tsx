import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../../../components/redux/ProductSlice";
import { compareDiscountGoodsCostButton } from "../styles/discoutGoodsStyle";
import { useAppSelector } from "../../../../../components/redux/customHook";
import { FC } from "react";
import { Product } from "../../../../../components/redux/interface";
import { useTranslation } from "react-i18next";

interface Props {
  product: Product;
  color?: string;
}
const CompareButton: FC<Props> = ({ color = "#929292", product }) => {
  const dispatch = useDispatch();
  const compareProducts = useAppSelector((state) => state.compare.products);
  const { t } = useTranslation();
  return (
    <Button
      onClick={() => dispatch(addProduct(product))}
      sx={{
        ...compareDiscountGoodsCostButton,
        backgroundColor: compareProducts.some(
          (comp: any) => comp.id === product.id
        )
          ? "#C3000E"
          : "transparent",
        color: compareProducts.some((comp: any) => comp.id === product.id)
          ? "#fff"
          : color,
        "&:hover": {
          backgroundColor: compareProducts.some(
            (comp: any) => comp.id === product.id
          )
            ? "#C3000E"
            : "#f0f0f0",
        },
        height: 24,
        mt: 0,
      }}
    >
      <img
        src={
          compareProducts.some((p) => p.id === product.id)
            ? "/icons/compare white.svg"
            : "/icons/compare.svg"
        }
        alt="compare-icon"
        style={{ marginRight: "5px" }}
      />
      {t("home.compare")}
    </Button>
  );
};

export default CompareButton;
