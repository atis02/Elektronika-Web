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
import OtpVerification from "./OtpVerification";

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const Login: FC<LoginProps> = observer(({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("register");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
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
    setSnackbarMessage(null); // Clear previous messages
    setSnackbarOpen(false);
    try {
      await UserViewModel.registerUser({
        file,
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        isNotify,
      });

      if (UserViewModel.registrationSuccess) {
        setIsOtpVerificationOpen(true);
        setSnackbarMessage("Successfully registered!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } else if (UserViewModel.error) {
        let message = UserViewModel.error;
        if (UserViewModel.error.includes("already registered")) {
          message = "This email or phone number is already registered.";
        }
        setSnackbarMessage(message);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error: any) {
      console.log("Error:", error);
      setSnackbarMessage("An unexpected error has occurred.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleOtpVerificationClose = () => {
    setIsOtpVerificationOpen(false);
    setActiveTab("login");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login In");
    // Handle login logic here
  };
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
        <Stack direction={"row"} justifyContent="flex-end" p={3}>
          <IconButton onClick={onClose}>
            <ClearIcon />
          </IconButton>
        </Stack>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
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
                <TextField
                  type="text"
                  label="Ady"
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
                  type="password"
                  label="Parol"
                  sx={{
                    background: "#F5F5F5",
                    "& fieldset": {
                      border: "none",
                    },
                  }}
                  fullWidth
                  required
                />
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
              <Stack spacing={1} width="100%" mt={2}>
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
                <TextField
                  type="text"
                  label="+993"
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
                />
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
                <TextField
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
                />
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
                <Typography fontSize="14px">Bildiriş almaga razymy?</Typography>
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
        isOpen={isOtpVerificationOpen}
        onClose={handleOtpVerificationClose}
      />
    </Drawer>
  );
});

export default Login;
