import { Box, Paper, Stack, Typography, Skeleton, Grid2 } from "@mui/material";
import { FC, useRef, useState } from "react";
import { sideLinkBox, sidelinkImageBox } from "./sidelinksStyle";
import { useCategories } from "../../../../../hooks/category/useCategory";
import { useSubcategories } from "../../../../../hooks/subcategry/useSubcategory";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { decode } from "blurhash";
import { motion, AnimatePresence } from "framer-motion";
import { useSegment } from "../../../../../hooks/segment/useSegment";
import { useTranslation } from "react-i18next";
import MultiLang from "../../../../../components/utils/MultiLang";
import { BASE_URL } from "../../../../../api/instance";
// Function to convert blurhash to base64
const blurHashToBase64 = (
  blurhash: string,
  width: number = 32,
  height: number = 32
) => {
  if (!blurhash) return null;
  try {
    const pixels = decode(blurhash, width, height);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const imageData = ctx.createImageData(width, height);
    imageData.data.set(pixels);
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
  } catch (e) {
    return null;
  }
};

interface SidebarLinksProps {
  selectedFilters: {
    categoryId?: number;
    subcategoryId?: number;
    segmentId?: number;
    brandId?: number;
  };
  onCategorySelect: (filters: {
    categoryId?: number;
    subcategoryId?: number;
    segmentId?: number;
    brandId?: number;
  }) => void;
}

