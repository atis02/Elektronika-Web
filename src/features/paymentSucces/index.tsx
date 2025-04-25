import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import { useSearchParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import axios from "axios";
import { BASE_URL } from "../../api/instance";
import BasketViewModel from "../../store/basket/BasketViewModel";
interface Data {
  errorMessage: string;
  amount: number;
  orderStatus: number;
}
const PaymentSucces: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<Data>();
  const [searchParams] = useSearchParams();

  // Get the value of the 'orderId' parameter
  const orderId = searchParams.get("orderId");
  const orderIdWeb = searchParams.get("WebOrderId");

  const getStatusPayment = async () => {
    try {
      setIsLoading(true);

      const body = {
        orderId: orderId,
        orderIdWeb: orderIdWeb,
      };
      await axios.post(BASE_URL + `order/paymentStasus`, body).then((res) => {
        setIsSuccess(res.data);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (orderId !== null && orderId !== undefined && orderId !== "") {
      getStatusPayment();
    }
  }, [orderId]);
  useEffect(() => {
    if (isSuccess?.errorMessage === "Успешно") {
      BasketViewModel.clearBasket();
    }
  }, [isSuccess]);

  return (
    <Box>
      <Stack minHeight="60vh" alignItems="center" justifyContent="center">
        {isLoading ? (
          <CircularProgress />
        ) : isSuccess?.errorMessage === "Успешно" &&
          isSuccess?.orderStatus === 2 ? (
          <Stack alignItems="center" justifyContent="center">
            <MonetizationOnIcon
              sx={{ width: 50, height: 50, color: "green", mb: -3 }}
            />
            <CreditScoreIcon sx={{ width: 80, height: 80, color: "#404040" }} />
            <Typography textAlign="center">
              Спасибо за покупку! С вами свяжутся в ближайщее время.
            </Typography>
          </Stack>
        ) : isSuccess?.errorMessage === "Платеж отклонен" &&
          isSuccess?.orderStatus === 6 ? (
          <Stack alignItems="center" justifyContent="center">
            <MoneyOffIcon sx={{ width: 80, height: 80, color: "#404040" }} />
            <Typography textAlign="center" width="53%">
              Извините ваш платеж отклонен банком. Просим перепроверить данные и
              средства карты
            </Typography>
          </Stack>
        ) : (
          <Stack
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            <CloseIcon
              sx={{
                width: 80,
                height: 80,
                color: "#B71C1C",
                position: "absolute",
                top: 0,
              }}
            />
            <CreditCardIcon sx={{ width: 80, height: 80, color: "#404040" }} />
            <Typography textAlign="center" width="83%">
              Данные о платеже отсутствуют!
            </Typography>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default PaymentSucces;
