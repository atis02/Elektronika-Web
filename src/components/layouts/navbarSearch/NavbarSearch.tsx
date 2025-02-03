import { FC } from "react";
import { InputBase, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const NavbarSearch: FC = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        backgroundColor: "#FAFAFA",
        borderRadius: "8px",
        padding: "4px 12px",
        width: "90%",
        border: "1px solid #E2E8F0",
      }}
    >
      <InputBase
        placeholder="Search..."
        sx={{
          flex: 1,
          fontSize: "14px",
          color: "#2D3748",
          "&::placeholder": {
            color: "#A0AEC0",
          },
        }}
      />
      <SearchIcon sx={{ color: "#718096", marginRight: "8px" }} />
    </Stack>
  );
};

export default NavbarSearch;
