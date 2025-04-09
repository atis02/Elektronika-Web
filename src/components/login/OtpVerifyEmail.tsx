import React, { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import UserViewModel from "./UserViewModel";
import { observer } from "mobx-react-lite";
import CloseIcon from "@mui/icons-material/Close";

interface OtpVerificationProps {
  isOpen: boolean;
  setSuccesfullyVerficated: (value: boolean) => void;
  onClose: () => void;
}

const OtpVerificationEmail: FC<OtpVerificationProps> = observer(
  ({ isOpen, onClose, setSuccesfullyVerficated }) => {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState<string | null>(null);
    const handleVerifyOtp = async () => {
      if (otp.length === 6) {
        // if (otp == UserViewModel.user?.otp) {
        // Static OTP for testing
        const isSuccess = await UserViewModel.verifyOtp(otp);
        if (isSuccess) {
          onClose();
          setError(null);
          setSuccesfullyVerficated(true);
          setOtp("");
        } else {
          setError("Invalid OTP. Please try again.");
          setOtp("");
        }
        // } else {
        //   setError("Invalid OTP. Please try again.");
        //   setOtp("");
        // }
      } else {
        setError("OTP must be 4 digits.");
      }
    };
    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setError(null);
      setOtp(e.target.value);
    };

    return (
      <Dialog open={isOpen} onClose={onClose}>
        <Stack alignItems="end" mr={1} mt={1}>
          <IconButton sx={{ p: 0, width: 45, height: 45 }} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <DialogContent sx={{ p: "20px", pt: 0 }}>
          <Typography>Tassyklaýyş kody poçtanyza ugradyldy</Typography>
          <Stack direction="column" alignItems={"center"} mt={3} spacing={2}>
            <TextField
              type="number"
              label="Tassyklaýyş kody giriz"
              value={otp}
              onChange={handleOtpChange}
              inputProps={{ maxLength: 6, inputMode: "numeric" }}
              error={!!error}
              helperText={error}
              size="small"
              sx={{ background: "#F5F5F5" }}
            />
            <Button variant="contained" onClick={handleVerifyOtp}>
              Tassykla
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    );
  }
);

export default OtpVerificationEmail;
