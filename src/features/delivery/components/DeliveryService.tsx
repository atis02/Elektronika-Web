import { FC } from "react";
import { Box, Container, Typography, Link } from "@mui/material";
import {
  deliveryDescriptionText,
  deliveryNavigateTitle,
  deliveryTitle,
  deliveryUnderlineTSyle,
} from "../styles/deliveryStyle";
import { Trans, useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom"; // Importing RouterLink for navigation

const DeliveryService: FC = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Typography sx={deliveryNavigateTitle}>
        <Link
          component={RouterLink}
          to="/"
          sx={{ textDecoration: "none", color: "#000000" }}
        >
          {t("home.mainPage")}
        </Link>{" "}
        /{" "}
        <Link
          component={RouterLink}
          to="/delivery"
          sx={{ textDecoration: "none", color: "#000000" }}
        >
          {t("home.delivery")}
        </Link>
      </Typography>
      <Box>
        <Typography sx={deliveryTitle}>{t("aboutDelivery")}</Typography>
        <Box sx={deliveryUnderlineTSyle}></Box>
      </Box>
      <Typography sx={deliveryDescriptionText}>
        <Trans i18nKey="descDelivery" components={{ 1: <br /> }} />
      </Typography>
    </Container>
  );
};

export default DeliveryService;
