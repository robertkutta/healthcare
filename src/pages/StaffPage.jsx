import {useEffect} from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import "react-datepicker/dist/react-datepicker.css"
import {StaffNav} from "@/components/StaffNav.jsx";
import {useAuth} from "@/contexts/AuthContext.js";
import {useNavigate} from "react-router-dom";
import {useQuery, useQueryClient} from "react-query";
import {getAppointments, updateAppointment} from "@/api/appointment.js";
import {Card, CardContent} from "@/components/ui/card.jsx";

export default function StaffPage() {
  const {token} = useAuth();
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
    await queryClient.invalidateQueries({queryKey: ['appointments']})
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
    <div className="flex min-h-screen bg-gray-50">
     <StaffNav />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-5">Appointments</h1>
        </div>

        <Card className="max-h-[75%] overflow-y-scroll">
          <CardContent>
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
                {query.data?.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="font-medium">{appointment.patient?.firstName} {appointment.patient?.lastName}</TableCell>
                    <TableCell>{appointment.date}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>{appointment.doctor?.firstName} {appointment.doctor?.lastName}</TableCell>
                    <TableCell>
                      <Badge variant={getBadgeVariant(appointment.appointmentStatus)}>
                        {appointment.appointmentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {appointment.appointmentStatus !== 'Cancelled' ?
                        <Button
                          onClick={() => cancelAppointment(appointment.documentId)}
                          variant="destructive"
                          size="sm"
                          className="mr-2"
                        >
                          Cancel
                        </Button>
                        : null}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}