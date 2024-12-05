import { UseFormSetError } from "react-hook-form";
import axios from "axios";
import { LoginForm, RegistrationForm } from "../shared/types";

type AuthForm = LoginForm | RegistrationForm;

export const useAuthErrors = (setError: UseFormSetError<AuthForm>) => {
  const handleAuthError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const errorMessage = error.response?.data.message;

      if (errorMessage === "Email or password not found" && status === 401) {
        setError("password", { type: "manual", message: "Password or email is incorrect" });
      } else if (errorMessage === "Email already registered.") {
        setError("email", { type: "manual", message: "Email is already registered" });
      } else if (errorMessage === "Account is blocked.") {
        setError("email", { type: "manual", message: "Account is blocked" });
      } else {
        setError("email", { type: "manual", message: "An unexpected error occurred" });
      }
    } else {
      setError("email", { type: "manual", message: "Internal server error" });
    }
  };

  return { handleAuthError };
};
