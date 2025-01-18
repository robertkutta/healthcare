import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { format } from 'date-fns'
import {useAuth} from "@/contexts/AuthContext.js";
import {useNavigate} from "react-router-dom";
import {useQuery} from "react-query";
import {getUsers} from "@/api/user.js";
import {createAppointment} from "@/api/appointment.js";
import {StaffNav} from "@/components/StaffNav.jsx";

export default function StaffAppointments() {
  const [date, setDate] = useState(new Date())
  const [selectedDoctor, setSelectedDoctor] = useState("")
  const [selectedPatient, setSelectedPatient] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [confirmationMessage, setConfirmationMessage] = useState("")

  const {token} = useAuth();
  const navigate = useNavigate();

  const doctorQuery = useQuery({
    queryKey: ['doctors'],
    queryFn: () => getUsers(token),
  });

  const doctors = doctorQuery.data?.filter(d => d.healthcareRole === 'doctor').map((doctor) => { return { value: doctor.id, label: `Dr. ${doctor.lastName}`} })
  const patients = doctorQuery.data?.filter(d => d.healthcareRole === 'patient').map((patient) => { return { value: patient.id, label: `${patient.firstName} ${patient.lastName}`} })

  const regularTimes = ["09:00", "10:00", "11:00", "01:00", "02:00", "03:00", "04:00"]

  useEffect(() => {
    if (date && selectedDoctor && selectedTime) {
      setConfirmationMessage(
        `You are booking an appointment for ${format(date, 'MMMM d, yyyy')} at ${selectedTime} with ${doctors.find(d => d.value === selectedDoctor).label}.`
      )
    } else {
      setConfirmationMessage("")
    }
  }, [date, doctors, selectedDoctor, selectedTime])

  const handleBooking = async () => {
    alert("Appointment booked successfully!")

    let newAppointment = {
      date: date,
      time: `${selectedTime}:00`,
      doctor: selectedDoctor,
      patient: selectedPatient,
      appointmentStatus: 'Upcoming'
    };

    await createAppointment(token, newAppointment);
    navigate('/staffpage');
  }

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <StaffNav/>
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Add A New Appointment</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                className="rounded-md border w-[280px]"
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
              <CardDescription>Select the doctor and time</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="doctor">Doctor</Label>
                <Select onValueChange={setSelectedDoctor}>
                  <SelectTrigger id="doctor">
                    <SelectValue placeholder="Select a doctor"/>
                  </SelectTrigger>
                  <SelectContent>
                    {doctors?.map(doctor =>
                      <SelectItem key={doctor.value} value={doctor.value}>{doctor.label}</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Select onValueChange={setSelectedTime}>
                  <SelectTrigger id="time">
                    <SelectValue placeholder="Select a time"/>
                  </SelectTrigger>
                  <SelectContent>
                    {regularTimes.map(time =>
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="patient">Patient</Label>
                <Select onValueChange={setSelectedPatient}>
                  <SelectTrigger id="patient">
                    <SelectValue placeholder="Select a patient"/>
                  </SelectTrigger>
                  <SelectContent>
                    {patients?.map(patient =>
                      <SelectItem key={patient.value} value={patient.value}>{patient.label}</SelectItem>
                    )}
                  </SelectContent>
                </Select>
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

