export const getTitle = (nameTm, nameRu, nameEn) => {
  const currentLanguage = i18n.language; // Get the current language (e.g., "en", "ru", "tm")
  switch (currentLanguage) {
    case "ru":
      return nameRu;
    case "tm":
      return nameTm;
    default:
      return nameEn; // Default to English
  }
};
