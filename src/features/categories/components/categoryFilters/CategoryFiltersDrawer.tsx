import { Drawer, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CategoryFilters from "./CategoryFilters";
import { FC } from "react";

interface CategoryFiltersDrawerProps {
  open: boolean;
  onClose: () => void;
  selectedFilters: any;
  onCategorySelect: (filters: any) => void;
  filteredProductsByProperty: (filters: any) => void;
  handleCategorySelect: (filters: any) => void;
}

const CategoryFiltersDrawer: FC<CategoryFiltersDrawerProps> = ({
  open,
  onClose,
  selectedFilters,
  onCategorySelect,
  filteredProductsByProperty,
  handleCategorySelect,
}) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      ModalProps={{
        keepMounted: true,
      }}
      onClose={onClose}
      sx={{
        zIndex: 1300,
        "& .MuiDrawer-paper": {
          width: 300,
          padding: 2,
          boxSizing: "border-box",
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{ alignSelf: "flex-end", mb: -3.5, zIndex: 10 }}
      >
        <CloseIcon />
      </IconButton>
      <CategoryFilters
        onClose={onClose}
        selectedFilters={selectedFilters}
        onCategorySelect={onCategorySelect}
        filteredProductsByProperty={filteredProductsByProperty}
        handleCategorySelect={handleCategorySelect}
      />
    </Drawer>
  );
};

export default CategoryFiltersDrawer;
