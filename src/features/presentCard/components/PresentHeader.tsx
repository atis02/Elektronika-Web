import { FC } from "react";
import { Typography, Box } from "@mui/material";

const PresentHeader: FC = () => {
  return (
    <>
      <Box sx={{ position: "relative", display: "inline-block" }}>
        <Typography
          sx={{
            position: "relative",
            zIndex: 1,
            fontSize: "20px",
            fontWeight: 600,
          }}
        >
          Sowgat karty
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
      <Typography
        sx={{
          my: 1,
          fontSize: { lg: "26px", md: "24px", sm: "23px", xs: "20px" },
          width: { lg: "60%", md: "60%", sm: "100%", xs: "100%" },
          fontWeight: 700,
          textTransform: "uppercase",
        }}
      >
        Подарочный сертификать - лучщий подарок современному человеку
      </Typography>
    </>
  );
};

export default PresentHeader;
