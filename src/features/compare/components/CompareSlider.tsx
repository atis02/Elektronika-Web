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
const CompareSlider: FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  // const [currentImages, setCurrentImages] = useState<{ [key: string]: string }>(
  //   {}
  // );
  const dispatch = useAppDispatch();
  const compareProducts = useAppSelector((state) => state.compare.products);

  // const handleImageClick = (productId: string, image: string) => {
  //   setCurrentImages((prevImages) => ({
  //     ...prevImages,
  //     [productId]: image,
  //   }));
  // };

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
                    <HeaderContactsSearch isLoading={isLoading} />
                  </Stack>

                  <Box sx={compareImagebox}>
                    <img
                      src={`${BASE_URL_IMG}public/${selectedImage}`}
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
                  {/* <Box sx={compareDotsBox}>
                    {elem?.images.map((image, index) => (
                      <Box
                        key={index}
                        sx={
                          image === currentImages[elem.id]
                            ? compareActiveDots
                            : comparePassiveDots
                        }
                      />
                    ))}
                  </Box> */}

                  {/* <Box sx={compareDotsBox}>
                    {elem?.images.map((image, index) => (
                      <Box
                        key={index}
                        sx={compareExtraImageBox}
                        onClick={() => handleImageClick(String(elem.id), image)} // Pass product id and clicked image
                      > */}
                  {/* <img
                    src={`${BASE_URL_IMG}public/${elem.imageOne}`}
                    // src={elem.imageOne}
                    className="compareSliderImage"
                    alt={`compare extra image `}
                  /> */}
                  {/* //   </Box>
                    // ))} */}
                  {/* </Box> */}
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
                  <Box sx={compareImagebox}>Deňeşdirmek üçin haryt goşun</Box>
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
