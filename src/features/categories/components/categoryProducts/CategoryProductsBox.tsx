import { FC, useState } from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Grid from "@mui/material/Grid2";
import {
  addStoreDiscountGoodButton,
  compareDiscountGoodsCostButton,
  discountGoodCodeText,
  discountGoodCompanyTitle,
  discountGoodCost,
  discountGoodLastCount,
  discountGoodTitle,
} from "../../../home/components/discountedGoods/styles/discoutGoodsStyle";
import { motion, AnimatePresence } from "framer-motion";
import BasketViewModel from "../../../../store/basket/BasketViewModel";
import { useAppSelector } from "../../../../components/redux/customHook";
import { observable, toJS } from "mobx";
import { useDispatch } from "react-redux";
import { toggleFavorite } from "../../../../components/redux/favouriteSlice";
import { addProduct } from "../../../../components/redux/ProductSlice";
import { Product } from "../../../../components/redux/interface";
import { BASE_URL_IMG } from "../../../../api/instance";
import toast from "react-hot-toast";
import AppDrawer from "../../../drawer/presentation/BasketDrawer";

// interface Product {
//   id: number;
//   title_tm: string;
//   title_ru: string;
//   title_en: string;
//   desc_tm: string;
//   desc_ru: string;
//   desc_en: string;
//   price: number;
//   old_price: number;
//   discount_percentage: number;
//   discounted_price: number;
//   stock: number;
//   is_active: boolean;
//   weight: number;
//   width: number;
//   height: number;
//   depth: number;
//   images: string[];
//   size: string;
//   color: string;
//   tags: string;
//   views: number;
//   rating: number;
//   brand_id: number;
//   category_id: number;
//   segment_id: number;
//   created_at: string;
//   updated_at: string;
//   brand: {
//     id: number;
//     imageUrl: string;
//     title_tm: string;
//     title_ru: string;
//     title_en: string;
//     desc_tm: string;
//     desc_ru: string;
//     desc_en: string;
//   };
//   category: {
//     id: number;
//     imageUrl: string;
//     title_tm: string;
//     title_ru: string;
//     title_en: string;
//     desc_tm: string;
//     desc_ru: string;
//     desc_en: string;
//     category_id: number;
//   };
//   segment: {
//     id: number;
//     imageUrl: string;
//     title_tm: string;
//     title_ru: string;
//     title_en: string;
//     desc_tm: string;
//     desc_ru: string;
//     desc_en: string;
//     subcategory_id: number;
//   };
//   properties: any[];
// }
interface CategoryProductsBoxProps {
  products: Product[];
  totalProducts: number;
}

