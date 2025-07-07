import {
  Button,
  Drawer,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FC, useState } from "react";
import UserViewModel from "./UserViewModel";
import { observer } from "mobx-react-lite";
import ReactCodeInput from "react-code-input";
import ButtonWithTimer from "./ButtonWithTimer";
import { KeyboardBackspaceOutlined } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { mainColor } from "../../features/home/components/goodOfWeek/style/weekGoodsStyle";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  setSuccesfullyVerficated: (value: boolean) => void;
  phoneNumber: string;
  isTurkmenPhoneNumber: (phoneNumber: string) => boolean;
  sendOTP: () => void;
  loading: boolean;
  isEmail?: boolean;
  login?:()=>void
};

const VerifyDrawer: FC<Props> = observer(
  ({
    isOpen,
    onClose,
    setSuccesfullyVerficated,
    phoneNumber,
    isTurkmenPhoneNumber,
    sendOTP,
    loading,
    isEmail,
    login
  }) => {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState<string | null>(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { t } = useTranslation();
    const handleVerifyOtp = async () => {
      if (otp.length === 4) {
        const isSuccess = await UserViewModel.verifyOtp(otp);
        if (isSuccess) {
          onClose();
          setError(null);
          setSuccesfullyVerficated(true);
          setOtp("");
          login&&login()
        } else {
          setError("Invalid OTP. Please try again.");
          setOtp("");
        }
      } else {
        const isSuccess = await UserViewModel.verifyEmailOtp(otp);
        if (isSuccess) {
          onClose();
          setError(null);
          setSuccesfullyVerficated(true);
          setOtp("");
        } else {
          setError("Invalid OTP. Please try again.");
          setOtp("");
        }
      }
    };
    const handleOtpChange = (value: string) => {
      setError(null);
      setOtp(value);
    };

    return (
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={onClose}
        sx={{
          "& .MuiDrawer-paper": {
            width: { lg: "420px", md: "420px", sm: "100%", xs: "100%" },
            height: "100%",
            position: "fixed",
          },
        }}
      >
        <Stack
          sx={{
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
            p: "10px",
            pt: 0,
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 20,
              left: 20,
              color: "#fff",
              bgcolor: mainColor,
              "&:hover": { bgcolor: mainColor },
            }}
          >
            <KeyboardBackspaceOutlined
              sx={{
                width: 25,
                height: 25,
              }}
            />
          </IconButton>
          <Typography textAlign="center">
            {t("verifySend")} -{" "}
            {isEmail ? phoneNumber : `(+993 ${phoneNumber})`}
          </Typography>
          <Stack direction="column" alignItems={"center"} mt={3} spacing={2}>
            <ReactCodeInput
              type="tel"
              fields={isEmail ? 6 : 4}
              onChange={handleOtpChange}
              name="otp"
              inputMode="numeric"
              inputStyle={{
                width: isMobile ? 40 : "50px",
                height: isMobile ? 40 : "50px",
                margin: "0 8px",
                fontSize: "20px",
                borderRadius: "8px",
                border: `1px solid ${error ? "red" : "#ccc"}`,
                textAlign: "center",
              }}
            />
            {error && (
              <Typography color="error" fontSize={14} mt={1}>
                {error}
              </Typography>
            )}
            <Stack direction="row" alignItems="center" gap={2}>
              <ButtonWithTimer
                isEmail={isEmail}
                phoneNumber={phoneNumber}
                isTurkmenPhoneNumber={isTurkmenPhoneNumber}
                sendOTP={sendOTP}
                loading={loading}
                sendAgain
              />
              <Button
                variant="contained"
                sx={{
                  bgcolor: mainColor,
                }}
                onClick={handleVerifyOtp}
              >
                {t("verify")}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Drawer>
    );
  }
);

export default VerifyDrawer;
