import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, Calendar, MessageSquare, User } from 'lucide-react'

export default function Dashboard() {
  const [appointments, setAppointments] = useState([
    { id: 1, date: '2025-01-08', time: '2:00 PM', doctor: 'Dr. John Smith', status: 'Upcoming' },
    { id: 2, date: '2024-12-20', time: '2:00 PM', doctor: 'Dr. John Smith', status: 'Cancelled' },
    { id: 3, date: '2023-06-10', time: '11:00 AM', doctor: 'Dr. Maple', status: 'Completed' },
  ])


  const cancelAppointment = (id) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === id ? { ...appointment, status: 'Cancelled' } : appointment
    ))
  }

  const getBadgeVariant = (status) => {
    switch (status) {
      case 'Upcoming':
        return 'default'
      case 'Cancelled':
        return 'destructive'
      case 'Completed':
        return 'secondary'
      default:
        return 'default'
    }
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
            className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg bg-gray-100"
          >
            <Home className="w-4 h-4" />
            Home
          </a>
          <a 
            href="/appointment" 
            className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-gray-100"
          >
            <Calendar className="w-4 h-4" />
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
        <h1 className="text-3xl font-bold mb-6">Patient Portal</h1>
        <Card>
          <CardHeader>
            <CardTitle>Welcome back, David!</CardTitle>
            <CardDescription>View and manage your upcoming and past appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              {appointments.map(appointment => (
                <div key={appointment.id} className="mb-4 p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{appointment.doctor}</h3>
                    <Badge variant={getBadgeVariant(appointment.status)}>
                      {appointment.status}
                    </Badge>
                  </div>
                  <p>Date: {appointment.date}</p>
                  <p>Time: {appointment.time}</p>
                  {appointment.status === 'Upcoming' && (
                    <Button 
                      onClick={() => cancelAppointment(appointment.id)}
                      variant="destructive"
                      className="mt-2"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <a href="/Appointment">
              <Button className="w-full">Book New Appointment</Button>
            </a>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}