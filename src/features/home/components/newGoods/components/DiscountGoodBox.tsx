import { FC, useEffect, useRef, useState } from "react";
import { Stack, Typography } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../../../../api/instance";
import GridLoading from "../../offeredGoods/components/GridLoading";
import GridProducts from "../../discountedGoods/components/GridProducts";

const NewGoodBox: FC = () => {
  const [discountedProducts, setDiscountedProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const tableContainerRef = useRef<HTMLDivElement | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}product/all?limit=10&page=${page}`
      );
      const filteredProducts = response.data?.products.filter(
        (item: any) => item.statusId === "4021a947-6bd2-4ef0-ac51-4548c28e42e8"
      );
      console.log(filteredProducts);

      if (page === 1) {
        setDiscountedProducts(filteredProducts);
      } else {
        setDiscountedProducts((prevItems) => [
          ...prevItems,
          ...filteredProducts,
        ]);
      }
    } catch (error: unknown) {
      setIsError(true);
    }
    setIsLoading(false);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, [page]);

  const handleScroll = () => {
    if (tableContainerRef.current) {
      const { scrollHeight, scrollTop, clientHeight } =
        tableContainerRef.current;

      if (scrollHeight - scrollTop <= clientHeight + 100) {
        if (!loading && showAll) {
          setPage((prev) => prev + 1);
        }
      }
    }
  };

  useEffect(() => {
    if (tableContainerRef.current) {
      tableContainerRef.current.addEventListener("scroll", handleScroll);
      return () => {
        if (tableContainerRef.current) {
          tableContainerRef.current.removeEventListener("scroll", handleScroll);
        }
      };
    }
  }, []);

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  if (isLoading) {
    return <GridLoading />;
  }

  if (isError) {
    return (
      <Typography variant="body1" color="error">
        Ýalňyşlyk
      </Typography>
    );
  }

  if (discountedProducts.length === 0) {
    return <Typography></Typography>;
  }

  const displayedProducts = showAll
    ? discountedProducts
    : discountedProducts.slice(0, 4);

  return (
    <Stack
      ref={tableContainerRef}
      onScroll={handleScroll}
      // sx={{
      //   overflowY: "auto",
      // }}
      // className="productScroll"
      // maxHeight="100vh"
    >
      <GridProducts
        titleBase={"home.newGoods"}
        displayedProducts={displayedProducts}
        showAll={showAll}
        handleShowAll={handleShowAll}
      />
    </Stack>
  );
};

export default NewGoodBox;
