import Grid from "@mui/material/Grid2";
import { FC, useState } from "react";
import { Product } from "../../../../../components/redux/interface";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Guarantee } from "./guarantee";
import { ProductImageOne } from "./productImageOne";
import {
  addStoreDiscountGoodButton,
  compareDiscountGoodsCostButton,
  discountGoodCodeText,
  discountGoodCompanyTitle,
  discountGoodCost,
  discountGoodLastCount,
  discountGoodsSeeAllButton,
  discountGoodsTitle,
  discountGoodTitle,
} from "../styles/discoutGoodsStyle";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DoneIcon from "@mui/icons-material/Done";
import toast from "react-hot-toast";
import BasketViewModel from "../../../../../store/basket/BasketViewModel";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../../../../components/redux/ProductSlice";
import { useAppSelector } from "../../../../../components/redux/customHook";
import { RootState } from "../../../../../components/redux/store";
import { toggleFavorite } from "../../../../../components/redux/favouriteSlice";
import AppDrawer from "../../../../drawer/presentation/BasketDrawer";
import { formatNumber } from "../../../../../components/utils/allutils";

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
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const compareProducts = useAppSelector((state) => state.compare.products);
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleToggleFavorite = (product: any) => {
    dispatch(toggleFavorite(product));
  };
  const { inView: containerInView } = useInView({
    threshold: 0.2,
  });
  const productItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: delay * 0.1, duration: 0.5, ease: "easeInOut" },
    }),
  };
  const getTitle = (nameTm: string, nameRu: string, nameEn: string) => {
    const currentLanguage = i18n.language;
    switch (currentLanguage) {
      case "ru":
        return nameRu;
      case "tm":
        return nameTm;
      default:
        return nameEn;
    }
  };
  const toggleDrawer = (open: boolean) => {
    setIsOpen(open);
  };
  const isExist = (product: any) => {
    const isInBasket = BasketViewModel.items.some(
      (item) => item.product.id === product.id
    );
    return isInBasket ? <DoneIcon /> : <LocalGroceryStoreOutlinedIcon />;
  };

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
      <Grid container spacing={1} my={0}>
        {displayedProducts.map((product: any, index) => (
          <Grid key={product.id} size={{ lg: 3, md: 4, sm: 6, xs: 6 }}>
            <motion.div
              initial={showAll ? "hidden" : {}}
              animate={containerInView ? "visible" : "visible"}
              custom={index}
              variants={productItemVariants}
              style={{
                position: "relative",
                border: isMobile ? "1px solid #e9a3a8" : "none",
                borderRadius: 13,
              }}
            >
              <Box
                sx={{
                  p: 1,
                  borderRadius: "6px",
                }}
              >
                <Stack direction="row" justifyContent="flex-end">
                  {product.warranty && <Guarantee product={product} />}
                </Stack>

                <ProductImageOne product={product} />
                <Stack my={2}>
                  <Typography
                    sx={discountGoodTitle}
                    onClick={() => navigate(`/product/${product.id}`)}
                    noWrap
                  >
                    {getTitle(product.nameTm, product.nameRu, product.nameEn)}
                  </Typography>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={discountGoodCompanyTitle}>
                      {product.brand?.nameTm || "Unknown Brand"}
                    </Typography>
                    {product.anotherMarketProduct && (
                      <Box sx={{ "& > img": { mr: 2, flexShrink: 0 } }}>
                        <img
                          loading="lazy"
                          width="30"
                          srcSet={`https://countryflagsapi.netlify.app/flag/${product?.anotherMarketProduct?.toUpperCase()}.svg`}
                          src={`https://countryflagsapi.netlify.app/flag/${product?.anotherMarketProduct?.toUpperCase()}.svg`}
                          alt=""
                        />
                      </Box>
                    )}
                  </Stack>
                  <Stack direction="row" spacing={1} my={1}>
                    <Typography sx={discountGoodCodeText}>
                      {t("home.barcode")}
                    </Typography>
                    <Typography sx={discountGoodCodeText}>
                      {product.barcode || "No code"}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography sx={discountGoodCost}>
                      {formatNumber(
                        product.sellPrice - product.discount_priceTMT
                      )}{" "}
                      m.
                    </Typography>
                    <Button variant="contained" sx={discountGoodLastCount}>
                      {t("products.nagt")} {product.productQuantity}
                    </Button>
                  </Stack>
                </Stack>
                <Button
                  variant="contained"
                  fullWidth
                  endIcon={isExist(product)}
                  sx={addStoreDiscountGoodButton}
                  onClick={() => {
                    product.productQuantity <= 0
                      ? toast.error("Ammarda haryt az mukdarda")
                      : (BasketViewModel.addToBasket(product),
                        toggleDrawer(true));
                  }}
                >
                  {t("home.addToCart")}
                </Button>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  gap={1}
                >
                  <Button
                    onClick={() => dispatch(addProduct(product))}
                    sx={{
                      ...compareDiscountGoodsCostButton,
                      backgroundColor: compareProducts.some(
                        (comp: any) => comp.id === product.id
                      )
                        ? "#C3000E"
                        : "transparent",
                      color: compareProducts.some(
                        (comp: any) => comp.id === product.id
                      )
                        ? "#fff"
                        : "#929292",
                      "&:hover": {
                        backgroundColor: compareProducts.some(
                          (comp: any) => comp.id === product.id
                        )
                          ? "#C3000E"
                          : "#f0f0f0",
                      },
                      height: 24,
                    }}
                  >
                    <img
                      src={
                        compareProducts.some((p) => p.id === product.id)
                          ? // compareStates[product.id]
                            "/icons/compare white.svg"
                          : "/icons/compare.svg"
                      }
                      alt="compare-icon"
                      style={{ marginRight: "5px" }}
                    />
                    {t("home.compare")}
                  </Button>

                  <Button
                    onClick={() => handleToggleFavorite(product)}
                    sx={{
                      ...compareDiscountGoodsCostButton,
                      backgroundColor: favorites.some(
                        (fav) => fav.id === product.id
                      )
                        ? "#C3000E"
                        : "transparent",
                      color: favorites.some((fav) => fav.id === product.id)
                        ? "#fff"
                        : "#929292",
                      "&:hover": {
                        backgroundColor: favorites.some(
                          (fav) => fav.id === product.id
                        )
                          ? "#C3000E"
                          : "#f0f0f0",
                      },
                    }}
                  >
                    <FavoriteBorderIcon
                      sx={{
                        fontWeight: 300,
                        width: "12px",
                        color: favorites.some((fav) => fav.id === product.id)
                          ? "#fff"
                          : "#929292",
                      }}
                    />
                    {t("home.favourite")}
                  </Button>
                </Stack>
              </Box>
            </motion.div>
          </Grid>
        ))}
        <AppDrawer isOpen={isOpen} toggleDrawer={toggleDrawer} />
      </Grid>
    </>
  );
};

export default GridProducts;
