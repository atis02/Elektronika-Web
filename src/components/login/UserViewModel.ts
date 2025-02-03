import { makeAutoObservable } from "mobx";
import axios from "axios";
import { BASE_URL } from "../../api/instance";

interface RegistrationData {
  file?: File | null;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password?: string;
  isNotify?: boolean;
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
        formData.append("file", registrationData.file);
      }
      formData.append("firstName", registrationData.firstName);
      formData.append("lastName", registrationData.lastName);
      formData.append("email", registrationData.email);
      formData.append("phoneNumber", registrationData.phoneNumber);
      formData.append("password", registrationData.password || "");
      formData.append("isNotify", registrationData.isNotify + "" || "");

      const response = await axios.post<UserData>(
        `${BASE_URL}users/register`,
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
      console.error("Error registering user:", error);
      this.error =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
    } finally {
      this.loading = false;
    }
  }

  async verifyOtp(otp: string) {
    this.loading = true;
    this.error = null;
    try {
      if (this.user && this.user.otp === otp) {
        const res = await axios.post(
          `${BASE_URL}users/verifyOtp`,
          {},
          {
            headers: {
              authorization: "Bearer " + this.user.token,
            },
          }
        );
        if (res.status >= 200 && res.status < 300) {
          window.localStorage.setItem("token", this.user.token);
          return true;
        }
      }
      this.error = "Invalid OTP. Please try again.";
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
