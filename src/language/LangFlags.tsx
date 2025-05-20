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
        ".MuiOutlinedInput-notchedOutline": {
          border: "none",
        },

        color: "#fff",
        backgroundColor: "transparent",
        padding: 0,
        svg: {
          color: "#fff", // your desired color
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
