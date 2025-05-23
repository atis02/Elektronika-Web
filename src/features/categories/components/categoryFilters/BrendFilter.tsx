import { FC, useEffect, useState } from "react";
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
import axios from "axios";
import { BASE_URL } from "../../../../api/instance";
import { useTranslation } from "react-i18next";

interface BrandFiltersProps {
  value: string | null;
  setValue: (val: string | null) => void;
  onCategorySelect: (filters: string | null) => void;
}

interface Brand {
  id: string;
  nameTm: string;
}

const BrendFilter: FC<BrandFiltersProps> = ({
  value,
  setValue,
  onCategorySelect,
}) => {
  const [showFilters, setShowFilters] = useState(true);
  const handleClick = () => {
    setShowFilters(!showFilters);
  };
  const [brands, setBrands] = useState<Brand[]>([]);
  const { t } = useTranslation();
  useEffect(() => {
    const getBrands = async () => {
      try {
        const resp = await axios.get(`${BASE_URL}brand/all`);
        const data = resp.data.brands;
        const existedBrandsInPage = () => {
          const filteredBrands: Brand[] = [];
          for (const element of ProductViewModel.uniqueBrands) {
            const filteredItems = data.filter(
              (item: any) => item.id === element.id
            );
            filteredBrands.push(...filteredItems);
          }
          return filteredBrands;
        };
        const exist = existedBrandsInPage();
        setBrands(exist);
      } catch (error) {
        console.log(error);
      }
    };
    getBrands();
  }, []);

  const handleChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onCategorySelect(newValue);
  };

  return (
    <>
      {brands.length ? (
        <>
          <Stack sx={{ cursor: "pointer" }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              px={1}
              onClick={() => handleClick()}
            >
              <Typography color="#2E2F38">{t("home.brand")}</Typography>
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
              <Stack direction="row" alignItems="center" spacing={2}>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  value={value}
                  onChange={handleChnage}
                >
                  {brands?.map((elem, index) => (
                    <FormControlLabel
                      key={index}
                      value={elem.id.toString()}
                      control={<Radio />}
                      label={elem.nameTm}
                    />
                  ))}
                </RadioGroup>
              </Stack>
            </>
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default BrendFilter;
