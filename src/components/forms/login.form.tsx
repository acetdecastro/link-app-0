"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormFields, loginSchema } from "@/validations/login.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import EmailField from "../inputs/email.field";
import PasswordField from "../inputs/password.field";
import { Link } from "../link";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import {
  SOMETHING_WENT_WRONG,
  THESE_CREDENTIALS_DO_NOT_MATCH_OUR_RECORDS,
} from "@/constants/error.messages";
import { logIn } from "@/services/auth.service";

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = ({}) => {
  const loginForm = useForm<LoginFormFields>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
  } = loginForm;

  const mutation = useMutation({
    mutationFn: (data: LoginFormFields) => logIn(data),
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(
          error?.response?.data?.message ||
            THESE_CREDENTIALS_DO_NOT_MATCH_OUR_RECORDS
        );
      } else {
        console.error("Login mutation error: ", error);
        toast.error(SOMETHING_WENT_WRONG);
      }
    },
  });

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    mutation.mutate(data);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <EmailField error={errors.email} register={register} />
      <PasswordField error={errors.password} register={register} />

      <div className="flex items-center">
        <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-600"
        />
        <label
          htmlFor="remember-me"
          className="ml-3 block cursor-pointer text-sm leading-6 text-gray-600"
        >
          Remember me
        </label>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm leading-6">
          <Link
            href="/signup"
            className="font-semibold text-gray-600 hover:text-gray-400"
          >
            {`Don't have an account?`}
          </Link>
        </div>

        <div className="text-sm leading-6">
          <Link
            href="/"
            className="font-semibold text-gray-600 hover:text-gray-400"
          >
            {`Forgot password?`}
          </Link>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 disabled:cursor-not-allowed "
          disabled={isSubmitting}
        >
          {isSubmitting ? "..." : "Log in"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
