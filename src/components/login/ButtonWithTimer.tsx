import React, { useState, useEffect } from "react";
import { Button, CircularProgress, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

interface ButtonWithTimerProps {
  phoneNumber: string;
  isTurkmenPhoneNumber: (phoneNumber: string) => boolean;
  sendOTP: (phoneNumber: string) => void;
  timerDuration?: number;
  loading: boolean;
  isEmail: boolean | undefined;
  sendAgain?: boolean;
}

const ButtonWithTimer: React.FC<ButtonWithTimerProps> = ({
  phoneNumber,
  isTurkmenPhoneNumber,
  sendOTP,
  loading,
  timerDuration = 56,
  isEmail,
  sendAgain,
}) => {
  const [timer, setTimer] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(timerDuration);
  const { t } = useTranslation();
  const startTimer = () => {
    setTimer(
      setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer!);
            setTimer(null);
            return timerDuration; // Reset timer
          }
          return prevTime - 1;
        });
      }, 1000)
    );
    setRemainingTime(timerDuration);
  };
  console.log(isEmail);

  const handleButtonClick = () => {
    if (isEmail == true) {
      sendOTP(phoneNumber);
    } else {
      sendOTP(`+993${phoneNumber}`);
    }
    if (!timer) {
      startTimer();
    }
  };
  useEffect(() => {
    if (sendAgain) {
      startTimer();
    }
  }, [sendAgain]);

  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timer]);

  return (
    <>
      <Button
        onClick={handleButtonClick}
        sx={{
          bgcolor: "#e0e0e0",
          color: timer == null ? "#000" : "gray",
          height: 30,
          textTransform: "revert",
        }}
        disabled={
          sendAgain == true
            ? false
            : !isTurkmenPhoneNumber(phoneNumber) || timer !== null
        }
      >
        {loading ? (
          <Stack>
            <CircularProgress size={25} />
          </Stack>
        ) : timer ? (
          `${t("login.resend")}(${remainingTime}s)`
        ) : sendAgain ? (
          t("login.resend")
        ) : (
          t("login.sendOTP")
        )}
      </Button>
    </>
  );
};

export default ButtonWithTimer;
