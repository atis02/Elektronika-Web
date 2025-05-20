import { PersonOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { FC } from "react";
import useDrawer from "../../navbar/components/useDrawer";
import Login from "../../../login/Login";
export const ProfileNavMobile: FC = () => {
  const { isOpen, openDrawer, closeDrawer } = useDrawer();

  return (
    <>
      <IconButton onClick={openDrawer}>
        <PersonOutlined sx={{ ml: 0.6, color: "#fff" }} />
      </IconButton>
      <Login isOpen={isOpen} onClose={closeDrawer} />
    </>
  );
};
