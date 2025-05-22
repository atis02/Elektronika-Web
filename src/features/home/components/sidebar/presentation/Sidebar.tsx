import { FC, useState, useEffect } from "react";
import SidebarLinks from "../components/SidebarLinks";
import { Box } from "@mui/material";

interface Filters {
  categoryId?: number | string;
  subcategoryId?: number | string;
  segmentId?: number | string;
  brandId?: number | string;
}
interface Props {
  handleSelectCategory?: (filters: any) => void;
}

const Sidebar: FC<Props> = ({ handleSelectCategory }) => {
  const [selectedFilters, setSelectedFilters] = useState<Filters>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (Object.keys(selectedFilters).length > 0) {
      fetchFilteredProducts(selectedFilters);
    }
  }, [selectedFilters]);

  const handleCategorySelect = async (filters: Filters) => {
    setSelectedFilters(filters);
  };

  const fetchFilteredProducts = async (filters: Filters) => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams({
        page: "1",
        limit: "20",
      });

      if (filters.categoryId)
        queryParams.append("categoryId", String(filters.categoryId));
      if (filters.subcategoryId)
        queryParams.append("subcategoryId", String(filters.subcategoryId));
      if (filters.segmentId)
        queryParams.append("segmentId", String(filters.segmentId));
      if (filters.brandId)
        queryParams.append("brandId", String(filters.brandId));

      // const url = `${BASE_URL}/products/client/products?${queryParams.toString()}`;
      // const response = await fetch(url);

      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
    } catch (err) {
      setError("Error fetching products.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        position: "static",
        width: "100%",
        zIndex: 100,
        // bottom: isFixed && footerPosition !== null ? `${footerPosition}px` : "",
      }}
    >
      <SidebarLinks
        handleSelectCategory={handleSelectCategory}
        selectedFilters={selectedFilters}
        onCategorySelect={handleCategorySelect}
      />
      {loading && <div>Loading products...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </Box>
  );
};

export default Sidebar;
