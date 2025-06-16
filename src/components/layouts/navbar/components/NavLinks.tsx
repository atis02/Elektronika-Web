import { FC } from "react";
import { Stack, Typography } from "@mui/material";
import { navLinks } from "../styles/navLinks";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { footerLinksStyle } from "../../footer/styles/footerStyles";

const NavLinks: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Stack direction="column" spacing={1.1}>
      {/* <Typography
        onClick={() => navigate("/delivery")} // Relative path
        sx={{
          ...navLinks,
          ...footerLinksStyle,
        }}
      >
        {t("navbar.delivery")}
      </Typography>
      <Typography
        onClick={() => navigate("/service")} // Relative path
        sx={{
          ...navLinks,
          ...footerLinksStyle,
        }}
      >
        {t("navbar.service")}
      </Typography>
      <Typography
        onClick={() => navigate("/return-exchange")} // Absolute Path
        sx={{
          ...navLinks,
          ...footerLinksStyle,
        }}
      >
        {t("navbar.return_exchange")}
      </Typography>
      <Typography
        onClick={() => navigate("/how-to-order")} // Absolute path
        sx={{
          ...navLinks,
          ...footerLinksStyle,
        }}
      >
        {t("navbar.how_to_order")}
      </Typography> */}

      <Typography
        onClick={() => navigate("/auction")} // Absolute path
        sx={{
          ...navLinks,
          ...footerLinksStyle,
        }}
      >
        {t("navbar.auction")}
      </Typography>
      <Typography
        onClick={() => navigate("/present-card")}
        sx={{
          ...navLinks,
          ...footerLinksStyle,
        }}
      >
        {t("navbar.presentCard")}
      </Typography>
    </Stack>
  );
};

export default NavLinks;
