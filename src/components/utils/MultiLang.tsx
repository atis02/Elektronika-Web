import React from "react";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

interface MultiLangTypographyProps {
  title_en: string;
  title_ru: string;
  title_tm: string;
}

const MultiLang: React.FC<MultiLangTypographyProps> = ({
  title_en,
  title_ru,
  title_tm,
}) => {
  const { i18n } = useTranslation();

  // Determine the text based on the current language
  const getTitle = () => {
    const currentLanguage = i18n.language; // Get the current language (e.g., "en", "ru", "tm")
    switch (currentLanguage) {
      case "ru":
        return title_ru;
      case "tm":
        return title_tm;
      default:
        return title_en; // Default to English
    }
  };

  return (
    <Typography fontFamily="Open Sans" fontSize={12} component="div">
      {getTitle()}
    </Typography>
  );
};

export default MultiLang;
