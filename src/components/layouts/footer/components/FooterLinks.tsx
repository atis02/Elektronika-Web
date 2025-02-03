import { Typography } from "@mui/material";
import { FC } from "react";
// import { footerLinks } from "../data/footerLinks";
import { footerLinksStyle } from "../styles/footerStyles";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FooterLinks: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const footerLinks = [
    {
      // title: "Nädip hasaba alynmaly",
      title: t("header.how_to_register"),
      path: "/",
    },

    {
      title: t("navbar.how_to_order"),
      // "Nädip sargyt etmeli",
      path: "/how-to-order",
    },

    {
      title: t("navbar.delivery"),
      // "Eltip berme",
      path: "/delivery",
    },

    {
      title: t("navbar.return_exchange"),
      // "Çalyşmak we gaýtarmak",
      path: "/return-exchange",
    },
    {
      title: t("navbar.serviceCenter"),

      // title: "Hyzmat merkezi",
      path: "/service",
    },
  ];
  return (
    <>
      {footerLinks.map((item) => (
        <Typography
          key={item.title}
          onClick={() => navigate(item.path)}
          sx={footerLinksStyle}
        >
          {item.title}
        </Typography>
      ))}
    </>
  );
};

export default FooterLinks;
