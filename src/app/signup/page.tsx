import Logo from "@/components/logo";
import LoginForm from "@/components/forms/login.form";
import SignupForm from "@/components/forms/signup.form";

export const metadata = {
  title: "Sign Up",
  description: "See my links!",
};

export default function SignUp() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Logo />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow-lg sm:rounded-lg sm:px-12">
            <SignupForm />
          </div>
        </div>
      </div>
    </>
  );
}