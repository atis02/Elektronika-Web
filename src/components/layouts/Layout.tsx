import { FC, useState, useEffect } from "react";
import Navbar from "./navbar/presentation/Navbar";
import Header from "./header/presentation/Header";
import { Outlet } from "react-router-dom";
import Footer from "./footer/presentation/Footer";
import { IconButton, Stack, useMediaQuery } from "@mui/material";
import ScrollingText from "./Marque";

const Layout: FC = () => {
  const isSmallScreen = useMediaQuery("(max-width: 900px)");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
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
          width: { lg: 75, md: 75, sm: 55, xs: 55 },
          height: { lg: 75, md: 75, sm: 55, xs: 55 },
          alignItems: "center",
          justifyContent: "center",
          bottom: 20,
          right: { lg: 100, md: 180, sm: 30, xs: 18 },
          zIndex: 100,
        }}
      >
        <img
          src="/images/emoji.png"
          style={{ width: "90%", height: "90%" }}
          alt=""
        />
      </IconButton>

      {isSmallScreen ? (
        <>
          <Header isLoading={isLoading} />
          <Navbar />
        </>
      ) : (
        <>
          <Navbar />
          <ScrollingText />
          <Header isLoading={isLoading} />
        </>
      )}

      <Outlet />
      <Footer />
    </Stack>
  );
};

export default Layout;
