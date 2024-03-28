"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import {
  SORRY_PLEASE_TRY_AGAIN_LATER,
  INVALID_CREDENTIALS,
} from "@/constants/error.messages";
import {
  SignupFormFields,
  signupSchema,
} from "@/validations/signup.validation";
import { signUp } from "@/services/auth.service";
import { signIn } from "next-auth/react";
import NameField from "@/components/inputs/name.field";
import { Link } from "@/components/link";
import UsernameField from "@/components/inputs/username.field";
import PasswordField from "@/components/inputs/password.field";
import EmailField from "@/components/inputs/email.field";

interface SignupFormProps {}

const SignupForm: React.FC<SignupFormProps> = ({}) => {
  const signupForm = useForm<SignupFormFields>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = signupForm;

  const mutation = useMutation({
    mutationFn: (data: SignupFormFields) => signUp(data),
    onError(error) {
      console.error("Signup mutation error: ", error);
      toast.error(SORRY_PLEASE_TRY_AGAIN_LATER);
    },
    async onSuccess() {
      // TODO:
      // 1. Email verification workflow
      await signIn("credentials", {
        email: getValues("email"),
        password: getValues("password"),
        redirect: true,
        callbackUrl: "http://localhost:3000/app/pages",
      });
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
                Terms & conditions
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
              className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 disabled:cursor-not-allowed"
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
