import { FC, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import AutoDeleteOutlinedIcon from "@mui/icons-material/AutoDeleteOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import {
  basketProductCountBox,
  clearAllBasketButton,
} from "../styles/basketStyle";
import { observer } from "mobx-react-lite";
import BasketViewModel from "../../../store/basket/BasketViewModel";
import { BASE_URL, BASE_URL_IMG } from "../../../api/instance";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const BasketLeft: FC = observer(() => {
  const { items, totalPrice } = BasketViewModel;
  const navigate = useNavigate();
  const basketDataLocalStroge = localStorage.getItem("basket");

  useEffect(() => {
    const body = {
      ids: items.map((item) => item.product.id),
    };
    const getBasketProduct = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}product/basketProducts`,
          body
        );
        const fetchedData = response.data;

        if (basketDataLocalStroge) {
          const parsed = JSON.parse(basketDataLocalStroge);
          const updatedItems = parsed.map((localItem: any) => {
            const matchedProduct = fetchedData.find(
              (apiItem: any) => apiItem.id === localItem.product.id
            );

            if (matchedProduct) {
              let updatedItem = { ...localItem };

              if (matchedProduct.productQuantity < localItem.productQuantity) {
                toast.error(
                  `${localItem.product.nameTm} haryt sany: ${localItem.productQuantity} saýladyňyz , Ammardaky haryt : ${localItem.product.nameTm} ${matchedProduct.productQuantity} sany galdy`
                );
                updatedItem = {
                  ...updatedItem,
                  productQuantity: matchedProduct.productQuantity,
                };
              }

              if (matchedProduct.sellPrice !== localItem.product.sellPrice) {
                toast.error(`${localItem.product.nameTm}: bahasy üýtgedildi`);
                updatedItem = {
                  ...updatedItem,
                  product: {
                    ...updatedItem.product,
                    sellPrice: matchedProduct.sellPrice,
                  },
                };
              }

              return updatedItem;
            }

            return localItem;
          });

          // Use BasketViewModel action to set items to ensure MobX reactivity
          BasketViewModel.setItems(updatedItems);
        }
      } catch (error) {
        console.error("Error fetching basket products:", error);
      }
    };

    getBasketProduct();
  }, [basketDataLocalStroge]);
  const handleCheckQuantity = async (id: string, productQuantity: number) => {
    try {
      const response = await axios.get(`${BASE_URL}product/getOne?id=${id}`);
      const productData = response.data;

      if (
        productData?.id === id &&
        productData?.productQuantity > productQuantity
      ) {
        BasketViewModel.increaseQuantity(id);
      } else {
        toast.error("Ammarda haryt mukdary az!");
      }

      // Update state after the logic check
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  return !items.length ? (
    <Stack alignItems="center" minHeight="30vh" mt={2} spacing={2}>
      <img src="/images/sebet.png" style={{ width: 100, height: 65 }} alt="" />
      <Typography
        color="#4B5563"
        fontFamily="Open Sans"
        fontSize={20}
        fontWeight={600}
      >
        Sebediňiz boş
      </Typography>
    </Stack>
  ) : (
    <Paper elevation={4} sx={{ width: "100%", py: 1 }}>
      <Stack
        direction="row"
        mx={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography>Sebet</Typography>
        <Button
          startIcon={<AutoDeleteOutlinedIcon sx={{ color: "#B71C1C" }} />}
          sx={clearAllBasketButton}
          onClick={() => BasketViewModel.clearBasket()}
        >
          Hemmesini bozmak
        </Button>
      </Stack>
      <Divider />

      {items.map((item: any) => (
        <Grid
          container
          pr={3}
          pl={3}
          pb={1}
          pt={1}
          spacing={8}
          alignItems={"center"}
          sx={{ cursor: "pointer", borderBottom: "1px solid lightgray" }}
          key={item.product.id}
        >
          <Grid
            size={{ lg: 6, md: 6, sm: 12, xs: 12 }}
            onClick={() => navigate(`/product/${item.product.id}`)}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <img
                style={{ width: "70px" }}
                src={`${BASE_URL_IMG}public/${item.product?.imageOne}`}
                alt="basket pictures"
              />
              <Typography sx={{ fontSize: "14px" }}>
                {item.product.nameTm}
              </Typography>
            </Stack>
          </Grid>
          <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton
                  sx={{ height: "40px", width: "40px", fontSize: "18px" }}
                  onClick={() =>
                    BasketViewModel.decreaseQuantity(item.product.id)
                  }
                  disabled={item.productQuantity <= 1}
                >
                  -
                </IconButton>
                <Box
                  sx={{
                    ...basketProductCountBox,
                    ...(item.productQuantity == 0
                      ? { border: "1px solid red" }
                      : { border: "" }),
                  }}
                >
                  {item.productQuantity}
                </Box>
                <IconButton
                  sx={{ height: "40px", width: "40px", fontSize: "18px" }}
                  onClick={() =>
                    handleCheckQuantity(item.product.id, item.productQuantity)
                  }
                >
                  +
                </IconButton>
              </Stack>
              <Typography sx={{ fontSize: "17px", fontWeight: 600 }}>
                {item.product?.sellPrice - item.product?.discount_priceTMT} TMT
              </Typography>
              <IconButton
                onClick={() =>
                  BasketViewModel.removeFromBasket(item.product.id)
                }
              >
                <ClearOutlinedIcon sx={{ width: "16px" }} />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
      ))}
      <Divider />
      <Stack direction="row" justifyContent="flex-end" m={3}>
        <Typography>
          Jemi: <b>{totalPrice.toFixed(2)}</b>
        </Typography>
      </Stack>
    </Paper>
  );
});

export default BasketLeft;
