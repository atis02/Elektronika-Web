import { Badge } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useNavigate } from "react-router-dom";

const FavouriteButton = () => {
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const navigate = useNavigate();
  return (
    <Badge
      badgeContent={favorites.length}
      sx={{
        "& .MuiBadge-badge": {
          width: 20,
          height: 20,
          marginLeft: 3,
          backgroundColor: "#fff",
          color: "#C3000E",
          fontSize: "0.75rem",
          fontWeight: "bold",
          border: "1px solid #C3000E",
        },
      }}
    >
      <img
        onClick={() => navigate("/favourites")}
        src="/navbarIcons/mdi-light_heart.svg"
        style={{ cursor: "pointer" }}
        alt="heart"
      />
    </Badge>
  );
};

export default FavouriteButton;
