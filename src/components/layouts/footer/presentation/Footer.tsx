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
        <Typography
          p={2}
          pt={0}
          pb={{ lg: 0, md: 0, sm: 0, xs: 7 }}
          sx={{ color: "#DBDBDB", mt: 1, textAlign: "center" }}
        >
          Ähli hukuklary goralan © {new Date().getFullYear()}. Powered by{" "}
          <a
            href="https://alemtilsimat.com"
            target="_blank"
            style={{ textDecoration: "none", color: "lightblue" }}
          >
            Alem Tilsimat
          </a>
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
