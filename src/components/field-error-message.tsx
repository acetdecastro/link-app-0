interface FieldErrorMessageProps {
  id: string | undefined;
  message: string | null | undefined;
}

const FieldErrorMessage: React.FC<FieldErrorMessageProps> = ({
  id,
  message,
}) => {
  return message ? (
    <div className="mt-2 text-xs font-semibold text-red-600" id={id}>
      {message}.
    </div>
  ) : null;
};

export default FieldErrorMessage;
