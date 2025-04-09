import { FC, useState, useEffect } from "react";
import { Stack, Badge, Snackbar, Alert } from "@mui/material";
import Language from "../../../../language/Language";
import { useNavigate } from "react-router-dom";
import Login from "../../../login/Login";
import useDrawer from "./useDrawer";
// import NavbarSearchGlobal from "../../navbarSearch/NavbarSearchGlobal";
import { observer } from "mobx-react-lite";
import defaultProfileImage from "../../../../../public/navbarIcons/profile.svg";
import UserViewModel from "../../../login/UserViewModel";
import BasketViewModel from "../../../../store/basket/BasketViewModel";
import { useAppSelector } from "../../../redux/customHook";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";

const NavbarRightSide: FC = observer(() => {
  const navigate = useNavigate();
  const { isOpen, openDrawer, closeDrawer } = useDrawer();
  // const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  const compareProducts = useAppSelector((state) => state.compare.products);

  const { totalItems, items } = BasketViewModel;

  // const handleSearchToggle = () => setIsSearchOpen((prev) => !prev);

  const profileImage = UserViewModel.user?.profileImage
    ? UserViewModel.user?.profileImage
    : defaultProfileImage;

  useEffect(() => {
    if (items.length > 0) {
      setMessage("Üstünlikli!");
    }
  }, [items.length]);

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setMessage(null);
    console.log(event);
  };
  return (
    <>
      {/* {isSearchOpen ? (
        <NavbarSearchGlobal onClose={handleSearchToggle} />
      ) : ( */}
      <Stack direction="row" alignItems="center" spacing={2}>
        {/* <img
          src="/navbarIcons/search.svg"
          style={{ cursor: "pointer" }}
          alt="search"
          onClick={handleSearchToggle}
        /> */}

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
        {/* <p>{favorites.map((item) => item.title_en)}</p> */}
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

        <Badge
          badgeContent={totalItems}
          sx={{
            "& .MuiBadge-badge": {
              width: 20,
              height: 20,
              marginLeft: 3,
              backgroundColor: "#fff", // Custom background color
              color: "#C3000E", // Custom text color
              fontSize: "0.75rem", // Optional: Adjust text size
              fontWeight: "bold", // Optional: Bold text
              border: "1px solid #C3000E", // Optional: Add a border for better visibility
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
        {/* <Badge
          badgeContent={0}
          sx={{
            "& .MuiBadge-badge": {
              width: 20,
              height: 20,
              marginLeft: 3,
              backgroundColor: "#fff", // Custom background color
              color: "#C3000E", // Custom text color
              fontSize: "0.75rem", // Optional: Adjust text size
              fontWeight: "bold", // Optional: Bold text
              border: "1px solid #C3000E", // Optional: Add a border for better visibility
            },
          }}
        >
          <img
            onClick={() => navigate("/present-card")}
            src="/images/gift.png"
            style={{ cursor: "pointer", width: 24, height: 24 }}
            alt="heart"
          />
        </Badge> */}
        <Badge
          badgeContent={compareProducts.length}
          sx={{
            "& .MuiBadge-badge": {
              width: 20,
              height: 20,
              marginLeft: 3,
              backgroundColor: "#fff", // Custom background color
              color: "#C3000E", // Custom text color
              fontSize: "0.75rem", // Optional: Adjust text size
              fontWeight: "bold", // Optional: Bold text
              border: "1px solid #C3000E", // Optional: Add a border for better visibility
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

        <Language />
      </Stack>
      {/* )} */}
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
