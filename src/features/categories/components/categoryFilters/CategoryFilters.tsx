import { FC } from "react";
import { Stack } from "@mui/material";
import PriceFilter from "./PriceFilter";
import ColorFilter from "./ColorFilter";
import BrendFilter from "./BrendFilter";
import TypeFilter from "./TypeFilter";

interface CategoryFiltersProps {
  selectedFilters: any; // Type the selectedFilters prop
  onCategorySelect: (filters: any) => void; // Type the function for handling filter changes
}

const CategoryFilters: FC<CategoryFiltersProps> = ({
  selectedFilters,
  onCategorySelect,
}) => {
  // Example of using selectedFilters and onCategorySelect inside this component
  console.log("Selected Filters:", selectedFilters);
  console.log("On Category Select function:", onCategorySelect);

  return (
    <Stack spacing={6}>
      <Stack spacing={2}>
        <PriceFilter />
      </Stack>
      <Stack spacing={2}>
        <ColorFilter />
      </Stack>
      <Stack spacing={2}>
        <BrendFilter />
      </Stack>
      <Stack spacing={2}>
        <TypeFilter />
      </Stack>
    </Stack>
  );
};

export default CategoryFilters;
