import { useMutation } from '@tanstack/react-query';
import { RegisteredResponse, RegisterRequest } from '../types';
import { useToastMessage } from '@/hooks/useToastMessage';
import { registerService } from '../services/auth-service';

 export const useRegisterMutation = () => {
   const {showError,showSuccess } = useToastMessage() 
   return useMutation<RegisteredResponse, Error, RegisterRequest>({
     mutationFn: registerService,
     // Form-specific or mutation-specific errors 
      onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Something went wrong. Please try again.';
        showError(message)
    },
     onSuccess: () =>{
      showSuccess('Register successful');
     }
   });
 }
