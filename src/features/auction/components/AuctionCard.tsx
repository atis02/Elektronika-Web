import { FC } from "react";
import Grid from "@mui/material/Grid2";
import { Box, Button, Stack, Typography } from "@mui/material";
import {
  auctionDateBox,
  auctionIndexNumerBox,
  auctionParticipateButton,
  autioncardBox,
  autionProductTitle,
} from "../styles/auctionStyles";
import { useNavigate } from "react-router-dom";

const AuctionCard: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Grid container spacing={2} my={5}>
        <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
          <Box sx={autioncardBox}>
            <Stack direction="row" justifyContent="center" alignItems="center">
              <Stack direction="row" alignItems="center" spacing={1}>
                <Box sx={auctionDateBox}>2 </Box>
                <span>:</span>
                <Box sx={auctionDateBox}>12 </Box>
                <span>:</span>
                <Box sx={auctionDateBox}>3 </Box>
                <span>:</span>
                <Box sx={auctionDateBox}>45</Box>
              </Stack>
            </Stack>
            <Box my={2} sx={auctionIndexNumerBox}>
              1
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
                src="./images/tozan.png"
                style={{ width: 200, height: 211 }}
                alt="auction1 "
              />
            </Box>
            <Stack spacing={1}>
              <Typography sx={autionProductTitle}>
                Portatiw simli el tozan sorujy Xiaomi Deerma Handheld Dust Mite
                Vacuum Cleaner (CM800)
              </Typography>
              <Typography sx={autionProductTitle}>
                Bahasy: <b>610 TMT</b>
              </Typography>
              <Button
                onClick={() => navigate("/auction-detail")}
                sx={auctionParticipateButton}
                variant="contained"
                fullWidth
              >
                Gatnaşmak
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default AuctionCard;
