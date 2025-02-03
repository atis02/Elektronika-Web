import { FC } from "react";
import DeliveryService from "../components/DeliveryService";
import { Box } from "@mui/material";

const Delivery: FC = () => {
  return (
    <Box my={5}>
      <DeliveryService />
    </Box>
  );
};

export default Delivery;
