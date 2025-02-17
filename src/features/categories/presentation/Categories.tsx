import { FC, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  size1_4,
  size4_1,
} from "../../../components/layouts/header/utils/gridSize";
import CategoryFilters from "../components/categoryFilters/CategoryFilters";
// import CategoryHeader from "../components/CategoryHeader";
import CategoryProductsBox from "../components/categoryProducts/CategoryProductsBox";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";
import ProductViewModel from "../../products/presentation/ProductViewModel";
import CategoryHeader from "../components/CategoryHeader";

const Categories: FC = observer(() => {
  const [searchParams] = useSearchParams();
  useEffect(() => {
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
    };
    ProductViewModel.setFilters(filters);
    ProductViewModel.fetchFilteredProducts();
  }, [searchParams]);

  const handleCategorySelect = (filters: any) => {
    ProductViewModel.setFilters(filters);
    ProductViewModel.fetchFilteredProducts();
  };

  return (
    <Container>
      <CategoryHeader
        categoryTitle={
          ProductViewModel.products[0]?.productCategory?.nameTm || ""
        }
      />
      {/* {console.log(ProductViewModel.products)} */}

      <Grid container width="100%" my={2} spacing={3}>
        <Grid size={size1_4}>
          <CategoryFilters
            selectedFilters={ProductViewModel.filters}
            onCategorySelect={handleCategorySelect}
          />
        </Grid>
        <Grid size={size4_1}>
          {ProductViewModel.products &&
          ProductViewModel.totalProducts !== null ? (
            <CategoryProductsBox
              products={ProductViewModel.products}
              totalProducts={ProductViewModel.totalProducts}
            />
          ) : (
            <Typography>No products found</Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
});

export default Categories;
