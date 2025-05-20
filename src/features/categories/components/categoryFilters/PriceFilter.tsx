import { FC, useState } from "react";
import { Button, Divider, IconButton, Stack, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Search } from "@mui/icons-material";
import { defaultCostButton } from "../../styles/categoryStyle";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Close } from "@mui/icons-material";

interface Prices {
  handleCategorySelect: (filters: any) => void;
  onClose?: () => void;
}
const PriceFilter: FC<Prices> = ({ onClose, handleCategorySelect }) => {
  const [showFilters, setShowFilters] = useState(true);
  const [focusedMinPrice, setFocusedMinPrice] = useState(true);
  const [focusedMaxPrice, setFocusedMaxPrice] = useState(true);
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const [minPriceProduct, setMinPriceProduct] = useState("");
  const [maxPriceProduct, setMaxPriceProduct] = useState("");

  const handleClick = () => {
    setShowFilters(!showFilters);
  };
  const hanldeSubmit = () => {
    const filters = {
      categoryId: searchParams.get("categoryId")
        ? searchParams.get("categoryId")
        : undefined,
      subCategoryId: searchParams.get("subCategoryId")
        ? searchParams.get("subCategoryId")
        : undefined,
      segmentId: searchParams.get("segmentId")
        ? searchParams.get("segmentId")
        : undefined,
      brandId: searchParams.get("brandId")
        ? searchParams.get("brandId")
        : undefined,
      minPrice: minPriceProduct,
      maxPrice: maxPriceProduct,
    };
    onClose && onClose();
    handleCategorySelect(filters);
  };
  const handleSet = (numb: any) => {
    focusedMaxPrice;
    if (focusedMinPrice) {
      setMinPriceProduct(numb);
      setFocusedMinPrice(false);
      setFocusedMaxPrice(true);
    } else {
      setMaxPriceProduct(numb);
      setFocusedMinPrice(true);
      setFocusedMaxPrice(false);
    }
  };
  return (
    <>
      <Stack sx={{ cursor: "pointer" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          px={1}
          onClick={() => handleClick()}
        >
          <Typography color="#2E2F38">{t("auction.price")}</Typography>
          {!showFilters ? (
            <ArrowDropDownIcon sx={{ width: "20px", color: "#2E2F38" }} />
          ) : (
            <ArrowDropUpIcon sx={{ width: "20px", color: "#2E2F38" }} />
          )}
        </Stack>
        <Divider color="#2E2F38" />
      </Stack>
      {showFilters && (
        <>
          <Stack direction="row" alignItems="center" spacing={1.25}>
            <input
              type="number"
              style={{
                width: "83px",
                height: "25px",
                borderRadius: "10px",
                border: "1px solid #2E2F38",
                outline: "none",
                padding: "15px 12px",
              }}
              value={minPriceProduct}
              onChange={(e: any) => setMinPriceProduct(e.target.value)}
              onFocus={() => setFocusedMinPrice(true)}
            />

            <Typography>-</Typography>

            <input
              type="number"
              style={{
                width: "83px",
                height: "25px",
                borderRadius: "10px",
                border: "1px solid #2E2F38",
                outline: "none",
                padding: "15px 12px",
              }}
              value={maxPriceProduct}
              onChange={(e: any) => setMaxPriceProduct(e.target.value)}
              onFocus={() => setFocusedMaxPrice(true)}
            />

            <IconButton
              sx={{
                background: "#929292",
                borderRadius: "4px",
                width: "24px",
                height: "24px",
                color: "#fff",
                padding: "15px",
                "&:hover": { background: "#929292" },
              }}
              onClick={hanldeSubmit}
            >
              <Search />
            </IconButton>

            {(minPriceProduct || maxPriceProduct) && (
              <IconButton
                sx={{
                  background: "#f44336",
                  borderRadius: "4px",
                  width: "24px",
                  height: "24px",
                  color: "#fff",
                  padding: "15px",
                  "&:hover": { background: "#d32f2f" },
                }}
                onClick={() => {
                  setMinPriceProduct("");
                  setMaxPriceProduct("");
                  setFocusedMinPrice(true);
                  setFocusedMaxPrice(true);
                }}
              >
                <Close />
              </IconButton>
            )}
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button
              variant="outlined"
              sx={defaultCostButton}
              onClick={() => handleSet(1000)}
            >
              1000
            </Button>
            <Button
              onClick={() => handleSet(2000)}
              variant="outlined"
              sx={defaultCostButton}
            >
              2000
            </Button>
            <Button
              onClick={() => handleSet(5000)}
              variant="outlined"
              sx={defaultCostButton}
            >
              5000
            </Button>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button
              onClick={() => handleSet(10000)}
              variant="outlined"
              sx={defaultCostButton}
            >
              10 000
            </Button>
            <Button
              onClick={() => handleSet(20000)}
              variant="outlined"
              sx={defaultCostButton}
            >
              20 000
            </Button>
          </Stack>
        </>
      )}
    </>
  );
};

export default PriceFilter;
