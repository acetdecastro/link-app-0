import { FieldError, UseFormRegister } from "react-hook-form";
import FieldErrorMessage from "../field-error-message";

interface EmailFieldProps {
  error?: FieldError;
  register: UseFormRegister<any>;
}

const EmailField: React.FC<EmailFieldProps> = ({ error, register }) => {
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Email
      </label>
      <div className="mt-2">
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="example@email.com"
          required
          className={`block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 shadow-sm ring-1 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 ${
            error
              ? "ring-red-300 ring-inset text-red-900 placeholder:text-red-300 focus:ring-red-500"
              : "ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-gray-600"
          }`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby="email-error"
          {...register("email")}
        />
        {error && (
          <FieldErrorMessage id="email-error" message={error.message} />
        )}
      </div>
    </div>
  );
};

export default EmailField;
