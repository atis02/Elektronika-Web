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
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { observer } from "mobx-react-lite";
import UserViewModel from "./UserViewModel";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import OtpVerification from "./OtpVerification";
import axios from "axios";
import { BASE_URL } from "../../api/instance";
import ButtonWithTimer from "./ButtonWithTimer";
// import OtpVerification from "./OtpVerification";

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
  const [phoneNumber, setPhoneNumber] = useState("+993");
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

  // const { isOpen, openDrawer, closeDrawer } = useDrawer();

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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setSnackbarMessage(null);
    setSnackbarOpen(false);
    if (!isTurkmenPhoneNumber(phoneNumber) && !isEmail(email)) {
      setError(true);
      return toast.error("Telefon belgisi nädogry!");
    }
    if (successfullyVerificated !== true) {
      setError(true);
      return toast.error("Telefon belgi ýa-da email tassykla!");
    }
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
    // setActiveTab("register");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSnackbarMessage(null); // Clear previous messages
    setSnackbarOpen(false);
    if (!isTurkmenPhoneNumber(phoneNumber) && !isEmail(email)) {
      setError(true);
      return toast.error("Telefon belgisi nädogry!");
    }
    if (successfullyVerificated !== true) {
      setError(true);
      return toast.error("Telefon belgi ýa-da email tassykla!");
    }
    try {
      if (phoneNumber === "+993") {
        await UserViewModel.loginWithEmail({
          email,
        });
      } else {
        await UserViewModel.login({
          phoneNumber,
        });
      }

      if (UserViewModel.registrationSuccess) {
        // setIsOtpVerificationOpen(true);
        // setSnackbarMessage("Üstünlikli giriş!");
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
    return turkmenRegex.test(phoneNumber);
  }
  function isEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
  const sendOTP = (phoneNumberWithCountryCode: string) => {
    function removeCountryCode(phoneNumber: string) {
      if (phoneNumber.startsWith("+993")) {
        return phoneNumber.substring(4);
      }
      return phoneNumber;
    }
    try {
      const otpSending = async () => {
        await axios
          .post(`${BASE_URL}otp/add`, {
            phone: removeCountryCode(phoneNumberWithCountryCode),
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
              {user?.phoneNumber}
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
                Profilim
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
                Çykmak
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
                Ulgama gir
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
                Agza bol
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
                        Telefon belgi
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
                        Email
                      </Button>
                    </Stack>
                    {activeTabDirection === "phoneNumber" ? (
                      <>
                        <TextField
                          type="text"
                          label="Telefon belgi"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          sx={{
                            background: "#F5F5F5",
                            "& fieldset": {
                              border: "1px solid #F5F5F5",
                            },
                          }}
                          disabled={successfullyVerificated == true}
                          fullWidth
                          required
                          error={error}
                        />
                        {successfullyVerificated !== true ? (
                          <ButtonWithTimer
                            phoneNumber={phoneNumber}
                            isTurkmenPhoneNumber={() =>
                              isTurkmenPhoneNumber(phoneNumber)
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
                            Üstünlikli tassynyldy!
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
                            Üstünlikli tassynyldy!
                          </Typography>
                        )}
                      </>
                    )}
                  </Stack>
                  {/* <TextField
                    type="text"
                    label="Telefon belgi"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    sx={{
                      background: "#F5F5F5",
                      "& fieldset": {
                        border: "none",
                      },
                    }}
                    fullWidth
                    required
                  /> */}
                  {/* <TextField
                    type="password"
                    label="Açar söz"
                    sx={{
                      background: "#F5F5F5",
                      "& fieldset": {
                        border: "none",
                      },
                    }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    required
                  /> */}
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
                    Açar sözi unutdym
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
                  Girmek
                </Button>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={1}
                  my={2}
                >
                  <Typography fontSize="14px">Hasabyňyz ýok bolsa</Typography>
                  <Typography
                    onClick={() => setActiveTab("register")}
                    fontSize="14px"
                    fontWeight={600}
                    sx={{ cursor: "pointer" }}
                  >
                    agza boluň
                  </Typography>
                </Stack>
              </Box>
            ) : (
              <Box component={"form"} onSubmit={handleRegister} width={"100%"}>
                <Stack spacing={1} width="100%">
                  <TextField
                    type="text"
                    label="Ady"
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
                    label="Familiýa"
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
                        Telefon belgi
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
                        Email
                      </Button>
                    </Stack>
                    {activeTabDirection === "phoneNumber" ? (
                      <>
                        <TextField
                          type="text"
                          label="Telefon belgi"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          sx={{
                            background: "#F5F5F5",
                            "& fieldset": {
                              border: "1px solid #F5F5F5",
                            },
                          }}
                          disabled={successfullyVerificated == true}
                          fullWidth
                          required
                          error={error}
                        />
                        {successfullyVerificated !== true ? (
                          <ButtonWithTimer
                            phoneNumber={phoneNumber}
                            isTurkmenPhoneNumber={() =>
                              isTurkmenPhoneNumber(phoneNumber)
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
                            Üstünlikli tassynyldy!
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
                            Üstünlikli tassynyldy!
                          </Typography>
                        )}
                      </>
                    )}
                  </Stack>

                  {/* <TextField
                    type="password"
                    label="Parol"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                      background: "#F5F5F5",
                      "& fieldset": {
                        border: "none",
                      },
                    }}
                    fullWidth
                    required
                  /> */}
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
                  {selectedFileName || "Surat ýükle"}
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
                    Bildiriş almaga razymy?
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
                  {UserViewModel.loading ? "Registering..." : "Registrasiýa"}
                </Button>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={1}
                  my={2}
                >
                  <Typography fontSize="14px">
                    Siziň öňden hasabyňyz bar!
                  </Typography>
                  <Typography
                    onClick={() => setActiveTab("login")}
                    fontSize="14px"
                    fontWeight={600}
                    sx={{ cursor: "pointer" }}
                  >
                    Ulgama girmek
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
      <OtpVerification
        setSuccesfullyVerficated={setSuccesfullyVerficated}
        isOpen={isOtpVerificationOpen}
        onClose={handleOtpVerificationClose}
      />
    </Drawer>
  );
});

export default Login;
