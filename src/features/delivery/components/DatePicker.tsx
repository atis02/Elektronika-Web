import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useState } from "react";
import type { Dayjs } from "dayjs"; // Import Dayjs type

interface MyComponentProps {
  label?: string; // Optional label prop
  onChange: (date: Dayjs | null) => void;
  errors?: {
    deliveryDate: boolean;
  };
  setErrors: (error: any) => void;
}

const MuiDatePicker: React.FC<MyComponentProps> = ({
  onChange,
  errors,
  setErrors,
}) => {
  const [value, setValue] = useState<Dayjs | null>(null);
  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
    onChange(newValue);
    setErrors((prevErrors: any) => ({
      ...prevErrors,
      deliveryDate: null,
    }));
  };
  console.log(value);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* <DatePicker
        label={"Eltip bermeli sene"} // Use label prop or default "Date"
        value={value}
        onChange={handleChange}
        onError={errors.deliveryDate}
        format="DD.MM.YYYY"
        // renderInput={(params:any) => <TextField {...params} />}
      /> */}
      <DatePicker
        label="Eltip bermeli sene"
        value={value}
        onChange={handleChange}
        format="DD.MM.YYYY"
        name="deliveryDate"
        slotProps={{
          textField: {
            error: Boolean(errors?.deliveryDate),
            sx: {
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: errors?.deliveryDate ? "red" : "", // Safe access
                },
                "&:hover fieldset": {
                  borderColor: errors?.deliveryDate ? "red" : "",
                },
                "&.Mui-focused fieldset": {
                  borderColor: errors?.deliveryDate ? "red" : "",
                },
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};
export default MuiDatePicker;
