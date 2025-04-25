import { FC } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { auctionSmallBox } from "../../auction/styles/auctionStyles";

const BasketRight: FC = () => {
  return (
    <>
      <Box sx={auctionSmallBox}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "13px",
            textAlign: "center",
            mt: "-30px",
          }}
        >
          Kupon kody ýaz
        </Typography>
        <Stack spacing={2} my={3} height={100}>
          <input
            type="text"
            placeholder="Kupon koduny giriziň"
            style={{
              height: "45px",
              padding: "10px 17px",
              border: "1px solid #D2D2D2",
              outline: "none",
              borderRadius: "6px",
            }}
          />
          {/* <Button
            sx={auctionParticipateButton}
            onClick={handleSubmitToOrder}
            variant="contained"
            fullWidth
          >
            Sargyt etmek
          </Button> */}
        </Stack>
      </Box>
    </>
  );
};

export default BasketRight;
