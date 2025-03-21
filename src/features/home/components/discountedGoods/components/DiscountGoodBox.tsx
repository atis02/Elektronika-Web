import { FC, useEffect, useState } from "react";
import { Box, Button, Stack, Typography, Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
import { BASE_URL, BASE_URL_IMG } from "../../../../../api/instance";
import {
  addStoreDiscountGoodButton,
  auctionDiscountTextCountBox,
  auctionImageBox,
  auctionTextBox,
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
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { decode } from "blurhash";
import BasketViewModel from "../../../../../store/basket/BasketViewModel";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../components/redux/customHook";
import { addProduct } from "../../../../../components/redux/ProductSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../components/redux/store";
import { toggleFavorite } from "../../../../../components/redux/favouriteSlice";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import AppDrawer from "../../../../drawer/presentation/BasketDrawer";
// const { toggleFavorite } = useFavoriteProducts();
// Function to convert blurhash to base64
const blurHashToBase64 = (
  blurhash: string,
  width: number = 32,
  height: number = 32
) => {
  if (!blurhash) return null;
  try {
    const pixels = decode(blurhash, width, height);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const imageData = ctx.createImageData(width, height);
    imageData.data.set(pixels);
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
  } catch (e) {
    console.error("error blurhash", e);
    return null;
  }
};

const DiscountGoodBox: FC = () => {
  const [discountedProducts, setDiscountedProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const toggleDrawer = (open: boolean) => {
    setIsOpen(open);
  };
  // const [compareStates, setCompareStates] = useState<Record<number, boolean>>(
  //   {}
  // );
  // const [favoriteStates, setFavoriteStates] = useState<Record<number, boolean>>(
  //   {}
  // );
  const [showAll, setShowAll] = useState(false);

  // Intersection Observer for animation trigger
  const { ref: containerRef, inView: containerInView } = useInView({
    threshold: 0.2,
  });

  // Fetch discounted products with a fixed limit of 4
  const fetchDiscountedProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${BASE_URL}product/all?limit=20&page=1`
      );

      const products = response.data?.products;
      const discounted = products.filter(
        (product: any) => product.discount_pricePercent > 0
      );
      setDiscountedProducts(discounted);
      setIsLoading(false);
    } catch (error) {
      console.log(error);

      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscountedProducts();
  }, []);

  const dispatch = useAppDispatch();
  const compareProducts = useAppSelector((state) => state.compare.products);

  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  const handleToggleFavorite = (product: any) => {
    dispatch(toggleFavorite(product)); // Remove the product if it's already a favorite
  };
  // const isProductInCompare = compareProducts.some((p) => p.id === productId);

  // const handleCompareClick = (productId: number) => {
  //     isProductInCompare
  //       ? dispatch(removeProduct(productId))
  //       : dispatch(addProduct(product))
  //   // setCompareStates((prevState) => ({
  //   //   ...prevState,
  //   //   [productId]: !prevState[productId], // Toggle the compare state
  //   // }));
  // };

  // const handleFavoriteClick = (productId: number) => {
  //   setFavoriteStates((prevState) => ({
  //     ...prevState,
  //     [productId]: !prevState[productId], // Toggle the favorite state
  //   }));
  // };

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  const productItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: delay * 0.1, duration: 0.5, ease: "easeInOut" },
    }),
  };

  if (isLoading) {
    return (
      <Grid container spacing={2} my={3}>
        {Array.from(new Array(4)).map((_, index) => (
          <Grid key={index} size={{ lg: 3, md: 4, sm: 6, xs: 6 }}>
            <Box sx={{ background: "#f7f7f7", p: 2, borderRadius: "6px" }}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Skeleton variant="rectangular" width={100} height={100} />
              </Box>
              <Stack my={2}>
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem", width: 120 }}
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "0.9rem", width: 80 }}
                />
                <Stack direction="row" spacing={1} my={1}>
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "0.9rem", width: 60 }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "0.9rem", width: 30 }}
                  />
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem", width: 50 }}
                  />
                  <Skeleton variant="rectangular" width={40} height={30} />
                </Stack>
              </Stack>
              <Skeleton variant="rectangular" width="100%" height={40} />
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mt={1}
              >
                <Skeleton variant="rectangular" width={80} height={30} />
                <Skeleton variant="rectangular" width={60} height={30} />
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (isError) {
    return (
      <Typography variant="body1" color="error">
        Error loading products.
      </Typography>
    );
  }

  if (discountedProducts.length === 0) {
    return <Typography>No discounted products available</Typography>;
  }

  const displayedProducts = showAll
    ? discountedProducts
    : discountedProducts.slice(0, 4);

  // addToCart;
  // compare;
  // favourite;
  // barcode;
  const getTitle = (nameTm: string, nameRu: string, nameEn: string) => {
    const currentLanguage = i18n.language; // Get the current language (e.g., "en", "ru", "tm")
    switch (currentLanguage) {
      case "ru":
        return nameRu;
      case "tm":
        return nameTm;
      default:
        return nameEn; // Default to English
    }
  };

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography sx={discountGoodsTitle}>
          {t("home.discountedGoods")}
        </Typography>
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
      <Grid container spacing={2} my={3} ref={containerRef}>
        {displayedProducts.map((product: any, index) => (
          <Grid key={product.id} size={{ lg: 3, md: 4, sm: 6, xs: 6 }}>
            <motion.div
              initial={showAll ? "hidden" : {}}
              animate={containerInView ? "visible" : "hidden"}
              custom={index}
              variants={productItemVariants}
            >
              <Box sx={{ p: 1, borderRadius: "6px" }}>
                <Box sx={auctionTextBox}>
                  <Stack direction="row" pl={5}>
                    <Box sx={auctionTextBox}> {t("home.sale")}</Box>
                    <Box sx={auctionDiscountTextCountBox}>
                      -{product.discount_pricePercent.toFixed(0)}%
                    </Box>
                  </Stack>
                </Box>
                <Box sx={auctionImageBox}>
                  <LazyLoadImage
                    onClick={() => navigate(`/product/${product.id}`)}
                    src={`${BASE_URL_IMG}public/${product.imageOne}`}
                    // src={product.imagesOne || "fallback-image.jpg"}
                    alt={product.title_en}
                    placeholderSrc={blurHashToBase64(product.blurhash) || ""}
                    effect="blur"
                    style={{
                      width: "85%",
                      height: "80%",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                  />
                </Box>
                <Stack my={2}>
                  <Typography
                    sx={discountGoodTitle}
                    onClick={() => navigate(`/product/${product.id}`)}
                    noWrap
                  >
                    {getTitle(product.nameTm, product.nameRu, product.nameEn)}
                    {/* {product.nameTm} */}
                  </Typography>
                  <Typography sx={discountGoodCompanyTitle}>
                    {product.brand?.nameTm || "Unknown Brand"}
                  </Typography>
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
                      {product.sellPrice - product.discount_priceTMT} m.
                    </Typography>
                    <Button variant="contained" sx={discountGoodLastCount}>
                      Nagt {product.productQuantity}
                    </Button>
                  </Stack>
                </Stack>
                <Button
                  variant="contained"
                  fullWidth
                  endIcon={<LocalGroceryStoreOutlinedIcon />}
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
                    // onClick={() => handleCompareClick(product.id)}
                    onClick={() =>
                      // isProductInCompare
                      //   ? dispatch(removeProduct(product.id)):
                      dispatch(addProduct(product))
                    }
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
                  {/* <Button
                    onClick={() => toggleFavorite(product)}
                    sx={{
                      color: favorites.includes(product)
                        ? "#C3000E"
                        : "inherit",
                      borderRadius: "50%",

                      transition: "background-color 0.3s, transform 0.2s",
                      transform: favorites ? "scale(1.1)" : "scale(1)",
                    }}
                  >
                    {favorites.includes(product) ? (
                      <FavoriteIcon />
                    ) : (
                      <FavoriteBorderIcon
                        sx={{
                          color: "#C3000E",
                        }}
                      />
                    )}
                  </Button> */}
                  <Button
                    // onClick={() => handleFavoriteClick(product.id)}
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

export default DiscountGoodBox;
