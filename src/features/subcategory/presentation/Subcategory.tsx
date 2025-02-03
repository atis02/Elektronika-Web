import { FC } from "react";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import SubcategoryProducts from "../components/SubcategoryProducts";
import SubcategoryHeader from "../components/SubcategoryHeader";
import SubcategoryFilters from "../components/SubcategoryFilters";
import { useLocation } from "react-router-dom";
import {
  size1_4,
  size4_1,
} from "../../../components/layouts/header/utils/gridSize";

interface SubcategoryProps {
  id: number;
  title_en: string;
  category_id: number;
  category_title_en: string;
}

const Subcategory: FC = () => {
  const location = useLocation();
  const { subcategory }: { subcategory?: SubcategoryProps } =
    location.state || {};

  if (!subcategory) {
    return <div>No subcategory selected</div>;
  }

  return (
    <Container>
      <SubcategoryHeader />
      <Grid container width="100%" my={5} spacing={3}>
        {/* Filters Section */}
        <Grid size={size1_4}>
          <SubcategoryFilters subcategory={subcategory} />
        </Grid>

        {/* Products Section */}
        <Grid size={size4_1}>
          <SubcategoryProducts subcategory={subcategory} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Subcategory;
