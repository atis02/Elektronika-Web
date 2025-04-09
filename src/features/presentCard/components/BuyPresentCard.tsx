import { ChangeEvent, FC, useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../../../api/instance";
import { addStoreDiscountGoodButton } from "../../home/components/discountedGoods/styles/discoutGoodsStyle";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BuyPresentCard: FC = () => {
  const { t } = useTranslation();
  const [fromWhom, setFromWhom] = useState<string>("");
  const [whom, setWhom] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("+993");
  const [totalPrice, setTotalPrice] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const navigate = useNavigate();
  // Check if a field is empty.
  const isFieldEmpty = (value: string | number) =>
    typeof value === "number" ? value === 0 : !value.trim();

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Оставляем только цифры

    if (!value.startsWith("993")) {
      value = "993"; // Если пользователь стер код страны, возвращаем
    }

    if (value.length > 11) {
      value = value.slice(0, 11); // Ограничиваем длину до 9 цифр (XX XXX-XXX)
    }

    const formattedValue = `+${value}`; // Добавляем "+"
    setPhoneNumber(formattedValue);
  };
  const handleSubmit = async () => {
    setIsSubmitted(true);
    // Validate required fields
    if (
      isFieldEmpty(whom) ||
      isFieldEmpty(fromWhom) ||
      isFieldEmpty(address) ||
      isFieldEmpty(phoneNumber) ||
      Number(totalPrice) < 500
    ) {
      toast.error("Maglumatlary giriz!");
      return;
    }

    const loggedUser = localStorage.getItem("ElectronicaUser");
    // if (loggedUser) {
    const isLoggedUser = loggedUser ? JSON.parse(loggedUser) : null;
    const body = {
      creatorId: isLoggedUser?.id,
      creatorName: fromWhom,
      receipient: whom,
      deliveryAddress: address,
      deliveryPhoneNumber: phoneNumber,
      totalPrice: totalPrice,
      description: desc,
    };
    // }
    try {
      await axios
        .post(`${BASE_URL}certificate/newCertificate`, body)
        .then((resp) => {
          if (resp.data.message == "Sertifikat döredildi!") {
            toast.success("Sertifikat üstünlikli döredildi!");
            navigate("/present-card");
          } else {
            toast.success("Ýalňyşlyk!");
          }
        });
    } catch (error) {
      toast.success("Ýalňyşlyk!");
      console.log(error);
    }
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
              {t("certifate.buyCertificate")}
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
            <Stack spacing={1}>
              <Typography>
                {t("certifate.whom")}{" "}
                <span style={{ color: "#C3000E" }}>*</span>
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={whom}
                onChange={(e) => setWhom(e.target.value)}
                error={isSubmitted && isFieldEmpty(whom)}
                helperText={
                  isSubmitted && isFieldEmpty(whom)
                    ? t("certifate.mustField")
                    : ""
                }
              />
            </Stack>
          </Grid>
        </Grid>
        <Grid container my={3}>
          <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
            <Stack spacing={1}>
              <Typography>
                {t("certifate.fromWhom")}{" "}
                <span style={{ color: "#C3000E" }}>*</span>
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={fromWhom}
                onChange={(e) => setFromWhom(e.target.value)}
                error={isSubmitted && isFieldEmpty(fromWhom)}
                helperText={
                  isSubmitted && isFieldEmpty(fromWhom)
                    ? t("certifate.mustField")
                    : ""
                }
              />
            </Stack>
          </Grid>
        </Grid>
        <Grid container my={3}>
          <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
            <Stack spacing={1}>
              <Typography>
                {t("certifate.address")}{" "}
                <span style={{ color: "#C3000E" }}>*</span>
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                error={isSubmitted && isFieldEmpty(address)}
                helperText={
                  isSubmitted && isFieldEmpty(address)
                    ? t("certifate.mustField")
                    : ""
                }
              />
            </Stack>
          </Grid>
        </Grid>
        <Grid container my={3}>
          <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
            <Stack spacing={1}>
              <Typography>
                {t("certifate.phoneNumber")}{" "}
                <span style={{ color: "#C3000E" }}>*</span>
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={phoneNumber}
                onChange={handlePhoneChange}
                error={
                  isSubmitted &&
                  (isFieldEmpty(phoneNumber) || phoneNumber === "+993")
                }
                helperText={
                  isSubmitted &&
                  (phoneNumber === "+993"
                    ? t("certifate.phoneError")
                    : isFieldEmpty(phoneNumber)
                    ? t("certifate.mustField")
                    : "")
                }
              />
            </Stack>
          </Grid>
        </Grid>
        <Grid container my={3}>
          <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
            <Stack spacing={1}>
              <Typography>
                {t("certifate.totalPrice")}{" "}
                <span style={{ color: "#C3000E" }}>*</span>
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <TextField
                  variant="outlined"
                  placeholder="0"
                  type="number"
                  value={totalPrice}
                  onChange={(e) => setTotalPrice(e.target.value)}
                  error={isSubmitted && Number(totalPrice) < 500}
                  helperText={
                    isSubmitted && Number(totalPrice) < 500
                      ? t("certifate.mustValue")
                      : t("certifate.mustValue")
                  }
                  sx={{ width: "265px" }}
                />
                {/* <Typography>TMT</Typography> */}
              </Stack>
              {/* <Typography color="#929292">
                Значения должно быть от 500.0 ТМТ
              </Typography> */}
            </Stack>
          </Grid>
        </Grid>
        <Grid container my={3}>
          <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
            <Stack spacing={1}>
              <Typography>{t("certifate.certificateText")} </Typography>
              <TextField
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                placeholder="Tekst..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <Button
                variant="contained"
                fullWidth
                startIcon={<LocalGroceryStoreOutlinedIcon />}
                sx={{ ...addStoreDiscountGoodButton, width: "153px", mt: 2 }}
                onClick={handleSubmit}
              >
                {t("certifate.buy")}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default BuyPresentCard;
