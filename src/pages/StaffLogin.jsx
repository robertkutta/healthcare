import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useNavigate } from 'react-router-dom'
import {useForm} from "react-hook-form";
import {useAuth} from "@/contexts/AuthContext.js";
import {useMutation, useQueryClient} from "react-query";
import {loginAccount} from "@/api/user.js";

export function StaffLogin() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const [disabled, setDisabled] = useState(false)

    const { setToken } = useAuth();
    const queryClient = useQueryClient();

    const loginMutation = useMutation({
        mutationKey: ['user'],
        mutationFn: loginAccount,
        onSuccess: async (response) => {
            if (!response) {
                setError(true);
                setDisabled(false);
            } else {
                if (error) setError(false);
                setDisabled(false);

                if (!response.user.confirmed) {
                    setError(true)
                    return
                }

                sessionStorage.setItem("token", response.jwt);
                setToken(response.jwt);

                await queryClient.invalidateQueries({queryKey: ['user']});

                navigate('/staffpage');
            }
        },
        onError: () => {
            setError(true);
            setDisabled(false);
        },
    });

    function handleLogin(data) {
        setDisabled(true);
        const { id, password } = data;

        console.log(data)

        loginMutation.mutate({ identifier: id, password });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Staff Login</CardTitle>
                    <CardDescription className="text-center">Enter your ID and password to access your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit((data) => handleLogin(data))}>
                    {error && <div className="text-red-600 text-center">{error}</div>} {/* Error message */}
                    <div className="space-y-2">
                        <Label htmlFor="ID">ID</Label>
                        <Input 
                            id="ID" 
                            type="text" 
                            placeholder="123456789"
                            {...register("id", {required: true})}
                            required 
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input 
                            id="password" 
                            type="password" 
                            placeholder="123456789"
                            {...register("password", {required: true})}
                            required 
                        />
                    </div>
                            <Button disabled={disabled} className="w-full mt-5" type="submit">
                                Login
                            </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}