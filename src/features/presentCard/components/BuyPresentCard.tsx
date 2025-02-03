import { FC, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddIcon from "@mui/icons-material/Add";
import { addStoreDiscountGoodButton } from "../../home/components/discountedGoods/styles/discoutGoodsStyle";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";

const BuyPresentCard: FC = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleChange = (option: string) => {
    setSelected(selected === option ? null : option);
  };
  return (
    <>
      <Container>
        <Box my={5}>
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <Typography
              sx={{
                position: "relative",
                zIndex: 1,
                fontSize: "20px",
                fontWeight: 600,
              }}
            >
              Купить подарочный сертификать
            </Typography>
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: "25px",
                right: "0",
                height: "2px",
                backgroundColor: "#C3000E",
                width: "110%",
                transform: "translateX(-10%)",
              }}
            />
          </Box>
        </Box>
        <Grid container my={3}>
          <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
            <Stack>
              <Typography>
                Кому <span style={{ color: "#C3000E" }}>*</span>
              </Typography>
              <input
                type="text"
                style={{
                  width: "100%",
                  height: "50px",
                  borderRadius: "4px",
                  border: "1px solid #929292",
                  outline: "none",
                  paddingLeft: "15px",
                }}
              />
            </Stack>
          </Grid>
        </Grid>
        <Grid container my={3}>
          <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
            <Stack>
              <Typography>
                От кого <span style={{ color: "#C3000E" }}>*</span>
              </Typography>
              <input
                type="text"
                style={{
                  width: "100%",
                  height: "50px",
                  borderRadius: "4px",
                  border: "1px solid #929292",
                  outline: "none",
                  paddingLeft: "15px",
                }}
              />
            </Stack>
          </Grid>
        </Grid>
        <Grid container my={3}>
          <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
            <Stack>
              <Typography>
                Сумма <span style={{ color: "#C3000E" }}>*</span>
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <input
                  type="text"
                  style={{
                    width: "135px",
                    height: "50px",
                    borderRadius: "4px",
                    border: "1px solid #929292",
                    outline: "none",
                    paddingLeft: "15px",
                  }}
                />
                <Typography>TMT</Typography>
              </Stack>
              <Typography color="#929292">
                Значения должно быть от 500.0 ТМТ
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <Grid container my={3}>
          <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
            <Stack>
              <Typography>
                Сообщение (данный текст отобразиться на сертификате получателя)
              </Typography>
              <textarea
                style={{
                  width: "100%",
                  height: "100px",
                  borderRadius: "4px",
                  border: "1px solid #929292",
                  outline: "none",
                  paddingLeft: "15px",
                }}
              />
              <Button
                sx={{
                  textTransform: "none",
                  background: "#E0E0E0",
                  color: "#000",
                  width: "294px",
                  height: "40px",
                  mt: 2,
                }}
                startIcon={<AddIcon />}
              >
                Добавить товары в подарок
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <Grid container my={3}>
          <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2,
                height: "50px",
                width: "100%",
                border: "1px solid #929292",
                borderRadius: "4px",
              }}
            >
              <Typography>Как отправить?</Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Checkbox
                    checked={selected === "email"}
                    onChange={() => handleChange("email")}
                    sx={{
                      transform: "scale(0.8)",
                      padding: "0px",
                      color: "red",
                      "&.Mui-checked": {
                        color: "red",
                      },
                    }}
                  />
                  <Typography>По электронной почте</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Checkbox
                    checked={selected === "mail"}
                    onChange={() => handleChange("mail")}
                    sx={{
                      transform: "scale(0.8)",
                      padding: "0px",
                    }}
                  />
                  <Typography>По почте</Typography>
                </Stack>
              </Stack>
            </Box>
          </Grid>
        </Grid>
        <Grid container my={3}>
          <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
            <Stack>
              <Typography>
                Email получателя<span style={{ color: "#C3000E" }}> *</span>
              </Typography>
              <input
                type="email"
                style={{
                  width: "100%",
                  height: "50px",
                  borderRadius: "4px",
                  border: "1px solid #929292",
                  outline: "none",
                  paddingLeft: "15px",
                }}
              />
              <Button
                variant="contained"
                fullWidth
                startIcon={<LocalGroceryStoreOutlinedIcon />}
                sx={{ ...addStoreDiscountGoodButton, width: "153px", mt: 2 }}
              >
                Sebede goş
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default BuyPresentCard;
