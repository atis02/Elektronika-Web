import { ChangeEvent, FC } from "react";
import { TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTranslation } from "react-i18next";

interface DeliveryTypeProps {
  errors?: {
    customerName: boolean;
    shippingAddress: boolean;
    orderRegion: boolean;
    orderCity: boolean;
    customerPhoneNumber: boolean;
  };
  formData?: {
    customerName: string;
    customerSurname: string;
    shippingAddress: string;
    orderRegion: string;
    orderCity: string;
    customerPhoneNumber: string;
  };
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const DeliveryAddress: FC<DeliveryTypeProps> = ({
  errors = {
    customerName: false,
    shippingAddress: false,
    orderRegion: false,
    orderCity: false,
    customerPhoneNumber: false,
  },
  formData = {
    customerName: "",
    customerSurname: "",
    shippingAddress: "",
    orderRegion: "",
    orderCity: "",
    customerPhoneNumber: "+993",
  },
  handleInputChange,
}) => {
  const { t } = useTranslation();

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Keep only digits

    if (!value.startsWith("993")) {
      value = "993"; // If country code is erased, reset to '993'
    }

    if (value.length > 11) {
      value = value.slice(0, 11); // Limit to 9 digits (XX XXX-XXX)
    }

    const formattedValue = `+${value}`; // Add '+' sign

    // Set error if phone number is only +993
    const isPhoneValid = formattedValue !== "+993";

    const newEvent = {
      target: {
        name: "customerPhoneNumber",
        value: formattedValue,
      },
    } as ChangeEvent<HTMLInputElement>;

    // Update errors based on phone number validity
    handleInputChange(newEvent);

    // Update the error state for customerPhoneNumber
    errors.customerPhoneNumber = isPhoneValid;
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
            val: "+993",
          },
        ].map((input, index) => (
          <Grid key={input.name} size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
            <TextField
              label={input.label}
              name={input.name}
              value={formData[input.name as keyof typeof formData]}
              onChange={index === 5 ? handlePhoneChange : handleInputChange} // Adjusted index to 5
              fullWidth
              type={input.type}
              error={errors[input.name as keyof typeof errors]}
              variant="outlined"
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
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default DeliveryAddress;