const SidebarLinks: FC<SidebarLinksProps> = ({ onCategorySelect }) => {
  const { categories, isLoading: isCategoriesLoading } = useCategories();
  const [expandedCategory, setExpandedCategory] = useState<any | null>(null);
  const navigate = useNavigate();
  const [hoveredCategoryId, setHoveredCategoryId] = useState<number | null>(
    null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { segment: allSegments } = useSegment();
  const { t } = useTranslation();
  const {
    subcategories,
    isLoading: isSubcategoriesLoading,
    isError: isSubcategoryError,
  } = useSubcategories(expandedCategory?.id);

  const handleCategoryClick = (category: any) => {
    onCategorySelect({ categoryId: category.id });
    navigate("/categories?categoryId=" + category.id);
  };

  const handleSubcategoryClick = (categoryId: any, subcategoryId: string) => {
    navigate(
      `/categories?categoryId=${categoryId.id}&subCategoryId=${subcategoryId}`
    );
  };
  const handleSegmentClick = (
    categoryId: any,
    subcategoryId: string,
    segmentId: string
  ) => {
    navigate(
      `/categories?categoryId=${categoryId.id}&subCategoryId=${subcategoryId}&segmentId=${segmentId}`
    );
    // setOpenCategories(false); // Close the drawer
  };
  // const handleBrandClick = (categoryId: string, brandId: string) => {
  //   navigate(`/categories?categoryId=${categoryId}&brandId=${brandId}`);
  //   // setOpenCategories(false); // Close the drawer
  // };
  const categoryItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: delay * 0.05, duration: 0.3, ease: "easeInOut" },
    }),
  };

  // const subcategoryItemVariants = {
  //   hidden: { opacity: 0, x: -10 },
  //   visible: (delay: number) => ({
  //     opacity: 1,
  //     x: 0,
  //     transition: { delay: delay * 0.05, duration: 0.3, ease: "easeInOut" },
  //   }),
  // };

  if (isCategoriesLoading) {
    return (
      <Box sx={{ background: "#fff", width: "100%", height: "auto" }}>
        <Paper elevation={1} sx={sideLinkBox}>
          <Skeleton variant="text" sx={{ fontSize: "12px", width: 70 }} />
        </Paper>
        <Box
          sx={{
            height: "50vh",
            overflowY: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {Array.from(new Array(5)).map((_, index) => (
            <Box key={index} sx={{ padding: 1 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Skeleton variant="circular" width={30} height={30} />
                <Skeleton variant="text" sx={{ fontSize: "12px", width: 80 }} />
              </Stack>
              <Stack spacing={1} mt={1} pl={2}>
                {Array.from(new Array(2)).map((_, index) => (
                  <Stack key={index}>
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "12px", width: 70 }}
                    />
                  </Stack>
                ))}
              </Stack>
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  if (!categories) return <Typography>No categories found</Typography>;

  return (
    <Box sx={{ background: "#fff", width: "100%", height: "auto" }}>
      <Paper elevation={1} sx={sideLinkBox}>
        <Typography sx={{ fontWeight: 700, fontSize: "12px" }}>
          {t("navbar.categories")}
        </Typography>
      </Paper>
      <Box
        sx={{
          height: "50vh",
          overflowY: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {categories.map((category: any, index: number) => (
          <motion.div
            key={category.id}
            initial="hidden"
            animate="visible"
            variants={categoryItemVariants}
            custom={index}
            onMouseEnter={() => {
              setHoveredCategoryId(category.id);
              setExpandedCategory(category);
            }}
            onMouseLeave={() => {
              setHoveredCategoryId(null);
              setExpandedCategory(null);
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              sx={{
                cursor: "pointer",
                borderRadius: "4px",
                px: 1,
                pt: 0.5,
                mb: 0.3,
                transition: "background-color 0.7s ease",
              }}
              onClick={() => handleCategoryClick(category)}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Box sx={sidelinkImageBox}>
                  <LazyLoadImage
                    // src={category?.imageUrl || "./images/banner1.png"}
                    src={`${BASE_URL}images/${category.image}`}
                    alt={category?.title_en}
                    placeholderSrc={blurHashToBase64(category.blurhash) || ""}
                    effect="blur"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
                <MultiLang
                  title_en={category?.nameTm}
                  title_ru={category?.nameRu}
                  title_tm={category?.nameEn}
                />
                {/* <Typography sx={{ fontSize: "12px" }}>
                  {category?.title_en}
                </Typography> */}
              </Stack>
              <motion.img
                src="/icons/arrow.svg"
                alt=""
                style={{
                  transformOrigin: "center",
                }}
                animate={{
                  rotate: hoveredCategoryId === category.id ? -90 : 0,
                }}
                transition={{ duration: 0.2 }}
              />
            </Stack>
            <AnimatePresence>
              {expandedCategory?.id === category.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Stack>
                    {isSubcategoriesLoading ? (
                      <Stack>
                        {Array.from(new Array(3)).map((_, index) => (
                          <Stack key={index}>
                            <Skeleton
                              variant="text"
                              sx={{ fontSize: "12px", width: 70 }}
                            />
                          </Stack>
                        ))}
                      </Stack>
                    ) : isSubcategoryError ? (
                      <Typography>Error Fetching Subcategories</Typography>
                    ) : (
                      // subcategories?.map((sub: any, index: number) => (
                      //   <motion.div
                      //     key={sub.id}
                      //     initial="hidden"
                      //     animate="visible"
                      //     variants={subcategoryItemVariants}
                      //     custom={index}
                      //   >
                      //     <Stack
                      //       direction="row"
                      //       spacing={1}
                      //       alignItems="center"
                      //       sx={{
                      //         padding: "6px",
                      //         borderRadius: "4px",
                      //         "&:hover": {
                      //           backgroundColor: "#fafafa",
                      //           cursor: "pointer",
                      //         },
                      //       }}
                      //       onClick={() => handleSubcategoryClick(sub)}
                      //     >
                      //       <Typography sx={{ fontSize: "13px" }}>
                      //         {sub?.title_en}
                      //       </Typography>
                      //     </Stack>
                      //   </motion.div>
                      // ))

                      // {openCategories && (
                      // <Paper
                      //   elevation={3}
                      //   sx={{
                      //     minWidth: "10%",
                      //     height: "55%",
                      //     position: "fixed",
                      //     top: "24%",
                      //     left: "30.5%",
                      //     zIndex: 1000,
                      //     p: 2,
                      //     mt: 2,
                      //   }}
                      //   ref={dropdownRef}
                      // >
                      //   <Stack spacing={3} direction="row">
                      //     {subcategories.length > 0 ? (
                      //       subcategories.map((sub: any) => {
                      //         const filteredSegments = allSegments
                      //           ? allSegments.filter(
                      //               (seg: any) =>
                      //                 seg?.subcategory_id === sub?.id
                      //             )
                      //           : [];
                      //         return (
                      //           <Grid2
                      //             key={sub.id}
                      //             size={{ lg: 3, md: 3, sm: 6, xs: 12 }}
                      //           >
                      //             <Stack
                      //               mb={2}
                      //               direction={"row"}
                      //               spacing={2}
                      //               onClick={() => {
                      //                 handleSubcategoryClick(sub.id);
                      //               }}
                      //             >
                      //               <Typography
                      //                 sx={{
                      //                   cursor: "pointer",
                      //                   fontSize: "14px",
                      //                   fontWeight: "600",
                      //                   textAlign: "center",
                      //                   minHeight: 50,
                      //                 }}
                      //               >
                      //                 {sub?.title_tm}
                      //               </Typography>
                      //             </Stack>

                      //             {filteredSegments.length > 0
                      //               ? filteredSegments.map((seg: any) => (
                      //                   <Typography
                      //                     onClick={() =>
                      //                       handleSegmentClick(
                      //                         expandedCategory as string,
                      //                         sub?.id,
                      //                         seg?.id
                      //                       )
                      //                     }
                      //                     key={seg?.id}
                      //                     sx={{
                      //                       cursor: "pointer",
                      //                       mb: 1,
                      //                       paddingLeft: "5px",
                      //                       fontSize: "14px",
                      //                       textAlign: "center",
                      //                     }}
                      //                   >
                      //                     {seg?.title_tm}
                      //                   </Typography>
                      //                 ))
                      //               : null}
                      //           </Grid2>
                      //         );
                      //       })
                      //     ) : expandedCategory ? (
                      //       <Typography>Subkategoriýa ýok</Typography>
                      //     ) : null}
                      //   </Stack>
                      // </Paper>
                      <Paper
                        sx={{
                          minWidth: {
                            lg: "25%",
                            md: "35%",
                            sm: "50%",
                            xs: "80%",
                          }, // Adjust width for different screen sizes
                          height: "52%",
                          position: "fixed",
                          borderRadius: 0,
                          boxShadow: "none",
                          top: { lg: "24%", md: "22%", sm: "25%", xs: "30%" }, // Adjust top positioning
                          left: { lg: "30%", md: "25%", sm: "20%", xs: "10%" }, // Adjust left positioning
                          zIndex: 1000,
                          p: 2,
                          mt: 2,
                        }}
                        ref={dropdownRef}
                      >
                        <Stack spacing={3} direction="row">
                          {subcategories.length > 0 ? (
                            subcategories.map((sub: any) => {
                              const filteredSegments = allSegments
                                ? allSegments.filter(
                                    (seg: any) => seg?.subCategoryId === sub?.id
                                  )
                                : [];
                              return (
                                <Grid2
                                  key={sub.id}
                                  size={{ lg: 3, md: 3, sm: 6, xs: 12 }}
                                >
                                  <Stack
                                    mb={2}
                                    direction={"row"}
                                    alignItems="center"
                                    spacing={1}
                                    onClick={() => {
                                      handleSubcategoryClick(
                                        expandedCategory as string,

                                        sub.id
                                      );
                                    }}
                                    minHeight={30}
                                  >
                                    {/* <MultiLangTypography
                                      title_en={sub?.title_en}
                                      title_ru={sub?.title_ru}
                                      title_tm={sub?.title_tm}
                                    /> */}
                                    <Typography
                                      sx={{
                                        cursor: "pointer",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        textAlign: "center",
                                        width: "100%",
                                        // minHeight: 20,
                                        lineHeight: "15px",
                                      }}
                                    >
                                      {sub?.nameTm}
                                    </Typography>
                                  </Stack>

                                  {filteredSegments.length > 0
                                    ? filteredSegments.map((seg: any) => (
                                        <Typography
                                          onClick={() =>
                                            handleSegmentClick(
                                              expandedCategory as string,
                                              sub?.id,
                                              seg?.id
                                            )
                                          }
                                          key={seg?.id}
                                          sx={{
                                            cursor: "pointer",
                                            // mb: 1,
                                            paddingLeft: "5px",
                                            fontSize: "14px",
                                            textAlign: "center",
                                          }}
                                        >
                                          {seg?.nameTm}
                                        </Typography>
                                      ))
                                    : null}
                                </Grid2>
                              );
                            })
                          ) : expandedCategory ? (
                            <Typography>Subkategoriýa ýok</Typography>
                          ) : null}
                        </Stack>
                      </Paper>
                    )}
                  </Stack>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default SidebarLinks;
