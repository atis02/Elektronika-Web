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

const blurhashBig = "L68]y=00?b_N4nM{s.t000%N%Lxt";

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
  const [discountedProducts, setDiscountedProducts] = useState<Product>();
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const bigPlaceholder = getPlaceholder(blurhashBig, 200, 200);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const fetchDiscountedProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}productOfWeek/all`);

      const products =
        Array.isArray(response.data) && response.data[0]?.products
          ? response.data[0].products
          : [];
      const highestSellingProduct = products;
      setDiscountedProducts(highestSellingProduct);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDiscountedProducts();
  }, []);
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
                  {(
                    ["imageOne", "imageTwo", "imageThree", "imageFour"] as const
                  )
                    .map((key) => discountedProducts?.[key])
                    .filter((image): image is string => Boolean(image))
                    .map((image, index) => (
                      <LazyLoadImage
                        key={index}
                        src={`${BASE_URL_IMG}public/${image}`}
                        placeholderSrc={bigPlaceholder}
                        style={{
                          width: "95px",
                          height: "95px",
                          objectFit: "contain",
                          border: "1px solid #B71C1C",
                          borderRadius: "10px",
                          cursor: "pointer",
                        }}
                        alt={`Product Image ${index + 1}`}
                        effect="blur"
                        onMouseEnter={() => handleImageHover(image)}
                      />
                    ))}
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
