// Category.tsx
import { FC } from "react";
import { Typography, Stack } from "@mui/material";

interface CategoryProps {
  categories: any[];
  selectedCategoryId: string | null;
  handleCategoryClick: (categoryId: string) => void;
}

const Category: FC<CategoryProps> = ({
  categories,
  selectedCategoryId,
  handleCategoryClick,
}) => {
  return (
    <Stack spacing={2}>
      {categories.map((category: any) => (
        <Stack key={category.id} direction={"row"} spacing={1}>
          {category.imageUrl ? (
            <img
              src={category.imageUrl}
              alt={category.title_tm}
              style={{ width: "40px", height: "30px" }}
            />
          ) : (
            <span>No Image</span>
          )}
          <Typography
            onMouseEnter={() => handleCategoryClick(category.id)}
            sx={{
              cursor: "pointer",
              fontWeight:
                selectedCategoryId === category.id ? "bold" : "normal",
              color: selectedCategoryId === category.id ? "red" : "black",
            }}
          >
            {category.title_tm}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export default Category;
