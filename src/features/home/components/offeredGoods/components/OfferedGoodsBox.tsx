import { FC, useEffect, useRef, useState } from "react";
import { Stack, Typography } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../../../../api/instance";
import GridLoading from "./GridLoading";
import GridProducts from "../../discountedGoods/components/GridProducts";

const DiscountGoodBox: FC = () => {
  const [discountedProducts, setDiscountedProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const tableContainerRef = useRef<HTMLDivElement | null>(null);
  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}product/all?limit=4&page=${page}&statusId=56143a81-cfa6-4c52-a74b-957d94b0c058`
      );
      if (page === 1) {
        setDiscountedProducts(response.data?.products);
      } else {
        setDiscountedProducts((prevItems) => [
          ...prevItems,
          ...response.data?.products,
        ]);
      }
    } catch (error: unknown) {
      setIsError(true);
      console.error(error);
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
        if (!loading) {
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

  return (
    <Stack ref={tableContainerRef} onScroll={handleScroll}>
      <GridProducts
        titleBase={"home.offeredProducts"}
        displayedProducts={discountedProducts}
        id="56143a81-cfa6-4c52-a74b-957d94b0c058"
      />
    </Stack>
  );
};

export default DiscountGoodBox;
