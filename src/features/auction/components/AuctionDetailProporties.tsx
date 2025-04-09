import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
  auctionDetailProportiesBgBox,
  auctionDetailProportiesBox,
} from "../styles/auctionStyles";
type Property = {
  id: string;
  key: string;
  productId: string;
  value: string;
};
type MyComponentProps = {
  properties?: Property[];
};
const AuctionDetailProporties: FC<MyComponentProps> = ({ properties }) => {
  return (
    <Stack>
      {properties?.map((property, num) => (
        <Box
          key={property.id}
          sx={
            num % 2 === 0
              ? auctionDetailProportiesBgBox
              : auctionDetailProportiesBox
          }
        >
          <Typography>{property.key}</Typography>
          <Typography>{property.value}</Typography>
        </Box>
      ))}
    </Stack>
  );
};

export default AuctionDetailProporties;
