import { FC, useState, useEffect } from "react";
import SidebarLinks from "../components/SidebarLinks";
import { BASE_URL } from "../../../../../api/instance";
import { Box } from "@mui/material";

interface Filters {
  categoryId?: number;
  subcategoryId?: number;
  segmentId?: number;
  brandId?: number;
}

const Sidebar: FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<Filters>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // const [isFixed, setIsFixed] = useState(false);
  // const [remainingScrollVh, setRemainingScrollVh] = useState<number | null>(
  //   null
  // );
  // const [footerPosition, setFooterPosition] = useState<number | null>(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const windowHeight = window.innerHeight;
  //     const documentHeight = document.documentElement.scrollHeight;
  //     const scrollTop = window.scrollY;
  //     const remainingScroll = documentHeight - windowHeight - scrollTop;
  //     const remainingScrollInVh = (remainingScroll / windowHeight) * 100;

  //     const footer = document.getElementById("footer");
  //     if (footer) {
  //       const footerRect = footer.getBoundingClientRect();
  //       setFooterPosition(footerRect.top + 160);
  //     }

  //     setIsFixed(
  //       remainingScrollInVh <= 100 &&
  //         (footerPosition === null || footerPosition > windowHeight)
  //     );
  //   };

  //   handleScroll(); // Initial calculation
  //   window.addEventListener("scroll", handleScroll);
  //   window.addEventListener("resize", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //     window.removeEventListener("resize", handleScroll);
  //   };
  // }, [footerPosition]);
  console.log(selectedFilters);

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

      const url = `${BASE_URL}/products/client/products?${queryParams.toString()}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched data:", data);
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
        selectedFilters={selectedFilters}
        onCategorySelect={handleCategorySelect}
      />
      {loading && <div>Loading products...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </Box>
  );
};

export default Sidebar;
