import { FC, useEffect, useState } from "react";
import {
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  size1_4,
  size4_1,
} from "../../../components/layouts/header/utils/gridSize";
import CategoryFilters from "../components/categoryFilters/CategoryFilters";
import CategoryProductsBox from "../components/categoryProducts/CategoryProductsBox";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";
import ProductViewModel from "../../products/presentation/ProductViewModel";
import { Product } from "../../../components/redux/interface";
import { useTranslation } from "react-i18next";
import GridLoading from "../../home/components/offeredGoods/components/GridLoading";
import CategoryFiltersDrawer from "../components/categoryFilters/CategoryFiltersDrawer";
import { Tune } from "@mui/icons-material";

const Categories: FC = observer(() => {
  const [filtered, setFiltered] = useState<Product[]>(
    ProductViewModel.products
  );
  const [page, setPage] = useState(1);
  const [openFilters, setOpenFilters] = useState<boolean>(false);
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [hasMore, setHasMore] = useState(true);
  const [searchParams] = useSearchParams();
  const [firstLoading, setFirstLoading] = useState(true);

  const loadProducts = async (reset = false) => {
    const currentPage = reset ? 1 : page;

    ProductViewModel.setCurrentPage(currentPage);
    ProductViewModel.setLimit(10);

    const newProducts = await ProductViewModel.fetchFilteredProducts();

    setFiltered((prev) =>
      reset ? [...prev, ...newProducts] : [...prev, ...newProducts]
    );
    setPage((prev) => (reset ? 1 : prev + 1));

    if (newProducts.length < 10) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    const filters = {
      categoryId: searchParams.get("categoryId") || undefined,
      subCategoryId: searchParams.get("subCategoryId") || undefined,
      segmentId: searchParams.get("segmentId") || undefined,
      brandId: searchParams.get("brandId") || undefined,
      statusId: searchParams.get("statusId") || undefined,
      minPrice: 1,
      maxPrice: 200000,
      sortBy: "createdAt",
      sortOrder: "DESC",
    };
    setFirstLoading(false);
    ProductViewModel.setFilters(filters);
    setHasMore(true);
    loadProducts(true);
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
  const loadMore = () => {
    if (hasMore && !ProductViewModel.loading) {
      loadProducts();
    }
  };
  return (
    <Container>
      <Grid container width="100%" my={2} spacing={3}>
        <Grid size={size1_4}>
          {isMobile ? (
            <Stack
              bgcolor="#E9A3A8"
              direction="row"
              spacing={2}
              p={1}
              borderRadius={3}
              onClick={() => setOpenFilters(true)}
            >
              <Tune />
              <Typography>{t("home.setFilters")}</Typography>
            </Stack>
          ) : (
            <CategoryFilters
              selectedFilters={ProductViewModel.filters}
              onCategorySelect={filteredProducts}
              filteredProductsByProperty={filteredProductsByProperty}
              handleCategorySelect={handleCategorySelect}
            />
          )}
        </Grid>
        <Grid size={size4_1}>
          {firstLoading && ProductViewModel.loading ? (
            <Stack alignItems="center" ml={10}>
              <GridLoading />
            </Stack>
          ) : filtered?.length ? (
            <CategoryProductsBox
              products={filtered}
              loadMore={loadMore}
              hasMore={hasMore}
            />
          ) : (
            <Typography my={15} textAlign="center">
              {t("home.noItem")}
            </Typography>
          )}
        </Grid>
      </Grid>
      {isMobile && (
        <CategoryFiltersDrawer
          open={openFilters}
          onClose={() => setOpenFilters(false)}
          selectedFilters={ProductViewModel.filters}
          onCategorySelect={filteredProducts}
          filteredProductsByProperty={filteredProductsByProperty}
          handleCategorySelect={handleCategorySelect}
        />
      )}
    </Container>
  );
});

export default Categories;
