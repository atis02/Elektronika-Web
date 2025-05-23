import {
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ProductViewModel from "../../../products/presentation/ProductViewModel";
import { useTranslation } from "react-i18next";
import { FC, useState } from "react";

interface BrandFiltersProps {
  value: { [key: string]: string | null }; // pass full object
  setValue: (val: { [key: string]: string | null }) => void;
  onCategorySelect: (filters: { valueTm?: number | string }) => void;
}

const TypeFilter: FC<BrandFiltersProps> = ({
  value,
  setValue,
  onCategorySelect,
}) => {
  const { i18n } = useTranslation();
  const [showFilters, setShowFilters] = useState<{ [keyTm: string]: boolean }>(
    {}
  );

  const getTitle = (tm: string, ru: string, en: string) => {
    const lang = i18n.language;
    if (lang === "tm") return tm;
    if (lang === "ru") return ru;
    return en;
  };

  const handleClick = (keyTm: string) => {
    setShowFilters((prev) => ({
      ...prev,
      [keyTm]: !prev[keyTm],
    }));
  };

  return (
    <>
      {ProductViewModel.properties?.map((item) =>
        item.propertyTemplates?.map((elem, idx) => {
          const displayKey = getTitle(elem.nameTm, elem.nameRu, elem.nameEn);

          const values = elem.propertyValue?.map((item) =>
            i18n.language === "tm"
              ? item.valueTm
              : i18n.language === "ru"
              ? item.valueRu
              : item.valueEn
          );

          return (
            <div key={`${item}+${idx}`}>
              <Stack sx={{ cursor: "pointer" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  px={1}
                  onClick={() => handleClick(elem.nameTm)}
                >
                  <Typography color="#2E2F38">{displayKey}</Typography>
                  {showFilters[elem.nameTm] ? (
                    <ArrowDropUpIcon sx={{ width: "20px", color: "#2E2F38" }} />
                  ) : (
                    <ArrowDropDownIcon
                      sx={{ width: "20px", color: "#2E2F38" }}
                    />
                  )}
                </Stack>
                <Divider color="#2E2F38" />
              </Stack>

              {showFilters[elem.nameTm] && (
                <RadioGroup
                  aria-labelledby="radio-group"
                  name={`${elem.nameTm}-radio-group`}
                  value={value[elem.nameTm] || "all"} // inside RadioGroup
                  onChange={(e) => {
                    const newVal = { ...value, [elem.nameTm]: e.target.value };
                    setValue(newVal);
                    onCategorySelect({ valueTm: e.target.value });
                  }}
                >
                  {values?.map((value: string, i: number) => (
                    <FormControlLabel
                      key={i}
                      value={value}
                      control={<Radio />}
                      label={value}
                    />
                  ))}
                </RadioGroup>
              )}
            </div>
          );
        })
      )}
    </>
  );
};

export default TypeFilter;
