import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNavigate } from 'react-router-dom'
import {registerAccount, updateAccount} from "@/api/user.js";
import {useAuth} from "@/contexts/AuthContext.js";
import {useQueryClient} from "react-query";

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [gender, setGender] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const {setToken} = useAuth();
  const queryClient = useQueryClient();

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

    if (!email) newErrors.email = "Email is required"
    if (!address) newErrors.address = "Address is required"
    if (!phone) newErrors.phone = "Phone is required"
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

    const res = await registerAccount({ username: email, email, password})
    await updateAccount(res.jwt, res.user.id, {
      age,
      firstName,
      lastName,
      gender,
      phone,
      address,
      healthcareRole: 'patient'
    })

    sessionStorage.setItem("token", res.jwt);
    setToken(res.jwt);

    navigate('/dashboard')
    await queryClient.invalidateQueries({queryKey: ['user']});
  }

  return (
    <div className="flex items-center justify-center h-full bg-background pt-5">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create a new account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label>Full name</Label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <Input
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName}</span>}
                {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
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
                <Label>Address</Label>
                <Input
                  placeholder="25 Liberty Street, etc"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Phone</Label>
                <Input
                  placeholder="+44 123456789"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="gender">Gender</Label>
                <Select onValueChange={setGender} value={gender}>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select your gender"/>
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && <span className="text-red-500 text-sm">{errors.gender}</span>}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate('/')}>Cancel</Button>
          <Button onClick={handleSubmit}>Register</Button>
        </CardFooter>
      </Card>
    </div>
  )
}