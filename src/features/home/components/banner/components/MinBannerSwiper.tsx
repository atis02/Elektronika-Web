import React, { useRef } from "react";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper/types"; // Import Swiper class for type

// import "swiper/css";
// import "swiper/css/navigation";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BASE_URL } from "../../../../../api/instance";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const MinBannerSwiper: React.FC<{ banners: any[] }> = ({ banners }) => {
  const thumbsSwiperRef = useRef<SwiperClass | null>(null); // Explicitly type the ref
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const getTitle = (nameTm: string, nameRu: string, nameEn: string) => {
    const currentLanguage = i18n.language;
    switch (currentLanguage) {
      case "ru":
        return nameRu;
      case "tm":
        return nameTm;
      default:
        return nameEn;
    }
  };
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
          onSwiper={(swiper) => (thumbsSwiperRef.current = swiper)}
          slidesPerView={2}
          spaceBetween={10}
          autoplay={false}
          modules={[Navigation, Thumbs, Autoplay]}
          className="gallery-thumbs-small"
          loop={true}
          speed={3000}
          style={{ cursor: "pointer", height: "100%" }}
        >
          {banners && Array.isArray(banners)
            ? banners
                .filter((a) => a.isMainBanner === false)
                .map((banner, index) => (
                  <SwiperSlide
                    key={`small_banners_image_key${index}`}
                    onClick={() => navigate(banner.link)}
                  >
                    <LazyLoadImage
                      src={`${BASE_URL}images/${getTitle(
                        banner.imageTm,
                        banner.imageRu,
                        banner.imageEn
                      )}`}
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
