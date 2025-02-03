import { FC } from "react";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

const FavoriteButton: FC<FavoriteButtonProps> = ({ isFavorite, onToggle }) => {
  return (
    <IconButton
      onClick={onToggle}
      sx={{
        backgroundColor: isFavorite ? "#C3000E" : "transparent",
        color: isFavorite ? "white" : "inherit",
        borderRadius: "50%",
        "&:hover": {
          backgroundColor: isFavorite ? "#A3000B" : "#f5f5f5",
        },
        transition: "background-color 0.3s, transform 0.2s",
        transform: isFavorite ? "scale(1.1)" : "scale(1)",
      }}
    >
      {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

export default FavoriteButton;
