import { ChangeEvent, FC } from "react";
import { TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTranslation } from "react-i18next";

interface DeliveryTypeProps {
  errors: {
    customerName: boolean;
    shippingAddress: boolean;
    orderRegion: boolean;
    orderCity: boolean;
    customerPhoneNumber: boolean;
  };
  formData: {
    customerName: string;
    customerSurname: string;
    shippingAddress: string;
    orderRegion: string;
    orderCity: string;
    customerPhoneNumber: string;
  };
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setErrors: React.Dispatch<
    React.SetStateAction<{
      customerName: boolean;
      shippingAddress: boolean;
      orderRegion: boolean;
      orderCity: boolean;
      customerPhoneNumber: boolean;
    }>
  >;
}

const DeliveryAddress: FC<DeliveryTypeProps> = ({
  errors,
  formData,
  handleInputChange,
  setErrors,
}) => {
  const { t } = useTranslation();

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    let digitsOnly = e.target.value.replace(/\D/g, "");

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

    const fullPhoneNumberRegex = /^\+993\s?[6-7]\d(?:\s?\d){6}$/;

    const isPhoneNumberValid =
      formattedValue.trim() !== "+" && fullPhoneNumberRegex.test(formattedValue);

    setErrors((prev) => ({
      ...prev,
      customerPhoneNumber: !isPhoneNumberValid,
    }));

    const newEvent = {
      target: {
        name: "customerPhoneNumber",
        value: formattedValue,
      },
    } as ChangeEvent<HTMLInputElement>;

    handleInputChange(newEvent);
  };

  return (
    <>
      <Typography sx={{ fontSize: "16px", fontWeight: 600, mt: 3 }}>
        {t("order.orderAddress")}
      </Typography>
      <Grid container spacing={2} my={1}>
        {[
          { type: "text", label: t("order.name"), name: "customerName" },
          { type: "text", label: t("order.surname"), name: "customerSurname" },
          { type: "text", label: t("order.adress"), name: "shippingAddress" },
          { type: "text", label: t("order.velayat"), name: "orderRegion" },
          { type: "text", label: t("order.city/district"), name: "orderCity" },
          {
            type: "tel",
            label: t("order.phone"),
            name: "customerPhoneNumber",
          },
        ].map((input, index) => (
          <Grid key={input.name} size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
            <TextField
              label={input.label}
              name={input.name}
              value={formData[input.name as keyof typeof formData]}
              onChange={index === 5 ? handlePhoneChange : handleInputChange}
              fullWidth
              type={input.type}
              error={errors[input.name as keyof typeof errors]}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "lightgray" },
                  "&:hover fieldset": { borderColor: "lightgray" },
                  "&.Mui-focused fieldset": { borderColor: "lightgray" },
                },
                "& .MuiInputLabel-root": { color: "#2E2F38" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#2E2F38" },
              }}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default DeliveryAddress;