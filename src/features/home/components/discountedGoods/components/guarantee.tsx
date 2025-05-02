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
        <img src="/icons/guarantee.png" style={{ width: 40, height: 45 }} />
      </Stack>
      <Typography fontSize={13} position="absolute" bottom={-22}>
        {product.warranty}
      </Typography>
    </Box>
  );
};
