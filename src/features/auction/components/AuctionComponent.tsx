import { Box, Container, Stack, Typography, Link } from "@mui/material";
import { FC } from "react";
import { deliveryNavigateTitle } from "../../delivery/styles/deliveryStyle";
import { auctionBox } from "../styles/auctionStyles";
import AuctionCard from "./AuctionCard";
import { Link as RouterLink } from "react-router-dom"; // Importing RouterLink for navigation

const AuctionComponent: FC = () => {
  return (
    <Container>
      <Typography sx={deliveryNavigateTitle}>
        <Link
          component={RouterLink}
          to="/"
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          Baş sahypa
        </Link>{" "}
        /{" "}
        <Link
          component={RouterLink}
          to="/auction"
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          Auksion
        </Link>
      </Typography>
      <Box sx={auctionBox}>
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            top: { lg: -20, md: -20, sm: -15, xs: -10 },
          }}
        >
          <Stack alignItems="center" justifyContent={"center"} width="100%">
            <Typography
              sx={{
                textAlign: "center",
                fontSize: { lg: "20px", md: "20px", sm: "18px", xs: "15px" },
                fontWeight: 600,
              }}
            >
              Auksion
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                fontSize: { lg: "16px", md: "16px", sm: "14px", xs: "14px" },
                fontWeight: 400,
              }}
            >
              Auksiona gatnaşmak üçin agza boluň
            </Typography>
          </Stack>
        </Box>
        <AuctionCard />
      </Box>
    </Container>
  );
};

export default AuctionComponent;
