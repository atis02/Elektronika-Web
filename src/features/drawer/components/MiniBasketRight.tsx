import { FC } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import {
  auctionParticipateButton,
  auctionSmallBox,
} from "../../auction/styles/auctionStyles";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const MiniBasketRight: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleSubmitToOrder = () => {
    const basketDataLocalStroge = localStorage.getItem("basket");

    if (basketDataLocalStroge) {
      const parsed = JSON.parse(basketDataLocalStroge);
      const exist = parsed.find((elem: any) => elem.productQuantity === 0);
      if (!parsed.length) {
        toast.error("Haryt ýok!");
        return;
      }
      if (!exist) {
        navigate("/basket");
      } else {
        toast.error(t('loginError.notEnoughProduct'));
      }
    } else {
      console.log("No basket data found in localStorage.");
    }
  };
  return (
    <>
      <Box
        sx={auctionSmallBox}
        mt={2}
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "13px",
            textAlign: "center",
            mt: "-10px",
          }}
        >
          {t("basket.coupon")}
        </Typography>
        <Stack spacing={2} my={1}>
          <input
            type="text"
            placeholder={t("basket.couponCode")}
            style={{
              height: "45px",
              padding: "10px 17px",
              border: "1px solid #D2D2D2",
              outline: "none",
              borderRadius: "6px",
            }}
          />
          <Button
            sx={auctionParticipateButton}
            onClick={handleSubmitToOrder}
            variant="contained"
            fullWidth
          >
            {t("basket.order")}
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default MiniBasketRight;
