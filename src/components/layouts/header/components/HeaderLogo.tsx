import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const HeaderLogo: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <Stack onClick={() => navigate("/")}>
        <img
          src="/navbarIcons/logo.svg"
          style={{ width: "137px", height: "28px", cursor: "pointer" }}
          alt="header logo"
        />
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "21.7px",
            width: "100%",
          }}
        >
          {t("header.header_subtitle")}
        </Typography>
      </Stack>
    </>
  );
};

export default HeaderLogo;
