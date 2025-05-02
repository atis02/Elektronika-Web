import { FC } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { auctionSmallBox } from "../../auction/styles/auctionStyles";
import { useTranslation } from "react-i18next";

const BasketRight: FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Box sx={auctionSmallBox}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "13px",
            textAlign: "center",
            mt: "-30px",
          }}
        >
          {t("basket.coupon")}
        </Typography>
        <Stack spacing={2} my={3} height={100}>
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
        </Stack>
      </Box>
    </>
  );
};

export default BasketRight;
