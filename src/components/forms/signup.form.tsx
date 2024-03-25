"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
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
import {
  SignupFormFields,
  signupSchema,
} from "@/validations/signup.validation";
import { signUp } from "@/services/auth.service";
import ConfirmPasswordField from "../inputs/confirm-password.field";
import UsernameField from "../inputs/username.field";

interface SignupFormProps {}

const SignupForm: React.FC<SignupFormProps> = ({}) => {
  const signupForm = useForm<SignupFormFields>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
  } = signupForm;

  const mutation = useMutation({
    mutationFn: (data: SignupFormFields) => signUp(data),
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

  const onSubmit: SubmitHandler<SignupFormFields> = async (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      <FormProvider {...signupForm}>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <EmailField error={errors.email} register={register} />
          <UsernameField error={errors.username} register={register} />
          <PasswordField error={errors.password} register={register} />
          <ConfirmPasswordField
            error={errors.confirmPassword}
            register={register}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="terms-n-conditions"
                name="terms-n-conditions"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-600"
              />
              <label
                htmlFor="terms-n-conditions"
                className="ml-3 block cursor-pointer text-sm leading-6 text-gray-600"
              >
                Terms & Conditions
              </label>
            </div>

            <div className="text-sm leading-6">
              <Link
                href="/login"
                className="font-semibold text-gray-600 hover:text-gray-400"
              >
                {`Already have an account?`}
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 disabled:cursor-not-allowed "
              disabled={isSubmitting}
            >
              {isSubmitting ? "..." : "Sign up"}
            </button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default SignupForm;
