import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from '@/components/ui/textarea'
import { format } from 'date-fns'
import { Home, Calendar1, MessageSquare, User } from 'lucide-react'


export default function Appointment() {
  const [date, setDate] = useState(new Date())
  const [selectedDoctor, setSelectedDoctor] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [confirmationMessage, setConfirmationMessage] = useState("")


  const doctors = {
    "dr-maple": "Dr. Maple",
    "dr-brown": "Dr. Brown",
    "dr-smith": "Dr. Smith"
  }

  useEffect(() => {
    if (date && selectedDoctor && selectedTime) {
      setConfirmationMessage(
        `You are booking an appointment for ${format(date, 'MMMM d, yyyy')} at ${selectedTime} with ${doctors[selectedDoctor]}.`
      )
    } else {
      setConfirmationMessage("")
    }
  }, [date, doctors, selectedDoctor, selectedTime])

  const handleBooking = () => {
    console.log("Booking appointment for:", { date, selectedDoctor, selectedTime })
    // Here you would typically send this data to your backend
    alert("Appointment booked successfully!")
  }


  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <aside className="w-64 p-6 bg-white border-r flex flex-col">
        <div className="mb-8">
          <h2 className="text-xl font-semibold">David Smith</h2>
          <p className="text-sm text-muted-foreground">Male</p>
          <p className="text-sm text-muted-foreground">35 years old</p>
        </div>
        <nav className="space-y-2 flex-grow">
          <a 
            href="/dashboard" 
            className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-gray-100"
          >
            <Home className="w-4 h-4" />
            Home
          </a>
          <a 
            href="/appointment" 
            className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg bg-gray-100"
          >
            <Calendar1 className="w-4 h-4" />
            Appointments
          </a>
          <a 
            href="/messages" 
            className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-gray-100"
          >
            <MessageSquare className="w-4 h-4" />
            Messages
          </a>
          <a 
            href="/profilepage" 
            className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-gray-100"
          >
            <User className="w-4 h-4" />
            Profile
          </a>
        </nav>
      </aside>

      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Book A New Appointment</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
              <CardDescription>Choose a date for your appointment</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border w-[280px]"
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
              <CardDescription>Select your preferred doctor and time</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="doctor">Doctor</Label>
                <Select onValueChange={setSelectedDoctor}>
                  <SelectTrigger id="doctor">
                    <SelectValue placeholder="Select a doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr-smith">Dr. Smith</SelectItem>
                    <SelectItem value="dr-brown">Dr. Brown</SelectItem>
                    <SelectItem value="dr-maple">Dr. Maple</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Select onValueChange={setSelectedTime}>
                  <SelectTrigger id="time">
                    <SelectValue placeholder="Select a time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">09:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="14:00">02:00 PM</SelectItem>
                    <SelectItem value="15:00">03:00 PM</SelectItem>
                    <SelectItem value="16:00">04:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="details">Details</Label>
                <Textarea id="details" placeholder="Enter your request here." className="focus:placeholder-transparent"></Textarea>
              </div>
              {confirmationMessage && (
                <div className="mt-4 p-4 bg-gray-100 text-black rounded-md" role="alert">
                  {confirmationMessage}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleBooking} disabled={!date || !selectedDoctor || !selectedTime}>
                Book Appointment
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}