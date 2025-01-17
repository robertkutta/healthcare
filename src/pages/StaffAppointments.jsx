import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { format } from 'date-fns'
import { Search, Home, Clock, Users, UserCog, Settings, HelpCircle, MessageSquare } from 'lucide-react'

// Mock data for patients
const mockPatients = [
  { id: 1, name: "David Smith", email: "david@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com" },
]

export default function StaffAppointments() {
  const [date, setDate] = useState(new Date())
  const [selectedDoctor, setSelectedDoctor] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [confirmationMessage, setConfirmationMessage] = useState("")
  const [patientSearch, setPatientSearch] = useState("")
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [filteredPatients, setFilteredPatients] = useState([])
  const [appointmentDetails, setAppointmentDetails] = useState("")

  useEffect(() => {
    if (date && selectedDoctor && selectedTime && selectedPatient) {
      setConfirmationMessage(
        `Booking an appointment for ${selectedPatient.name} on ${format(date, 'MMMM d, yyyy')} at ${selectedTime} with ${selectedDoctor}.`
      )
    } else {
      setConfirmationMessage("")
    }
  }, [date, selectedDoctor, selectedTime, selectedPatient])

  useEffect(() => {
    const filtered = mockPatients.filter(patient =>
      patient.name.toLowerCase().includes(patientSearch.toLowerCase())
    )
    setFilteredPatients(filtered)
  }, [patientSearch])

  const handleBooking = () => {
    console.log("Booking appointment for:", { date, selectedDoctor, selectedTime, patient: selectedPatient, details: appointmentDetails })
    // Here you would typically send this data to your backend
    alert("Appointment booked successfully!")
  }

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <aside className="w-64 p-6 bg-white border-r">
        <div className="flex flex-col h-full">
          <div className="mb-8">
            <h2 className="text-xl font-semibold">Admin</h2>
          </div>
          <nav className="space-y-2">
            <a 
              href="/staffpage" 
              className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-gray-100"
            >
              <Home className="w-4 h-4" />
              Home
            </a>
            <a 
              href="/staffappointments" 
              className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg bg-gray-100"
            >
              <Clock className="w-4 h-4" />
              Appointments
            </a>
            <a 
              href="/staffpatients" 
              className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-gray-100"
            >
              <Users className="w-4 h-4" />
              Patients
            </a>
            <a 
              href="/staffstaff" 
              className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-gray-100"
            >
              <UserCog className="w-4 h-4" />
              Staff
            </a>
          </nav>
          <nav className="mt-auto pt-6 space-y-2">
            <a 
              href="/settings" 
              className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-gray-100"
            >
              <Settings className="w-4 h-4" />
              Settings
            </a>
            <a 
              href="/feedback" 
              className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-gray-100"
            >
              <MessageSquare className="w-4 h-4" />
              Feedback
            </a>
            <a 
              href="/help" 
              className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-gray-100"
            >
              <HelpCircle className="w-4 h-4" />
              Help & Docs
            </a>
          </nav>
        </div>
      </aside>


      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Book New Appointment</h1>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Patient</CardTitle>
                <CardDescription>Search and select a patient for the appointment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search patients..."
                      value={patientSearch}
                      onChange={(e) => setPatientSearch(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  {patientSearch && (
                    <ul className="mt-2 space-y-2">
                      {filteredPatients.map((patient) => (
                        <li key={patient.id}>
                          <Button
                            variant="outline"
                            className="w-full justify-start"
                            onClick={() => setSelectedPatient(patient)}
                          >
                            {patient.name} - {patient.email}
                          </Button>
                        </li>
                      ))}
                    </ul>
                  )}
                  {selectedPatient && (
                    <div className="mt-4 p-4 bg-muted rounded-md">
                      <h3 className="font-semibold">Selected Patient:</h3>
                      <p>{selectedPatient.name} - {selectedPatient.email}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Select Date</CardTitle>
                <CardDescription>Choose a date for the appointment</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
              <CardDescription>Select the doctor, time, and add details for the appointment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="doctor">Doctor</Label>
                  <Select onValueChange={setSelectedDoctor} value={selectedDoctor}>
                    <SelectTrigger id="doctor">
                      <SelectValue placeholder="Select a doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dr. Smith">Dr. Smith</SelectItem>
                      <SelectItem value="Dr. Johnson">Dr. Johnson</SelectItem>
                      <SelectItem value="Dr. Brown">Dr. Brown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Select onValueChange={setSelectedTime} value={selectedTime}>
                    <SelectTrigger id="time">
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00 AM">09:00 AM</SelectItem>
                      <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                      <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                      <SelectItem value="02:00 PM">02:00 PM</SelectItem>
                      <SelectItem value="03:00 PM">03:00 PM</SelectItem>
                      <SelectItem value="04:00 PM">04:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="details">Appointment Details</Label>
                <Textarea
                  id="details"
                  placeholder="Enter any additional details or notes for the appointment"
                  value={appointmentDetails}
                  onChange={(e) => setAppointmentDetails(e.target.value)}
                  rows={4}
                />
              </div>
              {confirmationMessage && (
                <div className="mt-4 p-4 bg-blue-100 text-blue-800 rounded-md" role="alert">
                  {confirmationMessage}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={handleBooking}
                disabled={!date || !selectedDoctor || !selectedTime || !selectedPatient}
              >
                Book Appointment
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

