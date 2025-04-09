import { FC } from "react";
import { Box, Container, Typography, Link } from "@mui/material";
import {
  deliveryDescriptionText,
  deliveryNavigateTitle,
  deliveryTitle,
  deliveryUnderlineTSyle,
} from "../../delivery/styles/deliveryStyle";
import { Trans, useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom"; // Importing RouterLink from react-router-dom for navigation

const HowToRegisterBox: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Container>
        <Typography sx={deliveryNavigateTitle}>
          <Link
            component={RouterLink}
            to="/"
            sx={{ textDecoration: "none", color: "#000" }}
          >
            {t("home.mainPage")}
          </Link>{" "}
          /{" "}
          <Link
            component={RouterLink}
            to="/how-to-register"
            sx={{ textDecoration: "none", color: "#000" }}
          >
            {t("howRegister.how-to-register")}
          </Link>
        </Typography>
        <Box>
          <Typography sx={deliveryTitle}>
            {/* {rule[titleKey] || rule.title_en || "Default Title"} */}

            {t("howRegister.how-to-register")}
          </Typography>
          <Box sx={deliveryUnderlineTSyle}></Box>
        </Box>
        <Typography
          sx={deliveryDescriptionText}
          // dangerouslySetInnerHTML={{
          //   __html: rule[descriptionKey] || rule.desc_en || "",
          // }}
        >
          <Trans i18nKey="howRegister.htoDesc" components={{ 1: <br /> }} />
        </Typography>
      </Container>
    </>
  );
};

export default HowToRegisterBox;
