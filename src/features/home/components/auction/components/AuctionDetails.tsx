import { Box, Paper, Stack, Typography, Skeleton } from "@mui/material";
import { FC, useState, useEffect } from "react";
import {
  auctionCost,
  auctionDateBox,
  auctionSubtitle,
  auctionTitle,
} from "../styles/auctionStyles";
import { sideLinkBox } from "../../sidebar/components/sidelinksStyle";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { decode } from "blurhash";
import { motion, AnimatePresence } from "framer-motion";

// Function to convert blurhash to base64
const blurHashToBase64 = (
  blurhash?: string,
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

interface AuctionDetailsProps {
  isLoading: boolean;
  blurhash?: string;
}
const AuctionDetails: FC<AuctionDetailsProps> = ({ isLoading, blurhash }) => {
  const [timeRemaining, setTimeRemaining] = useState({
    Gün: 2,
    Sagat: 12,
    Minut: 3,
    Sekunt: 2,
  });

  useEffect(() => {
    if (!isLoading) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => {
          let { Gün, Sagat, Minut, Sekunt } = prevTime;

          if (Sekunt > 0) {
            Sekunt--;
          } else {
            Sekunt = 59;
            if (Minut > 0) {
              Minut--;
            } else {
              Minut = 59;
              if (Sagat > 0) {
                Sagat--;
              } else {
                Sagat = 23;
                if (Gün > 0) {
                  Gün--;
                } else {
                  clearInterval(timer);
                  return prevTime; // Stop counter
                }
              }
            }
          }

          return { Gün, Sagat, Minut, Sekunt };
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isLoading]);

  const timerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };
  if (isLoading) {
    return (
      <>
        <Paper elevation={1} sx={sideLinkBox}>
          <Skeleton variant="text" sx={{ fontSize: "12px", width: 80 }} />
        </Paper>
        <Box
          sx={{
            width: "100%",
            height: "267px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Skeleton variant="rectangular" width="100%" height="100%" />
        </Box>
        <Stack mt={{ lg: 2, md: 2, sm: 0, xs: 0 }} mb={3} spacing={2}>
          <Skeleton variant="text" sx={{ fontSize: "1.2rem", width: 250 }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: 180 }} />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          mb={2}
        >
          <Skeleton variant="text" sx={{ fontSize: "1.5rem", width: 80 }} />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <Stack key={index} alignItems="center" spacing={1}>
              <Skeleton variant="circular" width={30} height={30} />
              <Skeleton variant="text" sx={{ fontSize: "1rem", width: 60 }} />
            </Stack>
          ))}
        </Stack>
      </>
    );
  }
  return (
    <Stack bgcolor="#fff" pb={2}>
      <Paper elevation={1} sx={sideLinkBox}>
        <Typography sx={{ fontWeight: 700, fontSize: "12px" }}>
          Auksion
        </Typography>
      </Paper>
      <Box
        sx={{
          width: "100%",
          height: "267px", // Фиксированная высота контейнера
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "95% 65%",
        }}
      >
        <LazyLoadImage
          src="/images/nout.jpg"
          placeholderSrc={blurHashToBase64(blurhash) || ""}
          effect="blur"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </Box>
      <Stack mt={{ lg: 2, md: 2, sm: 0, xs: 0 }} mb={3} spacing={2}>
        <Typography sx={auctionTitle}>
          Noutbuk Deli Alienware m16 R2(1006663238)
        </Typography>
        <Typography sx={auctionSubtitle}>Goýulan wagty: ŞuGün</Typography>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="center" mb={2}>
        <Typography sx={auctionCost}>56450 TMT</Typography>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <AnimatePresence>
          {Object.keys(timeRemaining).map((key, index) => (
            <motion.div
              key={key}
              initial="hidden"
              animate="visible"
              variants={timerVariants}
              custom={index}
              style={{
                alignItems: "center",
                display: "flex",
                gap: "5px",
                flexDirection: "column",
              }}
            >
              <Box sx={auctionDateBox}>
                {timeRemaining[key as keyof typeof timeRemaining]}
              </Box>
              <Typography sx={{ ...auctionSubtitle, fontSize: "11px" }}>
                {key}
              </Typography>
            </motion.div>
          ))}
        </AnimatePresence>
      </Stack>
    </Stack>
  );
};

export default AuctionDetails;
