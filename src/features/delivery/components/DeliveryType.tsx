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
  const { t } = useTranslation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const cardStyles = () => ({
    height: 165,
    width: "100%",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease",
    border:
      hasError && selectedCard === 0 ? "2px solid rgb(255, 40, 40)" : "none",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    },
  });

  const deliveryOptions = [
    {
      id: 1,
      title: t("order.express"),
      desc: t("order.expressDesc"),
      icon: "/icons/express.svg",
      color: "#0470C4",
      padding: 2,
      transitionDuration: 1,
    },
    {
      id: 2,
      title: t("order.turkmenPochta"),
      desc: t("order.turkmenPochtaDesc"),
      icon: "/icons/mail.svg",
      color: "#86BF93",
      padding: 2,
      transitionDuration: 1.2,
    },
    {
      id: 3,
      title: t("order.curer"),
      desc: t("order.curerDesc"),
      icon: "/icons/courier.svg",
      color: "#D0A35C",
      padding: 2,
      transitionDuration: 1.5,
    },
    {
      id: 4,
      title: t("order.selfDeliver"),
      desc: t("order.selfDeliverDesc"),
      icon: "/icons/walk.svg",
      color: "#0470C4",
      padding: 2,
      transitionDuration: 1.8,
    },
  ];

  return (
    <>
      <Typography sx={{ fontSize: "16px", fontWeight: 600, mt: 5 }}>
        {t("order.deliveryTypeTitle")}
      </Typography>
      <Grid container spacing={2} my={2}>
        {deliveryOptions.map((option) => (
          <Grid key={option.id} size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
              transition={{ duration: option.transitionDuration }}
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
                    {option.title}
                  </Typography>
                  <Checkbox
                    checked={selectedCard === option.id}
                    onChange={() => handleCheckboxChange(option.id)}
                    sx={{ transform: "scale(0.8)", padding: "0px" }}
                  />
                </Box>
                <Stack direction="row" p={option.padding} spacing={2}>
                  <img src={option.icon} alt="express type" />
                  <Stack spacing={1}>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: option.color,
                        fontWeight: 600,
                      }}
                    >
                      {option.title}
                    </Typography>
                    <Typography sx={{ fontSize: "14px" }}>
                      {option.desc}
                    </Typography>
                  </Stack>
                </Stack>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default DeliveryType;
