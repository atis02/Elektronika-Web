import { FC } from "react";
import { Button, Stack, useMediaQuery, useTheme } from "@mui/material";
import PriceFilter from "./PriceFilter";
import BrendFilter from "./BrendFilter";
import TypeFilter from "./TypeFilter";
import CategoryHeader from "../CategoryHeader";
import Sidebar from "../../../home/components/sidebar/presentation/Sidebar";
import { t } from "i18next";
import { useSearchParams } from "react-router-dom";

interface CategoryFiltersProps {
  selectedFilters: any;
  onCategorySelect: (filters: any) => void;
  filteredProductsByProperty: (filters: any) => void;
  handleCategorySelect: (filters: any) => void;
  onClose?: () => void;
}

const CategoryFilters: FC<CategoryFiltersProps> = ({
  onClose,
  onCategorySelect,
  filteredProductsByProperty,
  handleCategorySelect,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [searchParams] = useSearchParams();

  const handleClearAll = () => {
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
      statusId: searchParams.get("statusId")
        ? searchParams.get("statusId")
        : undefined,
      minPrice: 1,
      maxPrice: 200000,
      sortBy: "alphabet",
      sortOrder: "ASC",
    };
    onCategorySelect(filters);
    filteredProductsByProperty(filters);
    handleCategorySelect(filters);
    onClose?.();
  };

  return (
    <>
      <Stack spacing={2}>
        {!isMobile && (
          <Stack spacing={2}>
            <Sidebar />
          </Stack>
        )}
        <Stack spacing={2}>
          <CategoryHeader
            categoryTitle={""}
            handleCategorySelect={handleCategorySelect}
          />
        </Stack>
        <Stack spacing={2}>
          <PriceFilter
            onClose={onClose}
            handleCategorySelect={handleCategorySelect}
          />
        </Stack>
        <Stack spacing={2}>
          <BrendFilter onCategorySelect={onCategorySelect} />
        </Stack>
        <Stack spacing={2}>
          <TypeFilter onCategorySelect={filteredProductsByProperty} />
        </Stack>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        position="sticky"
        bottom={-1}
        width="100%"
        p={1}
        bgcolor="#fff"
      >
        <Button
          onClick={handleClearAll}
          sx={{
            borderBottom: "4px dotted",
            mt: 3,
            fontSize: 12,
            color: "#000",
            borderRadius: 0,
          }}
        >
          {t("header.clearFilter")}
        </Button>
        <Button
          variant="outlined"
          onClick={handleClearAll}
          sx={{
            width: "60%",
            mt: 3,
            borderRadius: 2,
            fontSize: 12,
            color: "#000",
          }}
        >
          {t("header.dosearch")}
        </Button>
      </Stack>
    </>
  );
};

export default CategoryFilters;
