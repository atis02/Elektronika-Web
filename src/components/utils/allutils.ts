import i18next from "i18next";

export const formatNumber = (num: number): string => {
  return num.toLocaleString("ru-RU");
};
export const getSuccessMessage = () => i18next.t("home.success");
