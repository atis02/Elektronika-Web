import {
  Box,
  Paper,
  Stack,
  Typography,
  Skeleton,
  IconButton,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import {
  auctionCost,
  auctionSubtitle,
  auctionTitle,
} from "../styles/auctionStyles";
import { sideLinkBox } from "../../sidebar/components/sidelinksStyle";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { decode } from "blurhash";
import AuctionTimer from "./CountDown";
import axios from "axios";
import { BASE_URL, BASE_URL_IMG } from "../../../../../api/instance";
import dayjs from "dayjs";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useNavigate } from "react-router-dom";
import { formatNumber } from "../../../../../components/utils/allutils";
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
interface Product {
  imageOne: string;
  nameTm: string;
  // ... other product properties
}

interface MyData {
  product: Product;
  createdAt: string;
  auctionID: string;
  auctionProductPriceCurrent: number;
  startDateAuction: string;
  endDateAuction: string;
  // ... other properties of your data item
}

const AuctionDetails: FC<AuctionDetailsProps> = ({ isLoading, blurhash }) => {
  const [data, setData] = useState<MyData[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const [showEndDate, setShowEndDate] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching
      setError(null); // Clear any previous errors

      try {
        await axios.get(`${BASE_URL}auction/all`).then((resp) => {
          const currentDate = new Date(); // Current date and time

          const activeAuctions = resp.data?.auctions?.filter((auction: any) => {
            const endDate = new Date(auction.endDateAuction); // Convert endDateAuction to Date object
            return endDate > currentDate; // If endDateAuction is in the past, the auction has ended
          });
          const startDate = new Date(resp.data?.auctions[0]?.startDateAuction);

          setShowEndDate(startDate < currentDate);
          setData(activeAuctions);
        });
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message || "An error occurred while fetching data."); // Set the error message
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading message
  }

  if (error) {
    return <div>Error: {error}</div>; // Display an error message
  }

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
    <>
      {!data.length ? (
        ""
      ) : (
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
              src={`${BASE_URL_IMG}public/${data[0]?.product.imageOne}`}
              // src={data[0]?.product.imageOne}
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
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography sx={auctionTitle}>
                {data[0]?.product.nameTm}
              </Typography>
              <IconButton onClick={() => navigate("/auction")}>
                <VisibilityOutlinedIcon />
              </IconButton>
            </Stack>
            <Typography sx={auctionSubtitle}>
              Goýulan wagty: {dayjs(data[0]?.createdAt).format("DD.MM.YYYY")}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            mb={2}
          >
            <Typography sx={auctionCost}>
              {formatNumber(data[0]?.auctionProductPriceCurrent)} manat
            </Typography>
          </Stack>
          {/* <Stack
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
      </Stack> */}
          <AuctionTimer
            endDate={
              showEndDate ? data[0]?.endDateAuction : data[0]?.startDateAuction
            }
            // timerId={data[0]?.auctionID}
          />
        </Stack>
      )}
    </>
  );
};

export default AuctionDetails;
