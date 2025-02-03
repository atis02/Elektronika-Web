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
} from "../../home/components/discountedGoods/styles/discoutGoodsStyle";
import { observer } from "mobx-react-lite";
import ProductViewModel from "../presentation/ProductViewModel";
// import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ReactImageMagnify from "react-image-magnify";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import useFavoriteProducts from "../../Favourites/components/FavouritesProducts";
import { BASE_URL_IMG } from "../../../api/instance";
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
interface Props {
  // productId: number; // Removed
}

const FullDescriptionProduct: FC<Props> = observer(() => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const { selectedProduct, fetchProductById, loading } = ProductViewModel;
  const { productId } = useParams();
  // const [expanded, setExpanded] = useState(false);
  // const { favorites, toggleFavorite } = useFavoriteProducts();
  // Intersection Observer for animation trigger
  const { ref: containerRef, inView: containerInView } = useInView({
    threshold: 0.2,
  });

  useEffect(() => {
    if (productId && productId) {
      console.log("FullDescriptionProduct - productId:", productId);
      fetchProductById(productId);
    } else {
      console.error("Invalid productId:", productId);
    }
  }, [productId, fetchProductById]);

  useEffect(() => {
    console.log("FullDescriptionProduct - selectedProduct:", selectedProduct);
    if (
      selectedProduct &&
      selectedProduct.imageOne
      // selectedProduct.images.length > 0
    ) {
      setCurrentImage(selectedProduct.imageOne);
    }
  }, [selectedProduct]);
  console.log(selectedProduct);
  const dispatch = useAppDispatch();
  const compareProducts = useAppSelector((state) => state.compare.products);
  // const smallImages = selectedProduct?.imageOne || [];

  const handleToggleFavorite = (product: any) => {
    const myObservable = observable(product);
    dispatch(toggleFavorite(toJS(myObservable))); // Remove the product if it's already a favorite
  };
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  console.log(favorites);

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

  // const handleAccordionChange = (panel: boolean) => {
  //   setExpanded(panel);
  // };

  // const visibleProperties = selectedProduct.properties?.slice(0, 4) || [];
  // const hiddenProperties = selectedProduct.properties?.slice(4) || [];

  // Handle hover change for image
  const handleImageHover = (image: string) => {
    setCurrentImage(image);
  };
  console.log(selectedProduct?.imageThree);

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
                      width: 200,
                      height: 200,
                    },
                    largeImage: {
                      src:
                        `${BASE_URL_IMG}public/${currentImage}` ||
                        `${BASE_URL_IMG}public/${selectedProduct?.imageOne}`,

                      // src: currentImage || "./images/category1.png",
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
                {/* <Paper
                    elevation={3}
                    sx={smallProductImagePaper}
                    onMouseEnter={() => handleImageHover(image)}
                  > */}
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
                {/* </Paper> */}

                {/* {smallImages.map((image, index) => (
                 
                ))} */}
              </Stack>
            </Grid>
            <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
              <Typography sx={currentSelectedProductTitle}>
                {selectedProduct?.nameTm}
              </Typography>
              <Typography>
                Haryt kody: <span>{selectedProduct?.tags || 123456789}</span>
              </Typography>
              <Stack spacing={2} my={3}>
                {/* {visibleProperties.map((property: any, index) => ( */}
                <Stack
                  // key={index}
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
                      textTransform: "capitalize",
                    }}
                  >
                    {selectedProduct.descriptionTm}
                  </Typography>
                  {/* <Typography
                      sx={{
                        width: "65%",
                        wordWrap: "break-word",
                        textAlign: "right",
                      }}
                    >
                      {property.value_tm}
                    </Typography> */}
                </Stack>
                {/* ))} */}
              </Stack>

              {/* <AnimatePresence>
                {hiddenProperties.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Accordion
                      expanded={expanded}
                      onChange={() => handleAccordionChange(!expanded)}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>Show All Properties</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Stack spacing={2}>
                          {hiddenProperties.map((property: any, index) => (
                            <Stack
                              key={index}
                              direction="row"
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <Typography
                                sx={{
                                  ...currentSelectedProductProportiesTitle,
                                  width: "35%",
                                  wordWrap: "break-word",
                                }}
                              >
                                {property.title_en}
                              </Typography>
                              <Typography
                                sx={{
                                  width: "65%",
                                  wordWrap: "break-word",
                                  textAlign: "right",
                                }}
                              >
                                {property.value_tm}
                              </Typography>
                            </Stack>
                          ))}
                        </Stack>
                      </AccordionDetails>
                    </Accordion>
                  </motion.div>
                )}
              </AnimatePresence> */}

              <Divider />
              <Stack direction="row" spacing={2} my={3}>
                <Typography sx={productCurrentPrice}>
                  {selectedProduct?.sellPrice -
                    selectedProduct?.discount_priceTMT}{" "}
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
                  endIcon={<LocalGroceryStoreOutlinedIcon />}
                  sx={{ ...addStoreDiscountGoodButton, width: "235px" }}
                  onClick={() => {
                    selectedProduct.productQuantity <= 0
                      ? toast.error("Ammarda haryt az mukdarda")
                      : BasketViewModel.addToBasket(selectedProduct);
                  }}
                >
                  Sebede goş
                </Button>

                <IconButton
                  onClick={() => handleToggleFavorite(selectedProduct)}
                  sx={{
                    // ...(favorites.some((fav) => fav.id === selectedProduct.id)
                    //   ? { color: "#C3000E" }
                    //   : { color: "inherit" }),
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
                  onClick={() =>
                    // isProductInCompare
                    //   ? dispatch(removeProduct(product.id)):
                    // dispatch(addProduct(selectedProduct && selectedProduct))
                    handleDispatch(selectedProduct)
                  }
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
                {/* <FavoriteButton isFavorite={favorites} onToggle={toggleFavorite} /> */}
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
});

export default FullDescriptionProduct;
