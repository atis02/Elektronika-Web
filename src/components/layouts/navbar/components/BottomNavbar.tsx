import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CategoryIcon from "@mui/icons-material/Category";
import { observer } from "mobx-react-lite";
import BasketViewModel from "../../../../store/basket/BasketViewModel";
import { mainColor } from "../../../../features/home/components/goodOfWeek/style/weekGoodsStyle";
import { CardGiftcard, Gavel } from "@mui/icons-material";
import { useState } from "react";
import MobileDrawer from "./MobileDrawer";
import Login from "../../../login/Login";
import useDrawer from "./useDrawer";

const BottomNav = observer(() => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isOpen, openDrawer, closeDrawer } = useDrawer();

  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = BasketViewModel;

  const value = (() => {
    if (location.pathname.includes("/auction")) return 0;
    if (location.pathname.includes("/present-card")) return 1;
    if (location.pathname.includes("/buy-present-card")) return 1;
    if (location.pathname.includes("/basket")) return 2;
    if (location.pathname.includes("/account")) return 3;
    if (location.pathname.includes("/categories")) return 4;
    return -1;
  })();

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
      elevation={3}
    >
      <BottomNavigation
        value={value}
        showLabels
        onChange={(_, newValue) => {
          if (newValue === 0) navigate("/auction");
          if (newValue === 1) navigate("/present-card");
          if (newValue === 2) navigate("/basket");
          if (newValue === 3) openDrawer();
          if (newValue === 4) setIsDrawerOpen(true);
        }}
      >
        <BottomNavigationAction
          icon={<Gavel sx={{ color: value === 0 ? mainColor : "#999" }} />}
        />
        <BottomNavigationAction
          icon={
            <CardGiftcard sx={{ color: value === 1 ? mainColor : "#999" }} />
          }
        />
        <BottomNavigationAction
          icon={
            <div style={{ position: "relative" }}>
              <ShoppingCartIcon
                sx={{ color: value === 2 ? mainColor : "#999" }}
              />
              {totalItems > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -6,
                    right: -10,
                    background: mainColor,
                    color: "#fff",
                    borderRadius: "50%",
                    fontSize: 10,
                    padding: "2px 5px",
                  }}
                >
                  {totalItems}
                </span>
              )}
            </div>
          }
        />
        <BottomNavigationAction
          icon={
            <AccountCircleIcon
              sx={{ color: value === 3 ? mainColor : "#999" }}
            />
          }
        />
        <BottomNavigationAction
          icon={
            <CategoryIcon sx={{ color: value === 4 ? mainColor : "#999" }} />
          }
        />
      </BottomNavigation>
      <MobileDrawer
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={() => setIsDrawerOpen(false)}
      />
      <Login isOpen={isOpen} onClose={closeDrawer} />
    </Paper>
  );
});

export default BottomNav;
