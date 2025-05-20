import { FC, useEffect, useState, useRef } from "react";
import {
  Stack,
  Typography,
  Skeleton,
  TextField,
  InputAdornment,
  CircularProgress,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { BASE_URL, BASE_URL_IMG } from "../../../../api/instance";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface HeaderContactsProps {
  isLoading: boolean;
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

const MobileSearch: FC<HeaderContactsProps> = ({ isLoading }) => {
  const [searchValue, setSearchValue] = useState("");
  const [result, setResult] = useState<SearchedProducts | undefined>(undefined);
  const [debouncedValue, setDebouncedValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Контроль видимости результатов
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();
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
  if (isLoading) {
    return (
      <Stack direction="row" justifyContent="space-between">
        <Stack></Stack>
        <Stack>
          <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} width={150} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={100} />
        </Stack>
        <Stack></Stack>
      </Stack>
    );
  }
  const style3 = {
    fontSize: "14px",
    whiteSpace: "normal",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontWeight: 500,
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
  };

  return (
    <Stack position="relative" ref={searchRef} width="100%">
      <TextField
        fullWidth
        placeholder={t("header.search")}
        variant="outlined"
        size="small"
        autoComplete="off"
        onChange={(e) => setSearchValue(e.target.value)}
        onFocus={() => setIsSearchOpen(true)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#464646" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#f7f7f7",
            },
            "& input": {
              color: "#464646",
            },
            "& fieldset": {
              borderColor: "#464646",
            },
            "&:hover fieldset": {
              borderColor: "#B71C1C",
            },
          },
          "& input::placeholder": {
            color: { lg: "#fff", md: "#fff", sm: "#fff", xs: "#464646" },
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
            result.products.map((elem) => (
              <Stack key={elem.id}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(`/product/${elem.id}`);
                    setIsSearchOpen(false); // Закрываем после клика
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
                </Stack>
                <Divider />
              </Stack>
            ))
          ) : (
            <Typography>Haryt tapylmady</Typography>
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default MobileSearch;
