import { FC, useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  auctionIndexNumerBox,
  auctionParticipateButton,
  autioncardBox,
  autionProductTitle,
} from "../styles/auctionStyles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, BASE_URL_IMG } from "../../../api/instance";
import AuctionTimer from "./CounDownAuction";
import toast from "react-hot-toast";
import useDrawer from "../../../components/layouts/navbar/components/useDrawer";
import Login from "../../../components/login/Login";
import { useTranslation } from "react-i18next";
import { Product } from "../../../components/redux/interface";
import { formatNumber, getSuccessMessage } from "../../../components/utils/allutils";

interface MyData {
  id: string;
  product: Product;
  createdAt: string;
  auctionID: string;
  auctionProductPriceCurrent: number;
  startDateAuction: string;
  endDateAuction: string;
  participants: [{ id: string }];
  // ... other properties of your data item
}

const AuctionCard: FC = () => {
  const navigate = useNavigate();
  const { isOpen, openDrawer, closeDrawer } = useDrawer();
  const { t, i18n } = useTranslation();
  const [data, setData] = useState<MyData[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const registeredUser = () => {
    return JSON.parse(localStorage.getItem("ElectronicaUser") ?? "[]");
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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
    return (
      <div
        style={{
          height: isMobile ? "10vh" : "60vh",
          marginTop: isMobile ? 20 : 0,
        }}
      >
        Loading...
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>; // Display an error message
  }
  const handleJoinAuction = async (auction: any) => {
    const alreadyJoined = auction?.participants.filter(
      (item: any) => item.id === registeredUser()?.id
    );

    if (alreadyJoined.length) {
      navigate(`/auction-detail/${auction.id}`);
    } else {
      try {
        if (registeredUser().length === 0) {
          toast.error(t('loginError.login'));
          openDrawer(); 
        } else {
          const token = localStorage.getItem("tokenOfElectronics");

          const body = {
            userId: registeredUser()?.id,
            auctionId: auction.id,
          };

          await axios
            .post(`${BASE_URL}auction/join`, body, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((resp) => {
              if (
                resp.data.message === "User successfully joined the auction"
              ) {
                toast.success(getSuccessMessage());
                navigate(`/auction-detail/${auction.id}`);
              }
            });
        }
      } catch (error: any) {
        if (
          error.response?.data?.message ===
          "User is already participating in this auction"
        ) {
          toast.error("Siz eýýäm gatnaşyjy!");
        } else if (error.response?.data?.message === "User not found") {
                    toast.error(t('loginError.mustRegister'));

          openDrawer();
        } else {
          toast.error(error.response?.data?.message || "Ýalňyşlyk ýüze çykdy");
        }
      }
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
    <>
      <Grid container spacing={2} my={4}>
        <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
          {!data.length ? (
            <Typography>{t("auction.noAuction")}</Typography>
          ) : (
            <Stack
              direction={{ lg: "row", md: "row", sm: "row", xs: "column" }}
              spacing={1}
            >
              {data.slice(0, 4)?.map((auction, index) => (
                <Box sx={autioncardBox} key={auction.auctionID}>
                  <AuctionTimer
                    endDate={
                      new Date(auction.startDateAuction) < new Date()
                        ? auction.endDateAuction
                        : auction.startDateAuction
                    }
                    timerId={auction.auctionID}
                  />

                  <Box my={2} sx={auctionIndexNumerBox}>
                    {index + 1}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      mt: -3,
                    }}
                  >
                    <img
                      src={
                        `${BASE_URL_IMG}public/${auction?.product.imageOne}` ||
                        "/images/logo2.png"
                      }
                      style={{ width: 200, height: 211 }}
                      alt="auction1 "
                    />
                  </Box>
                  <Stack spacing={1}>
                    <Typography sx={autionProductTitle}>
                      {getTitle(
                        auction.product?.nameTm || "",
                        auction.product?.nameRu || "",
                        auction.product?.nameEn || ""
                      )}
                    </Typography>
                    <Typography sx={autionProductTitle}>
                      {t("auction.price")}{" "}
                      <b>
                        {formatNumber(auction.auctionProductPriceCurrent)} manat
                      </b>
                    </Typography>
                    <Button
                      onClick={() => handleJoinAuction(auction)}
                      sx={auctionParticipateButton}
                      variant="contained"
                      fullWidth
                    >
                      {auction?.participants.filter(
                        (item: any) => item.id === registeredUser()?.id
                      ).length
                        ? t("auction.alreadyParticipated")
                        : t("auction.join")}
                    </Button>
                  </Stack>
                </Box>
              ))}
            </Stack>
          )}
        </Grid>
      </Grid>
      <Login isOpen={isOpen} onClose={closeDrawer} />
    </>
  );
};

export default AuctionCard;
