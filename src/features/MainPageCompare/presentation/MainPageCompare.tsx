import { FC } from "react";
import Grid from "@mui/material/Grid2";
import { Box } from "@mui/material";
import CompareElements from "../components/CompareElements";

const MainPageCompare: FC = () => {
  return (
    <>
      <Grid
        container
        width="100vw"
        sx={{ borderTop: "1px solid lightgray" }}
        minHeight="1vh"
        mt={2}
        spacing={2}
      >
        <Grid size={{ lg: 12, md: 9, sm: 12, xs: 12 }}>
          <Box>
            <CompareElements />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default MainPageCompare;
