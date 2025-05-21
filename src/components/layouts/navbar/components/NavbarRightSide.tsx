import { FC, useState, useEffect } from "react";
import { Stack, Badge, Snackbar, Alert } from "@mui/material";
import Language from "../../../../language/Language";
import { useNavigate } from "react-router-dom";
import Login from "../../../login/Login";
import useDrawer from "./useDrawer";
import { observer } from "mobx-react-lite";
import defaultProfileImage from "../../../../../public/navbarIcons/profile.svg";
import UserViewModel from "../../../login/UserViewModel";
import BasketViewModel from "../../../../store/basket/BasketViewModel";
import FavouriteButton from "./iconButtons/FavouriteButton";
import CompareButton from "./iconButtons/CompareButton";

const NavbarRightSide: FC = observer(() => {
  const navigate = useNavigate();
  const { isOpen, openDrawer, closeDrawer } = useDrawer();
  const [message, setMessage] = useState<string | null>(null);

  const { totalItems, items } = BasketViewModel;

  const profileImage = UserViewModel.user?.profileImage
    ? UserViewModel.user?.profileImage
    : defaultProfileImage;

  useEffect(() => {
    if (items.length > 0) {
      setMessage("Üstünlikli!");
    }
  }, [items.length]);

  const handleCloseSnackbar = (
    _?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setMessage(null);
  };
  return (
    <>
      <Stack direction="row" alignItems="center" spacing={2}>
        {UserViewModel.user?.profileImage ? (
          <img
            src={`${profileImage}`}
            alt="profile"
            style={{
              cursor: "pointer",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            onClick={openDrawer}
          />
        ) : (
          <img
            src={profileImage}
            alt="profile"
            style={{ cursor: "pointer" }}
            onClick={openDrawer}
          />
        )}
        <FavouriteButton />
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
            style={{ cursor: "pointer" }}
          />
        </Badge>
        <CompareButton />
        <Language />
      </Stack>
      <Snackbar
        open={!!message}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>

      <Login isOpen={isOpen} onClose={closeDrawer} />
    </>
  );
});

export default NavbarRightSide;
