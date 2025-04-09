import React from "react";
import { Box, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";

const ScrollingText: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        backgroundColor: "#B71C1C",
      }}
    >
      <Typography
        component="div"
        sx={{
          fontSize: 14,
          display: "inline-block",
          position: "relative",
          animation: "scrollText 45s linear infinite",
          color: "#fff",
        }}
      >
        {t("navbar.navbar-text")}
      </Typography>
    </Box>
  );
};

export default ScrollingText;
