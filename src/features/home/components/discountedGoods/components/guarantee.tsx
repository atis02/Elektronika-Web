import { Box, Stack, Typography } from "@mui/material";
import { auctionTextBoxWarranty } from "../styles/discoutGoodsStyle";
import { FC } from "react";

type Props = {
  product: {
    warranty: string;
  };
};

export const Guarantee: FC<Props> = ({ product }) => {
  return (
    <Box
      sx={{
        ...auctionTextBoxWarranty,
        flexDirection: "column",
        position: "relative",
        zIndex: 10,
        mr: -1,
      }}
    >
      <Stack direction="row" color="#B71C1C">
        <img src="/icons/guarantee.png" style={{ width: 27, height: 30 }} />
      </Stack>
      <Typography fontSize={12} position="absolute" bottom={-20}>
        {product.warranty}
      </Typography>
    </Box>
  );
};
