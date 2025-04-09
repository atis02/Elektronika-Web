import { FC } from "react";
import { Stack } from "@mui/material";
import PriceFilter from "./PriceFilter";
import BrendFilter from "./BrendFilter";
import TypeFilter from "./TypeFilter";
import CategoryHeader from "../CategoryHeader";
import ProductViewModel from "../../../products/presentation/ProductViewModel";

interface CategoryFiltersProps {
  selectedFilters: any;
  onCategorySelect: (filters: any) => void;
  filteredProductsByProperty: (filters: any) => void;
  handleCategorySelect: (filters: any) => void;
}

const CategoryFilters: FC<CategoryFiltersProps> = ({
  selectedFilters,
  onCategorySelect,
  filteredProductsByProperty,
  handleCategorySelect,
}) => {
  console.log("On Category Select function:", selectedFilters);

  return (
    <Stack spacing={6}>
      <Stack spacing={2}>
        <CategoryHeader
          categoryTitle={
            ProductViewModel.products[0]?.productCategory?.nameTm || ""
          }
          handleCategorySelect={handleCategorySelect}
        />
      </Stack>
      <Stack spacing={2}>
        <PriceFilter handleCategorySelect={handleCategorySelect} />
      </Stack>
      {/* <Stack spacing={2}>
        <ColorFilter />
      </Stack> */}
      <Stack spacing={2}>
        <BrendFilter onCategorySelect={onCategorySelect} />
      </Stack>
      <Stack spacing={2}>
        <TypeFilter onCategorySelect={filteredProductsByProperty} />
      </Stack>
    </Stack>
  );
};

export default CategoryFilters;
