import React, { useRef } from "react";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper/types"; // Import Swiper class for type
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BASE_URL } from "../../../../../api/instance";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const MainSwiper: React.FC<{ banners: any[] }> = ({ banners }) => {
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
          onSwiper={(swiper) => (thumbsSwiperRef.current = swiper)} // Attach thumbs swiper instance
          slidesPerView={1}
          spaceBetween={1}
          autoplay={true}
          modules={[Navigation, Autoplay]}
          className="gallery-thumbs-small"
          loop={true}
          speed={3000}
          style={{ cursor: "pointer", height: "100%" }}
        >
          {banners && Array.isArray(banners)
            ? banners
                .filter((a) => a.isMainBanner === true)
                .map((banner, index) => (
                  <SwiperSlide
                    key={`small_banners_image_key${index}`}
                    style={{ height: "100%" }}
                    onClick={() => navigate(banner.link)}
                  >
                    <LazyLoadImage
                      src={`${BASE_URL}images/${getTitle(
                        banner.imageTm,
                        banner.imageRu,
                        banner.imageEn
                      )}`}
                      alt={`Banner ${index + 1}`}
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

export default MainSwiper;
