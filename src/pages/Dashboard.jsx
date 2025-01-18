import {useEffect} from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {useAuth} from "@/contexts/AuthContext.js";
import {useNavigate} from "react-router-dom";
import {useQuery, useQueryClient} from "react-query";
import {getAppointments, updateAppointment} from "@/api/appointment.js";
import {Navbar} from "@/components/Navbar.jsx";
import {createMessage} from "@/api/message.js";

export default function Dashboard() {
  const {token, userQuery} = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!token) {
      navigate('/')
    }
  })

  const query = useQuery({
    queryKey: ['appointments'],
    queryFn: () => getAppointments(token),
  });

  const cancelAppointment = async (id) => {
    await updateAppointment(token, id, { appointmentStatus: "Cancelled"})
    await createMessage(token, { type: 'cancelled', appointment: id, user: userQuery.data?.id })
    await queryClient.invalidateQueries({queryKey: ['appointments']})
    await queryClient.invalidateQueries({queryKey: ['messages']})
  }

  const getBadgeVariant = (status) => {
    switch (status) {
      case 'Upcoming':
        return 'default'
      case 'Cancelled':
        return 'destructive'
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Patient Portal</h1>
        <Card>
          <CardHeader>
            <CardTitle>Welcome back, {userQuery.data?.firstName}!</CardTitle>
            <CardDescription>View and manage your upcoming and past appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              {query.data?.length !== 0 ? query.data?.filter(item => item.patient.id === userQuery.data.id)
                .map(appointment => (
                  <div key={appointment.id} className="mb-4 p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3
                        className="font-semibold">{`Dr. ${appointment.doctor?.firstName} ${appointment.doctor?.lastName}`}</h3>
                      <Badge variant={getBadgeVariant(appointment.appointmentStatus)}>
                        {appointment.appointmentStatus}
                      </Badge>
                    </div>
                    <p>Date: {new Intl.DateTimeFormat('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }).format(new Date(appointment.date))}</p>
                    <p>
                      Time: {appointment.time}
                    </p>
                    {appointment.appointmentStatus === 'Upcoming' && (
                      <Button
                        variant="destructive"
                        className="mt-2"
                        onClick={() => cancelAppointment(appointment.documentId)}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                )) : <p>No upcoming appointments.</p>}
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