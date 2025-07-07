import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../components/redux/store";
import { ProductCart } from "../../home/components/discountedGoods/components/ProductCart";
import { useTranslation } from "react-i18next";
import { AutoDeleteOutlined } from "@mui/icons-material";
import { clearAllBasketButton } from "../../basket/styles/basketStyle";
import { clearAllFav } from "../../../components/redux/favouriteSlice";

const HowToOrder: FC = () => {
  const { t } = useTranslation();
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const dispatch = useDispatch();
  return (
    <Container>
      <Box my={1} mb={4} minHeight="50vh">
        <div>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              mb={1}
              fontSize={{ lg: 25, md: 25, sm: 23, xs: 20 }}
              fontWeight={600}
            >
              {t("favourite.title")}
            </Typography>
            <Button
              startIcon={<AutoDeleteOutlined sx={{ color: "#B71C1C" }} />}
              sx={clearAllBasketButton}
              onClick={() => dispatch(clearAllFav())}
            >
              {t("basket.clearAll")}
            </Button>
          </Stack>
          {!favorites.length ? (
            <Stack alignItems="center" spacing={1} pt={5}>
              <img
                src="/images/wishlist.png"
                style={{ width: 80, height: 54 }}
                alt=""
              />
              <Typography fontSize={18}>{t("favourite.empty")}</Typography>
            </Stack>
          ) : (
            <ProductCart size={2.3} displayedProducts={favorites} />
          )}
        </div>
      </Box>
    </Container>
  );
};

export default HowToOrder;
