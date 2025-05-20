import { FC, useEffect, useState } from "react";
import {
  Box,
  Button,
  // CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  weeksGoodBuyNowButton,
  weeksGoodCurrentCost,
  weeksGoodOldCost,
  weeksGoodQualityDetail,
  weeksGoodsBigImageBox,
  weeksGoodTitle,
} from "../style/weekGoodsStyle";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { decode } from "blurhash";
import { BASE_URL, BASE_URL_IMG } from "../../../../../api/instance";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { formatNumber } from "../../../../../components/utils/allutils";
import { useTranslation } from "react-i18next";

// Define blurhash strings (replace with your actual blurhashes)
// const blurhashSmall1 = "L25h-W00~qIp4ofk_3?a_Ni_ofV@";
// const blurhashSmall2 = "L56,4=00.5E15^%KxYj[00%1-o4.";
// const blurhashSmall3 = "L167t5009-xY00%M%MM{00%L%LxG";
const blurhashBig = "L68]y=00?b_N4nM{s.t000%N%Lxt";

// Function to generate placeholder image from blurhash
const getPlaceholder = (blurhash: string, width: number, height: number) => {
  const pixels = decode(blurhash, width, height);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const imageData = ctx.createImageData(width, height);
    imageData.data.set(pixels);
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL("image/png");
  }
  return "";
};
interface Product {
  id: string;
  imageOne: string;
  imageTwo: string;
  imageThree: string;
  imageFour: string;
  imageFive: string;
  sellPrice: number;
  discount_priceTMT: number;
  totatSelling: number;
  nameRu: string;
  nameTm: string;
  nameEn: string;
}
const WeeksGood: FC = () => {
  // State to manage images
  const [discountedProducts, setDiscountedProducts] = useState<Product>();
  // const [bigImage, setBigImage] = useState(discountedProducts?.imageOne);
  // const [smallImages, setSmallImages] = useState([
  //   "/week/noutWeek.jpg",
  //   "/week/noutWeek2.jpg",
  //   "/week/noutWeek3.jpg",
  // ]);

  // const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  // const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [isError, setIsError] = useState<boolean>(false);
  // Placeholder images
  // const smallPlaceholders = [
  //   getPlaceholder(blurhashSmall1, 100, 100),
  //   getPlaceholder(blurhashSmall2, 100, 100),
  //   getPlaceholder(blurhashSmall3, 100, 100),
  // ];
  const bigPlaceholder = getPlaceholder(blurhashBig, 200, 200);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  // Function to handle image swap
  // const handleImageClick = (clickedImage: string) => {
  //   const newSmallImages = smallImages.map((img) =>
  //     img === clickedImage ? bigImage : img
  //   );
  //   setSmallImages(newSmallImages);
  //   setBigImage(clickedImage);
  // };
  // // Function to handle hover
  // const handleMouseEnter = (image: string) => {
  //   setHoveredImage(image);
  //   setBigImage(image);
  // };
  const fetchDiscountedProducts = async () => {
    try {
      // setIsLoading(true);
      const response = await axios.get(`${BASE_URL}productOfWeek/all`);

      const products =
        Array.isArray(response.data) && response.data[0]?.products
          ? response.data[0].products
          : [];

      const highestSellingProduct = products;

      setDiscountedProducts(highestSellingProduct);
      // setIsLoading(false);
    } catch (error) {
      console.log(error);

      // setIsError(true);
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscountedProducts();
  }, []);

  // const handleMouseLeave = () => {
  //   setHoveredImage(null);
  // };

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (inView) {
    controls.start("visible");
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };
  const handleImageHover = (image: string) => {
    setCurrentImage(image);
  };
  const disc = discountedProducts?.discount_priceTMT ?? 0;
  const price = discountedProducts?.sellPrice ?? 0;

  const calculated = price - disc;
  const getTitle = ({
    title_ru,
    title_tm,
    title_en,
  }: {
    title_ru: string;
    title_tm: string;
    title_en: string;
  }) => {
    const currentLanguage = i18n.language;
    switch (currentLanguage) {
      case "ru":
        return title_ru;
      case "tm":
        return title_tm;
      case "en":
        return title_en;
      default:
        return title_tm; // Default to English
    }
  };
  return (
    <>
      {!discountedProducts ? (
        ""
      ) : (
        <Paper elevation={3} sx={{ padding: 3 }} ref={ref}>
          <Grid container>
            <Grid size={{ lg: 7, md: 7, sm: 12, xs: 12 }}>
              <Stack
                direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
                spacing={{ lg: 2, md: 10, sm: 1, xs: 1 }}
              >
                <Stack
                  direction={{
                    lg: "column",
                    md: "column",
                    sm: "row",
                    xs: "row",
                  }}
                  spacing={1}
                >
                  <LazyLoadImage
                    src={
                      `${BASE_URL_IMG}public/${discountedProducts?.imageOne}` ||
                      "/images/logo2.png"
                    }
                    placeholderSrc={bigPlaceholder}
                    style={{
                      width: "95px",
                      height: "95px",
                      objectFit: "contain",
                      border: "1px solid #D9D9D9",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                    alt="Big Image"
                    effect="blur"
                    onMouseEnter={() =>
                      handleImageHover(discountedProducts?.imageOne ?? "")
                    }
                  />
                  {discountedProducts?.imageTwo && (
                    <LazyLoadImage
                      src={
                        `${BASE_URL_IMG}public/${discountedProducts?.imageTwo}` ||
                        "/images/logo2.png"
                      }
                      placeholderSrc={bigPlaceholder}
                      style={{
                        width: "95px",
                        height: "95px",
                        objectFit: "contain",
                        border: "1px solid #D9D9D9",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                      alt="Big Image"
                      effect="blur"
                      onMouseEnter={() =>
                        handleImageHover(discountedProducts?.imageTwo)
                      }
                    />
                  )}
                  {discountedProducts?.imageThree && (
                    <LazyLoadImage
                      src={
                        `${BASE_URL_IMG}public/${discountedProducts?.imageThree}` ||
                        "/images/logo2.png"
                      }
                      placeholderSrc={bigPlaceholder}
                      style={{
                        width: "95px",
                        height: "95px",
                        objectFit: "contain",
                        border: "1px solid #D9D9D9",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                      alt="Big Image"
                      effect="blur"
                      onMouseEnter={() =>
                        handleImageHover(discountedProducts?.imageThree)
                      }
                    />
                  )}
                  {discountedProducts?.imageFour && (
                    <LazyLoadImage
                      src={
                        `${BASE_URL_IMG}public/${discountedProducts?.imageFour}` ||
                        "/images/logo2.png"
                      }
                      placeholderSrc={bigPlaceholder}
                      style={{
                        width: "95px",
                        height: "95px",
                        objectFit: "contain",
                        border: "1px solid #D9D9D9",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                      alt="Big Image"
                      effect="blur"
                      onMouseEnter={() =>
                        handleImageHover(discountedProducts?.imageFour)
                      }
                    />
                  )}
                </Stack>
                <Box sx={weeksGoodsBigImageBox}>
                  <motion.div
                    initial="hidden"
                    animate={controls}
                    variants={imageVariants}
                  >
                    <LazyLoadImage
                      src={
                        `${BASE_URL_IMG}public/${
                          currentImage || discountedProducts?.imageOne
                        }` || "/images/logo2.png"
                      }
                      placeholderSrc={bigPlaceholder}
                      style={{
                        width: "90%",
                        height: "90%",
                        objectFit: "contain",
                      }}
                      alt="Big Image"
                      effect="blur"
                    />
                  </motion.div>
                </Box>
              </Stack>
            </Grid>
            <Grid size={{ lg: 5, md: 5, sm: 12, xs: 12 }}>
              <Stack
                spacing={{ lg: 2.5, md: 2, sm: 2, xs: 1 }}
                minHeight={{
                  lg: "400px",
                  md: "400px",
                  sm: "300px",
                  xs: "200px",
                }}
                justifyContent="center"
              >
                <motion.div
                  initial="hidden"
                  animate={controls}
                  variants={itemVariants}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <img src="/icons/lucide_crown.svg" alt="crown" />
                    <Typography sx={weeksGoodTitle}>
                      {t("goodOfWeek.goodOfWeek")}
                    </Typography>
                  </Stack>
                </motion.div>

                <motion.div
                  initial="hidden"
                  animate={controls}
                  variants={itemVariants}
                >
                  <Typography sx={weeksGoodQualityDetail}>
                    {getTitle({
                      title_ru: discountedProducts?.nameRu,
                      title_tm: discountedProducts?.nameTm,
                      title_en: discountedProducts?.nameEn,
                    })}
                  </Typography>
                </motion.div>
                <motion.div
                  initial="hidden"
                  animate={controls}
                  variants={itemVariants}
                >
                  <Typography sx={weeksGoodQualityDetail}>
                    {t("goodOfWeek.quality")}
                  </Typography>
                </motion.div>

                <motion.div
                  initial="hidden"
                  animate={controls}
                  variants={itemVariants}
                >
                  <Stack direction="row" spacing={2}>
                    <Typography sx={weeksGoodCurrentCost}>
                      {formatNumber(calculated)} m.
                    </Typography>
                    {price !== calculated && (
                      <Typography sx={weeksGoodOldCost}>
                        {disc + price} m.
                      </Typography>
                    )}
                  </Stack>
                </motion.div>
                <motion.div
                  initial="hidden"
                  animate={controls}
                  variants={itemVariants}
                >
                  <Button
                    variant="contained"
                    sx={weeksGoodBuyNowButton}
                    onClick={() =>
                      navigate(`/product/${discountedProducts?.id}`)
                    }
                  >
                    {t("goodOfWeek.orderNow")}
                  </Button>
                </motion.div>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default WeeksGood;
