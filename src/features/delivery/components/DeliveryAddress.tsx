import { ChangeEvent, FC } from "react";
import { TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTranslation } from "react-i18next";

interface DeliveryTypeProps {
  errors?: {
    customerName: boolean;
    customerSurname: boolean;
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
    customerSurname: false,
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
    customerPhoneNumber: "",
  },
  handleInputChange,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: 600,
          mt: 3,
        }}
      >
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
            type: "number",
            label: t("order.phone"),
            name: "customerPhoneNumber",
          },
        ].map((input) => (
          <Grid key={input.name} size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
            <TextField
              label={input.label}
              name={input.name}
              value={formData[input.name as keyof typeof formData]}
              onChange={handleInputChange}
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
