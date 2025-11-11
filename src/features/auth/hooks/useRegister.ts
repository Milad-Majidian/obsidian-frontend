import { toast } from "sonner";
import { useRegisterMutation } from "../api/auth.api";
import { RegisterRequest } from "../types";
import { useToastMessage } from "@/common/hooks/useToastMessage";

export const useRegister = () => {
  const registerMutation = useRegisterMutation();
  const { showSuccess, showError } = useToastMessage();

  const register = async (data: RegisterRequest) => {
    try {
      await registerMutation.mutateAsync(data);
      showSuccess("Registration successful");
    } catch {
      // Error already handled in useRegisterMutation's onError
    }
  };

  return { register, isLoading: registerMutation.isPending };
};
