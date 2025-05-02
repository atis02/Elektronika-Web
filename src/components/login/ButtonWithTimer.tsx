import React, { useState, useEffect } from "react";
import { Button, CircularProgress, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

interface ButtonWithTimerProps {
  phoneNumber: string;
  isTurkmenPhoneNumber: (phoneNumber: string) => boolean;
  sendOTP: (phoneNumber: string) => void;
  timerDuration?: number;
  loading: boolean;
}

const ButtonWithTimer: React.FC<ButtonWithTimerProps> = ({
  phoneNumber,
  isTurkmenPhoneNumber,
  sendOTP,
  loading,
  timerDuration = 55, // Default timer duration is 60 seconds
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

  const handleButtonClick = () => {
    sendOTP(`+993${phoneNumber}`);
    if (!timer) {
      startTimer();
    }
  };

  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timer]);

  return (
    <Button
      onClick={handleButtonClick}
      sx={{
        bgcolor: "#e0e0e0",
        color: "#000",
        height: 30,
        mt: 1,
        textTransform: "revert",
      }}
      disabled={!isTurkmenPhoneNumber(phoneNumber) || timer !== null}
    >
      {loading ? (
        <Stack>
          <CircularProgress size={25} />
        </Stack>
      ) : timer ? (
        `${t("login.resend")}(${remainingTime}s)`
      ) : (
        t("login.sendOTP")
      )}
    </Button>
  );
};

export default ButtonWithTimer;
