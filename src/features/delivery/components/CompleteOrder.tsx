import { Box, Button, CircularProgress, Container, Stack } from "@mui/material";
import { ChangeEvent, FC, useEffect, useState } from "react";
import CompleteTitle from "./CompleteTitle";
import DeliveryAddress from "./DeliveryAddress";
import DeliveryType from "./DeliveryType";
import PaymentOptionSelector from "./PaymentOptionSelector";
import { auctionParticipateButton } from "../../auction/styles/auctionStyles";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { BASE_URL } from "../../../api/instance";
import toast from "react-hot-toast";
import BasketViewModel from "../../../store/basket/BasketViewModel";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { getSuccessMessage } from "../../../components/utils/allutils";

interface orderStatus {
  id: string;
}

const validatePhoneNumber = (
  phoneNumber: string
): { isValid: boolean; formatted: string } => {
  let digitsOnly = phoneNumber.replace(/\D/g, "");

  if (!digitsOnly.startsWith("993")) {
    digitsOnly = "993" + digitsOnly;
  }

  const MAX_TOTAL_DIGITS = 11;
  if (digitsOnly.length > MAX_TOTAL_DIGITS) {
    digitsOnly = digitsOnly.slice(0, MAX_TOTAL_DIGITS);
  }

  let formattedValue = "+";
  const countryCode = digitsOnly.substring(0, 3);
  const localNumber = digitsOnly.substring(3);
  formattedValue += countryCode;

  if (localNumber.length > 0) {
    formattedValue += " " + localNumber.substring(0, 2);
    if (localNumber.length > 2) {
      formattedValue += " " + localNumber.substring(2, 4);
      if (localNumber.length > 4) {
        formattedValue += " " + localNumber.substring(4, 6);
        if (localNumber.length > 6) {
          formattedValue += " " + localNumber.substring(6, 8);
        }
      }
    }
  }

  const isConsideredEmpty =
    formattedValue.trim() === "+" ||
    formattedValue.trim() === "+993" ||
    formattedValue.trim() === "";

  if (isConsideredEmpty) {
    return { isValid: false, formatted: formattedValue };
  }

  const fullPhoneNumberRegex = /^\+993\s?[6-7]\d(?:\s?\d){6}$/;
  const isValidFormat = fullPhoneNumberRegex.test(formattedValue);

  return { isValid: isValidFormat, formatted: formattedValue };
};

const CompleteOrder: FC = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);
  const [orderStatus, setOrderStatus] = useState<orderStatus[]>([]);
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    customerName: "",
    customerSurname: "",
    shippingAddress: "",
    orderRegion: "",
    orderCity: "",
    customerPhoneNumber: "+993",
  });
  const [errors, setErrors] = useState({
    customerName: false,
    shippingAddress: false,
    orderRegion: false,
    orderCity: false,
    customerPhoneNumber: false,
  });
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showError, setShowError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const items = BasketViewModel.items;
  const navigate = useNavigate();

  useEffect(() => {
    const orderStatuses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}order/status/all`);
        const filtered = response.data?.status.filter(
          (status: any) => status.nameTm == "Barlagda"
        );
        setOrderStatus(filtered);
      } catch (error) {
        console.error(error);
      }
    };
    orderStatuses();
  }, []);

  const handleCheckboxChange = (cardId: number) => {
    setSelectedCard((prev) => (prev === cardId ? null : cardId));
    if (hasError) setHasError(false);
  };

  const validateForm = () => {
    const phoneValidationResult = validatePhoneNumber(
      formData.customerPhoneNumber
    );

    const newErrors = {
      customerName: !formData.customerName.trim(),
      shippingAddress: !formData.shippingAddress.trim(),
      orderRegion: !formData.orderRegion.trim(),
      orderCity: !formData.orderCity.trim(),
      customerPhoneNumber: !phoneValidationResult.isValid,
    };

    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "customerPhoneNumber") {
      const { formatted } = validatePhoneNumber(value);
      setFormData((prevData) => ({
        ...prevData,
        [name]: formatted,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  const handleOptionChange = (option: string) => {
    setSelectedOption(option === selectedOption ? null : option);
    setShowError(false);
  };

  const handleSubmit = async () => {
    const userString = localStorage.getItem("ElectronicaUser");
    const unRegUserIdString = localStorage.getItem("userIdElektronika");

    const newUnRegUserID = () => {
      const newUnRegUserId = uuidv4();
      localStorage.setItem("userIdElektronika", newUnRegUserId);
      return newUnRegUserId;
    };

    const isFormValid = validateForm();

    if (!isFormValid) {
      toast.error(t("order.enterDetails"));
      return;
    }

    if (selectedCard === null || selectedCard === 0) {
      setHasError(true);
      toast.error(t("order.selectDeliveryType"));
      return;
    } else if (!selectedOption) {
      setShowError(true);
      toast.error(t("order.selectPaymentOption"));
      return;
    } else if (!items.length) {
      toast.error(t("loginError.emptyCart"));
      return;
    } else {
      const body = {
        userId: userString
          ? JSON.parse(userString).id
          : unRegUserIdString
          ? unRegUserIdString
          : newUnRegUserID(),
        orderStatusId: orderStatus[0]?.id,
        shippingAddress: formData.shippingAddress,
        paymentMethod: selectedOption,
        notes: "",
        deliveryType:
          selectedCard == 1
            ? "Экспресс"
            : selectedCard == 2
            ? "Тurmen poçta"
            : selectedCard == 3
            ? "Курьер"
            : selectedCard == 4
            ? "Самовывоз"
            : "",
        customerName: formData.customerName,
        customerSurname: formData.customerSurname,
        customerPhoneNumber: formData.customerPhoneNumber,
        orderRegion: formData.orderRegion,
        items: items.map((elem) => ({
          productId: elem.product?.id,
          quantity: elem.productQuantity,
        })),
      };

      try {
        setLoading(true);
        if (selectedOption === "Online payment (Altyn Asyr)") {
          await axios.post(`${BASE_URL}order/payByCard`, body).then((resp) => {
            if (resp.data.message === "Order created successfully") {
              setLoading(false);
              setTimeout(() => {
                window.location.href = resp.data.paymentUrl;
              }, 1000);
            } else {
              toast.error(t("loginError.error"));
            }
          });
        } else {
          await axios.post(`${BASE_URL}order/orders`, body).then((resp) => {
            if (resp.data.message === "Order created successfully") {
              setLoading(false);
              toast.success(getSuccessMessage());
              BasketViewModel.clearBasket();
              setTimeout(() => {
                navigate("/");
              }, 1000);
            } else {
              toast.error(t("loginError.error"));
            }
          });
        }
      } catch (error: any) {
        setLoading(false);
        toast.error(error.response?.data?.message);
      }
    }
  };

  return (
    <>
      <Container>
        <Box my={2}>
          <CompleteTitle />
          <DeliveryAddress
            setErrors={setErrors}
            errors={errors}
            handleInputChange={handleInputChange}
            formData={formData}
          />
          <DeliveryType
            selectedCard={selectedCard ?? 0}
            hasError={hasError}
            handleCheckboxChange={handleCheckboxChange}
          />
          <PaymentOptionSelector
            showError={showError}
            handleOptionChange={handleOptionChange}
            selectedOption={selectedOption ?? ""}
          />

          <Stack direction="row" justifyContent="flex-end">
            <Button
              onClick={handleSubmit}
              sx={{ ...auctionParticipateButton, width: "250px" }}
              variant="contained"
              fullWidth
            >
              {loading ? <CircularProgress /> : t("basket.order")}
            </Button>
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default observer(CompleteOrder);
