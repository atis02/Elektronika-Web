import React, { useRef } from "react";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper/types"; // Import Swiper class for type

// import "swiper/css";
// import "swiper/css/navigation";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BASE_URL } from "../../../../../api/instance";

const MinBannerSwiper: React.FC<{ banners: any[] }> = ({ banners }) => {
  const thumbsSwiperRef = useRef<SwiperClass | null>(null); // Explicitly type the ref

  return (
    <Box sx={{ overflow: "hidden", width: "100%" }}>
      <Box
        sx={{
          height: {
            lg: "180px",
            md: "180px",
            sm: "150px",
            xs: "100px",
          },
        }}
      >
        <Swiper
          onSwiper={(swiper) => (thumbsSwiperRef.current = swiper)} // Attach thumbs swiper instance
          slidesPerView={2}
          spaceBetween={10}
          // centeredSlides={true}
          autoplay={false}
          modules={[Navigation, Thumbs, Autoplay]}
          className="gallery-thumbs-small"
          loop={true}
          speed={3000}
          style={{ cursor: "pointer", height: "100%" }}
        >
          {banners && Array.isArray(banners)
            ? banners.slice(2, 4).map((banner, index) => (
                <SwiperSlide key={`small_banners_image_key${index}`}>
                  <LazyLoadImage
                    // src={banner.imageUrl}
                    src={`${BASE_URL}images/${banner.image}`}
                    alt={`Thumbnail ${index + 1}`}
                    // placeholderSrc={blurHashToBase64(banner.blurhash) || ""}
                    effect="blur"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </SwiperSlide>
              ))
            : null}
        </Swiper>
      </Box>
    </Box>
  );
};

export default MinBannerSwiper;
