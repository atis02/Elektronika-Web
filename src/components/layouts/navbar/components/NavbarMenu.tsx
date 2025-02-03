import { FC, useState } from "react";
import {
  IconButton,
  Drawer,
  Box,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavbarMenuCategories from "./NavbarMenuCategories";
import NavbarMenuLinks from "./NavbarMenuLinks";
import useDrawer from "./useDrawer";
import Login from "../../../login/Login";
import LoginIcon from "@mui/icons-material/Login";

const NavbarMenu: FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isOpen, openDrawer, closeDrawer } = useDrawer();

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <>
      <IconButton
        sx={{
          background: "#CFD8DC !important",
          width: "38px",
          height: "38px",
          color: "#2E2F38",
          borderRadius: "4px",
        }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>

      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            minHeight: "100vh",
            backgroundColor: "#fff",
          }}
        >
          <NavbarMenuCategories />
          <Divider />
          <Divider />
          <NavbarMenuLinks />
          <Divider />
          <Divider />
          <Stack
            p={2}
            direction="row"
            alignItems="center"
            spacing={2}
            onClick={openDrawer}
          >
            <Typography>Girmek</Typography>
            <LoginIcon sx={{ color: "#2E2F38", width: "16px" }} />
          </Stack>
        </Box>
      </Drawer>
      <Login isOpen={isOpen} onClose={closeDrawer} />
    </>
  );
};

export default NavbarMenu;
