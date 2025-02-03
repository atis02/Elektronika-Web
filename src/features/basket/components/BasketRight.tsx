import { FC } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import {
  auctionParticipateButton,
  auctionSmallBox,
} from "../../auction/styles/auctionStyles";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const BasketRight: FC = () => {
  const navigate = useNavigate();

  const handleSubmitToOrder = () => {
    const basketDataLocalStroge = localStorage.getItem("basket");

    if (basketDataLocalStroge) {
      const parsed = JSON.parse(basketDataLocalStroge);
      const exist = parsed.find((elem: any) => elem.productQuantity === 0);
      if (!exist) {
        navigate("/complete-order");
      } else {
        toast.error("Ammarda haryt az mukdarda");
      }
    } else {
      console.log("No basket data found in localStorage.");
    }
  };
  return (
    <>
      <Box sx={auctionSmallBox}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "13px",
            textAlign: "center",
            // mt: "-30px",
          }}
        >
          Kupon kody ýaz
        </Typography>
        <Stack spacing={2} my={3}>
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
          <Button
            sx={auctionParticipateButton}
            onClick={handleSubmitToOrder}
            variant="contained"
            fullWidth
          >
            Sargyt etmek
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default BasketRight;
