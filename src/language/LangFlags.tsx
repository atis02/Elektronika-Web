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
        backgroundColor: "transparent",
      }}
    >
      <MenuItem value="tm">
        <img
          src="./flags/tm.png"
          alt="Turkmen"
          style={{ width: 30, height: 20 }}
        />
      </MenuItem>
      <MenuItem value="ru">
        <img
          src="./flags/ru.png"
          alt="Russian"
          style={{ width: 30, height: 20 }}
        />
      </MenuItem>
      <MenuItem value="en">
        <img
          src="./flags/en.png"
          alt="English"
          style={{ width: 30, height: 20 }}
        />
      </MenuItem>
    </Select>
  );
};

export default LangFlags;
