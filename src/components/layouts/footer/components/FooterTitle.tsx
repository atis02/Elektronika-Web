import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { footerTitle, underlineStyle } from "../styles/footerStyles";

interface FooterTitleProps {
  text: string;
}

const FooterTitle: FC<FooterTitleProps> = ({ text }) => {
  return (
    <Box>
      <Typography sx={footerTitle}>{text}</Typography>
      <Box sx={underlineStyle}></Box>
    </Box>
  );
};

export default FooterTitle;
