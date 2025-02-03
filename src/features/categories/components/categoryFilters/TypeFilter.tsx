import { FC, useState } from "react";
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

const TypeFilter: FC = () => {
  const [showFilters, setShowFilters] = useState(true);

  const handleClick = () => {
    setShowFilters(!showFilters);
  };

  return (
    <>
      <>
        <Stack sx={{ cursor: "pointer" }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            px={1}
            onClick={() => handleClick()}
          >
            <Typography color="#2E2F38">Görnüşi</Typography>
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
              >
                <FormControlLabel
                  value="adaty"
                  control={<Radio />}
                  label="Adaty"
                />
                <FormControlLabel value="dar" control={<Radio />} label="Dar" />
              </RadioGroup>
            </Stack>
          </>
        )}
      </>
    </>
  );
};

export default TypeFilter;
