import { Card, CardContent } from "@/components/ui/card"
import {Navbar} from "@/components/Navbar.jsx";
import {useQuery} from "react-query";
import {useAuth} from "@/contexts/AuthContext.js";
import {getMessages} from "@/api/message.js";

const ConfirmedCard = (appointment) => {
  return (
    <Card>
      <CardContent>
        <div className="p-4 border rounded-lg bg-gray-100 mt-6">
          <h3 className="font-semibold mb-2">Appointment Confirmed</h3>
          <p className="text-sm mb-2">You have an appointment scheduled
            with {appointment.appointment.doctor?.firstName} {appointment.appointment.doctor?.lastName} on:</p>
          <p className="font-bold text-lg mb-4">{appointment.appointment.date} at {appointment.appointment.time}</p>
          <p className="text-sm">Please arrive 15 minutes earlier. If you need to cancel, please use the Home page.</p>
        </div>
      </CardContent>
    </Card>
  )
}

const CancelledCard = (appointment) => {
  return (
    <Card>
      <CardContent>
        <div className="p-4 border rounded-lg bg-red-100 mt-6">
          <h3 className="font-semibold mb-2">Appointment Cancelled</h3>
          <p className="text-sm mb-2">Your appointment with Dr. {appointment.appointment.doctor?.firstName} {appointment.appointment.doctor?.lastName} on:</p>
          <p className="font-bold text-lg mb-4">{appointment.appointment.date}, at {appointment.appointment.time}</p>
          <p className="text-sm">has been cancelled. If you would like to reschedule, please arrange a new appointment in the Appointments page.</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Messages() {
  const {token, userQuery} = useAuth();

  const query = useQuery({
    queryKey: ['messages'],
    queryFn: () => getMessages(token),
  });

  const filteredMessages = query.data?.filter(message => message.user?.documentId === userQuery.data?.documentId);

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Messages</h1>
        <div className="space-y-6 h-[75%] overflow-y-scroll">
          {filteredMessages?.map(message => (
              message.type === 'cancelled'
                ? <CancelledCard key={message.id} appointment={message.appointment}/>
                : <ConfirmedCard key={message.id} appointment={message.appointment}/>
            ))}
        </div>
      </main>
    </div>
  )
}