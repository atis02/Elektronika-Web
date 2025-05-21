import { FC, useState, useEffect } from "react";
import { Select, MenuItem } from "@mui/material";
import i18n from "i18next";

const LangFlags: FC = () => {
  const [language, setLanguage] = useState<string>(
    localStorage.getItem("selectedLanguage") || "en"
  );

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem("selectedLanguage", language);
  }, [language]);

  const handleChange = (event: any) => {
    setLanguage(event.target.value);
  };

  return (
    <Select
      value={language}
      onChange={handleChange}
      displayEmpty
      inputProps={{ "aria-label": "Language Selector" }}
      sx={{
        border: "none",
        backgroundColor: "transparent",
        color: "#fff",
        p: 0,
        minHeight: 0,
        ".MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        ".MuiSelect-select": {
          p: 0,
          mr: -2,
          minHeight: 0,
        },
        svg: {
          mr: -2,
          color: "#fff",
        },
      }}
    >
      <MenuItem value="tm">TM</MenuItem>
      <MenuItem value="ru">RU</MenuItem>
      <MenuItem value="en">EN</MenuItem>
    </Select>
  );
};

export default LangFlags;
