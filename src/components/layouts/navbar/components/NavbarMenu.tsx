import { FC, useState } from "react";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MobileDrawer from "./MobileDrawer";

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
      <MobileDrawer
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={() => setIsDrawerOpen(false)}
      />
    </>
  );
};

export default NavbarMenu;
