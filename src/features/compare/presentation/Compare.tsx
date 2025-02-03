import { FC } from "react";
import Grid from "@mui/material/Grid2";
import { Box, Container, Stack, Typography } from "@mui/material";
import {
  size1_4,
  size4_1,
} from "../../../components/layouts/header/utils/gridSize";
import Sidebar from "../../home/components/sidebar/presentation/Sidebar";
import CompareSlider from "../components/CompareSlider";
import CompareDescription from "../components/CompareDescription";

const Compare: FC = () => {
  return (
    <>
      <Container>
        <Grid container width="100%" minHeight="70vh" mt={2} spacing={2} my={4}>
          <Grid
            size={size1_4}
            sx={{
              display: { lg: "block", md: "block", sm: "none", xs: "none" },
            }}
          >
            <Stack spacing={4}>
              <Box>
                <Sidebar />
              </Box>
            </Stack>
          </Grid>

          <Grid size={size4_1}>
            <Typography
              textAlign={"center"}
              my={{ lg: 2, md: 2, sm: 2, xs: 0 }}
              fontWeight={700}
            >
              Önümi deňeşdirmek
            </Typography>
            <Box>
              <CompareSlider />
            </Box>
            <Box>
              <CompareDescription />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Compare;
