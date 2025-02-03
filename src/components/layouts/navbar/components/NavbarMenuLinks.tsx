import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { navLinks } from "../styles/navLinks";
import { useTranslation } from "react-i18next";

const NavbarMenuLinks: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const isActiveLink = (path: string) => location.pathname === path;

  const linkStyles = (isActive: boolean) => ({
    ...navLinks,
    fontWeight: isActive ? 700 : 400,
    color: isActive ? "#000" : "inherit",
    fontSize: isActive ? "16px" : "14px",
  });

  return (
    <Stack px={2} spacing={2} my={3}>
      <Typography
        onClick={() => navigate("/delivery")}
        sx={linkStyles(isActiveLink("/delivery"))}
      >
        {t("navbar.delivery")}
      </Typography>
      <Typography
        onClick={() => navigate("/service")}
        sx={linkStyles(isActiveLink("/service"))}
      >
        {t("navbar.service")}
      </Typography>
      <Typography
        onClick={() => navigate("/return-exchange")}
        sx={linkStyles(isActiveLink("/return-exchange"))}
      >
        {t("navbar.return_exchange")}
      </Typography>
      <Typography
        onClick={() => navigate("/how-to-order")}
        sx={linkStyles(isActiveLink("/how-to-order"))}
      >
        {t("navbar.how_to_order")}
      </Typography>
      <Typography
        onClick={() => navigate("/embassy")}
        sx={linkStyles(isActiveLink("/embassy"))}
      >
        {t("navbar.embassy")}
      </Typography>
      <Typography
        onClick={() => navigate("/auction")}
        sx={linkStyles(isActiveLink("/auction"))}
      >
        {t("navbar.auction")}
      </Typography>
    </Stack>
  );
};

export default NavbarMenuLinks;
