import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { ChangeEvent, FC, useEffect, useState } from "react";
import CompleteTitle from "./CompleteTitle";
import DeliveryAddress from "./DeliveryAddress";
import DeliveryType from "./DeliveryType";
import PaymentOptionSelector from "./PaymentOptionSelector";
import { auctionParticipateButton } from "../../auction/styles/auctionStyles";
import { v4 as uuidv4 } from "uuid";
import { Product } from "../../../components/redux/interface";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import { BASE_URL } from "../../../api/instance";
import toast from "react-hot-toast";
import BasketViewModel from "../../../store/basket/BasketViewModel";
import { useNavigate } from "react-router-dom";
import MuiDatePicker from "./DatePicker";

interface orderStatus {
  id: string;
}

interface OrderCity {
  id: string;
  nameTm: string;
  deliveryPrice: number;
}
const CompleteOrder: FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);
  const [orderStatus, setOrderStatus] = useState<orderStatus[]>([]);
  const [orderDeliveryCity, setDeliveryCity] = useState<OrderCity[]>([]);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const [formData, setFormData] = useState({
    customerName: "",
    customerSurname: "",
    shippingAddress: "",
    orderRegion: "",
    orderCity: "",
    customerPhoneNumber: "",
  });
  const [errors, setErrors] = useState({
    customerName: false,
    customerSurname: false,
    shippingAddress: false,
    orderRegion: false,
    orderCity: false,
    customerPhoneNumber: false,
    selectedCity: false,
    deliveryDate: false,
  });
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showError, setShowError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [products] = useState<Product[]>(() => {
    const basket = localStorage.getItem("basket");
    return basket ? JSON.parse(basket) : [];
  });
  const navigate = useNavigate();
  console.log(products);

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
  useEffect(() => {
    const orderDeliveryCity = async () => {
      try {
        const response = await axios.get(`${BASE_URL}order/deliveryCity/all`);
        // const filtered = response.data?.status.filter(
        //   (status: any) => status.nameTm == "Barlagda"
        // );
        setDeliveryCity(response.data.deliveryPrice);
      } catch (error) {
        console.error(error);
      }
    };
    orderDeliveryCity();
  }, []);
  console.log(orderDeliveryCity);

  const handleCheckboxChange = (cardId: number) => {
    setSelectedCard((prev) => (prev === cardId ? null : cardId));
    if (hasError) setHasError(false); // Clear error when a valid selection is made
  };
  const validateForm = () => {
    const newErrors = {
      customerName: !formData.customerName.trim(),
      customerSurname: !formData.customerSurname.trim(),
      shippingAddress: !formData.shippingAddress.trim(),
      orderRegion: !formData.orderRegion.trim(),
      orderCity: !formData.orderCity.trim(),
      customerPhoneNumber: !formData.customerPhoneNumber.trim(),
      selectedCity: !selectedCity.trim(),
      deliveryDate: selectedDate == null || selectedDate == undefined,
    };

    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() === "",
    }));
  };

  const handleOptionChange = (option: string) => {
    setSelectedOption(option === selectedOption ? null : option);
    setShowError(false);
  };
  const getUserId = () => {
    let userId = localStorage.getItem("userIdElektronika");
    if (!userId) {
      userId = uuidv4(); // Generate new UUID
      localStorage.setItem("userIdElektronika", userId);
    }
    return userId;
  };
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCity(event.target.value as string);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [event.target.name]: event.target.value.trim() === "",
    }));
  };

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);

    // if (date) {
    //   console.log("Selected Date:", date.format("YYYY-MM-DD")); // Example formatting
    // } else {
    //   console.log("Date cleared");
    // }
  };
  const handleSubmit = async () => {
    validateForm();
    if (selectedCard === null || selectedCard === 0) {
      setHasError(true);
    } else if (!selectedOption) {
      setShowError(true);
    } else {
      const body = {
        userId: getUserId(),

        deliveryDate: dayjs(selectedDate).format("YYYY-MM-DD"),
        // orderStatusId: "f55eb54a-094e-44a6-ae34-f607456d2b08",
        orderStatusId: orderStatus[0]?.id,
        shippingAddress: formData.shippingAddress,
        paymentMethod: selectedOption,
        notes: "",
        deliveryType:
          selectedCard == 1
            ? "Express"
            : selectedCard == 2
            ? "Turkmen pochta"
            : selectedCard == 3
            ? "Courier"
            : selectedCard == 4
            ? "Pickup"
            : "",
        customerName: formData.customerName,
        customerSurname: formData.customerSurname,
        customerPhoneNumber: formData.customerPhoneNumber,
        orderRegion: formData.orderRegion,
        orderDeliveryCityPaymentId: selectedCity,
        items: products.map((elem) => ({
          productId: elem.product?.id,
          quantity: elem.productQuantity,
        })),
      };
      console.log(body);

      try {
        setLoading(true);
        await axios.post(`${BASE_URL}order/orders`, body).then((resp) => {
          if (resp.data.message === "Order created successfully") {
            toast.success("Üstünlikli!");
            setLoading(false);
            BasketViewModel.clearBasket();
            setTimeout(() => {
              navigate("/");
            }, 1500);
          } else {
            toast.error("Ýalňyşlyk!");
          }
        });
      } catch (error: any) {
        console.log(error);
        setLoading(false);

        toast.error(error.response?.data?.message);
      }

      console.log(body);
    }
  };
  // console.log(selectedOption);
  console.log(selectedCity);
  // console.log(selectedCard);

  return (
    <>
      <Container>
        <Box my={2}>
          <CompleteTitle />
          <DeliveryAddress
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
          <Stack
            mt={2}
            spacing={2}
            direction="row"
            justifyContent="space-between"
          >
            <FormControl
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "lightgray",
                  },
                  "&:hover fieldset": {
                    borderColor: "lightgray",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "lightgray",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#2E2F38",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#2E2F38",
                },
              }}
            >
              <InputLabel id="demo-simple-select-label">
                Eltip bermeli salgy
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedCity}
                label="Eltip bermeli salgy"
                name="selectedCity"
                onChange={handleChange}
                error={errors.selectedCity}
              >
                {orderDeliveryCity.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.nameTm} / {option.deliveryPrice}TMT
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <MuiDatePicker
              onChange={handleDateChange}
              setErrors={setErrors}
              errors={errors}
            />
          </Stack>
          <Stack direction="row" justifyContent="flex-end">
            <Button
              onClick={handleSubmit}
              sx={{ ...auctionParticipateButton, width: "250px" }}
              variant="contained"
              fullWidth
            >
              {loading ? <CircularProgress /> : "Sargyt etmek"}
            </Button>
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default CompleteOrder;
