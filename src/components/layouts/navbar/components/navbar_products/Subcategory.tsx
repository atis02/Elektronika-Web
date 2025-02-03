// Subcategory.tsx
import { FC } from "react";
import { Typography, Stack } from "@mui/material";

interface SubcategoryProps {
  filteredSubcategories: any[];
  allSegments: any[];
}

const Subcategory: FC<SubcategoryProps> = ({
  filteredSubcategories,
  allSegments,
}) => {
  return (
    <Stack spacing={2}>
      {filteredSubcategories.length > 0 ? (
        filteredSubcategories.map((sub: any) => {
          const filteredSegments = allSegments.filter(
            (seg: any) => seg.subcategory_id === sub.id
          );
          return (
            <Stack key={sub.id} mb={2}>
              <Typography
                sx={{ cursor: "pointer", fontSize: "14px", fontWeight: "600" }}
              >
                {sub.title_tm}
              </Typography>
              {filteredSegments.length > 0 &&
                filteredSegments.map((seg: any) => (
                  <Typography
                    key={seg.id}
                    sx={{
                      cursor: "pointer",
                      mb: 1,
                      paddingLeft: "5px",
                      fontSize: "14px",
                    }}
                  >
                    {seg.title_tm}
                  </Typography>
                ))}
            </Stack>
          );
        })
      ) : (
        <Typography>No subcategories available</Typography>
      )}
    </Stack>
  );
};

export default Subcategory;
