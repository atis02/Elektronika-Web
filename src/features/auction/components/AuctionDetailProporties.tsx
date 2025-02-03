import { Box, Typography } from "@mui/material";
import { FC } from "react";
import {
  auctionDetailProportiesBgBox,
  auctionDetailProportiesBox,
} from "../styles/auctionStyles";

const AuctionDetailProporties: FC = () => {
  return (
    <>
      <Box sx={auctionDetailProportiesBgBox}>
        <Typography>Görnüş</Typography>
        <Typography>Mikrotolkunly peç</Typography>
      </Box>
      <Box sx={auctionDetailProportiesBox}>
        <Typography>Dizaýn</Typography>
        <Typography>Advanced</Typography>
      </Box>
      <Box sx={auctionDetailProportiesBgBox}>
        <Typography>Görnüş</Typography>
        <Typography>Mikrotolkunly peç</Typography>
      </Box>
      <Box sx={auctionDetailProportiesBox}>
        <Typography>Dizaýn</Typography>
        <Typography>Advanced</Typography>
      </Box>
      <Box sx={auctionDetailProportiesBgBox}>
        <Typography>Görnüş</Typography>
        <Typography>Mikrotolkunly peç</Typography>
      </Box>
      <Box sx={auctionDetailProportiesBox}>
        <Typography>Dizaýn</Typography>
        <Typography>Advanced</Typography>
      </Box>
      <Box sx={auctionDetailProportiesBgBox}>
        <Typography>Görnüş</Typography>
        <Typography>Mikrotolkunly peç</Typography>
      </Box>
      <Box sx={auctionDetailProportiesBox}>
        <Typography>Dizaýn</Typography>
        <Typography>Advanced</Typography>
      </Box>
    </>
  );
};

export default AuctionDetailProporties;
