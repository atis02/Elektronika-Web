import { Box, Divider, Drawer } from "@mui/material";
import { FC } from "react";
import CatalogMenu from "./MobileCatalog";
import NavbarMenuLinks from "./NavbarMenuLinks";

type Props = {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
};

const MobileDrawer: FC<Props> = ({ isDrawerOpen, toggleDrawer }) => {
  return (
    <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
      <Box
        sx={{
          width: "100vw",
          minHeight: "100vh",
          backgroundColor: "#fff",
        }}
      >
        <CatalogMenu onClose={toggleDrawer} />
        <Divider />
        <Divider />
        <NavbarMenuLinks />
        <Divider />
        <Divider />
      </Box>
    </Drawer>
  );
};

export default MobileDrawer;
