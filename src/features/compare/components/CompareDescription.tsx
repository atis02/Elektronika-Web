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

const CompareDescription: FC = () => {
  const compareProducts = useAppSelector((state) => state.compare.products);

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
                      title_ru={item.nameRu || "def"}
                      title_en={item.nameEn || "def"}
                      title_tm={item.nameTm || "def"}
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
                      <Typography
                        fontFamily="Open Sans"
                        color="#929292"
                        fontSize={12}
                      >
                        {item.sellPrice}
                      </Typography>
                      <Typography
                        fontFamily="Open Sans"
                        color="#C3000E"
                        fontSize={16}
                        fontWeight={600}
                      >
                        {item.sellPrice - item.discount_priceTMT} TMT
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
                      Sebede goş
                    </Button>
                  </TableCell>
                </TableRow>
                {/* Second row with description */}
                <TableRow sx={{ height: "120px" }}>
                  <TableCell
                    align="justify"
                    sx={{
                      border: "1px solid #ddd",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      wordWrap: "break-word",
                      minHeight: "170px",
                      maxHeight: "500px",
                      overflowY: "auto",
                    }}
                  >
                    <MultiLangTypography
                      title_en={item.descriptionEn || "def"}
                      title_ru={item.descriptionRu || "def"}
                      title_tm={item.descriptionTm || "def"}
                    />
                  </TableCell>
                </TableRow>
                {Array.isArray(item.properties) &&
                  item.properties.length > 0 &&
                  item.properties.map((elem) => (
                    <TableRow key={elem.id} sx={{ height: "70px" }}>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid #ddd",
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                          alignItems: "center",
                          wordWrap: "break-word",
                          minHeight: "70px",
                          maxHeight: "500px",
                          overflowY: "auto",
                          gap: 1,
                        }}
                      >
                        <MultiLangTypography
                          title_en={elem.title_en}
                          title_ru={elem.title_ru}
                          title_tm={elem.title_tm}
                        />

                        <MultiLangTypography
                          title_en={elem.value_en}
                          title_ru={elem.value_ru}
                          title_tm={elem.value_tm}
                        />
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
