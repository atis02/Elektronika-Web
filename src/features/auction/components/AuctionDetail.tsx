import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { deliveryNavigateTitle } from "../../delivery/styles/deliveryStyle";
import {
  auctionDetailCost,
  auctionDetailCurrentBigPicture,
  auctionDetailCurrentSmallPicture,
  auctionDetailIconButton,
  auctionDetailNextSmallPicture,
  auctionDetailProductSubtitle,
  auctionDetailProductTitle,
  auctionDetailRecomendationButton,
  auctionDetailRecomendationTitle,
  auctionSmallBox,
} from "../styles/auctionStyles";
import Grid from "@mui/material/Grid2";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AuctionDetailProporties from "./AuctionDetailProporties";
import useDrawer from "../../../components/layouts/navbar/components/useDrawer";
import axios from "axios";
import { BASE_URL, BASE_URL_IMG } from "../../../api/instance";
import { Link, useParams } from "react-router-dom";
import AuctionTimer from "./CounDownAuction";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { formatNumber, getSuccessMessage } from "../../../components/utils/allutils";

interface Product {
  imageOne: string;
  nameTm: string;
  nameRu: string;
  nameEn: string;
  imageTwo: string;
  imageThree: string;
  imageFour: string;
  imageFive: string;
  properties: [
    {
      id: string;
      key: string;
      productId: string;
      value: string;
    }
  ];
}
interface MyData {
  lastBidderId: string;
  id: string;
  product: Product;
  createdAt: string;
  auctionID: string;
  auctionProductPriceCurrent: number;
  auctionProductPriceStart: number;
  startDateAuction: string;
  endDateAuction: string;
  participants: [{ id: string }];
}
const AuctionDetail: FC = () => {
  const [data, setData] = useState<MyData>();
  const [currentBigImage, setCurrentBigImage] = useState<any>(null);
  const { openDrawer } = useDrawer();
  const [bid, setBid] = useState<any>(0);

  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const registeredUser = () => {
    return JSON.parse(localStorage.getItem("ElectronicaUser") ?? "[]");
  };

  const { t, i18n } = useTranslation();
  const params = useParams();
  const smallImages = [
    data?.product.imageOne,
    data?.product.imageTwo,
    data?.product.imageThree,
    data?.product.imageFour,
    data?.product.imageFive,
  ];

  const handleDecrease = () => {
    const inc = bid > 0 && bid - 50;
    setBid(inc);
  };
  const handleSmallImageClick = (image: string) => {
    setCurrentBigImage(image);
  };
  const fetchData = async () => {
    setLoading(true); // Set loading to true before fetching
    setError(null); // Clear any previous errors

    try {
      await axios
        .get(`${BASE_URL}auction/getOne?auctionId=${params.id}`)
        .then((resp) => {
          setData(resp.data);
        });
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching data."); // Set the error message
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (loading) {
    return (
      <Stack
        style={{
          height: "60vh",
          width: "100vw",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Stack>
    );
  }

  if (error) {
    return <div>Error: {error}</div>; // Display an error message
  }
  const handleJoinAuction = async (auction: any) => {
    const alreadyJoined = auction?.participants.filter(
      (item: any) => item.id === registeredUser()?.id
    );
    const startDate = new Date(auction.startDateAuction);
    const isStarted = startDate <= new Date();
    if (isStarted)
      try {
        if (alreadyJoined.length == 0) {
          toast.error(t('loginError.login'));
          openDrawer();
        } else {
          const body = {
            userId: registeredUser()?.id,
            auctionId: data?.id,
            newPrice: bid,
          };
          const token = localStorage.getItem("tokenOfElectronics");

          await axios
            .post(`${BASE_URL}auction/bidPrice`, body, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((resp) => {
              if (resp.data.message == "Auction price updated successfully") {
                toast.success(getSuccessMessage());
                fetchData();
                setBid(0);
              } else {
                toast.error(t('loginError.error'));;
              }
            });
        }
      } catch (error: any) {
        if (
          error.response.data.message ==
          "User is already participating in this auction"
        ) {
          toast.error("Siz eýýäm gatnaşyjy!");
        }
      }
    else {
      toast.error("Auksion entäk başlanok!");
    }
  };
  const getTitle = (nameTm: string, nameRu: string, nameEn: string): string => {
    switch (i18n.language) {
      case "ru":
        return nameRu;
      case "tm":
        return nameTm;
      default:
        return nameEn;
    }
  };
  return (
    <Box my={5}>
      <Container>
        <Typography sx={deliveryNavigateTitle}>
          <Link to="/" style={{ textDecoration: "none", color: "#777777" }}>
            {t("home.mainPage")}
          </Link>{" "}
          / {t("auction.auctionTitle")}
        </Typography>
        <Stack
          direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
          alignItems={{
            lg: "center",
            md: "center",
            sm: "flex-start",
            xs: "flex-start",
          }}
          justifyContent="space-between"
          mt={1}
          spacing={2}
        >
          <Stack spacing={1}>
            <Typography sx={auctionDetailProductTitle}>
              {getTitle(
                data?.product.nameTm || "",
                data?.product.nameRu || "",
                data?.product.nameEn || ""
              )}
            </Typography>
            <Typography sx={auctionDetailProductSubtitle}>
              {t("auction.state")} <span>{t("auction.new")}</span>
            </Typography>
            <Typography sx={auctionDetailProductSubtitle}>
              {t("auction.startPrice")}{" "}
              <span style={{ color: "#C3000E" }}>
                {" "}
                {data?.auctionProductPriceStart}
              </span>
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" width="29%" spacing={0}>
            <AuctionTimer
              endDate={
                data?.startDateAuction && data?.endDateAuction
                  ? new Date(data.startDateAuction) < new Date()
                    ? new Date(data.endDateAuction).toISOString()
                    : new Date(data.startDateAuction).toISOString()
                  : ""
              }
              timerId={data?.auctionID?.toString() || "default-timer-id"}
            />
          </Stack>
        </Stack>
        <Grid
          container
          my={2}
          spacing={2}
          direction={{
            lg: "row",
            md: "row",
            sm: "column-reverse",
            xs: "column-reverse",
          }}
        >
          <Grid size={{ lg: 8, md: 8, sm: 12, xs: 12 }}>
            <Grid container spacing={2} mb={2}>
              <Grid size={{ lg: 2, md: 2, sm: 12, xs: 12 }}>
                <Stack
                  spacing={1}
                  direction={{
                    lg: "column",
                    md: "column",
                    sm: "row",
                    xs: "row",
                  }}
                >
                  {smallImages.map(
                    (image: any, index) =>
                      image !== null && (
                        <Box
                          key={index}
                          sx={
                            currentBigImage === image
                              ? auctionDetailCurrentSmallPicture
                              : auctionDetailNextSmallPicture
                          }
                          onClick={() => handleSmallImageClick(image)}
                        >
                          <img
                            src={
                              `${BASE_URL_IMG}public/${image}` ||
                              "/images/logo2.png"
                            }
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                            }}
                            alt={`small-${index + 1}`}
                          />
                        </Box>
                      )
                  )}
                </Stack>
              </Grid>
              <Grid size={{ lg: 10, md: 10, sm: 12, xs: 12 }}>
                <Box sx={auctionDetailCurrentBigPicture}>
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                    src={
                      `${BASE_URL_IMG}public/${
                        currentBigImage !== null
                          ? currentBigImage
                          : data?.product.imageOne
                      }` || "/images/logo2.png"
                    }
                    // src={currentBigImage}
                    alt="big"
                  />
                </Box>
              </Grid>
            </Grid>
            <AuctionDetailProporties properties={data?.product.properties} />
          </Grid>
          <Grid size={{ lg: 4, md: 4, sm: 12, xs: 12 }}>
            <Box sx={auctionSmallBox}>
              <Stack direction="row" justifyContent="center" mt={-4}>
                <Typography sx={auctionDetailRecomendationTitle}>
                  {t("auction.bidPrice")}
                  <span style={{ color: "#C3000E" }}> 10 TMT</span>
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-evenly"
                my={3}
              >
                <IconButton
                  sx={auctionDetailIconButton}
                  onClick={handleDecrease}
                >
                  <RemoveIcon
                    sx={{
                      width: { lg: "20px", md: "20px", sm: "15px", xs: "10px" },
                    }}
                  />
                </IconButton>
                <Typography sx={auctionDetailCost}>
                  {formatNumber(data?.auctionProductPriceCurrent + bid)}
                </Typography>
                <IconButton
                  sx={auctionDetailIconButton}
                  onClick={() => setBid(bid + 10)}
                >
                  <AddIcon
                    sx={{
                      width: { lg: "20px", md: "20px", sm: "15px", xs: "10px" },
                      color: "#000",
                    }}
                  />
                </IconButton>
              </Stack>
              <Button
                variant="contained"
                fullWidth
                sx={auctionDetailRecomendationButton}
                disabled={bid == 0}
                onClick={() => handleJoinAuction(data)}
              >
                {t("auction.toBid")}
              </Button>
              <Typography mt={1} fontSize={12} textAlign="center">
                {registeredUser()?.id === data?.lastBidderId
                  ? t("auction.alreadyBid")
                  : ""}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AuctionDetail;
