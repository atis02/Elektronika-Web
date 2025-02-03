import React from "react";
import { Table, TableBody, TableCell, TableRow, Box } from "@mui/material";
import MultiLangTypography from "../../../components/utils/MultiLangTypography";
// import { Item } from "../../../components/redux/interface";

interface ExcelLikeTableProps {
  items: any[];
}
const ExcelLikeTable: React.FC<ExcelLikeTableProps> = ({ items }) => {
  return (
    <Box
      width="100%"
      sx={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid #ddd",
        borderRadius: "4px",
      }}
    >
      <Table sx={{ width: "100%", borderCollapse: "collapse" }}>
        <TableBody>
          {items.map((item) => (
            <React.Fragment key={item.id}>
              {/* First row with title */}
              <TableRow sx={{ display: "flex", alignItems: "stretch" }}>
                <TableCell
                  align="center"
                  sx={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    flex: 1, // Make it take equal space
                  }}
                >
                  <MultiLangTypography
                    title_en={item.title_en}
                    title_ru={item.title_ru}
                    title_tm={item.title_tm}
                  />
                </TableCell>
              </TableRow>

              {/* Second row with description */}
              <TableRow sx={{ display: "flex", alignItems: "stretch" }}>
                <TableCell
                  align="center"
                  sx={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    flex: 1, // Make it take equal space
                    wordWrap: "break-word",
                    whiteSpace: "normal",
                    verticalAlign: "top",
                  }}
                >
                  <MultiLangTypography
                    title_en={item.desc_en}
                    title_ru={item.desc_ru}
                    title_tm={item.desc_tm}
                  />
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ExcelLikeTable;
