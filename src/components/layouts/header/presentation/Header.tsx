import { FC } from "react";
import HeaderLogo from "../components/HeaderLogo";
import { Box, Container, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { size1_4, size4_1 } from "../utils/gridSize";
import HeaderContacts from "../components/HeaderTexts";
import { useNavigate } from "react-router-dom";
import LangFlags from "../../../../language/LangFlags";
import BasketM from "../components/BasketM";

interface HeaderProps {
  isLoading: boolean;
}

const Header: FC<HeaderProps> = ({ isLoading }) => {
  const navigate = useNavigate();

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
          height: "80px",
        }}
      >
        <Container>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            height="80%"
          >
            <img
              onClick={() => navigate("/")}
              src="/navbarIcons/logo.svg"
              style={{ width: "150px", height: "28px" }}
              alt=""
            />
            <Stack direction="row" alignItems={"center"} spacing={2}>
              <LangFlags />
              <BasketM />
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Header;
