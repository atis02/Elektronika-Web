import { FC } from "react";
import OurPartnersSlider from "../components/OurPartnersSlider";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const OurPartners: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Typography mt={2} sx={{ fontWeight: 600, fontSize: "18px" }}>
        {t("partners.ourPartners")}
      </Typography>
      <OurPartnersSlider />
    </>
  );
};

export default OurPartners;
