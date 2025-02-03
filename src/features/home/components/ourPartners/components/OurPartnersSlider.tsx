// import { FC } from "react";
// import Slider from "react-slick";
// import { usePartner } from "../../../../../hooks/partners/usePartner";
// import "./partners.css";
// import { BASE_URL_IMG } from "../../../../../api/instance";

// const OurPartnersSlider: FC = () => {
//   const { partners, isLoading, isError } = usePartner(); // Use the custom hook

//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 2000,
//     slidesToShow: 5,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
//     variableWidth: true,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 5,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 3,
//         },
//       },
//       {
//         breakpoint: 576,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   if (isLoading) {
//     return (
//       <div style={{ padding: "20px" }}>
//         <>Loading...</>
//       </div>
//     );
//   }

//   if (isError) {
//     return <div style={{ padding: "20px" }}>Error loading partners.</div>;
//   }
//   console.log(partners);

//   return (
//     <div style={{ padding: "20px", width: "100%" }}>
//       <Slider {...settings}>
//         {partners &&
//           Array.isArray(partners) &&
//           partners.map((partner: any) => (
//             <div key={partner.id} className="partnersImgBox">
//               <img
//                 src={`${BASE_URL_IMG}public/${partner.image}`}
//                 // src={partner.imageUrl}
//                 alt={`Partner ${partner.id}`}
//               />
//             </div>
//           ))}
//       </Slider>
//     </div>
//   );
// };

// export default OurPartnersSlider;

import React, { useRef } from "react";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper/types"; // Import Swiper class for type

// import "swiper/css";
// import "swiper/css/navigation";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BASE_URL } from "../../../../../api/instance";
import { usePartner } from "../../../../../hooks/partners/usePartner";

const MinBannerSwiper: React.FC = () => {
  const thumbsSwiperRef = useRef<SwiperClass | null>(null); // Explicitly type the ref
  const { partners, isLoading, isError } = usePartner(); // Use the custom hook

  if (isLoading) {
    return (
      <div style={{ padding: "20px" }}>
        <>Loading...</>
      </div>
    );
  }

  if (isError) {
    return <div style={{ padding: "20px" }}>Error loading partners.</div>;
  }
  return (
    <Box sx={{ overflow: "hidden", width: "100%" }}>
      <Box
        sx={{
          height: {
            lg: "80px",
            md: "180px",
            sm: "150px",
            xs: "100px",
          },
        }}
      >
        <Swiper
          onSwiper={(swiper) => (thumbsSwiperRef.current = swiper)} // Attach thumbs swiper instance
          slidesPerView={5}
          spaceBetween={5}
          // centeredSlides={true}
          autoplay={true}
          modules={[Navigation, Thumbs, Autoplay]}
          className="gallery-thumbs-small"
          loop={true}
          speed={3000}
          style={{ cursor: "pointer", height: "100%" }}
        >
          {partners && Array.isArray(partners)
            ? partners.map((partner, index) => (
                <SwiperSlide key={`small_banners_image_key${index}`}>
                  <LazyLoadImage
                    // src={banner.imageUrl}
                    src={`${BASE_URL}images/${partner.image}`}
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
