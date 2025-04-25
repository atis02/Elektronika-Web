import { FC, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useTranslation } from "react-i18next";
import { useCategories } from "../../../../hooks/category/useCategory";

// Example Data Structure

const NavbarMenuCategories: FC = () => {
  const { categories, isLoading: isCategoriesLoading } = useCategories();
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {}
  );
  const { t, i18n } = useTranslation();

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
        <Box
          key={getTitle(
            subcategory.nameRu,
            subcategory.nameTm,
            subcategory.nameEn
          )}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            onClick={() =>
              toggleCategory(
                getTitle(
                  subcategory.nameRu,
                  subcategory.nameTm,
                  subcategory.nameEn
                )
              )
            }
          >
            <Typography>
              {getTitle(
                subcategory.nameRu,
                subcategory.nameTm,
                subcategory.nameEn
              )}
            </Typography>
            <KeyboardArrowDownIcon
              sx={{
                transform: openCategories[
                  getTitle(
                    subcategory.nameRu,
                    subcategory.nameTm,
                    subcategory.nameEn
                  )
                ]
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
                transition: "transform 0.5s ease",
              }}
            />
          </Stack>
          {openCategories[
            getTitle(subcategory.nameRu, subcategory.nameTm, subcategory.nameEn)
          ] && renderBrands(subcategory.brands)}
        </Box>
      ))}
    </Stack>
  );
  const getTitle = (nameTm: string, nameRu: string, nameEn: string) => {
    const currentLanguage = i18n.language; // Get the current language (e.g., "en", "ru", "tm")
    switch (currentLanguage) {
      case "ru":
        return nameRu;
      case "tm":
        return nameTm;
      default:
        return nameEn; // Default to English
    }
  };
  const renderCategories = (categories: any[]) => (
    <Stack mt={2} spacing={2}>
      {categories.map((category) => (
        <Box key={getTitle(category.nameRu, category.nameTm, category.nameEn)}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            onClick={() =>
              toggleCategory(
                getTitle(category.nameRu, category.nameTm, category.nameEn)
              )
            }
          >
            <Typography>
              {getTitle(category.nameRu, category.nameTm, category.nameEn)}
            </Typography>
            <KeyboardArrowDownIcon
              sx={{
                transform: openCategories[
                  getTitle(category.nameRu, category.nameTm, category.nameEn)
                ]
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
                transition: "transform 0.5s ease",
              }}
            />
          </Stack>
          {openCategories[
            getTitle(category.nameRu, category.nameTm, category.nameEn)
          ] && renderSubcategories(category.subCategories)}
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
      {!isCategoriesLoading &&
        openCategories["root"] &&
        renderCategories(categories)}
    </Box>
  );
};

export default NavbarMenuCategories;
