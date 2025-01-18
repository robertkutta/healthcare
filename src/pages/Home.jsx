import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Lock } from 'lucide-react'
import { Footer } from "@/components/Footer"
import { useAuth } from "@/contexts/AuthContext"
import {useMutation, useQueryClient} from "react-query";
import {loginAccount} from "@/api/user.js";
import {useForm} from "react-hook-form";

export default function Home() {
  const {register, handleSubmit, formState: {errors}} = useForm();
  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState(false);
  const navigate = useNavigate()

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

        navigate('/dashboard');
      }
    },
    onError: () => {
      setError(true);
      setDisabled(false);
    },
  });

  function handleLogin(data) {
    setDisabled(true);
    const { email, password } = data;

    console.log(data)

    loginMutation.mutate({ identifier: email, password });
  }

  return (
    <div className="h-full flex flex-col">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0">
              <img src="/kccpic.png" alt="Clinic" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black opacity-20"></div>
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center text-center p-4 py-24">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Welcome to King&apos;s Cross Care
              </h1>
              <p className="text-xl text-white mb-8">
                We&apos;re here to help you feel your best
              </p>
              <form onSubmit={handleSubmit((data) => handleLogin(data))}
                    className="w-full max-w-md space-y-6 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-md p-8 rounded-lg shadow-xl">
                <div className="relative space-y-2">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="pl-10 pr-4 py-3 w-full bg-white/50 border-0 rounded-md focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out"
                    aria-describedby="email-error"
                    required
                    {...register("email", {required: true})}
                  />
                  {errors.email && <span id="email-error" className="text-red-500 text-sm">{errors.email}</span>}
                </div>
                <div className="relative space-y-2">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    className="pl-10 pr-4 py-3 w-full bg-white/50 border-0 rounded-md focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out"
                    aria-describedby="password-error"
                    required
                    {...register("password", {required: true})}
                  />
                  {errors.password &&
                    <span id="password-error" className="text-red-500 text-sm">{errors.password}</span>}
                </div>
                <Button disabled={disabled} type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md transition-colors duration-300">
                  Sign in
                </Button>
                <div className="text-sm text-gray-500">
                  Don&apos;t have an account?{' '}
                  <a href="/register" className="text-primary hover:underline">Register here</a>
                </div>
                {error && <span id="password-error" className="text-red-500 text-sm py-4">Login failed, try again</span>}
              </form>
            </div>
          </div>
        </div>
        <Footer/>
      </main>
    </div>
  )
}