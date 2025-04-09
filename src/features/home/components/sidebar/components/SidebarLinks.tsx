import {
  Box,
  Paper,
  Stack,
  Typography,
  Skeleton,
  Divider,
} from "@mui/material";
import { FC, useRef, useState } from "react";
import Grid2 from "@mui/material/Grid2";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { decode } from "blurhash";
import { BASE_URL } from "../../../../../api/instance";
import { sideLinkBox, sidelinkImageBox } from "./sidelinksStyle";
import { useCategories } from "../../../../../hooks/category/useCategory";
import { useSubcategories } from "../../../../../hooks/subcategry/useSubcategory";
import { useSegment } from "../../../../../hooks/segment/useSegment";
import { useTranslation } from "react-i18next";

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
const categoryItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: delay * 0.05, duration: 0.3, ease: "easeInOut" },
  }),
};

const SidebarLinks: FC<SidebarLinksProps> = ({ onCategorySelect }) => {
  // Always call hooks at the top level
  const { categories, isLoading: isCategoriesLoading } = useCategories();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { segment: allSegments } = useSegment();

  // Local states for hovered/expanded items
  const [expandedCategory, setExpandedCategory] = useState<any | null>(null);
  const [hoveredCategoryId, setHoveredCategoryId] = useState<number | null>(
    null
  );
  const [expandedSubCategory, setExpandedSubCategory] = useState<any | null>(
    null
  );
  const [hoveredSubCategoryId, setHoveredSubCategoryId] = useState<
    number | null
  >(null);

  // Retrieve subcategories based on currently expanded category
  const {
    subcategories,
    isLoading: isSubcategoriesLoading,
    isError: isSubcategoryError,
  } = useSubcategories(expandedCategory?.id);

  // Navigation handlers
  const handleCategoryClick = (category: any) => {
    onCategorySelect({ categoryId: category.id });
    navigate("/categories?categoryId=" + category.id);
  };

  const handleSubcategoryClick = (category: any, subcategoryId: string) => {
    navigate(
      `/categories?categoryId=${category.id}&subCategoryId=${subcategoryId}`
    );
  };

  const handleSegmentClick = (
    category: any,
    subcategoryId: string,
    segmentId: string
  ) => {
    navigate(
      `/categories?categoryId=${category.id}&subCategoryId=${subcategoryId}&segmentId=${segmentId}`
    );
  };

  const getTitle = ({
    title_ru,
    title_tm,
    title_en,
  }: {
    title_ru: string;
    title_tm: string;
    title_en: string;
  }) => {
    const currentLanguage = i18n.language;
    switch (currentLanguage) {
      case "ru":
        return title_ru;
      case "tm":
        return title_tm;
      case "en":
        return title_en;
      default:
        return title_tm; // Default to English
    }
  };

  return (
    <Box sx={{ background: "#fff", width: "100%", height: "auto" }}>
      {isCategoriesLoading ? (
        <>
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
              <Box key={index} sx={{ p: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Skeleton variant="circular" width={30} height={30} />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "12px", width: 80 }}
                  />
                </Stack>
                <Stack spacing={1} mt={1} pl={2}>
                  {Array.from(new Array(2)).map((_, idx) => (
                    <Stack key={idx}>
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
        </>
      ) : !categories ? (
        <Typography>{t("noCategories")}</Typography>
      ) : (
        <>
          <Paper elevation={1} sx={sideLinkBox}>
            <Typography sx={{ fontWeight: 700, fontSize: "12px" }}>
              {t("navbar.categories")}
            </Typography>
          </Paper>
          <Box>
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
                  setExpandedSubCategory(null);
                }}
                style={{
                  position: "relative",
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
                        src={`${BASE_URL}images/${category.image}`}
                        alt={category?.title_en}
                        placeholderSrc={
                          blurHashToBase64(category.blurhash) || ""
                        }
                        effect="blur"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </Box>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "600",
                        textAlign: "start",
                        width: "100%",
                        lineHeight: "15px",
                        ...(expandedCategory?.id == category.id && {
                          color: "#B71C1C",
                        }),
                      }}
                    >
                      {getTitle({
                        title_ru: category.nameRu,
                        title_tm: category.nameTm,
                        title_en: category.nameEn,
                      })}
                    </Typography>
                  </Stack>
                  <motion.img
                    src="/icons/arrow.svg"
                    alt=""
                    style={{ transformOrigin: "center" }}
                    animate={{
                      rotate: hoveredCategoryId === category.id ? -90 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </Stack>
                <AnimatePresence>
                  {expandedCategory?.id == category.id && (
                    <Stack>
                      {isSubcategoriesLoading ? (
                        <Stack>
                          {Array.from(new Array(3)).map((_, idx) => (
                            <Stack key={idx}>
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
                        <Paper
                          sx={{
                            minWidth: {
                              lg: "15%",
                              md: "35%",
                              sm: "50%",
                              xs: "80%",
                            },
                            height: "auto",
                            position: "absolute",
                            borderRadius: 0,
                            boxShadow: "none",
                            // border: "1px solid red",
                            top: {
                              lg: "-15%",
                              md: "22%",
                              sm: "25%",
                              xs: "30%",
                            },
                            left: {
                              lg: "100%",
                              md: "25%",
                              sm: "20%",
                              xs: "10%",
                            },
                            zIndex: 1000,
                            p: 1,
                            mt: 2,
                          }}
                          ref={dropdownRef}
                          onMouseEnter={() => setExpandedCategory(category)}
                          onMouseLeave={() => {
                            setExpandedCategory(null);
                            setExpandedSubCategory(null);
                          }}
                        >
                          <Stack
                            direction="column"
                            spacing={1}
                            justifyContent="flex-start"
                            alignItems="flex-start"
                          >
                            {subcategories.length > 0 ? (
                              subcategories.map((sub: any) => {
                                const filteredSegments = allSegments
                                  ? allSegments.filter(
                                      (seg: any) =>
                                        seg?.subCategoryId === sub?.id
                                    )
                                  : [];
                                return (
                                  <AnimatePresence key={sub.id}>
                                    <motion.div
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      exit={{ opacity: 0 }}
                                      transition={{ duration: 0.3 }}
                                      onMouseEnter={() => {
                                        setHoveredSubCategoryId(sub.id);
                                        setExpandedSubCategory(sub);
                                      }}
                                      onMouseLeave={() => {
                                        setHoveredSubCategoryId(null);
                                        setExpandedSubCategory(null);
                                      }}
                                      style={{
                                        position: "relative",
                                      }}
                                    >
                                      <Grid2
                                        size={{ lg: 3, md: 3, sm: 6, xs: 12 }}
                                      >
                                        <Stack
                                          width="100%"
                                          sx={{
                                            cursor: "pointer",
                                            borderRadius: "4px",
                                            // px: 1,
                                            pt: 0.5,
                                            width: 270,
                                            mb: 0.3,
                                            minHeight: 50,
                                            transition:
                                              "background-color 0.7s ease",
                                          }}
                                          mb={2}
                                          direction="row"
                                          alignItems="center"
                                          justifyContent="flex-start"
                                          spacing={1}
                                          onClick={() =>
                                            handleSubcategoryClick(
                                              expandedCategory,
                                              sub.id
                                            )
                                          }
                                          // sx={{
                                          //   cursor: "pointer",
                                          //   minHeight: 30,
                                          //   width: 270,
                                          // }}
                                        >
                                          {sub.image && (
                                            // <Box sx={sidelinkImageBox}>
                                            <LazyLoadImage
                                              src={`${BASE_URL}images/${sub.image}`}
                                              alt={sub?.title_en}
                                              placeholderSrc={
                                                blurHashToBase64(
                                                  sub.blurhash
                                                ) || ""
                                              }
                                              effect="blur"
                                              style={{
                                                width: "40px",
                                                height: "40px",
                                                objectFit: "contain",
                                                cursor: "pointer",
                                              }}
                                            />
                                            // </Box>
                                          )}
                                          <Typography
                                            sx={{
                                              fontSize: "14px",
                                              fontWeight: "600",
                                              textAlign: "start",
                                              width: "100%",
                                              lineHeight: "15px",
                                              ...(expandedSubCategory?.id ===
                                                sub.id && { color: "#B71C1C" }),
                                            }}
                                          >
                                            {getTitle({
                                              title_ru: sub?.nameRu || "",
                                              title_tm: sub?.nameTm || "",
                                              title_en: sub?.nameEn || "",
                                            })}
                                          </Typography>

                                          <motion.img
                                            src="/icons/arrow.svg"
                                            alt=""
                                            style={{
                                              transformOrigin: "center",
                                            }}
                                            animate={{
                                              rotate:
                                                hoveredSubCategoryId === sub?.id
                                                  ? -90
                                                  : 0,
                                            }}
                                            transition={{ duration: 0.2 }}
                                          />
                                        </Stack>
                                        {filteredSegments.length > 0 &&
                                          expandedSubCategory?.id ===
                                            sub.id && (
                                            <Paper
                                              sx={{
                                                minWidth: {
                                                  lg: "70%",
                                                  md: "35%",
                                                  sm: "50%",
                                                  xs: "80%",
                                                },
                                                height: "auto",
                                                position: "absolute",
                                                borderRadius: 0,
                                                boxShadow: "none",
                                                top: {
                                                  lg: "-46%",
                                                  md: "22%",
                                                  sm: "25%",
                                                  xs: "30%",
                                                },
                                                left: {
                                                  lg: "100%",
                                                  md: "25%",
                                                  sm: "20%",
                                                  xs: "10%",
                                                },
                                                zIndex: 1000,
                                                p: 1,
                                                mt: 2,
                                              }}
                                              ref={dropdownRef}
                                            >
                                              <Stack
                                                direction="column"
                                                spacing={1}
                                                justifyContent="center"
                                                alignItems="start"
                                                minHeight={50}
                                              >
                                                {filteredSegments.map(
                                                  (seg: any) => (
                                                    <Stack
                                                      direction="row"
                                                      alignItems="center"
                                                      justifyContent="center"
                                                      height="100%"
                                                    >
                                                      {seg.image && (
                                                        <LazyLoadImage
                                                          src={`${BASE_URL}images/${seg.image}`}
                                                          alt={seg?.title_en}
                                                          placeholderSrc={
                                                            blurHashToBase64(
                                                              seg.blurhash
                                                            ) || ""
                                                          }
                                                          effect="blur"
                                                          style={{
                                                            width: "40px",
                                                            height: "40px",
                                                            objectFit:
                                                              "contain",
                                                            cursor: "pointer",
                                                          }}
                                                        />
                                                      )}

                                                      <Typography
                                                        onClick={() =>
                                                          handleSegmentClick(
                                                            expandedCategory,
                                                            sub.id,
                                                            seg.id
                                                          )
                                                        }
                                                        key={seg?.id}
                                                        sx={{
                                                          cursor: "pointer",
                                                          paddingLeft: "5px",
                                                          fontSize: "14px",
                                                          textAlign: "start",
                                                          "&:hover": {
                                                            color: "#B71C1C",
                                                          },
                                                        }}
                                                      >
                                                        {getTitle({
                                                          title_ru:
                                                            seg?.nameRu || "",
                                                          title_tm:
                                                            seg?.nameTm || "",
                                                          title_en:
                                                            seg?.nameEn || "",
                                                        })}
                                                      </Typography>
                                                    </Stack>
                                                  )
                                                )}
                                              </Stack>
                                            </Paper>
                                          )}
                                      </Grid2>
                                      <Divider />
                                    </motion.div>
                                  </AnimatePresence>
                                );
                              })
                            ) : (
                              <Typography>{t("noSubcategory")}</Typography>
                            )}
                          </Stack>
                        </Paper>
                      )}
                    </Stack>
                  )}
                  <Divider />
                </AnimatePresence>
              </motion.div>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default SidebarLinks;
