import { API_AUTH_URL } from "@/constants/urls";
import { LoginFormFields } from "@/validations/login.validation";
import { SignupFormFields } from "@/validations/signup.validation";
import axios from "axios";

function createPage(data: LoginFormFields) {
  return axios.post(`${API_AUTH_URL}/login`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function updatePage(data: SignupFormFields) {
  return axios.post(`${API_AUTH_URL}/signup`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export { createPage, updatePage };
