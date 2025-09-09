// features/common/hooks/useToastMessage.ts
import { toast } from "sonner";
import { CheckCircle, CircleAlert } from "lucide-react";

export const useToastMessage = () => {
  const showSuccess = (message: string) =>
    toast.success(message, {
      icon: <CheckCircle className="text-green-600" />,
      className: "bg-green-100 text-green-800 border border-green-500",
    });

  const showError = (message: string) =>
    toast.error(message, {
      icon: <CircleAlert className="text-red-600" />,
      className: "bg-red-100 text-red-800 border border-red-500",
    });

  return { showSuccess, showError };
};
