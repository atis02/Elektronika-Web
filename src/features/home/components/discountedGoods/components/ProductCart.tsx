import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FC, useState } from "react";
import Grid from "@mui/material/Grid2";
import { LocalGroceryStoreOutlined, Done } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { Product } from "../../../../../components/redux/interface";
import { useDispatch, useSelector } from "react-redux";
import BasketViewModel from "../../../../../store/basket/BasketViewModel";
import { Guarantee } from "./guarantee";
import { ProductImageOne } from "./productImageOne";
import {
  addStoreDiscountGoodButton,
  auctionDiscountTextCountBox,
  auctionTextBox,
  compareDiscountGoodsCostButton,
  discountGoodCodeText,
  discountGoodCompanyTitle,
  discountGoodCost,
  discountGoodLastCount,
  discountGoodTitle,
} from "../styles/discoutGoodsStyle";
import CompareButton from "./CompareButton";
import { formatNumber } from "../../../../../components/utils/allutils";
import AppDrawer from "../../../../drawer/presentation/BasketDrawer";
import { RootState } from "../../../../../components/redux/store";
import { toggleFavorite } from "../../../../../components/redux/favouriteSlice";

interface Props {
  size?: number;
  displayedProducts: Product[];
}
export const ProductCart: FC<Props> = ({ size = 3, displayedProducts }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

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
  const isExist = (product: any) => {
    const isInBasket = BasketViewModel.items.some(
      (item) => item.product.id === product.id
    );
    return isInBasket ? <Done /> : <LocalGroceryStoreOutlined />;
  };
  const toggleDrawer = (open: boolean) => {
    setIsOpen(open);
  };
  return (
    <Grid container spacing={1} my={0} mb={2}>
      {displayedProducts.map((product: any, index) => (
        <Grid
          key={`${product.id}${index}`}
          size={{ lg: size, md: 4, sm: 6, xs: 6 }}
        >
          <motion.div
            initial={"hidden"}
            animate={containerInView ? "visible" : "visible"}
            custom={index}
            variants={productItemVariants}
            style={{
              minHeight: 415,
              position: "relative",
              border: isMobile ? "1px solid #e9a3a8" : "none",
              borderRadius: 13,
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Box
              sx={{
                height: 405,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                p: 1,
                borderRadius: "6px",
              }}
            >
              <Stack
                direction="row"
                justifyContent={isMobile||product.discount_priceTMT>0 ? "space-between" : "flex-end"}
              >
                {product.discount_priceTMT>0&&(
                  <Box sx={auctionTextBox}>
                  <Stack direction="row" pl={5}>
                    <Box sx={auctionTextBox}> {t("home.sale")}</Box>
                    <Box sx={auctionDiscountTextCountBox}>
                      -{product.discount_pricePercent.toFixed(0)}%
                    </Box>
                  </Stack>
                </Box>
                )}
                {isMobile&&product.discount_priceTMT<=0 && <CompareButton color="#000" product={product} />}
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
                  <Typography noWrap sx={discountGoodCodeText}>
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
                justifyContent={{ lg: "space-between", xs: "center" }}
                alignItems="center"
                gap={1}
                mt={0.7}
              >
                {!isMobile && <CompareButton product={product} />}

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
                    mt: 0,
                  }}
                >
                  <FavoriteBorderIcon
                    sx={{
                      fontWeight: 300,
                      width: { lg: 12, md: 12, sm: 12, xs: 20 },
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
  );
};
