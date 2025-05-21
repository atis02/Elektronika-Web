import { Badge } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import BasketViewModel from "../../../../store/basket/BasketViewModel";
import { observer } from "mobx-react-lite";

const BasketM: FC = observer(() => {
  const navigate = useNavigate();
  const { totalItems } = BasketViewModel;

  return (
    <>
      <Badge
        badgeContent={totalItems}
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
          onClick={() => navigate("/basket")}
          src="/navbarIcons/iconamoon_shopping-card-light.svg"
          alt="basket"
          style={{ cursor: "pointer", width: "25px" }}
        />
      </Badge>
    </>
  );
});

export default BasketM;
