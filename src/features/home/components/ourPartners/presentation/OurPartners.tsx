import { FC } from "react";
import OurPartnersSlider from "../components/OurPartnersSlider";
import { Typography } from "@mui/material";

const OurPartners: FC = () => {
  return (
    <>
      <Typography mt={2} sx={{ fontWeight: 600, fontSize: "18px" }}>
        Hyzmatdaşlarymyz
      </Typography>
      <OurPartnersSlider />
    </>
  );
};

export default OurPartners;
