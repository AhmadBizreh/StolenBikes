import toast from "react-hot-toast";
import { AxiosError } from "axios";

interface ErrorResponse {
  error: string;
}

const handleError = (err: AxiosError) => {
  const errorMessage =
    (err.response?.data as ErrorResponse)?.error ||
    "An unexpected error occurred";
  toast.error(errorMessage);
};

export default handleError;
