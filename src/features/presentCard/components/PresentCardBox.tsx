import { FC } from "react";
import Grid from "@mui/material/Grid2";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Define an array of card data

const PresentCardBox: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const cardData = [
    {
      id: 1,
      image: "./images/present2.png",
      description: t("certifate.descOne"),
    },
    {
      id: 2,
      image: "./images/certificate2.png",
      description: t("certifate.descTwo"),
    },
    {
      id: 3,
      image: "./images/present1.png",
      description: t("certifate.descThree"),
    },
    {
      id: 4,
      image: "./images/certificate.png",
      description: t("certifate.descFour"),
    },
  ];
  return (
    <>
      <Grid container spacing={5}>
        {cardData.map((card) => (
          <Grid key={card.id} size={{ lg: 3, md: 4, sm: 6, xs: 6 }}>
            <Box>
              <Stack
                direction="row"
                height={{ lg: "230px", md: "230px", sm: "200px", xs: "100px" }}
                width="100%"
                justifyContent="center"
                alignItems="center"
              >
                <img
                  src={card.image}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  alt="present"
                />
              </Stack>
              <Typography
                sx={{
                  fontSize: { lg: "16px", md: "16px", sm: "15px", xs: "14px" },
                }}
                textAlign="justify"
                mt={2}
              >
                {card.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Stack direction="row" justifyContent="center" my={3}>
        <Button
          onClick={() => navigate("/buy-present-card")}
          variant="contained"
          sx={{
            background: "#e0e0e0",
            height: "48px",
            width: "400px",
            color: "#000",
          }}
        >
          {t("certifate.buyCertificate")}
        </Button>
      </Stack>
    </>
  );
};

export default PresentCardBox;