const CategoryProductsBox: FC<CategoryProductsBoxProps> = ({ products }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDrawer = (open: boolean) => {
    setIsOpen(open);
  };
  const navigate = useNavigate();
  // const [compareStates, setCompareStates] = useState<Record<number, boolean>>(
  //   {}
  // );
  // const [favoriteStates, setFavoriteStates] = useState<Record<number, boolean>>(
  //   {}
  // );
  const compareProducts = useAppSelector((state) => state.compare.products);
  const dispatch = useDispatch();

  const handleCompareClick = (product: any) => {
    const observableArray = observable(product);

    // Передаем копию наблюдаемого массива в функцию или компонент
    const copyOfArray = toJS(observableArray);
    dispatch(addProduct(copyOfArray));
    // setCompareStates((prevState) => ({
    //   ...prevState,
    //   [productId]: !prevState[productId],
    // }));
  };

  const favorites = useAppSelector((state) => state.favorites.favorites);

  const handleToggleFavorite = (product: any) => {
    const observableArray = observable(product);

    // Передаем копию наблюдаемого массива в функцию или компонент
    const copyOfArray = toJS(observableArray);
    dispatch(toggleFavorite(copyOfArray));
  };
  // const handleFavoriteClick = (productId: number) => {
  //   setFavoriteStates((prevState) => ({
  //     ...prevState,
  //     [productId]: !prevState[productId],
  //   }));
  // };

  const productItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: delay * 0.2, duration: 0.7, ease: "easeInOut" },
    }),
  };

  return (
    <Grid container spacing={2}>
      <AnimatePresence>
        {products.length ? (
          products.map((product: any, index) => (
            <Grid size={{ lg: 3, md: 4, sm: 6, xs: 6 }} key={product.id}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={productItemVariants}
                custom={index}
              >
                <Box>
                  <Box
                    sx={{
                      width: "100%",
                      height: {
                        lg: "200px",
                        md: "200px",
                        sm: "180px",
                        xs: "150px",
                      },
                      overflow: "hidden",
                      background: "#f7f7f7",
                      // p: 2,
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      onClick={() => navigate(`/product/${product.id}`)}
                      // src={product.images[0] || "./images/placeholder.png"}
                      src={`${BASE_URL_IMG}public/${product.imageOne}`}
                      alt={product.title_en}
                      style={{
                        width: "90%",
                        height: "90%",
                        objectFit: "cover",
                        display: "block",
                      }}
                      loading="lazy"
                    />
                  </Box>
                  <Stack my={1}>
                    <Typography
                      sx={discountGoodTitle}
                      noWrap
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      {product.nameEn}
                    </Typography>
                    <Typography sx={discountGoodCompanyTitle}>
                      {product.brand?.nameTm || "No Brand"}
                    </Typography>
                    <Stack direction="row" spacing={1} my={1}>
                      <Typography sx={discountGoodCodeText}>
                        Haryt kody:
                      </Typography>
                      <Typography sx={discountGoodCodeText}>
                        {product.barcode || "N/A"}
                      </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography sx={discountGoodCost}>
                        {product.sellPrice - product.discount_priceTMT} m.
                      </Typography>
                      <Button variant="contained" sx={discountGoodLastCount}>
                        Nagt {product.productQuantity || 0}
                      </Button>
                    </Stack>
                  </Stack>
                  <Button
                    variant="contained"
                    fullWidth
                    endIcon={<LocalGroceryStoreOutlinedIcon />}
                    sx={addStoreDiscountGoodButton}
                    onClick={() => {
                      product.productQuantity <= 0
                        ? toast.error("Ammarda haryt az mukdarda")
                        : (BasketViewModel.addToBasket(product),
                          toggleDrawer(true));
                    }}
                  >
                    Sebede goş
                  </Button>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Button
                      onClick={() => {
                        handleCompareClick(product);
                        // CompareViewModel.addToCompare(product); // Add product to compare
                      }}
                      sx={{
                        ...compareDiscountGoodsCostButton,
                        backgroundColor: compareProducts.some(
                          (comp) => comp.id === product.id
                        )
                          ? "#C3000E"
                          : "transparent",
                        color: compareProducts.some(
                          (comp) => comp.id === product.id
                        )
                          ? "#fff"
                          : "#929292",
                        "&:hover": {
                          backgroundColor: compareProducts.some(
                            (comp) => comp.id === product.id
                          )
                            ? "#C3000E"
                            : "#f0f0f0",
                        },
                      }}
                    >
                      <img
                        src={
                          compareProducts.some((comp) => comp.id === product.id)
                            ? "/icons/compare white.svg"
                            : "/icons/compare.svg"
                        }
                        alt="compare-icon"
                        style={{ marginRight: "5px" }}
                      />
                      Deňeşdir
                    </Button>
                    <Button
                      onClick={() => handleToggleFavorite(product)}
                      sx={{
                        ...compareDiscountGoodsCostButton,
                        backgroundColor: favorites.some(
                          (fav) => fav.id === product.id
                        )
                          ? "#C3000E"
                          : "transparent",
                        color: favorites.some((fav) => fav.id === product.id)
                          ? "#fff"
                          : "#929292",
                        "&:hover": {
                          backgroundColor: favorites.some(
                            (fav) => fav.id === product.id
                          )
                            ? "#C3000E"
                            : "#f0f0f0",
                        },
                      }}
                    >
                      <FavoriteBorderIcon
                        sx={{
                          fontWeight: 300,
                          width: "12px",
                          color: favorites.some((fav) => fav.id === product.id)
                            ? "#fff"
                            : "#929292",
                        }}
                      />
                      Saýla
                    </Button>
                  </Stack>
                </Box>
              </motion.div>
            </Grid>
          ))
        ) : (
          <Typography textAlign="center" width="100%">
            Haryt ýok
          </Typography>
        )}
        <AppDrawer isOpen={isOpen} toggleDrawer={toggleDrawer} />
      </AnimatePresence>
    </Grid>
  );
};

export default CategoryProductsBox;
