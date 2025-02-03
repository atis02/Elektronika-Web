import { FC } from "react";

interface SubcategoryFiltersProps {
  subcategory: any;
}

const SubcategoryFilters: FC<SubcategoryFiltersProps> = ({ subcategory }) => {
  return <div>Filters for {subcategory.nameTm}</div>;
};

export default SubcategoryFilters;
