import { FC, useEffect, useState } from "react";
import HeaderLogo from "../components/HeaderLogo";
import { Box, Container, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { size1_4, size4_1 } from "../utils/gridSize";
import HeaderContacts from "../components/HeaderTexts";
import { useNavigate } from "react-router-dom";
import LangFlags from "../../../../language/LangFlags";
import BasketM from "../components/BasketM";
import { ProfileNavMobile } from "../components/ProfileNavMobile";

interface HeaderProps {
  isLoading: boolean;
}

const Header: FC<HeaderProps> = ({ isLoading }) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const navigate = useNavigate();
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
        sx={{ display: { lg: "block", md: "block", sm: "none", xs: "none" } }}
      >
        <Box
          sx={{
            display: "flex",
            height: "70px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid container width="100%">
            <Grid size={size1_4}>
              <HeaderLogo />
            </Grid>
            <Grid size={size4_1}>
              <HeaderContacts isLoading={isLoading} />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box
        sx={{
          display: { lg: "none", md: "none", sm: "flex", xs: "flex" },
          height: "60px",
          ...(scrolled
            ? {
                boxShadow: "0px 1px 5px 0px #B71C1C",
                backdropFilter: "blur(10px)",
              }
            : {
                boxShadow: "0",
                backgroundColor: "transparent",
              }),
          color: "#fff",
          backgroundColor: "#B71C1C",
        }}
        position="sticky"
        top={0}
        zIndex="1000"
        bgcolor="#fff"
      >
        <Container>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            height="100%"
          >
            <img
              onClick={() => navigate("/")}
              src="/navbarIcons/logo.svg"
              style={{
                padding: 3,
                width: "180px",
                height: "35px",
                backgroundColor: "#fff",
                borderRadius: 8,
              }}
              alt=""
            />
            <Stack direction="row" alignItems={"center"} spacing={0}>
              <LangFlags />
              <BasketM />
              <ProfileNavMobile />
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Header;
