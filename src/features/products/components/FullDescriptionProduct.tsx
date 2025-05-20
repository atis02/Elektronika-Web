import { FC, useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate, useParams } from "react-router-dom";
import {
  backPaper,
  currentProductImageBox,
  currentSelectedProductProportiesTitle,
  currentSelectedProductTitle,
  fullDescriptionPaper,
  productCurrentPrice,
  productOldPrice,
  smallProductImagePaper,
} from "../styles/productStyle";
import {
  addStoreDiscountGoodButton,
  compareDiscountGoodsCostButton,
  discountGoodCodeText,
  discountGoodCompanyTitle,
  discountGoodCost,
  discountGoodLastCount,
  discountGoodsTitle,
  discountGoodTitle,
} from "../../home/components/discountedGoods/styles/discoutGoodsStyle";
import { observer } from "mobx-react-lite";
import ProductViewModel from "../presentation/ProductViewModel";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ReactImageMagnify from "react-image-magnify";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { BASE_URL, BASE_URL_IMG } from "../../../api/instance";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../components/redux/customHook";
import { addProduct } from "../../../components/redux/ProductSlice";
import BasketViewModel from "../../../store/basket/BasketViewModel";
import { toggleFavorite } from "../../../components/redux/favouriteSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../components/redux/store";
import { observable, toJS } from "mobx";
import toast from "react-hot-toast";
import {
  auctionDetailProportiesBgBox,
  auctionDetailProportiesBox,
} from "../../auction/styles/auctionStyles";
import AddCommentModal from "../../home/components/feedback/components/AddCommentModal";
import Login from "../../../components/login/Login";
import useDrawer from "../../../components/layouts/navbar/components/useDrawer";
import axios from "axios";
import AppDrawer from "../../drawer/presentation/BasketDrawer";
import { useTranslation } from "react-i18next";
import { formatNumber } from "../../../components/utils/allutils";
import { ProductImageOne } from "../../home/components/discountedGoods/components/productImageOne";
import DoneIcon from "@mui/icons-material/Done";

