import { FC, useState } from "react";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { deliveryNavigateTitle } from "../../delivery/styles/deliveryStyle";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface CategoryHeaderProps {
  categoryTitle?: string;
  handleCategorySelect: (filters: any) => void;
}

const CategoryHeader: FC<CategoryHeaderProps> = ({
  categoryTitle,
  handleCategorySelect,
}) => {
  const [selectedSort, setSelectedSort] = useState("alphabet-ASC"); // Combined state
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const handleChange = (event: SelectChangeEvent<string>) => {
    const newValue = event.target.value;
    setSelectedSort(newValue);
    updateFilters(newValue);
  };

  const updateFilters = (sortValue: string) => {
    const [sortBy, sortOrder] = sortValue.split("-"); // Split combined value

    const filters = {
      categoryId: searchParams.get("categoryId")
        ? searchParams.get("categoryId")
        : undefined,
      subCategoryId: searchParams.get("subCategoryId")
        ? searchParams.get("subCategoryId")
        : undefined,
      segmentId: searchParams.get("segmentId")
        ? searchParams.get("segmentId")
        : undefined,
      brandId: searchParams.get("brandId")
        ? searchParams.get("brandId")
        : undefined,
      minPrice: 100,
      maxPrice: 200000,
      sortBy: sortBy,
      sortOrder: sortOrder,
    };
    handleCategorySelect(filters);
  };

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
      <Stack mt="5px" direction="row" alignItems="center" spacing={2}>
        <Select
          displayEmpty
          value={selectedSort}
          onChange={handleChange}
          sx={{
            width: "100%",
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
          <MenuItem value="alphabet-ASC">A-Z</MenuItem>
          <MenuItem value="alphabet-DESC">Z-A</MenuItem>
          <MenuItem value="price-ASC">{t("category.select1")}</MenuItem>
          <MenuItem value="price-DESC">{t("category.select2")}</MenuItem>
        </Select>
      </Stack>
    </>
  );
};

export default CategoryHeader;
