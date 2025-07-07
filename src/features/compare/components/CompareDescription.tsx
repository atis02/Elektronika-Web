import { FC } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import { useAppSelector } from "../../../components/redux/customHook";
import MultiLangTypography from "../../../components/utils/MultiLangTypography";
import { firstRowBox } from "../styles/compareDescription";
import BasketViewModel from "../../../store/basket/BasketViewModel";
import { useTranslation } from "react-i18next";
import { formatNumber } from "../../../components/utils/allutils";

const CompareDescription: FC = () => {
  const compareProducts = useAppSelector((state) => state.compare.products);
  const { t, i18n } = useTranslation();
  const getTitles = (
    nameTm: string | undefined | null,
    nameRu: string | undefined | null,
    nameEn: string | undefined | null
  ) => {
    const currentLanguage = i18n.language;

    switch (currentLanguage) {
      case "ru":
        return nameRu || nameEn || nameTm || ""; // Fallback to other languages or empty string
      case "tm":
        return nameTm || nameEn || nameRu || "";
      default:
        return nameEn || nameRu || nameTm || "";
    }
  };

  return (
    <Stack direction="row">
      {compareProducts.length ? (
        compareProducts.map((item) => (
          <Box key={item.id} width="100%">
            <Table sx={{ borderCollapse: "collapse", width: "100%" }}>
              <TableBody>
                <TableRow sx={{ height: "80px" }}>
                  <TableCell
                    sx={{
                      border: "1px solid #ddd",
                      minHeight: "80px",
                      maxHeight: "500px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      wordWrap: "break-word",
                      overflowY: "auto",
                      padding: "8px",
                      fontFamily: "Open Sans",
                    }}
                  >
                    <MultiLangTypography
                      title_ru={item.nameRu || "-"}
                      title_en={item.nameEn || "-"}
                      title_tm={item.nameTm || "-"}
                    />
                  </TableCell>
                </TableRow>
                <TableRow sx={{ height: "80px" }}>
                  <TableCell
                    align="justify"
                    sx={{
                      border: "1px solid #ddd",
                      minHeight: "80px",
                      maxHeight: "500px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "start",
                      wordWrap: "break-word",
                      overflowY: "auto",
                      padding: "8px",
                      gap: 1,
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      {item.discount_priceTMT !== 0 && (
                        <Typography
                          color="#929292"
                          fontSize={12}
                          sx={{
                            textDecoration: "line-through",
                          }}
                        >
                          {item.sellPrice}
                        </Typography>
                      )}
                      <Typography
                        color="#C3000E"
                        fontSize={16}
                        fontWeight={600}
                      >
                        {formatNumber(item.sellPrice - item.discount_priceTMT)}{" "}
                        TMT
                      </Typography>
                    </Stack>
                    <Button
                      sx={{
                        borderRadius: "30px",
                        bgcolor: "#C3000E",
                        color: "#fff",
                        height: 24,
                        fontSize: 12,
                        textTransform: "revert",
                      }}
                      onClick={() => BasketViewModel.addToBasket(item)}
                    >
                      {t("home.addToCart")}
                    </Button>
                  </TableCell>
                </TableRow>
                {/* Second row with description */}
                {item.descriptionTm !== "" && (
                  <TableRow sx={{ height: "120px" }}>
                    <TableCell
                      align="justify"
                      sx={{
                        border: "1px solid #ddd",
                        // display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "start",
                        wordWrap: "break-word",
                        minHeight: "170px",
                        maxHeight: "500px",
                        overflowY: "auto",
                      }}
                    >
                      <Typography
                        // fontFamily="Open Sans"
                        whiteSpace="pre-wrap"
                        textTransform="capitalize"
                        fontSize={14}
                        component="div"
                        fontWeight={600}
                      >
                        {t("compare.desc")}:
                      </Typography>
                      <MultiLangTypography
                        title_en={item.descriptionEn}
                        title_ru={item.descriptionRu}
                        title_tm={item.descriptionTm}
                      />
                    </TableCell>
                  </TableRow>
                )}
                {Array.isArray(item.properties) &&
                  item.properties.length > 0 &&
                  item.properties.map((elem) => (
                    <TableRow key={elem.id} sx={{ height: "70px" }}>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid #ddd",
                          display: "flex",
                          alignItems: "center",
                          wordWrap: "break-word",
                          minHeight: "70px",
                          maxHeight: "500px",
                          overflowY: "auto",
                          gap: 1,
                          flexWrap: "wrap",
                          p:0
                        }}
                      >
                        {/* <Typography
                          whiteSpace="pre-wrap"
                          textTransform="capitalize"
                          fontSize={15}
                          component="div"
                          fontWeight={600}
                          fontStyle="italic"
                        >
                          {elem.key}:
                        </Typography> */}
                        <Box
                          dangerouslySetInnerHTML={{
                            __html: getTitles(
                              elem.valueTm,
                              elem.valueRu,
                              elem.valueEn
                            ),
                          }}
                          sx={{
                            fontWeight: 500,
                            width: "100%",
                            wordBreak: "break-word",
                            overflowWrap: "break-word",
                            whiteSpace: "normal",

                            // Чтобы таблицы не выходили за границы
                            "& table": {
                              width: "100%",
                              borderCollapse: "collapse",
                            },
                            "& td": {
                              border: "1px solid #ddd",
                              padding: "4px",
                              wordBreak: "break-word",
                            },
                            "& div": {
                              display: "block",
                            },
                            "& br": {
                              display: "block",
                            },
                          }}
                        />

                        {/* <MultiLangTypography
                          title_en={elem.value}
                          title_ru={elem.value}
                          title_tm={elem.value}
                        /> */}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>
        ))
      ) : (
        <>
          <Box sx={firstRowBox}></Box>
        </>
      )}
    </Stack>
  );
};

export default CompareDescription;
