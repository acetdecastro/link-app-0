import Logo from "@/components/logo";
import SignupForm from "./components/signup-form";

export const metadata = {
  title: "Sign Up",
};

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center w-full xl:h-full">
      <div className="mt-4 md:mt-0">
        <Logo />
      </div>

      {/* 1st Column with grid-2 */}
      {/* <div className="flex justify-center w-full lg:grid lg:h-full lg:grid-cols-2 xl:h-full"> */}

      {/* <div className="hidden lg:block bg-gradient-to-r from-cyan-100 to-zinc-400"> */}
      {/* <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        /> */}
      {/* </div> */}

      {/* 2nd column */}
      <SignupForm />
    </div>
  );
}
