"use client";

import { Icons } from "@/components/icons";
import { Link } from "@/components/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { toast } from "@/components/ui/use-toast";
import { z, ZodType } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { logIn, signUp } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import {
  INVALID_CREDENTIALS,
  SORRY_PLEASE_TRY_AGAIN_LATER,
} from "@/constants/error.messages";
import { signIn } from "next-auth/react";
import {
  SignupFormFields,
  signupSchema,
} from "@/validations/signup.validation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function SignupForm({ className, ...props }: UserAuthFormProps) {
  const form = useForm<SignupFormFields>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors, isSubmitting },
  } = form;
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    console.log(data);
    mutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <Form {...form}>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2 text-left">
              <h1 className="text-2xl font-bold">Create your account</h1>
            </div>
            <div className="grid gap-4">
              <FormField
                name="email"
                // control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="email"
                      className={`${errors?.email ? "text-gray-900" : ""}`}
                    >
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>{errors.email?.message}</FormDescription> */}
                    <FormMessage className="text-red-600 text-xs font-semibold" />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                name="password"
                // control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="password"
                      className={`${errors?.password ? "text-gray-900" : ""}`}
                    >
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input id="password" type="password" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-600 text-xs font-semibold" />
                  </FormItem>
                )}
              ></FormField>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <span>Sign up</span>
                )}
              </Button>
            </div>
          </form>
        </Form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground select-none font-semibold">
              Or sign up with
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          type="button"
          disabled={true}
          onClick={() => setIsLoading(!isLoading)}
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}{" "}
          Google
        </Button>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
