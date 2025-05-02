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
      }}
    >
      <Stack direction="row" color="#B71C1C">
        <img src="/images/guarantee.png" style={{ width: 40, height: 40 }} />
      </Stack>
      <Typography fontSize={11} position="absolute" bottom={-18}>
        {product.warranty}
      </Typography>
    </Box>
  );
};
