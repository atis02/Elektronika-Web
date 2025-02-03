import { Box, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "70vh",
        backgroundColor: "#f9f9f9",
        textAlign: "center",
        padding: 3,
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontSize: "4rem", fontWeight: "bold", color: "#555" }}
      >
        404
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: 2, color: "#777" }}>
        {t("pageDoesntExist")}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        sx={{ textTransform: "none", padding: "5px 10px", fontSize: "16px" }}
      >
        {t("main-page")}
      </Button>
    </Box>
  );
};

export default NotFoundPage;
