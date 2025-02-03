import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { footersubLogo } from "../styles/footerStyles";
import { useNavigate } from "react-router-dom";

const FooterLeftSide: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Stack
        spacing={{ lg: 1, md: 1, sm: 1, xs: 0 }}
        onClick={() => navigate("/")}
        sx={{ cursor: "pointer" }}
      >
        <Box sx={{ width: { lg: "80%", md: "80%", sm: "70%", xs: "60%" } }}>
          <img
            style={{ width: "100%" }}
            src="/images/footerLogo.png"
            alt="footer logo"
          />
        </Box>
        <Typography sx={footersubLogo}>
          Электроника и бытовая техника
        </Typography>
      </Stack>
    </>
  );
};

export default FooterLeftSide;
