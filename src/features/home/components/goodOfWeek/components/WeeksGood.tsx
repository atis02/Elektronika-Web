import { FC, useState } from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  weeksGoodBuyNowButton,
  weeksGoodCurrentCost,
  weeksGoodOldCost,
  weeksGoodQualityDetail,
  weeksGoodsBigImageBox,
  weeksGoodsSmallImageBox,
  weeksGoodSubQualityDetail,
  weeksGoodTitle,
} from "../style/weekGoodsStyle";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { decode } from "blurhash";

// Define blurhash strings (replace with your actual blurhashes)
const blurhashSmall1 = "L25h-W00~qIp4ofk_3?a_Ni_ofV@";
const blurhashSmall2 = "L56,4=00.5E15^%KxYj[00%1-o4.";
const blurhashSmall3 = "L167t5009-xY00%M%MM{00%L%LxG";
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

const WeeksGood: FC = () => {
  // State to manage images
  const [bigImage, setBigImage] = useState("/week/noutWeek.jpg");
  const [smallImages, setSmallImages] = useState([
    "/week/noutWeek.jpg",
    "/week/noutWeek2.jpg",
    "/week/noutWeek3.jpg",
  ]);
  // State to manage hover
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  // Placeholder images
  const smallPlaceholders = [
    getPlaceholder(blurhashSmall1, 100, 100),
    getPlaceholder(blurhashSmall2, 100, 100),
    getPlaceholder(blurhashSmall3, 100, 100),
  ];
  const bigPlaceholder = getPlaceholder(blurhashBig, 200, 200);

  // Function to handle image swap
  const handleImageClick = (clickedImage: string) => {
    const newSmallImages = smallImages.map((img) =>
      img === clickedImage ? bigImage : img
    );
    setSmallImages(newSmallImages);
    setBigImage(clickedImage);
  };
  // Function to handle hover
  const handleMouseEnter = (image: string) => {
    setHoveredImage(image);
    setBigImage(image);
  };

  const handleMouseLeave = () => {
    setHoveredImage(null);
  };

  // Animation controls
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

  return (
    <Paper elevation={3} sx={{ padding: 3 }} ref={ref}>
      <Grid container>
        <Grid size={{ lg: 7, md: 7, sm: 12, xs: 12 }}>
          <Stack
            direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
            spacing={{ lg: 10, md: 10, sm: 1, xs: 1 }}
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
              {smallImages.map((image, index) => (
                <Box
                  key={index}
                  sx={weeksGoodsSmallImageBox}
                  onClick={() => handleImageClick(image)}
                  component={motion.div}
                  onMouseEnter={() => handleMouseEnter(image)}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    borderStyle: "#D9D9D9",
                    borderWidth: "1px",
                    border:
                      hoveredImage === image
                        ? "1px solid red"
                        : "1px solid #D9D9D9",
                    cursor: "pointer",
                  }}
                  initial="hidden"
                  animate={controls}
                  variants={itemVariants}
                >
                  <LazyLoadImage
                    src={image}
                    placeholderSrc={smallPlaceholders[index]}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    alt={`Small Image ${index + 1}`}
                    effect="blur"
                  />
                </Box>
              ))}
            </Stack>
            <Box sx={weeksGoodsBigImageBox}>
              <motion.div
                initial="hidden"
                animate={controls}
                variants={imageVariants}
              >
                <LazyLoadImage
                  src={bigImage}
                  placeholderSrc={bigPlaceholder}
                  style={{ width: "90%", height: "100%", objectFit: "contain" }}
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
            minHeight={{ lg: "400px", md: "400px", sm: "300px", xs: "200px" }}
            justifyContent="center"
          >
            <motion.div
              initial="hidden"
              animate={controls}
              variants={itemVariants}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <img src="/icons/lucide_crown.svg" alt="crown" />
                <Typography sx={weeksGoodTitle}>Товар недели</Typography>
              </Stack>
            </motion.div>
            <motion.div
              initial="hidden"
              animate={controls}
              variants={itemVariants}
            >
              <Typography sx={weeksGoodQualityDetail}>
                Качества в детальях
              </Typography>
            </motion.div>
            <motion.div
              initial="hidden"
              animate={controls}
              variants={itemVariants}
            >
              <Typography sx={weeksGoodSubQualityDetail}>
                В подарок Моноблоки
              </Typography>
            </motion.div>
            <motion.div
              initial="hidden"
              animate={controls}
              variants={itemVariants}
            >
              <Stack direction="row" spacing={2}>
                <Typography sx={weeksGoodCurrentCost}>10 000 m.</Typography>
                <Typography sx={weeksGoodOldCost}>14 652.00m.</Typography>
              </Stack>
            </motion.div>
            <motion.div
              initial="hidden"
              animate={controls}
              variants={itemVariants}
            >
              <Button variant="contained" sx={weeksGoodBuyNowButton}>
                Заказать сейчас!
              </Button>
            </motion.div>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default WeeksGood;
