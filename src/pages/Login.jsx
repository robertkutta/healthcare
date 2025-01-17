import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"

export function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({})
    const navigate = useNavigate() 

    const handleValidation = () => {
        const newErrors = {}
        if (!email) newErrors.email = "Email is required"
        if (!password) newErrors.password = "Password is required"
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!handleValidation()) return
        console.log("Logging in with:", { email, password })
        navigate("/dashboard")
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
                    <CardDescription className="text-center">
                        Enter your email and password to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                aria-describedby="email-error"
                            />
                            {errors.email && <span id="email-error" className="text-red-500 text-sm">{errors.email}</span>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                aria-describedby="password-error"
                            />
                            {errors.password && <span id="password-error" className="text-red-500 text-sm">{errors.password}</span>}
                        </div>
                        <Button type="submit" className="w-full">Login</Button>
                    </form>
                </CardContent>
                <CardFooter className="text-center">
                    <div className="text-sm text-gray-500">
                        Don&apos;t have an account?{' '}
                        <a href="/register" className="text-primary hover:underline">Register here</a>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}