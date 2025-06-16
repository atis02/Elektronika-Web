import { FC, useState, useEffect } from "react";
import Navbar from "./navbar/presentation/Navbar";
import Header from "./header/presentation/Header";
import { Outlet } from "react-router-dom";
import Footer from "./footer/presentation/Footer";
import { IconButton, Stack, useMediaQuery } from "@mui/material";
import ScrollingText from "./Marque";
import Help from "./Help";
import MainPageCompare from "../../features/MainPageCompare/presentation/MainPageCompare";
import { useAppSelector } from "../redux/customHook";
import Popup from "./popup/presentation/Popup";

const Layout: FC = () => {
  const [openEmojiModal, setOpenEmojiModal] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 900px)");
  const [isLoading, setIsLoading] = useState(true);
  const compareProducts = useAppSelector((state) => state.compare.products);
  const isOpenFastCompare = useAppSelector(
    (state) => state.compare.isOpenFastCompare
  );
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Stack>
      <IconButton
        sx={{
          bgcolor: "#C3000E",
          "&:hover": {
            bgcolor: "#C3000E",
          },
          position: "fixed",
          borderRadius: "100%",
          width: { lg: 65, md: 65, sm: 55, xs: 45 },
          height: { lg: 65, md: 65, sm: 55, xs: 45 },
          alignItems: "center",
          justifyContent: "center",
          bottom: 70,
          right: { lg: 100, md: 180, sm: 30, xs: 18 },
          zIndex: 1000,
        }}
        onClick={() => setOpenEmojiModal(true)}
      >
        <img
          src="/images/emoji.png"
          style={{ width: "90%", height: "90%" }}
          alt=""
        />
      </IconButton>
      <Popup />
      {isSmallScreen ? (
        <>
          <Header isLoading={isLoading} />
          <Navbar />
        </>
      ) : (
        <>
          <Navbar />
          <ScrollingText />
        </>
      )}

      <Outlet />
      <Footer />
      <Help
        open={openEmojiModal}
        handleClose={() => setOpenEmojiModal(false)}
      />
      {!isSmallScreen && compareProducts.length && isOpenFastCompare == true ? (
        <Stack position="fixed" width="100vw" zIndex={1000} bottom={0}>
          <MainPageCompare />
        </Stack>
      ) : (
        ""
      )}
    </Stack>
  );
};

export default Layout;
