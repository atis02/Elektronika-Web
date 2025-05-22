import { FC, useState, useRef } from "react";
import {
  Drawer,
  Box,
  Typography,
  Stack,
  Button,
  Checkbox,
  IconButton,
  TextField,
  Snackbar,
  Alert,
  InputAdornment,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { observer } from "mobx-react-lite";
import UserViewModel from "./UserViewModel";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../api/instance";
import ButtonWithTimer from "./ButtonWithTimer";
import { useTranslation } from "react-i18next";
import VerifyDrawer from "./VerifyDrawer";

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const Login: FC<LoginProps> = observer(({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("register");
  const [activeTabDirection, setActiveTabDirection] = useState<
    "email" | "phoneNumber"
  >("phoneNumber");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [password, setPassword] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [isNotify, setIsNotify] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOtpVerificationOpen, setIsOtpVerificationOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [successfullyVerificated, setSuccesfullyVerficated] = useState(false);
  const [error, setError] = useState(false);
  const { t } = useTranslation();
  const storedUser = localStorage.getItem("ElectronicaUser");
  let user = storedUser ? JSON.parse(storedUser) || [] : [];
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("ElectronicaUser");
    onClose();
    setActiveTab("login");
    const storedUser = localStorage.getItem("ElectronicaUser");
    return storedUser ? JSON.parse(storedUser) || [] : [];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setSelectedFileName(selectedFile.name);
    } else {
      setFile(null);
      setSelectedFileName(null);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsNotify(e.target.checked);
  };
  console.log(isEmail(email));

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setSnackbarMessage(null);
    setSnackbarOpen(false);
    if (!isTurkmenPhoneNumber(`+993${phoneNumber}`) && !isEmail(email)) {
      setError(true);
      return toast.error("Telefon belgisi nädogry!");
    }
    if (successfullyVerificated !== true) {
      setError(true);
      return toast.error("Telefon belgi ýa-da email tassykla!");
    }
    console.log(email);

    try {
      await UserViewModel.registerUser({
        file,
        firstName,
        phoneNumber,
        lastName,
        email,
      });

      if (UserViewModel.registrationSuccess) {
        toast.success("Üstünlikli!");
        setActiveTab("login");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } else if (UserViewModel.error) {
        let message = UserViewModel.error;
        if (
          UserViewModel.error.includes(
            `${
              phoneNumber !== "+993" ? phoneNumber : email
            } belgi ulgamda hasaba alnan!`
          )
        ) {
          message = `${
            phoneNumber ? phoneNumber : email
          } belgi ulgamda hasaba alnan!`;
        }
        setSnackbarMessage(message);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error: any) {
      setSnackbarMessage("An unexpected error has occurred.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleOtpVerificationClose = () => {
    setIsOtpVerificationOpen(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSnackbarMessage(null); // Clear previous messages
    setSnackbarOpen(false);
    if (!isTurkmenPhoneNumber(`+993${phoneNumber}`) && !isEmail(email)) {
      setError(true);
      return toast.error("Telefon belgisi nädogry!");
    }
    if (successfullyVerificated !== true) {
      setError(true);
      return toast.error("Telefon belgi ýa-da email tassykla!");
    }
    try {
      if (phoneNumber === "") {
        await UserViewModel.loginWithEmail({
          email,
        });
      } else {
        await UserViewModel.login({
          phoneNumber,
        });
      }

      if (UserViewModel.registrationSuccess) {
        toast.success("Üstünlikli giriş!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        onClose();
      } else if (UserViewModel.error) {
        let message = UserViewModel.error;

        setSnackbarMessage(message);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error: any) {
      setSnackbarMessage("An unexpected error has occurred.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  function isTurkmenPhoneNumber(phoneNumber: string) {
    const turkmenRegex = /^\+993([6-7][0-9])\d{6}$/;
    const trimmedPhoneNumber = phoneNumber.trim();
    return turkmenRegex.test(trimmedPhoneNumber);
  }

  function isEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
  const sendOTP = (phoneNumberWithCountryCode: string) => {
    try {
      const otpSending = async () => {
        await axios
          .post(`${BASE_URL}otp/add`, {
            phone: phoneNumberWithCountryCode,
          })
          .then((resp) => {
            if (resp.data.message == "OTP generated successfully!") {
              toast.success("Tassyklaýyş kody ugradyldy!");
              setIsOtpVerificationOpen(true);
            }
          });
      };
      otpSending();
    } catch (error) {
      console.log(error);
    }
  };
  const sendEmailOTP = (email: string) => {
    try {
      const otpSending = async () => {
        setLoading(true);
        await axios
          .post(`${BASE_URL}otp/addEmail`, {
            email: email,
          })
          .then((resp) => {
            if (resp.data.message == "OTP generated successfully!") {
              toast.success("Tassyklaýyş kody ugradyldy!");
              setIsOtpVerificationOpen(true);
              setLoading(false);
            }
          });
      };
      otpSending();
    } catch (error) {
      console.log(error);
    }
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
      <>
        <Stack direction={"row"} justifyContent="flex-end" p={1}>
          <IconButton onClick={onClose}>
            <ClearIcon />
          </IconButton>
        </Stack>
        {user.name ? (
          <Stack justifyContent="center" alignItems="center">
            <Stack
              borderRadius="100%"
              alignItems="center"
              justifyContent="center"
              width={100}
              height={100}
              bgcolor="#B71C1C"
            >
              <Typography fontSize={35} color="#fff">
                {user?.name[0]}
              </Typography>
            </Stack>
            <Stack direction="row" mt={3} spacing={2}>
              <Typography fontWeight={600} fontSize={25}>
                {user?.name}
              </Typography>
              <Typography fontWeight={600} fontSize={25}>
                {user?.surname}
              </Typography>
            </Stack>

            <Typography fontWeight={500} fontSize={18}>
              +993 {user?.phoneNumber}
            </Typography>
            <Stack direction="row" mt={1} spacing={2}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: 4,
                  border: "1px solid #B71C1C",
                  bgcolor: "#fff",
                  color: "#B71C1C",
                  textTransform: "revert",
                  fontSize: 16,
                }}
                onClick={() => navigate("/account")}
              >
                {t("login.myProfile")}
              </Button>
              <Button
                variant="contained"
                onClick={handleLogout}
                sx={{
                  borderRadius: 4,
                  border: "1px solid #B71C1C",
                  bgcolor: "#fff",
                  color: "#B71C1C",
                  textTransform: "revert",
                  fontSize: 16,
                }}
              >
                {t("login.logout")}
              </Button>
            </Stack>
          </Stack>
        ) : (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              // justifyContent: "center",
              alignItems: "center",
              px: "10%",
            }}
          >
            <Stack direction="row" width={"100%"} spacing={2} mb={4}>
              <Button
                variant="contained"
                onClick={() => setActiveTab("login")}
                sx={{
                  textTransform: "none",
                  background: activeTab === "login" ? "#E0E0E0" : "#F5F5F5",
                  color: activeTab === "login" ? "#2E2F38" : "#474747",
                  fontWeight: activeTab === "login" ? 700 : 400,
                  width: "50%",
                  height: "40px",
                  borderRadius: "4px",
                }}
              >
                {t("login.login")}
              </Button>
              <Button
                variant="contained"
                onClick={() => setActiveTab("register")}
                sx={{
                  textTransform: "none",
                  background: activeTab === "register" ? "#E0E0E0" : "#F5F5F5",
                  color: activeTab === "register" ? "#2E2F38" : "#474747",
                  fontWeight: activeTab === "register" ? 700 : 400,
                  width: "50%",
                  height: "40px",
                  borderRadius: "4px",
                }}
              >
                {t("login.register")}
              </Button>
            </Stack>

            {/* Conditional Inputs */}
            {activeTab === "login" ? (
              <Box component={"form"} onSubmit={handleLogin} width={"100%"}>
                <Stack spacing={3} width="100%">
                  <Stack>
                    <Stack direction="row" width={"100%"} spacing={2} mb={4}>
                      <Button
                        variant="contained"
                        onClick={() => setActiveTabDirection("phoneNumber")}
                        sx={{
                          textTransform: "none",
                          background:
                            activeTabDirection === "phoneNumber"
                              ? "#E0E0E0"
                              : "#F5F5F5",
                          color:
                            activeTabDirection === "phoneNumber"
                              ? "#2E2F38"
                              : "#474747",
                          fontWeight:
                            activeTabDirection === "phoneNumber" ? 700 : 400,
                          width: "50%",
                          height: "40px",
                          borderRadius: "4px",
                        }}
                      >
                        {t("login.phoneNumber")}
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => setActiveTabDirection("email")}
                        sx={{
                          textTransform: "none",
                          background:
                            activeTabDirection === "email"
                              ? "#E0E0E0"
                              : "#F5F5F5",
                          color:
                            activeTabDirection === "email"
                              ? "#2E2F38"
                              : "#474747",
                          fontWeight:
                            activeTabDirection === "email" ? 700 : 400,
                          width: "50%",
                          height: "40px",
                          borderRadius: "4px",
                        }}
                      >
                        {t("login.email")}
                      </Button>
                    </Stack>
                    {activeTabDirection === "phoneNumber" ? (
                      <>
                        <TextField
                          type="text"
                          label={t("login.phoneNumber")}
                          variant="outlined"
                          value={phoneNumber}
                          onChange={(e) => {
                            const newValue = e.target.value;
                            if (newValue.length <= 8) {
                              setPhoneNumber(newValue);
                            }
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Stack
                                  borderRight="1px solid lightgray"
                                  sx={{ paddingRight: 0.5 }}
                                >
                                  +993
                                </Stack>
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            background: "#F5F5F5",
                            "& fieldset": {
                              border: "1px solid #F5F5F5",
                            },
                            "& .MuiInputBase-input": {
                              paddingLeft: "-5px",
                            },
                          }}
                          disabled={successfullyVerificated == true}
                          fullWidth
                          required
                          error={error}
                        />
                        {successfullyVerificated !== true ? (
                          <ButtonWithTimer
                            isEmail={false}
                            phoneNumber={phoneNumber}
                            isTurkmenPhoneNumber={() =>
                              isTurkmenPhoneNumber(`+993${phoneNumber}`)
                            }
                            loading={loading}
                            sendOTP={() => sendOTP(phoneNumber)}
                          />
                        ) : (
                          <Typography
                            textAlign="center"
                            fontSize={14}
                            color="green"
                          >
                            {t("login.successProvided")}
                          </Typography>
                        )}
                      </>
                    ) : (
                      <>
                        <TextField
                          type="email"
                          label="E-mail"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          sx={{
                            background: "#F5F5F5",
                            "& fieldset": {
                              border: "none",
                            },
                          }}
                          fullWidth
                          required
                        />
                        {successfullyVerificated !== true ? (
                          <ButtonWithTimer
                            isEmail={true}
                            phoneNumber={email}
                            isTurkmenPhoneNumber={() => isEmail(email)}
                            sendOTP={() => sendEmailOTP(email)}
                            loading={loading}
                          />
                        ) : (
                          <Typography
                            textAlign="center"
                            fontSize={14}
                            color="green"
                          >
                            {t("login.successProvided")}
                          </Typography>
                        )}
                      </>
                    )}
                  </Stack>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={1}
                  my={2}
                >
                  <Typography
                    fontSize="14px"
                    sx={{ textDecoration: "underline", cursor: "pointer" }}
                  >
                    {t("login.forgotPass")}
                  </Typography>
                </Stack>
                <Button
                  type={"submit"}
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    background: "#E0E0E0",
                    color: "#2E2F38",
                    fontWeight: 700,
                    width: "100%",
                    height: "50px",
                    borderRadius: "4px",
                  }}
                >
                  {t("login.Login")}
                </Button>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={1}
                  my={2}
                >
                  <Typography fontSize="14px">
                    {t("login.noAccount")}
                  </Typography>
                  <Typography
                    onClick={() => setActiveTab("register")}
                    fontSize="14px"
                    fontWeight={600}
                    sx={{ cursor: "pointer" }}
                  >
                    {t("login.registerFor")}
                  </Typography>
                </Stack>
              </Box>
            ) : (
              <Box component={"form"} onSubmit={handleRegister} width={"100%"}>
                <Stack spacing={1} width="100%">
                  <TextField
                    type="text"
                    label={t("order.name")}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    sx={{
                      background: "#F5F5F5",
                      "& fieldset": {
                        border: "none",
                      },
                    }}
                    fullWidth
                    required
                  />
                  <TextField
                    type="text"
                    label={t("order.surname")}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    sx={{
                      background: "#F5F5F5",
                      "& fieldset": {
                        border: "none",
                      },
                    }}
                    fullWidth
                    required
                  />
                  <Stack>
                    <Stack direction="row" width={"100%"} spacing={2} mb={4}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setActiveTabDirection("phoneNumber");
                          setEmail("");
                        }}
                        sx={{
                          textTransform: "none",
                          background:
                            activeTabDirection === "phoneNumber"
                              ? "#E0E0E0"
                              : "#F5F5F5",
                          color:
                            activeTabDirection === "phoneNumber"
                              ? "#2E2F38"
                              : "#474747",
                          fontWeight:
                            activeTabDirection === "phoneNumber" ? 700 : 400,
                          width: "50%",
                          height: "40px",
                          borderRadius: "4px",
                        }}
                      >
                        {t("login.phoneNumber")}
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setActiveTabDirection("email");
                          setPhoneNumber("");
                        }}
                        sx={{
                          textTransform: "none",
                          background:
                            activeTabDirection === "email"
                              ? "#E0E0E0"
                              : "#F5F5F5",
                          color:
                            activeTabDirection === "email"
                              ? "#2E2F38"
                              : "#474747",
                          fontWeight:
                            activeTabDirection === "email" ? 700 : 400,
                          width: "50%",
                          height: "40px",
                          borderRadius: "4px",
                        }}
                      >
                        {t("login.email")}
                      </Button>
                    </Stack>
                    {activeTabDirection === "phoneNumber" ? (
                      <>
                        <TextField
                          type="text"
                          label={t("login.phoneNumber")}
                          value={phoneNumber}
                          onChange={(e) => {
                            const newValue = e.target.value;
                            if (newValue.length <= 8) {
                              setPhoneNumber(newValue);
                            }
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Stack
                                  borderRight="1px solid lightgray"
                                  sx={{ paddingRight: 0.5 }}
                                >
                                  +993
                                </Stack>
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            background: "#F5F5F5",
                            "& fieldset": {
                              border: "1px solid #F5F5F5",
                            },
                            "& .MuiInputBase-input": {
                              paddingLeft: "-5px",
                            },
                          }}
                          disabled={successfullyVerificated == true}
                          fullWidth
                          required
                          error={error}
                        />
                        {successfullyVerificated !== true ? (
                          <ButtonWithTimer
                            isEmail={false}
                            phoneNumber={phoneNumber}
                            isTurkmenPhoneNumber={() =>
                              isTurkmenPhoneNumber(`+993${phoneNumber}`)
                            }
                            loading={loading}
                            sendOTP={() => sendOTP(phoneNumber)}
                          />
                        ) : (
                          <Typography
                            textAlign="center"
                            fontSize={14}
                            color="green"
                          >
                            {t("login.successProvided")}
                          </Typography>
                        )}
                      </>
                    ) : (
                      <>
                        <TextField
                          type="email"
                          label={t("login.email")}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          sx={{
                            background: "#F5F5F5",
                            "& fieldset": {
                              border: "none",
                            },
                          }}
                          fullWidth
                          required
                        />
                        {successfullyVerificated !== true ? (
                          <ButtonWithTimer
                            isEmail={true}
                            phoneNumber={email}
                            isTurkmenPhoneNumber={() => isEmail(email)}
                            sendOTP={() => sendEmailOTP(email)}
                            loading={loading}
                          />
                        ) : (
                          <Typography
                            textAlign="center"
                            fontSize={14}
                            color="green"
                          >
                            {t("login.successProvided")}
                          </Typography>
                        )}
                      </>
                    )}
                  </Stack>
                </Stack>
                <input
                  type="file"
                  id="file-upload"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
                <Button
                  fullWidth
                  variant="outlined"
                  component="span"
                  onClick={handleButtonClick}
                  sx={{
                    mt: 1,
                    textTransform: "none",
                    background: "#F5F5F5",
                    color: "#2E2F38",
                    "&.MuiButton-outlined": {
                      borderColor: "#929292",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#929292",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "tranparent",
                    },
                  }}
                >
                  {selectedFileName || t("login.imageUpload")}
                </Button>
                {selectedFileName && (
                  <Typography variant="caption" ml={1}>
                    {selectedFileName}
                  </Typography>
                )}
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  my={2}
                >
                  <Checkbox
                    sx={{
                      transform: "scale(0.8)",
                      padding: "0px",
                    }}
                    checked={isNotify}
                    onChange={handleCheckboxChange}
                  />
                  <Typography fontSize="14px">
                    {t("login.wantTogetNotify")}
                  </Typography>
                </Stack>
                <Button
                  type={"submit"}
                  variant="contained"
                  disabled={UserViewModel.loading}
                  sx={{
                    textTransform: "none",
                    background: "#E0E0E0",
                    color: "#2E2F38",
                    fontWeight: 700,
                    width: "100%",
                    height: "50px",
                    borderRadius: "4px",
                  }}
                >
                  {UserViewModel.loading
                    ? "Registering..."
                    : t("login.Register")}
                </Button>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={1}
                  my={2}
                >
                  <Typography fontSize="14px">
                    {t("login.alreadyHaveAccount")}
                  </Typography>
                  <Typography
                    onClick={() => setActiveTab("login")}
                    fontSize="14px"
                    fontWeight={600}
                    sx={{ cursor: "pointer" }}
                  >
                    {t("login.login")}
                  </Typography>
                </Stack>
              </Box>
            )}
          </Box>
        )}
      </>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <VerifyDrawer
        setSuccesfullyVerficated={setSuccesfullyVerficated}
        isOpen={isOtpVerificationOpen}
        onClose={handleOtpVerificationClose}
        phoneNumber={email !== "" ? email : phoneNumber}
        isTurkmenPhoneNumber={
          email !== ""
            ? () => isEmail(email)
            : () => isTurkmenPhoneNumber(phoneNumber)
        }
        sendOTP={
          email !== "" ? () => sendEmailOTP(email) : () => sendOTP(phoneNumber)
        }
        loading={loading}
        isEmail={email !== "" ? true : false}
      />
    </Drawer>
  );
});

export default Login;
