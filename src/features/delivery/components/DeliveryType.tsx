import { FC } from "react";
import { Box, Checkbox, Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";

interface DeliveryTypeProps {
  selectedCard: number;
  hasError?: boolean;
  handleCheckboxChange: (cardId: number) => void;
}

const DeliveryType: FC<DeliveryTypeProps> = ({
  selectedCard,
  hasError,
  handleCheckboxChange,
}) => {
  const { t, i18n } = useTranslation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const cardStyles = () => ({
    width: "100%",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease",
    border:
      hasError && selectedCard === 0 ? "2px solid rgb(255, 40, 40)" : "none",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    },
  });

  return (
    <>
      <Typography sx={{ fontSize: "16px", fontWeight: 600, mt: 5 }}>
        {t("order.deliveryTypeTitle")}
      </Typography>
      <Grid container spacing={2} my={2}>
        {/* Sample delivery card */}
        <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
            transition={{ duration: 1 }}
          >
            <Paper elevation={4} sx={cardStyles}>
              <Box
                sx={{
                  background: "#E0E0E0",
                  width: "100%",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 2,
                }}
              >
                <Typography sx={{ fontSize: "14px" }}>
                  {t("order.express")}
                </Typography>
                <Checkbox
                  checked={selectedCard === 1}
                  onChange={() => handleCheckboxChange(1)}
                  sx={{ transform: "scale(0.8)", padding: "0px" }}
                />
              </Box>
              <Stack
                direction="row"
                p={i18n.language === "ru" || i18n.language === "en" ? 3.2 : 2}
                spacing={3}
              >
                <img src="/icons/express.svg" alt="express type" />
                <Stack spacing={1}>
                  <Typography
                    sx={{ fontSize: "14px", color: "#0470C4", fontWeight: 600 }}
                  >
                    {t("order.express")}
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>
                    {t("order.expressDesc")}
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          </motion.div>
        </Grid>
        {/* Card 2: Türkmen poçta */}
        <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
            transition={{ duration: 1.2 }}
          >
            <Paper elevation={4} sx={cardStyles}>
              <Box
                sx={{
                  background: "#E0E0E0",
                  width: "100%",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 2,
                }}
              >
                <Typography sx={{ fontSize: "14px" }}>
                  {t("order.turkmenPochta")}
                </Typography>
                <Checkbox
                  checked={selectedCard === 2}
                  onChange={() => handleCheckboxChange(2)}
                  sx={{
                    transform: "scale(0.8)", // Scale the size of the checkbox
                    padding: "0px", // Reduce padding around the checkbox
                  }}
                />
              </Box>
              <Stack direction="row" p={2} spacing={3}>
                <img src="/icons/mail.svg" alt="express type" />
                <Stack spacing={1}>
                  <Typography
                    sx={{ fontSize: "14px", color: "#86BF93", fontWeight: 600 }}
                  >
                    {t("order.turkmenPochta")}
                  </Typography>
                  <Typography sx={{ fontSize: "14px", width: "70%" }}>
                    {t("order.turkmenPochtaDesc")}
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          </motion.div>
        </Grid>

        {/* Card 3: Kurýer hyzmaty */}
        <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
            transition={{ duration: 1.5 }}
          >
            <Paper elevation={4} sx={cardStyles}>
              <Box
                sx={{
                  background: "#E0E0E0",
                  width: "100%",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 2,
                }}
              >
                <Typography sx={{ fontSize: "14px" }}>
                  {t("order.curer")}
                </Typography>
                <Checkbox
                  checked={selectedCard === 3}
                  onChange={() => handleCheckboxChange(3)}
                  sx={{
                    transform: "scale(0.8)", // Scale the size of the checkbox
                    padding: "0px", // Reduce padding around the checkbox
                  }}
                />
              </Box>
              <Stack direction="row" p={2} spacing={3}>
                <img src="/icons/courier.svg" alt="express type" />
                <Stack spacing={1}>
                  <Typography
                    sx={{ fontSize: "14px", color: "#D0A35C", fontWeight: 600 }}
                  >
                    {t("order.curer")}
                  </Typography>
                  <Typography sx={{ fontSize: "14px", width: "80%" }}>
                    {t("order.curerDesc")}
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          </motion.div>
        </Grid>

        {/* Card 4: Baryp almak */}
        <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
            transition={{ duration: 1.8 }}
          >
            <Paper elevation={4} sx={cardStyles}>
              <Box
                sx={{
                  background: "#E0E0E0",
                  width: "100%",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 2,
                }}
              >
                <Typography sx={{ fontSize: "14px" }}>
                  {t("order.selfDeliver")}
                </Typography>
                <Checkbox
                  checked={selectedCard === 4}
                  onChange={() => handleCheckboxChange(4)}
                  sx={{
                    transform: "scale(0.8)", // Scale the size of the checkbox
                    padding: "0px", // Reduce padding around the checkbox
                  }}
                />
              </Box>
              <Stack direction="row" p={2} spacing={2}>
                <img src="/icons/walk.svg" alt="express type" />
                <Stack spacing={1}>
                  <Typography
                    sx={{ fontSize: "14px", color: "#0470C4", fontWeight: 600 }}
                  >
                    {t("order.selfDeliver")}
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>
                    {t("order.selfDeliverDesc")}
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          </motion.div>
        </Grid>
        {/* Add other cards similarly */}
      </Grid>

      {/* Submit button */}
      {/* <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        {t("order.submit")}
      </Button> */}
    </>
  );
};

export default DeliveryType;
