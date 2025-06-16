import {
  FC,
  useEffect,
  useState,
  // useState\
} from "react";
import { Box, IconButton, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  // compareActiveDots,
  // compareDotsBox,
  // compareExtraImageBox,
  compareImagebox,
  compareItemsCardBox,
  // comparePassiveDots,
  compareSliderBox,
} from "../styles/compareSlider";
import "../styles/compareSlider.css";
import { compareGridSize } from "../utils/compareSize";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../components/redux/customHook";
import { removeProduct } from "../../../components/redux/ProductSlice";
import { BASE_URL_IMG } from "../../../api/instance";
import CloseIcon from "@mui/icons-material/Close";
import HeaderContactsSearch from "../../../components/layouts/header/components/HeaderContacts";
import { useTranslation } from "react-i18next";
const CompareSlider: FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const dispatch = useAppDispatch();
  const compareProducts = useAppSelector((state) => state.compare.products);

  const { t } = useTranslation();

  return (
    <Box sx={compareSliderBox}>
      <Grid container sx={{ justifyContent: "space-between" }}>
        {compareProducts.length > 0 ? (
          compareProducts.map((elem) => {
            const selectedImage = elem.imageOne; // Default to the first image if none selected
            return (
              <Grid key={elem.id} size={compareGridSize}>
                <Box sx={compareItemsCardBox}>
                  <Stack direction="row" alignItems="center">
                    <HeaderContactsSearch
                      color="#B71C1C"
                      addCompare
                      isLoading={isLoading}
                    />
                  </Stack>

                  <Box sx={compareImagebox}>
                    <img
                      src={
                        `${BASE_URL_IMG}public/${selectedImage}` ||
                        "/images/logo2.png"
                      }
                      // src={selectedImage}
                      className="compareSliderImage"
                      alt="compare current image"
                    />
                    <Stack position="absolute" top={1} right={1}>
                      <IconButton
                        onClick={() => dispatch(removeProduct(elem.id))}
                      >
                        <CloseIcon sx={{ color: "#B71C1C" }} />
                      </IconButton>
                    </Stack>
                  </Box>
                </Box>
              </Grid>
            );
          })
        ) : (
          <Box sx={compareSliderBox}>
            <Grid container>
              <Grid size={compareGridSize}>
                <Box sx={compareItemsCardBox}>
                  <HeaderContactsSearch
                    color="#B71C1C"
                    addCompare
                    isLoading={isLoading}
                  />
                  <Box sx={compareImagebox}>{t("home.addToCompare")}</Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Grid>
    </Box>
  );
};

export default CompareSlider;
