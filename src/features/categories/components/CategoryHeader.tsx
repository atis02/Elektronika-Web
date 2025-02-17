import { FC } from "react";
import { MenuItem, Select, Stack, Typography } from "@mui/material";
import { deliveryNavigateTitle } from "../../delivery/styles/deliveryStyle";
import { Link } from "react-router-dom";

interface CategoryHeaderProps {
  categoryTitle?: string;
}

const CategoryHeader: FC<CategoryHeaderProps> = ({ categoryTitle }) => {
  return (
    <>
      <Stack direction="row" alignItems="center" spacing={0.4}>
        <Typography sx={deliveryNavigateTitle}>
          <Link to="/" style={{ textDecoration: "none", color: "#777777" }}>
            Baş sahypa /
          </Link>
        </Typography>
        <Typography sx={deliveryNavigateTitle}>{categoryTitle}</Typography>
      </Stack>
      <Stack
        // my={3}
        mt="5px"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Select
          displayEmpty
          defaultValue="A-Z"
          sx={{
            width: 160,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#929292",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#929292",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#929292",
            },
            "& .MuiSelect-select": {
              padding: "8px",
            },
            "& .MuiSvgIcon-root": {
              color: "#000",
            },
          }}
        >
          <MenuItem value="A-Z">A-dan Z cenli</MenuItem>
          <MenuItem value="Z-A">Z-dan A cenli</MenuItem>
          <MenuItem value="Z-A">Arzandan Gymmada</MenuItem>
          <MenuItem value="Z-A">Gymmatdan Arzana</MenuItem>
        </Select>
      </Stack>
    </>
  );
};

export default CategoryHeader;
