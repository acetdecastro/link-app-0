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
import { useState } from "react";
import { toast } from "sonner";
import { LoginFormFields, loginSchema } from "@/validations/login.validation";
import { logIn } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import {
  INVALID_CREDENTIALS,
  SORRY_PLEASE_TRY_AGAIN_LATER,
} from "@/constants/error.messages";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function LoginForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const form = useForm<LoginFormFields>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });
  const { control, getValues } = form;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: (data: LoginFormFields) => logIn(data),
    onError(error) {
      console.error("Login mutation error: ", error);
      toast.error(SORRY_PLEASE_TRY_AGAIN_LATER);
    },
  });

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    // mutation.mutate(data);
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.error) {
      if (res?.error === "CredentialsSignin") {
        toast.error(INVALID_CREDENTIALS);
        return;
      }
      toast.error(SORRY_PLEASE_TRY_AGAIN_LATER);
      return;
    }

    if (res?.ok) {
      router.push("/app/pages");
    }
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2 text-left">
              <h1 className="text-2xl font-bold">Sign in</h1>
            </div>
            <div className="grid gap-4">
              <FormField
                name="email"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>{errors.email?.message}</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                name="password"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input id="password" type="password" {...field} />
                    </FormControl>
                    {/* <FormDescription>{errors.email?.message}</FormDescription> */}
                  </FormItem>
                )}
              ></FormField>

              <Button type="submit" className="w-full">
                {isLoading ? "Loading..." : "Login"}
              </Button>
            </div>
          </form>
        </Form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground select-none">
              Or continue with
            </span>
          </div>
        </div>
        <Button variant="outline" type="button" disabled={isLoading}>
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}{" "}
          Google
        </Button>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
