import { Box } from "@mui/material";
import { FC } from "react";
import EmbassyBox from "../components/EmbassyBox";

const Embassy: FC = () => {
  return (
    <>
      <Box my={5}>
        <EmbassyBox />
      </Box>
    </>
  );
};

export default Embassy;
