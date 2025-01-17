import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useNavigate } from 'react-router-dom'

export function StaffLogin() {
    const [ID, setID] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleLogin = () => {
        if (!ID || !password) {
            setError("Both fields are required")
            return
        }

        setError("")
        
        // Simulate a successful login and navigate to the staff page
        // backend for authentication
        alert("Login successful!")
        
        // Navigate to /staffpage after successful login
        navigate('/staffpage') 
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Staff Login</CardTitle>
                    <CardDescription className="text-center">Enter your ID and password to access your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {error && <div className="text-red-600 text-center">{error}</div>} {/* Error message */}
                    <div className="space-y-2">
                        <Label htmlFor="ID">ID</Label>
                        <Input 
                            id="ID" 
                            type="text" 
                            placeholder="123456789" 
                            value={ID} 
                            onChange={(e) => setID(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input 
                            id="password" 
                            type="password" 
                            placeholder="123456789" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button className="w-full" onClick={handleLogin}>
                        Login
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}