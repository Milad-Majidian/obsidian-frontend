import { toast } from "sonner";
import { useLoginMutation } from "../api/auth.api";
import { LoginRequest } from "../types";
import { useToastMessage } from "@/hooks/useToastMessage";

export const useLogin = () => {
  const loginMutation = useLoginMutation();
  const { showSuccess, showError } = useToastMessage();

  const login = async (data: LoginRequest) => {
    try {
      await loginMutation.mutateAsync(data);
    //   showSuccess("Login successful 🎉");
    } catch {
      // Error already handled in useLoginMutation's onError
    }
  };

  return { login, isLoading: loginMutation.isPending };
};
