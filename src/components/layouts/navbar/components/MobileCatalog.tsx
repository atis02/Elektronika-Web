import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  IconButton,
  Typography,
  Box,
  CircularProgress,
  Stack,
} from "@mui/material";
import { ExpandLess, ExpandMore, Close } from "@mui/icons-material";
import { useCategories } from "../../../../hooks/category/useCategory";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { BASE_URL_IMG } from "../../../../api/instance";

interface Props {
  onClose: () => void;
}
const CatalogMenu: React.FC<Props> = ({ onClose }) => {
  const { categories, isLoading: isCategoriesLoading } = useCategories();
  const { t, i18n } = useTranslation();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getTitle = (nameTm: string, nameRu: string, nameEn: string): string => {
    switch (i18n.language) {
      case "ru":
        return nameRu;
      case "tm":
        return nameTm;
      default:
        return nameEn;
    }
  };

  if (isCategoriesLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <CircularProgress />
      </Box>
    );
  }
  console.log(categories);

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Stack direction="row" alignItems="center" gap={2}>
        <IconButton
          sx={{
            width: 35,
            height: 35,
            border: "1px solid gray",
          }}
          onClick={onClose}
        >
          <Close />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#464646" }}>
          {t("navbar.categories")}
        </Typography>
      </Stack>

      <List disablePadding>
        {categories.map((cat: any) => {
          const catTitle = getTitle(cat.nameTm, cat.nameRu, cat.nameEn);
          const catKey = `cat-${cat.id}`;

          return (
            <React.Fragment key={catKey}>
              <ListItem sx={{ px: 0 }}>
                <Stack width={60}>
                  <img
                    src={
                      cat.image === null
                        ? "/navbarIcons/logo.svg"
                        : `${BASE_URL_IMG}public/${cat.image}`
                    }
                    alt={catTitle}
                    style={{
                      width: 54,
                      height: 54,
                      objectFit: "cover",
                      borderRadius: 4,
                    }}
                  />
                </Stack>
                <ListItemText
                  primary={
                    <Link
                      to={`/categories?categoryId=${cat.id}`}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        display: "block",
                      }}
                      onClick={onClose}
                    >
                      {catTitle}
                    </Link>
                  }
                  primaryTypographyProps={{ fontSize: 15 }}
                />

                {cat.subCategories?.length > 0 && (
                  <IconButton
                    edge="end"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleItem(catKey);
                    }}
                  >
                    {openItems[catKey] ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                )}
              </ListItem>

              {cat.subCategories?.length > 0 && (
                <Collapse in={openItems[catKey]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding sx={{ pl: 2 }}>
                    {cat.subCategories.map((sub: any) => {
                      const subTitle = getTitle(
                        sub.nameTm,
                        sub.nameRu,
                        sub.nameEn
                      );
                      const subKey = `sub-${sub.id}`;

                      return (
                        <React.Fragment key={subKey}>
                          <ListItem
                            sx={{
                              p: 0,
                              pb: 1,
                              borderBottom: "1px solid lightgray",
                            }}
                          >
                            <Stack width={60}>
                              <img
                                src={
                                  sub.image === null
                                    ? "/navbarIcons/logo.svg"
                                    : `${BASE_URL_IMG}public/${sub.image}`
                                }
                                alt={subTitle}
                                style={{
                                  width: 44,
                                  height: 44,
                                  objectFit: "cover",
                                  borderRadius: 4,
                                }}
                              />
                            </Stack>
                            <ListItemText
                              primary={
                                <Link
                                  to={`/categories?categoryId=${cat.id}&subCategoryId=${sub.id}`}
                                  style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                    display: "block",
                                  }}
                                  onClick={onClose}
                                >
                                  {subTitle}
                                </Link>
                              }
                              primaryTypographyProps={{ fontSize: 14 }}
                            />

                            {sub.segments?.length > 0 && (
                              <IconButton
                                edge="end"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleItem(subKey);
                                }}
                              >
                                {openItems[subKey] ? (
                                  <ExpandLess />
                                ) : (
                                  <ExpandMore />
                                )}
                              </IconButton>
                            )}
                          </ListItem>

                          {/* Сегменты */}
                          {sub.segments?.length > 0 && (
                            <Collapse
                              in={openItems[subKey]}
                              timeout="auto"
                              unmountOnExit
                            >
                              <List
                                component="div"
                                disablePadding
                                sx={{ pl: 2 }}
                              >
                                {sub.segments.map((seg: any) => {
                                  const segTitle = getTitle(
                                    seg.nameTm,
                                    seg.nameRu,
                                    seg.nameEn
                                  );
                                  const segKey = `seg-${seg.id}`;
                                  return (
                                    <ListItem key={segKey} sx={{ p: 0, pb: 1 }}>
                                      <Stack width={60}>
                                        <img
                                          src={
                                            seg.image === null
                                              ? "/navbarIcons/logo.svg"
                                              : `${BASE_URL_IMG}public/${seg.image}`
                                          }
                                          alt={segTitle}
                                          style={{
                                            width: 34,
                                            height: 34,
                                            objectFit: "cover",
                                            borderRadius: 4,
                                          }}
                                        />
                                      </Stack>
                                      <ListItemText
                                        primary={
                                          <Link
                                            to={`/categories?categoryId=${cat.id}&subCategoryId=${sub.id}&segmentId=${seg.id}`}
                                            style={{
                                              textDecoration: "none",
                                              color: "inherit",
                                              display: "block",
                                            }}
                                            onClick={onClose}
                                          >
                                            {segTitle}
                                          </Link>
                                        }
                                        primaryTypographyProps={{
                                          fontSize: 13,
                                        }}
                                      />
                                    </ListItem>
                                  );
                                })}
                              </List>
                            </Collapse>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );
};

export default CatalogMenu;
