import { FC } from "react";
import Grid from "@mui/material/Grid2";
import { Box, Container, Typography } from "@mui/material";
import {
  size4_1Copy,
} from "../../../components/layouts/header/utils/gridSize";
import CompareSlider from "../components/CompareSlider";
import CompareDescription from "../components/CompareDescription";
import { useTranslation } from "react-i18next";

const Compare: FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Container>
        <Grid container width="100%" minHeight="70vh" mt={2} spacing={2} my={4}>
          {/* <Grid
            size={size1_4}
            sx={{
              display: { lg: "block", md: "block", sm: "none", xs: "none" },
            }}
          >
            <Stack spacing={4} position="sticky" top={60} zIndex="100">
              <Box>
                <Sidebar />
              </Box>
            </Stack>
          </Grid> */}

          <Grid size={size4_1Copy}>
            <Typography
              textAlign={"center"}
              my={{ lg: 1, md: 2, sm: 2, xs: 0 }}
              fontWeight={700}
            >
              {t("compare.productTitle")}
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
