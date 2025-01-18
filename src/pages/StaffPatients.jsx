import {StaffNav} from "@/components/StaffNav.jsx";
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {useAuth} from "@/contexts/AuthContext.js";
import {useQuery} from "react-query";
import {getUsers} from "@/api/user.js";
import {Input} from "@/components/ui/input.jsx";
import {useState} from "react";

export default function StaffPatients() {
  const {token} = useAuth();
  const [searchTerm, setSearchTerm] = useState('')

  const patientsQuery = useQuery({
    queryKey: ['patients'],
    queryFn: () => getUsers(token),
  });

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <StaffNav />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-5">Patient Database</h1>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search Patients</CardTitle>
            <CardDescription>Enter a patient&apos;s name to search</CardDescription>
          </CardHeader>
          <CardContent>
              <Input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow"
              />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Patient List</CardTitle>
            <CardDescription>View and manage patient records</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patientsQuery.data?.filter(p => p.healthcareRole === 'patient').filter(p => p.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || p.lastName.toLowerCase().includes(searchTerm.toLowerCase())).map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.firstName} {patient.lastName}</TableCell>
                    <TableCell>{patient.email}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">View Profile</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{patient.firstName} {patient.lastName}&apos;s Profile</DialogTitle>
                            <DialogDescription>Patient Details</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div>
                              <h4 className="font-medium">Email</h4>
                              <p>{patient.email}</p>
                            </div>
                            <div>
                              <h4 className="font-medium">Age</h4>
                              <p>{patient.age}</p>
                            </div>
                            <div>
                              <h4 className="font-medium">Gender</h4>
                              <p>{patient.gender}</p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
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
