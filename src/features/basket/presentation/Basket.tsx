import { FC } from "react";
import Grid from "@mui/material/Grid2";
import { Box, Container } from "@mui/material";
import BasketLeft from "../components/BasketLeft";
import BasketRight from "../components/BasketRight";
import BasketTitle from "../components/BasketTitle";
import CompleteOrder from "../../delivery/components/CompleteOrder";

const Basket: FC = () => {
  return (
    <>
      <Container>
        <Box my={1}>
          <BasketTitle />
          <Grid container spacing={3} my={2}>
            <Grid size={{ lg: 9, md: 9, sm: 12, xs: 12 }}>
              <BasketLeft />
            </Grid>
            <Grid size={{ lg: 3, md: 3, sm: 12, xs: 12 }}>
              <BasketRight />
            </Grid>
          </Grid>
          <CompleteOrder />
        </Box>
      </Container>
    </>
  );
};

export default Basket;
