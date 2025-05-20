import { FC } from "react";
import { Box, Checkbox, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";

interface DeliveryTypeProps {
  selectedOption: string; // Adjust this type based on your actual data type
  showError?: boolean; // Optional if not always required
  handleOptionChange: (cardId: string) => void;
}
const PaymentOptionSelector: FC<DeliveryTypeProps> = ({
  showError,
  handleOptionChange,
  selectedOption,
}) => {
  const { t } = useTranslation();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <>
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: 600,
          mt: 2,
        }}
      >
        {t("basket.paymentType")}
      </Typography>
      <Grid container spacing={2} my={1} ref={ref}>
        {[t("basket.nagt"), t("basket.card"), t("basket.altyn")].map(
          (option, index) => (
            <Grid key={option} size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                transition={{ duration: 0.5 + index * 0.2, ease: "easeOut" }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "35px",
                    padding: 1,
                    borderRadius: "2px",
                    border: `1px solid ${showError ? "red" : "#2E2F38"}`,
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    handleOptionChange(
                      index !== 2 ? option : "Online payment (Altyn Asyr)"
                    )
                  }
                >
                  <Checkbox
                    checked={
                      selectedOption ===
                      (index !== 2 ? option : "Online payment (Altyn Asyr)")
                    }
                    sx={{
                      transform: "scale(0.8)",
                      padding: "0px",
                    }}
                  />
                  <Typography sx={{ fontSize: "14px" }}>{option}</Typography>
                </Box>
              </motion.div>
            </Grid>
          )
        )}
      </Grid>

      {/* Submit button to trigger validation */}
      {/* <Box mt={2}>
        <button onClick={handleSubmit} style={{ padding: "8px 16px" }}>
          Submit
        </button>
      </Box> */}
    </>
  );
};

export default PaymentOptionSelector;
