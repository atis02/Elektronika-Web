import { FC, useState } from "react";
import { IconButton, Drawer, Box, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavbarMenuLinks from "./NavbarMenuLinks";
import CatalogMenu from "./MobileCatalog";

const NavbarMenu: FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <>
      <IconButton
        sx={{
          background: "#B71C1C !important",
          width: "38px",
          height: "38px",
          color: "#fff",
          borderRadius: "4px",
        }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>

      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: "100vw",
            minHeight: "100vh",
            backgroundColor: "#fff",
          }}
        >
          <CatalogMenu onClose={toggleDrawer(false)} />
          <Divider />
          <Divider />
          <NavbarMenuLinks />
          <Divider />
          <Divider />
        </Box>
      </Drawer>
    </>
  );
};

export default NavbarMenu;
