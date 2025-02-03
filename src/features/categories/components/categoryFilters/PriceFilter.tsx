import { FC, useState } from "react";
import { Button, Divider, IconButton, Stack, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Search } from "@mui/icons-material";
import { defaultCostButton } from "../../styles/categoryStyle";

const PriceFilter: FC = () => {
  const [showFilters, setShowFilters] = useState(true);

  const handleClick = () => {
    setShowFilters(!showFilters);
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
          <Typography color="#2E2F38">Baha</Typography>
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
            >
              <Search />
            </IconButton>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button variant="outlined" sx={defaultCostButton}>
              1000
            </Button>
            <Button variant="outlined" sx={defaultCostButton}>
              2000
            </Button>
            <Button variant="outlined" sx={defaultCostButton}>
              5000
            </Button>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button variant="outlined" sx={defaultCostButton}>
              10 000
            </Button>
            <Button variant="outlined" sx={defaultCostButton}>
              20 000
            </Button>
          </Stack>
        </>
      )}
    </>
  );
};

export default PriceFilter;
