import React, { FC, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import UserViewModel from "./UserViewModel";
import { observer } from "mobx-react-lite";
interface OtpVerificationProps {
  isOpen: boolean;
  onClose: () => void;
}

const OtpVerification: FC<OtpVerificationProps> = observer(
  ({ isOpen, onClose }) => {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState<string | null>(null);
    const handleVerifyOtp = async () => {
      if (otp.length === 4) {
        if (otp == UserViewModel.user?.otp) {
          // Static OTP for testing
          const isSuccess = await UserViewModel.verifyOtp(otp);
          if (isSuccess) {
            onClose();
            setError(null);
          } else {
            setError("Invalid OTP. Please try again.");
            setOtp("");
          }
        } else {
          setError("Invalid OTP. Please try again.");
          setOtp("");
        }
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
        <DialogTitle>OTP Verification</DialogTitle>
        <DialogContent sx={{ p: "20px" }}>
          <Typography>
            Please enter the OTP sent to your phone number
          </Typography>
          <Stack direction="column" alignItems={"center"} mt={3} spacing={2}>
            <TextField
              type="number"
              label="Enter OTP"
              value={otp}
              onChange={handleOtpChange}
              inputProps={{ maxLength: 4, inputMode: "numeric" }}
              error={!!error}
              helperText={error}
              sx={{ background: "#F5F5F5" }}
            />
            <Button variant="contained" onClick={handleVerifyOtp}>
              Verify
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    );
  }
);

export default OtpVerification;
