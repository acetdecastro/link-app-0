import { API_URL } from "@/constants/urls";
import { LoginFormFields } from "@/validations/login.validation";
import axios from "axios";

export default function login(data: LoginFormFields) {
  return axios.post(`${API_URL}/auth/login`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
