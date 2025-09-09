import { toast } from "sonner";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useRegisterMutation } from "../api/auth.api";
import { RegisterRequest } from "../types";

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
