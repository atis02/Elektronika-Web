import { FC, useEffect, useState, useRef } from "react";
import {
  Stack,
  Typography,
  TextField,
  InputAdornment,
  CircularProgress,
  Divider,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { BASE_URL, BASE_URL_IMG } from "../../../../api/instance";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { addProduct } from "../../../redux/ProductSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/customHook";
import { AddCircleOutlineOutlined } from "@mui/icons-material";

interface HeaderContactsProps {
  isLoading: boolean;
  color?: string;
  addCompare?: boolean;
}
interface SearchedProducts {
  products: {
    id: string;
    nameTm: string;
    nameEn: string;
    nameRu: string;
    imageOne: string;
  }[];
}

const HeaderContactsSearch: FC<HeaderContactsProps> = ({
  color = "#fff",
  addCompare = false,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [result, setResult] = useState<SearchedProducts | undefined>(undefined);
  const [debouncedValue, setDebouncedValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Контроль видимости результатов
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const compareProducts = useAppSelector((state) => state.compare.products);

  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchValue]);

  useEffect(() => {
    handleSearch(debouncedValue);
  }, [debouncedValue]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isSearchOpen]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    setLoading(true); // Без try, чтобы не вызвать баг в useEffect
    try {
      const response = await fetch(`${BASE_URL}product/all?nameTm=${query}`);
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };
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

  const style3 = {
    fontSize: "14px",
    whiteSpace: "normal",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontWeight: 500,
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    color: "#464646",
  };

  return (
    <Stack position="relative" ref={searchRef}>
      <TextField
        fullWidth
        placeholder={t("header.search")}
        variant="outlined"
        size="small"
        autoComplete="off"
        onChange={(e) => setSearchValue(e.target.value)}
        onFocus={() => setIsSearchOpen(true)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: color }} />
            </InputAdornment>
          ),
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && searchValue.trim()) {
            navigate(`/categories?nameTm=${searchValue.trim()}`);
            setIsSearchOpen(false);
          }
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#f7f7f7",
            },
            "& input": {
              color: color,
            },
            "& fieldset": {
              borderColor: "#e3e3e3",
            },
            "&:hover fieldset": {
              borderColor: "#e3e3e3",
            },
          },
          "& input::placeholder": {
            color: color,
            opacity: 1,
          },
        }}
      />
      {isSearchOpen && searchValue !== "" && (
        <Stack
          position="absolute"
          top={40}
          bgcolor="#fff"
          border="1px solid lightgray"
          width="100%"
          minHeight="50px"
          maxHeight="450px"
          zIndex={100}
          borderRadius={1}
          p={1}
          overflow="auto"
          className="searchResult"
        >
          {loading ? (
            <Stack alignItems="center">
              <CircularProgress />
            </Stack>
          ) : result?.products?.length ? (
            result.products.map((elem: any) => (
              <Stack key={elem.id}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                   !addCompare&& navigate(`/product/${elem.id}`);
                    setIsSearchOpen(false);
                  }}
                >
                  <img
                    src={
                      `${BASE_URL_IMG}public/${elem.imageOne}` ||
                      "/images/logo2.png"
                    }
                    alt={elem.nameTm}
                    style={{ width: "20%", objectFit: "cover" }}
                  />
                  <Typography sx={style3}>
                    {getTitle(elem.nameTm, elem.nameRu, elem.nameEn)}
                  </Typography>
                  {addCompare && (
                    <IconButton
                      onClick={() => dispatch(addProduct(elem))}
                      sx={{
                        backgroundColor: compareProducts.some(
                          (comp: any) => comp.id === elem.id
                        )
                          ? "#C3000E"
                          : "transparent",
                        color: compareProducts.some(
                          (comp: any) => comp.id === elem.id
                        )
                          ? "#fff"
                          : color,
                        "&:hover": {
                          backgroundColor: compareProducts.some(
                            (comp: any) => comp.id === elem.id
                          )
                            ? "#C3000E"
                            : "#f0f0f0",
                        },
                        mt: 0,
                        p: 0,
                      }}
                    >
                      <AddCircleOutlineOutlined />
                    </IconButton>
                  )}
                </Stack>
                <Divider />
              </Stack>
            ))
          ) : (
            <Typography color="#464646">{t("home.noProduct")}</Typography>
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default HeaderContactsSearch;
