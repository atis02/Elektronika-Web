import { makeAutoObservable } from "mobx";
import axios from "axios";
import { BASE_URL } from "../../api/instance";
import toast from "react-hot-toast";
import { getSuccessMessage } from "../utils/allutils";

interface RegistrationData {
  file?: File | null;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  isNotify?: boolean;
  email: string;
}
interface LoginData {
  phoneNumber: string;
}
interface LoginDataEmail {
  email: string;
}
interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
  is_confirmed: boolean;
  is_notify: boolean;
  otp: string;
  token: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    image: string;
  };
}

class UserViewModel {
  loading: boolean = false;
  error: string | null = null;
  registrationSuccess: boolean = false;
  user: UserData | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async registerUser(registrationData: RegistrationData) {
    this.loading = true;
    this.error = null;
    this.registrationSuccess = false;
    this.user = null;

    try {
      const formData = new FormData();
      if (registrationData.file) {
        formData.append("image", registrationData.file);
      }
      console.log(registrationData);
      formData.append("name", registrationData.firstName);
      formData.append("surname", registrationData.lastName);
      if (registrationData.phoneNumber === "") {
        formData.append("email", registrationData.email);
      } else {
        formData.append("phoneNumber", registrationData.phoneNumber);
      }

      const response = await axios.post<UserData>(
        `${BASE_URL}user/registration`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        this.registrationSuccess = true;
        this.user = response.data;
      }
    } catch (error: any) {
      this.error =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
    } finally {
      this.loading = false;
    }
  }
  async login(loginData: LoginData) {
    this.loading = true;
    this.error = null;
    this.registrationSuccess = false;
    this.user = null;

    try {
      const body = {
        phoneNumber: loginData.phoneNumber,
      };

      const response = await axios.post<UserData>(
        `${BASE_URL}user/login`,
        body
      );

      if (response.status === 200) {
        this.registrationSuccess = true;
        this.user = response.data;

        // Save user data and token to localStorage
        localStorage.setItem("tokenOfElectronics", response.data.token);
        localStorage.setItem(
          "ElectronicaUser",
          JSON.stringify({
            id: response.data?.user.id,
            name: response.data?.user.name,
            surname: response.data?.user.surname,
            image: response.data?.user.image,
            email: response.data?.user.email,
            phoneNumber: response.data?.user.phoneNumber,
          })
        );
      }
    } catch (error: any) {
      this.error =
        error.response?.data?.message || "Login failed. Please try again.";
    } finally {
      this.loading = false;
    }
  }
  async loginWithEmail(loginData: LoginDataEmail) {
    this.loading = true;
    this.error = null;
    this.registrationSuccess = false;
    this.user = null;

    try {
      const body = {
        email: loginData.email,
      };

      const response = await axios.post<UserData>(
        `${BASE_URL}user/loginEmail`,
        body
      );

      if (response.status === 200) {
        this.registrationSuccess = true;
        this.user = response.data;

        // Save user data and token to localStorage
        localStorage.setItem("tokenOfElectronics", response.data.token);
        localStorage.setItem(
          "ElectronicaUser",
          JSON.stringify({
            id: response.data?.user.id,
            name: response.data?.user.name,
            surname: response.data?.user.surname,
            image: response.data?.user.image,
            email: response.data?.user.email,
            phoneNumber: response.data?.user.phoneNumber,
          })
        );
      }
    } catch (error: any) {
      this.error =
        error.response?.data?.message || "Login failed. Please try again.";
    } finally {
      this.loading = false;
    }
  }
  async verifyOtp(otp: string) {
    this.loading = true;
    this.error = null;
    try {
      // if (this.user && this.user.otp === otp) {
      const res = await axios.post(`${BASE_URL}otp/check`, { otp: otp });

      if (res.status >= 200 && res.status < 300) {
        // window.localStorage.setItem("token", this.user.token);
        toast.success(getSuccessMessage());
        return true;
      }
      // }
      // this.error = "Invalid OTP. Please try again.";
      return false;
    } catch (error: any) {
      this.error = "Error during OTP verification";
      return false;
    } finally {
      this.loading = false;
    }
  }
  async verifyEmailOtp(otp: string) {
    this.loading = true;
    this.error = null;
    try {
      // if (this.user && this.user.otp === otp) {
      const res = await axios.post(`${BASE_URL}otp/checkEmail`, { otp: otp });

      if (res.status >= 200 && res.status < 300) {
        toast.success(getSuccessMessage());
        return true;
      }
      return false;
    } catch (error: any) {
      this.error = "Error during OTP verification";
      return false;
    } finally {
      this.loading = false;
    }
  }
}

export default new UserViewModel();
