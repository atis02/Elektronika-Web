import { FC } from "react";
import { Box, Stack } from "@mui/material";

const FooterMobileApps: FC = () => {
  return (
    <Stack
      spacing={2}
      direction={{ lg: "column", md: "column", sm: "row", xs: "row" }}
    >
      <Box
        sx={{ width: { lg: "155px", md: "150px", sm: "140px", xs: "auto" } }}
      >
        <img
          style={{
            width: "100%",
            height: "48px",
            cursor: "pointer",
            transition: "all 0.3s ease-in-out",
          }}
          src="/icons/appstore.svg"
          alt="appstore picture"
          className="appstore-img"
        />
      </Box>
      <Box
        sx={{ width: { lg: "155px", md: "150px", sm: "140px", xs: "auto" } }}
      >
        <img
          style={{
            width: "100%",
            height: "48px",
            cursor: "pointer",
            transition: "all 0.3s ease-in-out",
          }}
          src="/icons/googleplay.svg"
          alt="googleplay.svg"
          className="googleplay-img"
        />
      </Box>
    </Stack>
  );
};

export default FooterMobileApps;
