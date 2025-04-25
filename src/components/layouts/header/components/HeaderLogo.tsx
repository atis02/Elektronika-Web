import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const HeaderLogo: FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  return (
    <>
      <Stack
        alignItems="center"
        justifyContent="center"
        onClick={() => navigate("/")}
      >
        <img
          src="/navbarIcons/logo.svg"
          style={{
            width: "207px",
            height: "30px",
            cursor: "pointer",
            backgroundColor: "#fff",
            borderRadius: 8,
          }}
          alt="header logo"
        />
        <Typography
          sx={{
            fontSize:
              i18n.language === "en"
                ? "11.7px"
                : i18n.language === "tm"
                ? "15px"
                : "13px",
            fontWeight: "400",
            lineHeight: "21.7px",
            width: "100%",
            color: "#fff",
            textAlign: "center",
          }}
        >
          {t("header.header_subtitle")}
        </Typography>
      </Stack>
    </>
  );
};

export default HeaderLogo;