const FullDescriptionProduct: FC = observer(() => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const { selectedProduct, fetchProductById, loading } = ProductViewModel;
  const { productId } = useParams();
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);
  const loggedUser = localStorage.getItem("ElectronicaUser");
  const { isOpen, openDrawer, closeDrawer } = useDrawer();
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [categoryProducts, setCategoryProducts] = useState([]);
  const { t, i18n } = useTranslation();

  const { ref: containerRef, inView: containerInView } = useInView({
    threshold: 0.2,
  });
  const toggleDrawer = (open: boolean) => {
    setIsOpened(open);
  };
  const getOrderedClient = async () => {
    if (loggedUser) {
      const userLogged = JSON.parse(loggedUser);
      try {
        await axios.get(`${BASE_URL}order/orders/all`).then((resp) => {
          const data = resp.data.orders;
          const isOrderedClient = data.filter(
            (item: any) => item.userId == userLogged.id
          );

          setIsOrdered(!isOrderedClient.length ? false : true);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const getProductsByCategory = async (categoryId: any) => {
    try {
      await axios
        .get(`${BASE_URL}product/all?categoryId=${categoryId}&limit=7`)
        .then((response) => {
          const data = response.data.products;
          const filtered = data.filter((elem: any) => elem.id !== productId);
          setCategoryProducts(filtered);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductsByCategory(selectedProduct?.categoryId);
  }, [selectedProduct?.categoryId, productId]);
  useEffect(() => {
    getOrderedClient();
  }, []);

  useEffect(() => {
    if (productId && productId) {
      fetchProductById(productId);
    } else {
      console.error("Invalid productId:", productId);
    }
  }, [productId, fetchProductById]);

  useEffect(() => {
    if (
      selectedProduct &&
      selectedProduct.imageOne
      // selectedProduct.images.length > 0
    ) {
      setCurrentImage(selectedProduct.imageOne);
    }
  }, [selectedProduct]);
  const dispatch = useAppDispatch();
  const compareProducts = useAppSelector((state) => state.compare.products);
  const handleOpen = () => {
    if (loggedUser) {
      setOpenCommentModal(true);
    } else {
      openDrawer();
      toast.error("Ulgama giriň!");
    }
  };
  const handleToggleFavorite = (product: any) => {
    const myObservable = observable(product);
    dispatch(toggleFavorite(toJS(myObservable))); // Remove the product if it's already a favorite
  };
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  const handleDispatch = (product: any) => {
    const myObservable = observable(product);
    dispatch(addProduct(toJS(myObservable)));
  };

  if (loading) {
    return (
      <Box minHeight="50vh" alignItems="center" textAlign="center" mt={5}>
        <CircularProgress />
        <Typography>Loading</Typography>
      </Box>
    );
  }

  if (!selectedProduct) {
    return (
      <Box minHeight="50vh" textAlign="center" mt={5}>
        Haryt tapylmady
      </Box>
    );
  }

  const handleImageHover = (image: string) => {
    setCurrentImage(image);
  };
  const productItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: delay * 0.1, duration: 0.5, ease: "easeInOut" },
    }),
  };
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
  const getTitles = (
    nameTm: string | undefined | null,
    nameRu: string | undefined | null,
    nameEn: string | undefined | null
  ) => {
    const currentLanguage = i18n.language;

    switch (currentLanguage) {
      case "ru":
        return nameRu || nameEn || nameTm || ""; // Fallback to other languages or empty string
      case "tm":
        return nameTm || nameEn || nameRu || "";
      default:
        return nameEn || nameRu || nameTm || "";
    }
  };
  const isExist = (product: any) => {
    const isInBasket = BasketViewModel.items.some(
      (item) => item.product.id === product.id
    );
    return isInBasket ? <DoneIcon /> : <LocalGroceryStoreOutlinedIcon />;
  };

  const grouped = Object.values(
    Array.isArray(selectedProduct.properties) &&
      selectedProduct.properties.reduce((acc, item) => {
        const key = item.propertyTemplateId;

        if (!acc[key]) {
          // Create a shallow copy and initialize propertyValue as array
          acc[key] = {
            ...item,
            propertyValue: [item.propertyValue],
          };
        } else {
          // Push additional propertyValue to the existing group
          acc[key].propertyValue.push(item.propertyValue);
        }

        return acc;
      }, {})
  );

  return (
    <>
      <Container>
        <Paper elevation={4} sx={fullDescriptionPaper} ref={containerRef}>
          <Paper onClick={() => navigate(-1)} sx={backPaper} elevation={3}>
            <img src="/icons/back.svg" alt="back arrow" />
          </Paper>
          <Grid container>
            <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
              <Box sx={currentProductImageBox}>
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: "current product",
                      src:
                        `${BASE_URL_IMG}public/${currentImage}` ||
                        `${BASE_URL_IMG}public/${selectedProduct?.imageOne}`,

                      isFluidWidth: true,
                      width: 300,
                      height: 200,
                    },
                    largeImage: {
                      src:
                        `${BASE_URL_IMG}public/${currentImage}` ||
                        `${BASE_URL_IMG}public/${selectedProduct?.imageOne}`,
                      width: 1000,
                      height: 1000,
                    },
                    enlargedImagePosition: "over",
                    enlargedImageContainerStyle: {
                      backgroundColor: "rgba(255, 255, 255, 0.6)",
                    }, // backdrop
                    lensStyle: {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      objectFit: "contain",
                    },
                  }}
                />
              </Box>

              <Stack
                direction="row"
                justifyContent="center"
                width="100%"
                spacing={2}
                ml={20}
                sx={smallProductImagePaper}
              >
                <motion.img
                  src={`${BASE_URL_IMG}public/${selectedProduct?.imageOne}`}
                  alt={`thumbnail `}
                  style={{ width: "100%" }}
                  initial={{ opacity: 0 }}
                  animate={containerInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() =>
                    handleImageHover(selectedProduct?.imageOne)
                  }
                />
                {selectedProduct?.imageTwo && (
                  <motion.img
                    src={`${BASE_URL_IMG}public/${selectedProduct?.imageTwo}`}
                    alt={`thumbnail `}
                    style={{ width: "100%" }}
                    initial={{ opacity: 0 }}
                    animate={containerInView ? { opacity: 1 } : { opacity: 0 }}
                    onMouseEnter={() =>
                      handleImageHover(selectedProduct?.imageTwo)
                    }
                    transition={{ duration: 0.3 }}
                  />
                )}
                {selectedProduct?.imageThree && (
                  <motion.img
                    src={`${BASE_URL_IMG}public/${selectedProduct?.imageThree}`}
                    alt={`thumbnail `}
                    style={{ width: "100%" }}
                    initial={{ opacity: 0 }}
                    animate={containerInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onMouseEnter={() =>
                      handleImageHover(selectedProduct?.imageThree)
                    }
                  />
                )}
                {selectedProduct?.imageFour && (
                  <motion.img
                    src={`${BASE_URL_IMG}public/${selectedProduct?.imageFour}`}
                    alt={`thumbnail `}
                    style={{ width: "100%" }}
                    initial={{ opacity: 0 }}
                    animate={containerInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onMouseEnter={() =>
                      handleImageHover(selectedProduct?.imageFour)
                    }
                  />
                )}
                {selectedProduct?.imageFive && (
                  <motion.img
                    src={`${BASE_URL_IMG}public/${selectedProduct?.imageFive}`}
                    alt={`thumbnail `}
                    style={{ width: "100%" }}
                    initial={{ opacity: 0 }}
                    animate={containerInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onMouseEnter={() =>
                      handleImageHover(selectedProduct?.imageFive)
                    }
                  />
                )}
              </Stack>
            </Grid>
            <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
              <Typography sx={currentSelectedProductTitle}>
                {getTitles(
                  selectedProduct?.nameTm,
                  selectedProduct?.nameRu,
                  selectedProduct?.nameEn
                )}
              </Typography>
              <Typography>
                {t("home.barcode")} :{" "}
                <span>{selectedProduct?.barcode || 123456789}</span>
              </Typography>
              <Stack spacing={2} my={1}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography
                    sx={{
                      ...currentSelectedProductProportiesTitle,
                      width: "55%",
                      wordWrap: "break-word",
                      whiteSpace: "pre-wrap",
                      textTransform: "revert",
                    }}
                  >
                    {getTitles(
                      selectedProduct.descriptionTm,
                      selectedProduct.descriptionRu,
                      selectedProduct.descriptionEn
                    )}
                  </Typography>
                </Stack>
              </Stack>
              {selectedProduct.properties?.length == 0 ? (
                <Typography mb={1} color="gray" textAlign="center">
                  {t("products.noProperty")}
                </Typography>
              ) : (
                <Stack height={300} overflow="auto" className="searchResult">
                  {Array.isArray(grouped) &&
                    grouped.map((property: any, num: number) => (
                      <Box
                        key={property.id}
                        sx={
                          num % 2 === 0
                            ? auctionDetailProportiesBgBox
                            : auctionDetailProportiesBox
                        }
                      >
                        <Stack
                          direction="row"
                          width="100%"
                          height="100%"
                          alignItems="center"
                          justifyContent="space-between"
                          spacing={3}
                        >
                          <Typography>
                            {getTitles(
                              property.propertyTemplates?.nameTm,
                              property.propertyTemplates?.nameRu,
                              property.propertyTemplates?.nameEn
                            )}
                          </Typography>
                          <Stack direction="row" gap={1}>
                            {property.propertyValue?.map(
                              (value: any, index: number) => (
                                <Typography key={index} textAlign="end">
                                  {getTitles(
                                    value.valueTm,
                                    value.valueRu,
                                    value.valueEn
                                  )}
                                  {index !== property.propertyValue.length - 1
                                    ? ","
                                    : ""}
                                </Typography>
                              )
                            )}
                          </Stack>
                        </Stack>
                      </Box>
                    ))}
                </Stack>
              )}

              <Divider />
              <Stack direction="row" spacing={2} my={3}>
                <Typography sx={productCurrentPrice}>
                  {formatNumber(
                    selectedProduct?.sellPrice -
                      selectedProduct?.discount_priceTMT
                  )}{" "}
                  TMT
                </Typography>
                <Typography sx={productOldPrice}>
                  {selectedProduct?.discount_priceTMT > 0
                    ? `${selectedProduct?.sellPrice} TMT`
                    : ""}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Button
                  variant="contained"
                  fullWidth
                  endIcon={isExist(selectedProduct)}
                  sx={{ ...addStoreDiscountGoodButton, width: "235px" }}
                  onClick={() => {
                    selectedProduct.productQuantity <= 0
                      ? toast.error("Ammarda haryt az mukdarda")
                      : BasketViewModel.addToBasket(selectedProduct);
                  }}
                >
                  {t("home.addToCart")}
                </Button>

                <IconButton
                  onClick={() => handleToggleFavorite(selectedProduct)}
                  sx={{
                    color: favorites.some(
                      (fav) => fav.id === selectedProduct.id
                    )
                      ? "#C3000E"
                      : "inherit",
                    borderRadius: "50%",

                    transition: "background-color 0.3s, transform 0.2s",
                    transform: favorites ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  {favorites.some((fav) => fav.id === selectedProduct.id) ? (
                    <FavoriteIcon />
                  ) : (
                    <FavoriteBorderIcon
                      sx={{
                        color: "#C3000E",
                      }}
                    />
                  )}
                </IconButton>
                <IconButton
                  onClick={() => handleDispatch(selectedProduct)}
                  sx={{
                    ...compareDiscountGoodsCostButton,
                    backgroundColor: compareProducts.some(
                      (comp) => comp.id === selectedProduct?.id
                    )
                      ? "#C3000E"
                      : "transparent",
                    color: compareProducts.some(
                      (comp) => comp.id === selectedProduct?.id
                    )
                      ? "#fff"
                      : "#929292",
                    "&:hover": {
                      backgroundColor: compareProducts.some(
                        (comp) => comp.id === selectedProduct?.id
                      )
                        ? "#C3000E"
                        : "#f0f0f0",
                    },
                    width: "40px",
                    height: "40px",
                  }}
                >
                  <img
                    src={
                      compareProducts.some((p) => p.id === selectedProduct?.id)
                        ? // compareStates[product.id]
                          "/icons/compare white.svg"
                        : "/icons/compare.svg"
                    }
                    style={{ width: "30px", height: "30px", cursor: "pointer" }}
                    alt=""
                  />
                </IconButton>
                <Button
                  sx={{
                    p: 1,
                    color: "#B71C1C",
                    alignItems: "center",
                    justifyContent: "center",
                    // color: "#fff",
                    border: "1px solid #B71C1C",
                    textTransform: "revert",
                  }}
                  variant="outlined"
                  onClick={handleOpen}
                >
                  {t("home.writeRating")}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
        <AddCommentModal
          isOrdered={isOrdered}
          open={openCommentModal}
          onClose={() => setOpenCommentModal(false)}
          productId={selectedProduct?.id}
        />
        <Login isOpen={isOpen} onClose={closeDrawer} />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography sx={discountGoodsTitle}>
            {t("home.sameProducts")}
          </Typography>
        </Stack>
        <Grid container spacing={1} my={1} ref={containerRef}>
          {categoryProducts
            .slice(0, isMobile ? 6 : 5)
            ?.map((product: any, index) => (
              <Grid
                key={product.id}
                sx={{
                  minHeight: 380,
                  justifyContent: "space-between",
                }}
                size={{ lg: 2.38, md: 3, sm: 4, xs: 6 }}
              >
                <motion.div
                  initial="hidden"
                  animate={containerInView ? "visible" : "hidden"}
                  custom={index}
                  variants={productItemVariants}
                  style={{
                    position: "relative",
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      p: 1,
                      height: "100%",
                      borderRadius: "6px",
                    }}
                  >
                    {product.warranty && (
                      <Box
                        sx={{
                          position: "absolute",
                          right: 0,
                          zIndex: 100,
                          top: 10,
                        }}
                      >
                        <Stack direction="row" color="#B71C1C">
                          <img
                            src="/icons/guarantee.png"
                            style={{ width: 40, height: 40 }}
                          />
                          <Typography
                            fontSize={13}
                            position="absolute"
                            bottom={-12}
                            color="#000"
                          >
                            {product.warranty}
                          </Typography>
                        </Stack>
                      </Box>
                    )}
                    <ProductImageOne product={product} />

                    <Stack my={2}>
                      <Typography
                        sx={discountGoodTitle}
                        onClick={() => navigate(`/product/${product.id}`)}
                        noWrap
                      >
                        {getTitle(
                          product.nameTm,
                          product.nameRu,
                          product.nameEn
                        )}
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
                              ? "/icons/compare white.svg"
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
                            color: favorites.some(
                              (fav) => fav.id === product.id
                            )
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
          <AppDrawer isOpen={isOpened} toggleDrawer={toggleDrawer} />
        </Grid>
      </Container>
    </>
  );
});

export default FullDescriptionProduct;
