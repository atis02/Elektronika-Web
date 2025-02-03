import React, { useRef } from "react";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper/types"; // Import Swiper class for type

// import "swiper/css";
// import "swiper/css/navigation";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BASE_URL } from "../../../../../api/instance";

const MainSwiper: React.FC<{ banners: any[] }> = ({ banners }) => {
  const thumbsSwiperRef = useRef<SwiperClass | null>(null); // Explicitly type the ref

  return (
    <Box sx={{ overflow: "hidden", mb: 1 }}>
      <Box
        sx={{
          height: {
            lg: "380px",
            md: "380px",
            sm: "200px",
            xs: "150px",
          },
        }}
      >
        <Swiper
          // modules={[Navigation, Autoplay]} // Enable autoplay and navigation modules
          // slidesPerView={1}
          // onSwiper={(swiper) => (thumbsSwiperRef.current = swiper)} // Attach thumbs swiper instance
          // spaceBetween={0}
          // centeredSlides={true}
          // speed={4000} // Transition speed for the slide (in milliseconds)
          // loop={true}
          // style={{ height: "100%", cursor: "pointer" }}
          // autoplay={{
          //   delay: 2500, // Time in milliseconds between transitions
          //   disableOnInteraction: false, // Continue autoplay even after user interaction
          //   pauseOnMouseEnter: true,
          // }}
          onSwiper={(swiper) => (thumbsSwiperRef.current = swiper)} // Attach thumbs swiper instance
          slidesPerView={1}
          spaceBetween={1}
          // centeredSlides={true}
          autoplay={true}
          modules={[Navigation, Autoplay]}
          className="gallery-thumbs-small"
          loop={true}
          speed={3000}
          style={{ cursor: "pointer", height: "100%" }}
        >
          {banners && Array.isArray(banners)
            ? banners.slice(0, 2).map((banner, index) => (
                <SwiperSlide
                  key={`small_banners_image_key${index}`}
                  style={{ height: "100%" }}
                >
                  {/* <Box
                  sx={{
                    height: {
                      lg: "380px",
                      md: "380px",
                      sm: "200px",
                      xs: "200px",
                    },
                  }}
                >
                <img
                  src={banner.imageUrl}
                  alt={`Thumbnail ${index + 1}`}
                  // placeholderSrc={blurHashToBase64(banner.blurhash) || ""}
                  // effect="blur"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
                </Box> */}

                  {/* <img
                    src={banner.imageUrl}
                    alt="Category"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                  /> */}

                  <LazyLoadImage
                    src={`${BASE_URL}images/${banner.image}`}
                    // src={banner.imageUrl}
                    alt={`Banner ${index + 1}`}
                    // placeholderSrc={blurHashToBase64(banner.blurhash) || ""}
                    effect="blur"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                  {/* <Box
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
                  </Box> */}
                </SwiperSlide>
              ))
            : null}
        </Swiper>
      </Box>
    </Box>
  );
};

export default MainSwiper;
