import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Home, Clock, Users, UserCog, Settings, HelpCircle, MessageSquare } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export default function StaffPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [appointments, setAppointments] = useState([
    { id: 1, patient: 'David Smith', date: '2025-01-08', time: '2:00 PM', doctor: 'John Smith', status: 'Confirmed' },
    { id: 2, patient: 'David Smith', date: '2024-12-20', time: '9:00 AM', doctor: 'John Smith', status: 'Cancelled' },
    { id: 3, patient: 'Peter Lee', date: '2025-01-08', time: '10:30 AM', doctor: 'Sarah Brown', status: 'Confirmed' },
  ])


  const filteredAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date)
    return (
      appointmentDate.toDateString() === selectedDate.toDateString() &&
      appointment.patient.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const cancelAppointment = (id) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === id ? { ...appointment, status: 'Cancelled' } : appointment
    ))
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 p-6 bg-white border-r flex flex-col">
        <div className="mb-8">
          <h2 className="text-xl font-semibold">Admin</h2>
        </div>
        <nav className="space-y-2 flex-1">
          <a 
            href="/staffpage" 
            className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg bg-gray-100"
          >
            <Home className="w-4 h-4" />
            Home
          </a>
          <a 
            href="/staffappointments" 
            className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-gray-100"
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

        <nav className="space-y-2 mt-auto">
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
      </aside>

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-5">Appointments</h1>
          <div className="flex items-center space-x-4">
            <p className="text-sm text-gray-500">View appointments for:</p>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="MMMM d, yyyy"
              className="px-3 py-2 border rounded"
            />
          </div>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input
            className="pl-10"
            placeholder="Search appointments"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="font-medium">{appointment.patient}</TableCell>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>{appointment.doctor}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{appointment.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  {appointment.status !== 'Cancelled' && (
                    <Button 
                      onClick={() => cancelAppointment(appointment.id)} 
                      variant="destructive" 
                      size="sm"
                      className="mr-2"
                    >
                      Cancel
                    </Button>
                  )}
                  <Button variant="outline" className="ml-2">
                    View profile
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  )
}