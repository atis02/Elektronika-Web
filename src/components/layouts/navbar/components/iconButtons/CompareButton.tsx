import { Badge } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../redux/customHook";

const CompareButton = () => {
  const navigate = useNavigate();
  const compareProducts = useAppSelector((state) => state.compare.products);

  return (
    <Badge
      badgeContent={compareProducts.length}
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
        onClick={() => navigate("/compare")}
        src="/navbarIcons/compare.svg"
        style={{ cursor: "pointer" }}
        alt="gift"
      />
    </Badge>
  );
};

export default CompareButton;
