import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [gender, setGender] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const router = useNavigate()

  const calculateAge = (year, month, day) => {
    const today = new Date()
    const birthDate = new Date(year, month - 1, day)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDifference = today.getMonth() - birthDate.getMonth()
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
    return passwordRegex.test(password)
  }

  const handleValidation = () => {
    const newErrors = {}
    const age = calculateAge(parseInt(year), parseInt(month), parseInt(day))

    if (!name) newErrors.name = "Name is required"
    if (!email) newErrors.email = "Email is required"
    if (!password) {
      newErrors.password = "Password is required"
    } else if (!isPasswordValid(password)) {
      newErrors.password = "Password must be at least 8 characters, include 1 uppercase, 1 lowercase, 1 number, and 1 symbol"
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (password !== confirmPassword) {
      newErrors.passwordMatch = "Passwords do not match"
    }
    if (!day || !month || !year) {
      newErrors.dob = "Date of Birth is required"
    } else if (age > 125 || age < 0) {
      newErrors.dob = "Please enter a valid date of birth (cannot be more than 125 years old)"
    }
    if (!gender) newErrors.gender = "Gender is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!handleValidation()) {
      return
    }
    const age = calculateAge(parseInt(year), parseInt(month), parseInt(day))
    console.log('Registering with:', { name, email, password, dateOfBirth: `${year}-${month}-${day}`, gender, age })
    router.push('/dashboard')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create a new account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
                {errors.passwordMatch && <span className="text-red-500 text-sm">{errors.passwordMatch}</span>}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Date of Birth</Label>
                <div className="flex space-x-2">
                  <Input 
                    placeholder="DD"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    maxLength={2}
                  />
                  <Input 
                    placeholder="MM"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    maxLength={2}
                  />
                  <Input 
                    placeholder="YYYY"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    maxLength={4}
                  />
                </div>
                {errors.dob && <span className="text-red-500 text-sm">{errors.dob}</span>}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="gender">Gender</Label>
                <Select onValueChange={setGender} value={gender}>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.sex && <span className="text-red-500 text-sm">{errors.sex}</span>}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push('/login')}>Cancel</Button>
          <Button onClick={handleSubmit}>Register</Button>
        </CardFooter>
      </Card>
    </div>
  )
}