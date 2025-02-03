import { FC } from "react";
import { Box, Container } from "@mui/material";
import PresentHeader from "../components/PresentHeader";
import PresentCardBox from "../components/PresentCardBox";

const PresentCard: FC = () => {
  return (
    <>
      <Container>
        <Box my={1}>
          <PresentHeader />
          <PresentCardBox />
        </Box>
      </Container>
    </>
  );
};

export default PresentCard;
