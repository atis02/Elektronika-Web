import { Box, Container, Stack } from "@mui/material";
import { FC, useEffect, useState } from "react";
import NavLinks from "../components/NavLinks";
import NavbarRightSide from "../components/NavbarRightSide";
import NavbarMenu from "../components/NavbarMenu";
import NavbarSearch from "../../navbarSearch/NavbarSearch";

const Navbar: FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);

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
          height: "54px",
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
              height: "64px",
            }}
          >
            <NavLinks />
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
          >
            <NavbarMenu />
            <NavbarSearch />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Navbar;
