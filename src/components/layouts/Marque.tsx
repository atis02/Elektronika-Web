import React from "react";
import { Box, Typography } from "@mui/material";

const ScrollingText: React.FC = () => {
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
          animation: "scrollText 25s linear infinite",
          color: "#fff",
        }}
      >
        Уважаемые пользователи! Система работы сайтa не имеет отношения к
        системе работы фактического магазина. Все скидки, акции и бонусы
        действуют только на сайте.
      </Typography>
    </Box>
  );
};

export default ScrollingText;
