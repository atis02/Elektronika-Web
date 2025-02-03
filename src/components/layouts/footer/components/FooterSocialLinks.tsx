import { FC } from "react";
import { IconButton } from "@mui/material";
import { Instagram, Google, Twitter, Facebook } from "@mui/icons-material";

const FooterSocialLinks: FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        marginBottom: "20px",
      }}
    >
      <IconButton
        sx={{
          width: "24px",
          height: "24px",
          color: "#fff",
          "&:hover": {
            color: "#C3000E", // Hover color
            transform: "scale(1.1)", // Scale on hover
            transition: "all 0.3s ease", // Smooth transition for hover effect
          },
        }}
      >
        <Instagram />
      </IconButton>

      <IconButton
        sx={{
          width: "24px",
          height: "24px",
          color: "#fff",
          "&:hover": {
            color: "#C3000E", // Hover color
            transform: "scale(1.1)", // Scale on hover
            transition: "all 0.3s ease", // Smooth transition for hover effect
          },
        }}
      >
        <Google />
      </IconButton>

      <IconButton
        sx={{
          width: "24px",
          height: "24px",
          color: "#fff",
          "&:hover": {
            color: "#C3000E", // Hover color
            transform: "scale(1.1)", // Scale on hover
            transition: "all 0.3s ease", // Smooth transition for hover effect
          },
        }}
      >
        <Twitter />
      </IconButton>

      <IconButton
        sx={{
          width: "24px",
          height: "24px",
          color: "#fff",
          "&:hover": {
            color: "#C3000E", // Hover color
            transform: "scale(1.1)", // Scale on hover
            transition: "all 0.3s ease", // Smooth transition for hover effect
          },
        }}
      >
        <Facebook />
      </IconButton>
    </div>
  );
};

export default FooterSocialLinks;
