import { FieldError, UseFormRegister } from "react-hook-form";
import FieldErrorMessage from "../field-error-message";

interface UsernameFieldProps {
  error?: FieldError;
  register: UseFormRegister<any>;
}

const UsernameField: React.FC<UsernameFieldProps> = ({ error, register }) => {
  return (
    <div>
      <label
        htmlFor="username"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Username
      </label>
      <div className="mt-2">
        <div
          className={`flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset sm:max-w-md ${
            error
              ? "ring-red-300 ring-inset text-red-900 placeholder:text-red-300 focus:ring-red-500"
              : "ring-gray-300 ring-inset placeholder:text-gray-400 focus-within:ring-gray-600"
          }`}
        >
          <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
            sea.link/
          </span>
          <input
            type="text"
            id="username"
            placeholder="yourusername"
            autoComplete="off"
            className={`block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${
              error
                ? "ring-red-300 ring-inset text-red-900 placeholder:text-red-300 focus:ring-red-500"
                : "ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-gray-600"
            }`}
            aria-invalid={error ? "true" : "false"}
            aria-describedby="username-error"
            {...register("username")}
          />
        </div>
        {error && (
          <FieldErrorMessage id="username-error" message={error?.message} />
        )}
      </div>
    </div>
  );
};

export default UsernameField;
