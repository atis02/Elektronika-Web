import { FC, useEffect, useState, useRef } from "react";
import {
  Backdrop,
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useCategories } from "../../../../../hooks/category/useCategory";
import { useSegment } from "../../../../../hooks/segment/useSegment";
import { useSubcategories } from "../../../../../hooks/subcategry/useSubcategory";
import { navLinks } from "../../styles/navLinks";
import { useNavigate } from "react-router-dom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../../../../../api/instance";
import MultiLangTypography from "../../../../utils/MultiLangTypography";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { sidelinkImageBoxe } from "../../../../../features/home/components/sidebar/components/sidelinksStyle";
import { decode } from "blurhash";

const NavbarCategory: FC = () => {
  const { categories, isLoading, isError } = useCategories();
  const { segment: allSegments } = useSegment();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const navigate = useNavigate();
  const {
    subcategories,
    isLoading: loadingSubcategories,
    isError: subcategoriesError,
  } = useSubcategories(selectedCategoryId);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const [openCategories, setOpenCategories] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const toggleCategories = () => setOpenCategories(!openCategories);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategoryId((prevCategoryId) =>
      prevCategoryId === categoryId ? null : categoryId
    );
  };

  const handleSegmentClick = (
    categoryId: string,
    subcategoryId: string,
    segmentId: string
  ) => {
    navigate(
      `/categories?categoryId=${categoryId}&subcategoryId=${subcategoryId}&segmentId=${segmentId}`
    );
    setOpenCategories(false);
  };

  const handleBrandClick = (categoryId: string) => {
    navigate(`/categories?categoryId=${categoryId}`);
    setOpenCategories(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isLoading || loadingSubcategories)
    return <Typography>Loading...</Typography>;
  if (isError || subcategoriesError)
    return <Typography>Error fetching categories</Typography>;

  const handleSubcategoryClick = (subcategory: any) => {
    navigate(`/categories?subCategoryId=${subcategory}`);
  };
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
  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ cursor: "pointer" }}
        onClick={toggleCategories}
      >
        <Typography sx={navLinks}>{t("navbar.categories")}</Typography>
        <img
          src="/icons/category header icon.svg"
          alt="navbar icon"
          style={{ transform: openCategories ? "rotate(180deg)" : "rotate(0)" }}
        />
      </Stack>
      <Backdrop
        sx={{
          backgroundColor: "transparent",
          color: "#000",
          zIndex: (theme: any) => theme.zIndex.drawer + 1,
          width: "100%",
          height: "95vh",
          alignItems: "start",
          top: { lg: "80px", md: "80px", sm: "70px", xs: "60px" },
        }}
        className="partners"
        open={openCategories}
        onClick={() => setOpenCategories(false)}
      >
        {openCategories && (
          <Paper
            elevation={3}
            sx={{
              width: { xs: "90%", sm: "85%", md: "75%", lg: "78%" },
              position: "fixed",
              top: "7.5%",
              zIndex: 1000,

              p: 2,
              mt: scrolled ? 7.5 : 2.5,

              backgroundColor: "#fafafa",
            }}
            ref={dropdownRef}
          >
            <Stack alignItems="end" mr={2}>
              <IconButton onClick={() => setOpenCategories(false)}>
                <HighlightOffIcon />
              </IconButton>
            </Stack>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 3,
                mt: -4,
              }}
            >
              <Box
                sx={{
                  flex: { xs: "1 1 100%", md: "1 1 25%" },
                  borderRight: { md: "1px solid #ddd" },
                  pr: { md: 2 },
                  mb: { xs: 2, md: 0 },
                }}
              >
                <Stack spacing={2}>
                  {categories.map((category: any) => (
                    <Stack
                      key={category?.id}
                      direction="row"
                      alignItems="center"
                      spacing={1}
                    >
                      {category?.image ? (
                        <img
                          src={`${BASE_URL}images/${category.image}`}
                          alt={category?.nameTm}
                          style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                      <Stack
                        onClick={() => handleBrandClick(category?.id)}
                        onMouseEnter={() => handleCategoryClick(category?.id)}
                        sx={{
                          cursor: "pointer",
                          fontWeight:
                            selectedCategoryId === category?.id
                              ? "bold"
                              : "normal",
                          color:
                            selectedCategoryId === category.id
                              ? "red"
                              : "black",
                          // fontFamily: "Montserrat",
                          fontSize: 12,
                        }}
                      >
                        <MultiLangTypography
                          title_en={category.nameEn}
                          title_ru={category.nameRu}
                          title_tm={category.nameTm}
                        />
                        {/* {category?.nameTm} */}
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </Box>

              {/* Subcategories */}
              <Box
                sx={{
                  flex: { xs: "1 1 100%", md: "1 1 75%" },
                  height: "83vh",
                  overflow: "auto",
                }}
              >
                <Stack spacing={3} direction="column" flexWrap="wrap">
                  {subcategories.length > 0 ? (
                    subcategories.map((sub: any) => {
                      const filteredSegments = allSegments
                        ? allSegments.filter(
                            (seg: any) => seg?.subCategoryId === sub?.id
                          )
                        : [];
                      return (
                        <Box key={sub.id}>
                          <Stack
                            mb={2}
                            direction="row"
                            alignItems="center"
                            gap={1}
                            onClick={() => handleSubcategoryClick(sub.id)}
                          >
                            {sub.image && (
                              <Box sx={sidelinkImageBoxe}>
                                <LazyLoadImage
                                  src={`${BASE_URL}images/${sub.image}`}
                                  alt={sub?.title_en}
                                  placeholderSrc={
                                    blurHashToBase64(sub.blurhash) || ""
                                  }
                                  effect="blur"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                  }}
                                />
                              </Box>
                            )}
                            <Typography
                              sx={{
                                textAlign: "start",
                                cursor: "pointer",
                                fontSize: "14px",
                                fontWeight: "600",
                                color: "#2E2F38",
                              }}
                            >
                              <MultiLangTypography
                                title_en={sub?.nameEn}
                                title_ru={sub?.nameRu}
                                title_tm={sub?.nameTm}
                              />
                            </Typography>
                          </Stack>
                          {filteredSegments.length > 0 &&
                            filteredSegments.map((seg: any) => (
                              <Typography
                                onClick={() =>
                                  handleSegmentClick(
                                    selectedCategoryId as string,
                                    sub?.id,
                                    seg?.id
                                  )
                                }
                                key={seg?.id}
                                sx={{
                                  cursor: "pointer",
                                  mb: 1,
                                  fontSize: "14px",
                                  textAlign: "start",
                                }}
                              >
                                <MultiLangTypography
                                  title_en={seg?.nameEn}
                                  title_ru={seg?.nameRu}
                                  title_tm={seg?.nameTm}
                                />
                              </Typography>
                            ))}
                        </Box>
                      );
                    })
                  ) : selectedCategoryId ? (
                    <Typography>Subkategoriýa ýok</Typography>
                  ) : null}
                </Stack>
              </Box>
            </Box>
          </Paper>
        )}
      </Backdrop>
    </Box>
  );
};

export default NavbarCategory;
