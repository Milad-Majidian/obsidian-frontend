import { toast } from 'sonner'
import { useLoginMutation } from '../api/auth.api'
import { LoginRequest } from '../types'

export const useLogin = () => {
    const loginMutation = useLoginMutation()

    const login = async(data:LoginRequest) => {
        try{
            await loginMutation.mutateAsync(data)
            toast.success('Login successful')
        } catch(error: any) {
            toast.error(error.message)
        }
    }

    return { login, isLoading: loginMutation.isPending }

}