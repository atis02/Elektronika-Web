import { FC, useEffect, useState } from "react";
import { CircularProgress, Container, Stack, Typography } from "@mui/material";
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
import { Product } from "../../../components/redux/interface";

const Categories: FC = observer(() => {
  const [filtered, setFiltered] = useState<Product[]>(
    ProductViewModel.products
  );
  useEffect(() => {
    setFiltered(ProductViewModel.products || []);
  }, [ProductViewModel.products]);
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
      minPrice: 100,
      maxPrice: 200000,
      sortBy: "alphabet",
      sortOrder: "ASC",
    };
    ProductViewModel.setFilters(filters);
    ProductViewModel.fetchFilteredProducts();
  }, [searchParams]);

  const handleCategorySelect = (filters: any) => {
    ProductViewModel.setFilters(filters);
    ProductViewModel.fetchFilteredProducts();
  };

  const filteredProducts = (id: string) => {
    const products = ProductViewModel.products;
    if (!products.length) {
      return setFiltered([]);
    } else {
      const filtered = products.filter((elema: any) => elema.brandId == id);
      setFiltered(filtered);
    }
  };
  const filteredProductsByProperty = (value: string) => {
    const products = ProductViewModel.products;

    if (!products.length) {
      return setFiltered([]);
    } else {
      const filtered = products.filter((product: any) =>
        product.properties?.some((prop: any) => prop.value === value)
      );

      setFiltered(filtered);
    }
  };

  return (
    <Container>
      <Grid container width="100%" my={2} spacing={3}>
        <Grid size={size1_4}>
          <CategoryFilters
            selectedFilters={ProductViewModel.filters}
            onCategorySelect={filteredProducts}
            filteredProductsByProperty={filteredProductsByProperty}
            handleCategorySelect={handleCategorySelect}
          />
        </Grid>
        <Grid size={size4_1}>
          {ProductViewModel.loading ? (
            <Stack alignItems="center" ml={10}>
              <CircularProgress />
            </Stack>
          ) : filtered?.length ? (
            <CategoryProductsBox products={filtered} />
          ) : (
            <Typography textAlign="center">Haryt ýok</Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
});

export default Categories;
