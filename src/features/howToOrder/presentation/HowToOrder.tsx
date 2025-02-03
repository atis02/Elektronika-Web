import { Box } from "@mui/material";
import { FC } from "react";
import HowToOrderBox from "../components/HowToOrderBox";

const HowToOrder: FC = () => {
  return (
    <Box my={5}>
      <HowToOrderBox />
    </Box>
  );
};

export default HowToOrder;
