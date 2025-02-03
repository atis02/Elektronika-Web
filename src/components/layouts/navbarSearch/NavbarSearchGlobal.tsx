import { FC, useState, useRef, useEffect } from "react";
import { TextField, InputAdornment, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const NavbarSearchGlobal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchValue("");
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      style={{ width: "25%" }}
      ref={searchRef}
    >
      <TextField
        fullWidth
        placeholder="Search..."
        variant="outlined"
        size="small"
        value={searchValue}
        onChange={handleInputChange}
        sx={{
          "& .MuiInputBase-input": {
            color: "white", // Changes input text color to white
          },
          "& .MuiInputBase-root": {
            color: "white",
            "&::before": {
              borderColor: "rgba(255, 255, 255, 0.23)", // Default border color
            },
            "&:hover::before": {
              borderColor: "rgba(255, 255, 255, 0.87)", // Border color on hover
            },
            "&.Mui-focused::before": {
              borderColor: "rgba(255, 255, 255, 0.87)", // Border color when focused
            },
          },
          "& .MuiInputLabel-root": {
            color: "white", // Placeholder color when not focused
            "&.Mui-focused": {
              color: "white", // Placeholder color when focused
            },
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255, 255, 255, 0.23)", // Default outline border color
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255, 255, 255, 0.87)", // Outline border color on hover
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255, 255, 255, 0.87)", // Outline border color when focused
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <img src="/navbarIcons/search.svg" alt="search" />
            </InputAdornment>
          ),
          endAdornment: searchValue && (
            <InputAdornment position="end">
              <CloseIcon
                sx={{ cursor: "pointer", color: "white" }}
                onClick={() => {
                  setSearchValue("");
                  onClose();
                }}
                fontSize="small"
              />
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
};

export default NavbarSearchGlobal;
