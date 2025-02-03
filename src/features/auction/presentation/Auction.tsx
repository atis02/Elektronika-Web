import { FC } from "react";
import AuctionComponent from "../components/AuctionComponent";
import { Box } from "@mui/material";

const Auction: FC = () => {
  return (
    <Box my={5}>
      <AuctionComponent />
    </Box>
  );
};

export default Auction;
