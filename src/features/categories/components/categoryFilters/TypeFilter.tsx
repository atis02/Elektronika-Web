import { ChangeEvent, FC, useState } from "react";
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
import { toJS } from "mobx";

interface BrandFiltersProps {
  onCategorySelect: (filters: string | null) => void;
}
const TypeFilter: FC<BrandFiltersProps> = ({ onCategorySelect }) => {
  const [showFilters, setShowFilters] = useState<{ [keyTm: string]: boolean }>(
    {}
  );
  const [selectedProperties, setSelectedProperties] = useState<{
    [keyTm: string]: string | null;
  }>({});
  const handleClick = (keyTm: string) => {
    setShowFilters((prevShowFilters) => ({
      ...prevShowFilters,
      [keyTm]: !prevShowFilters[keyTm],
    }));
  };
  const handlePropertyChange = (
    e: ChangeEvent<HTMLInputElement>,
    keyTm: string
  ) => {
    const newValue = e.target.value;
    setSelectedProperties((prev) => ({ ...prev, [keyTm]: newValue }));
    onCategorySelect(newValue);
  };
  console.log(toJS(ProductViewModel.properties));

  return (
    <>
      {ProductViewModel.properties?.map((elem) => (
        <>
          <Stack sx={{ cursor: "pointer" }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              px={1}
              onClick={() => handleClick(elem.keyTm)}
            >
              <Typography color="#2E2F38">{elem.keyTm}</Typography>
              {!showFilters[elem.keyTm] ? (
                <ArrowDropDownIcon sx={{ width: "20px", color: "#2E2F38" }} />
              ) : (
                <ArrowDropUpIcon sx={{ width: "20px", color: "#2E2F38" }} />
              )}
            </Stack>
            <Divider color="#2E2F38" />
          </Stack>
          {showFilters[elem.keyTm] && (
            // <>
            //   {elem.values?.map((valueTm) => (
            //     <Stack direction="row" alignItems="center" spacing={2}>
            //       <RadioGroup
            //         aria-labelledby="demo-radio-buttons-group-label"
            //         name={`${elem.keyTm}-radio-group`}
            //         value={selectedProperties[elem.keyTm]}
            //         onChange={(e) => handlePropertyChange(e, elem.keyTm)}
            //       >
            //         <FormControlLabel
            //           value={valueTm}
            //           control={<Radio />}
            //           label={valueTm}
            //         />
            //       </RadioGroup>
            //     </Stack>
            //   ))}
            // </>
            <RadioGroup
              aria-labelledby="radio-group"
              name={`${elem.keyTm}-radio-group`}
              value={selectedProperties[elem.keyTm] || ""}
              onChange={(e) => handlePropertyChange(e, elem.keyTm)}
            >
              {elem.valueTm?.map((value: any) => (
                <FormControlLabel
                  key={value}
                  value={value}
                  control={<Radio />}
                  label={value}
                />
              ))}
            </RadioGroup>
          )}
        </>
      ))}
    </>
  );
};

export default TypeFilter;
