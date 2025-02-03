import { FC } from "react";
import Grid from "@mui/material/Grid2";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Define an array of card data
const cardData = [
  {
    id: 1,
    image: "./images/present1.png",
    description: `Как часто вы сталкиваетесь с проблемой выбора подарка для близкого человека? 
      Если с подарками для самых близких людей, вопросов все-таки возникает меньше (вы знаете их привычки, уже успели понять что им нравится, а что нет), 
      то с людьми не из самого близкого круга, все намного сложнее.`,
  },
  {
    id: 2,
    image: "./images/present2.png",
    description: `Редко когда кто-то хочет, чтобы его подарок лежал и пылился в шкафу, пока его не вытросят во время генеральной уборки или был передарен кому-то за ненадобностью.`,
  },
  {
    id: 3,
    image: "./images/present1.png",
    description: `Подарок - это не только знак внимания. Это еще и постаянное напоминание о том, кто его сделал.`,
  },
  {
    id: 4,
    image: "./images/present2.png",
    description: `Подарите близкому человеку подарочный сертификать из нашего магазина и будьте уверены, что он сам выберет себе подарок по душе и будет помнить ваш знак внимания!`,
  },
];

const PresentCardBox: FC = () => {
  const navigate = useNavigate();

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
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
          Купить подарочный сертификать
        </Button>
      </Stack>
    </>
  );
};

export default PresentCardBox;
