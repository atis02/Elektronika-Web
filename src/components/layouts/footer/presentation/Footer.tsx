import { FC } from "react";
import { Box, Container, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import FooterLeftSide from "../components/FooterLeftSide";
import FooterRightSide from "../components/FooterRightSide";
import { footerBox } from "../styles/footerStyles";

const Footer: FC = () => {
  return (
    <>
      <Box sx={footerBox} id="footer">
        <Container>
          <Grid container alignItems="center">
            <Grid size={{ lg: 3, md: 3, sm: 6, xs: 12 }}>
              <FooterLeftSide />
            </Grid>
            <Grid size={{ lg: 9, md: 9, sm: 6, xs: 12 }}>
              <FooterRightSide />
            </Grid>
          </Grid>
        </Container>
        <Divider color="#F2F2F2" />
        <Typography sx={{ color: "#DBDBDB", mt: 1, textAlign: "center" }}>
          Ähli hukuklary goralan © {new Date().getFullYear()}. Powered by{" "}
          <a
            href="https://alemtilsimat.com"
            style={{ textDecoration: "none", color: "#DBDBDB" }}
          >
            Alem Tilsimat
          </a>
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
