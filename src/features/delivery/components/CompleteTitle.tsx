import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const CompleteTitle: FC = () => {
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
        {t("order.orderComplete")}
      </Typography>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: "15px",
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

export default CompleteTitle;
