import React from "react";
// import Slider from "react-slick";
import { Box, Typography, Skeleton } from "@mui/material";
import { useBanners } from "../../../../../hooks/banner/useBanners";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
// import { decode } from "blurhash";
import "./bannerSwiper.css";
import MinBannerSwiper from "./MinBannerSwiper";
import MainSwiper from "./MainSwiper";
// Function to convert blurhash to base64
// const blurHashToBase64 = (
//   blurhash: string,
//   width: number = 32,
//   height: number = 32
// ) => {
//   if (!blurhash) return null;
//   try {
//     const pixels = decode(blurhash, width, height);
//     const canvas = document.createElement("canvas");
//     canvas.width = width;
//     canvas.height = height;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return null;
//     const imageData = ctx.createImageData(width, height);
//     imageData.data.set(pixels);
//     ctx.putImageData(imageData, 0, 0);
//     return canvas.toDataURL();
//   } catch (e) {
//     console.error("error blurhash", e);
//     return null;
//   }
// };

// Slick settings
// const settings = {
//   dots: false,
//   infinite: true,
//   speed: 4000,
//   slidesToShow: 1,
//   slidesToScroll: 1,
//   autoplay: false, // Autoplay disabled
//   arrows: false,
//   nextArrow: <div className="swiper-button-next" />,
//   prevArrow: <div className="swiper-button-prev" />,
// };

const BannerSwiper: React.FC = () => {
  const { banners, isLoading, isError } = useBanners(); // Use custom hook
  // const mainSliderRef = useRef<Slider | null>(null); // Main slider reference
  // const thumbsSliderRef = useRef<Slider | null>(null); // Thumbnail slider reference

  if (isLoading) {
    return (
      <>
        <Box
          sx={{
            height: {
              lg: "380px",
              md: "380px",
              sm: "200px",
              xs: "200px",
            },
          }}
        >
          <Skeleton variant="rectangular" width="100%" height="100%" />
        </Box>
        <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
          <Skeleton variant="rectangular" width="50%" height="180px" />
          <Skeleton variant="rectangular" width="50%" height="180px" />
        </Box>
      </>
    );
  }

  if (isError) return <Typography>Error loading banners</Typography>;

  return (
    <div>
      {/* Main Slider */}
      {/* <Slider
        {...{ ...settings, autoplay: true }}
        ref={mainSliderRef}
        asNavFor={thumbsSliderRef.current || undefined} // Link with thumbnail slider
      >
        {banners && Array.isArray(banners)
          ? banners?.map((banner: any, index: number) => (
              <div key={index}>
                <Box
                  sx={{
                    height: {
                      lg: "380px",
                      md: "380px",
                      sm: "200px",
                      xs: "200px",
                    },
                  }}
                >
                  <LazyLoadImage
                    src={banner.imageUrl}
                    alt={`Banner ${index + 1}`}
                    placeholderSrc={blurHashToBase64(banner.blurhash) || ""}
                    effect="blur"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </div>
            ))
          : null}
      </Slider> */}
      <MainSwiper banners={banners} />
      {/* Thumbs Slider */}
      {/* <Box sx={{ overflow: "hidden" }}>
        <Slider
          {...{
            ...settings,
            slidesToShow: 2,
            slidesToScroll: 2,
            focusOnSelect: true,
            asNavFor: mainSliderRef.current || undefined,
            centerMode: true,
            variableWidth: false,
            autoplay: false,
          }}
          ref={thumbsSliderRef}
          className="gallery-thumbs-small"
        >
          {banners && Array.isArray(banners)
            ? banners?.map((banner: any, index: number) => (
                <div
                  key={`small_banners_image_key${index}`}
                  style={{ width: "50%" }}
                >
                  <LazyLoadImage
                    src={banner.imageUrl}
                    alt={`Thumbnail ${index + 1}`}
                    placeholderSrc={blurHashToBase64(banner.blurhash) || ""}
                    effect="blur"
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))
            : null}
        </Slider>
      </Box> */}
      <MinBannerSwiper banners={banners} />
    </div>
  );
};

export default BannerSwiper;
