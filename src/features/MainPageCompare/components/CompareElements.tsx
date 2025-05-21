import {
  FC,
  // useState\
} from "react";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

import "../../compare/styles/compareSlider.css";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../components/redux/customHook";
import {
  closeFastCompare,
  removeProduct,
} from "../../../components/redux/ProductSlice";
import { BASE_URL_IMG } from "../../../api/instance";
import CloseIcon from "@mui/icons-material/Close";
import {
  compareImagebox,
  compareItemsCardBox,
  compareSliderBox,
} from "../../compare/styles/compareSlider";
import { compareGridSize } from "../../compare/utils/compareSize";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
const CompareElements: FC = () => {
  const dispatch = useAppDispatch();
  const compareProducts = useAppSelector((state) => state.compare.products);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        background: "#f5f5f5",
        width: "100%",
        height: "auto",
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography
        textAlign={"center"}
        my={{ lg: 2, md: 2, sm: 2, xs: 0 }}
        fontWeight={700}
        width="20%"
        color="#B71C1C"
      >
        {t("compare.fourItem")}
      </Typography>
      <Grid container sx={{ justifyContent: "space-around" }}>
        {compareProducts.length > 0 ? (
          compareProducts.map((elem) => {
            const selectedImage = elem.imageOne; // Default to the first image if none selected
            return (
              <Grid key={elem.id} size={compareGridSize}>
                <Box sx={compareItemsCardBox}>
                  <Box
                    sx={{
                      border: "1px solid #E0E0E0",

                      display: "flex",
                      alignItems: "center",
                      height: "120px",
                      justifyContent: "center",
                      width: "120px",
                      background: "#f7f7f7",
                      // borde: "1px solid #e0e0e0",
                      padding: 3,
                      borderRadius: "6px",
                      position: "relative",
                    }}
                  >
                    <img
                      src={`${BASE_URL_IMG}public/${selectedImage}`}
                      // src={selectedImage}
                      className="compareSliderImage"
                      alt="compare current image"
                      style={{
                        width: "100px",
                        height: "100px",
                      }}
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
                  <input
                    type="text"
                    placeholder="Gözleg"
                    className="compareSearchInput"
                  />
                  <Box sx={compareImagebox}>{t("compare.addProduct")}</Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Grid>
      <Stack direction="row" spacing={2} mr={3}>
        <Button
          variant="outlined"
          sx={{
            color: "#B71C1C",
            borderColor: "#B71C1C",
            textTransform: "revert",
            fontSize: 16,
          }}
          onClick={() => {
            navigate("/compare");
            dispatch(closeFastCompare());
          }}
        >
          {t("compare.compareProduct")}
        </Button>
        <Button
          variant="outlined"
          sx={{
            borderColor: "#B71C1C",
            minWidth: 40,
            color: "#B71C1C",

            height: 40,
          }}
          onClick={() => dispatch(closeFastCompare())}
        >
          <CloseIcon />
        </Button>
      </Stack>
    </Box>
  );
};

export default CompareElements;
