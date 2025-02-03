import { FC } from "react";
import { MenuItem, Select, Stack, Typography } from "@mui/material";
import { deliveryNavigateTitle } from "../../delivery/styles/deliveryStyle";
import { Link, useLocation } from "react-router-dom";

interface Subcategory {
  id: number;
  title_en: string;
  category_id: number;
  category_title_en: string;
}

const SubcategoryHeader: FC = () => {
  const location = useLocation();
  const { subcategory }: { subcategory?: Subcategory } = location.state || {};

  return (
    <>
      {/* Breadcrumb Navigation */}
      <Typography sx={deliveryNavigateTitle} mt={5}>
        <Link to="/" style={{ textDecoration: "none", color: "#777777" }}>
          Baş sahypa
        </Link>
        {subcategory?.category_id && (
          <>
            {" / "}
            <Link
              to={`/categories/${subcategory.category_id}`}
              state={{
                category: {
                  id: subcategory.category_id,
                  title_en: subcategory.category_title_en,
                },
              }}
              style={{ textDecoration: "none", color: "#777777" }}
            >
              {subcategory.category_title_en}
            </Link>
          </>
        )}
        {subcategory && (
          <>
            {" / "}
            <Typography
              component="span"
              style={{
                textDecoration: "none",
                color: "#777777",
                fontWeight: "bold",
              }}
            >
              {subcategory.title_en}
            </Typography>
          </>
        )}
      </Typography>

      {/* Header and Sort Option */}
      <Stack
        my={3}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Title */}
        <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>
          {subcategory?.title_en || "All Products"}
        </Typography>

        {/* Sort Dropdown */}
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
          <MenuItem value="priceLowToHigh">Arzandan Gymmada</MenuItem>
          <MenuItem value="priceHighToLow">Gymmatdan Arzana</MenuItem>
        </Select>
      </Stack>
    </>
  );
};

export default SubcategoryHeader;
