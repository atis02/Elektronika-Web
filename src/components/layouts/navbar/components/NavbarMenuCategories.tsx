import { FC, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useTranslation } from "react-i18next";

// Example Data Structure
const categoriesData = [
  {
    name: "TW we multimediya",
    subcategories: [
      {
        name: "TVs",
        brands: ["Samsung", "LG", "Sony"],
      },
      {
        name: "Speakers",
        brands: ["Bose", "JBL", "Sony"],
      },
    ],
  },
  {
    name: "Telefonlar we Gadjetler",
    subcategories: [
      {
        name: "Smartphones",
        brands: ["iPhone", "Samsung Galaxy", "OnePlus"],
      },
      {
        name: "Wearables",
        brands: ["Apple Watch", "Fitbit", "Garmin"],
      },
    ],
  },
];

const NavbarMenuCategories: FC = () => {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {}
  );
  const { t } = useTranslation();

  const toggleCategory = (name: string) => {
    setOpenCategories((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const renderBrands = (brands: string[]) => (
    <Stack spacing={1} mt={1} pl={4}>
      {brands.map((brand) => (
        <Typography key={brand}>{brand}</Typography>
      ))}
    </Stack>
  );

  const renderSubcategories = (subcategories: any[]) => (
    <Stack spacing={1} mt={2} pl={2}>
      {subcategories.map((subcategory) => (
        <Box key={subcategory.name}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            onClick={() => toggleCategory(subcategory.name)}
          >
            <Typography>{subcategory.name}</Typography>
            <KeyboardArrowDownIcon
              sx={{
                transform: openCategories[subcategory.name]
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
                transition: "transform 0.5s ease",
              }}
            />
          </Stack>
          {openCategories[subcategory.name] && renderBrands(subcategory.brands)}
        </Box>
      ))}
    </Stack>
  );

  const renderCategories = (categories: any[]) => (
    <Stack mt={2} spacing={2}>
      {categories.map((category) => (
        <Box key={category.name}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            onClick={() => toggleCategory(category.name)}
          >
            <Typography>{category.name}</Typography>
            <KeyboardArrowDownIcon
              sx={{
                transform: openCategories[category.name]
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
                transition: "transform 0.5s ease",
              }}
            />
          </Stack>
          {openCategories[category.name] &&
            renderSubcategories(category.subcategories)}
        </Box>
      ))}
    </Stack>
  );

  return (
    <Box
      sx={{
        color: "#000",
        px: 3,
        py: 1,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        onClick={() => toggleCategory("root")}
        sx={{
          cursor: "pointer",
          height: "40px",
        }}
      >
        <Typography> {t("navbar.categories")}</Typography>
        <KeyboardArrowDownIcon
          sx={{
            transform: openCategories["root"]
              ? "rotate(180deg)"
              : "rotate(0deg)",
            transition: "transform 0.5s ease",
          }}
        />
      </Stack>
      {openCategories["root"] && renderCategories(categoriesData)}
    </Box>
  );
};

export default NavbarMenuCategories;
