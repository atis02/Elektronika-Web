import { FC } from "react";
import { Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

const BasketTitle: FC = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ position: "relative", display: "inline-block" }}>
      <Typography
        sx={{
          position: "relative",
          zIndex: 1,
          fontSize: "20px",
          fontWeight: 600,
        }}
      >
        {t("basket.basket")}
      </Typography>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: "5px",
          right: "0",
          height: "2px",
          backgroundColor: "#C3000E",
          width: "110%",
          transform: "translateX(-10%)",
        }}
      />
    </Box>
  );
};

export default BasketTitle;
