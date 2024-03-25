import { useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import FieldErrorMessage from "../field-error-message";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

interface ConfirmPasswordFieldProps {
  error?: FieldError;
  register: UseFormRegister<any>;
}

const ConfirmPasswordField: React.FC<ConfirmPasswordFieldProps> = ({
  error,
  register,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
      <label
        htmlFor="confirmPassword"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Confirm password
      </label>
      <div className="relative mt-2">
        <input
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          required
          className={`block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 shadow-sm ring-1 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 ${
            error
              ? "ring-red-300 ring-inset text-red-900 placeholder:text-red-300 focus:ring-red-500"
              : "ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-gray-600"
          }`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby="confirm-password-error"
          {...register("confirmPassword")}
        />

        <div
          className="pointer-events-auto absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <EyeSlashIcon
              className="h-5 w-5 text-gray-500"
              aria-hidden="true"
            />
          ) : (
            <EyeIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
          )}
        </div>
      </div>

      {error ? (
        <FieldErrorMessage
          id="confirm-password-error"
          message={error.message}
        />
      ) : null}
    </div>
  );
};

export default ConfirmPasswordField;
