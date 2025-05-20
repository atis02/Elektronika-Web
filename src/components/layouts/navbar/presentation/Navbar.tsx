import { Box, Container, Stack } from "@mui/material";
import { FC, useEffect, useState } from "react";
import NavbarRightSide from "../components/NavbarRightSide";
import NavbarMenu from "../components/NavbarMenu";
import Header from "../../header/presentation/Header";
import MobileSearch from "../components/MobileSearch";

const Navbar: FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      <Box
        position="sticky"
        top={0}
        zIndex="1000"
        sx={{
          ...(scrolled
            ? {
                boxShadow: "0px 1px 5px 0px #B71C1C",
                backdropFilter: "blur(10px)",
              }
            : {
                boxShadow: "0",
                backgroundColor: "transparent",
              }),
          height: "64px",
          display: { lg: "block", md: "block", sm: "none", xs: "none" },
          color: "#fff",
          backgroundColor: "#B71C1C",
        }}
      >
        <Container>
          <Box
            sx={{
              display: "flex",
              alingItems: "center",
              justifyContent: "space-between",
              height: "74px",
            }}
          >
            <Header isLoading={isLoading} />
            <NavbarRightSide />
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          display: { lg: "none", md: "none", sm: "flex", xs: "flex" },
        }}
      >
        <Container>
          <Stack
            direction="row"
            alignItems="center"
            height="50%"
            justifyContent="space-between"
            spacing={1}
            mt={2}
          >
            <NavbarMenu />
            <MobileSearch isLoading={isLoading} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Navbar;
