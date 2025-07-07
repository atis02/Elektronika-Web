import React from "react";
import { Drawer, IconButton, Box, Typography, Stack, Button } from "@mui/material";
import MiniBasket from "../components/MiniBasket";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useTranslation } from "react-i18next";
import { auctionParticipateButton } from "../../auction/styles/auctionStyles";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface Bools {
  isOpen: boolean;
  toggleDrawer: (open: boolean) => void;
}

const AppDrawer: React.FC<Bools> = ({ isOpen, toggleDrawer }) => {
  const { t } = useTranslation();
    const navigate = useNavigate();
  
  const handleSubmitToOrder = () => {
    const basketDataLocalStroge = localStorage.getItem("basket");

    if (basketDataLocalStroge) {
      const parsed = JSON.parse(basketDataLocalStroge);
      const exist = parsed.find((elem: any) => elem.productQuantity === 0);
      if (!parsed.length) {
        toast.error("Haryt ýok!");
        return;
      }
      if (!exist) {
        navigate("/basket");
      } else {
        toast.error(t('loginError.notEnoughProduct'));
      }
    } else {
      console.log("No basket data found in localStorage.");
    }
  };
  return (
    <>
      <Drawer
        anchor="right"
        PaperProps={{
          sx: {
            width: { lg: "40vw", md: "40vw", sm: "100vw", xs: "100vw" },
          },
        }}
        open={isOpen}
        onClose={() => toggleDrawer(false)}
      >
        <Box
          sx={{
            position: "sticky",
            top: 0,
            backgroundColor: "#fff",
            zIndex: 100,
            display: "inline-block",
          }}
        >
          <Stack
            direction="row"
            p={1}
            justifyContent="space-between"
            alignItems="center"
          >
            <IconButton onClick={() => toggleDrawer(false)}>
              <KeyboardBackspaceIcon
                sx={{
                  color: "#B71C1C",
                  border: "1px solid #B71C1C",
                  borderRadius: "100%",
                  width: 30,
                  height: 30,
                }}
              />
            </IconButton>
            <Typography
              sx={{
                position: "relative",
                zIndex: 1,
                fontSize: "20px",
                fontWeight: 600,
                // p: 2,
              }}
            >
              {t("basket.basket")}
            </Typography>
            <span></span>
          </Stack>
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: "5px",
              right: "0",
              height: "2px",
              backgroundColor: "#C3000E",
              width: "109.5%",
              transform: "translateX(-10%)",
            }}
          />
        </Box>
        <Stack
          justifyContent="space-between"
          alignItems='center'
          direction="column"
          // width={{ lg: "60vh", md: "60vh", sm: "60vh", xs: "0" }}
          height="100%"
          mb={2}
        >
          <MiniBasket />
          <Button
            sx={{...auctionParticipateButton,width:'80%'}}
            onClick={handleSubmitToOrder}
            variant="contained"
            // fullWidth
            // sx={{width:'40%'}}
          >
            {t("basket.order")}
          </Button>
          {/* <MiniBasketRight /> */}
        </Stack>
      </Drawer>
    </>
  );
};

export default AppDrawer;
