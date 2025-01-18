import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {StaffNav} from "@/components/StaffNav.jsx";
import {useQuery} from "react-query";
import {getUsers} from "@/api/user.js";
import {useAuth} from "@/contexts/AuthContext.js";
import {Input} from "@/components/ui/input.jsx";
import {useState} from "react";

export default function StaffStaff() {
  const {token} = useAuth();
  const [searchTerm, setSearchTerm] = useState('')

  const staffQuery = useQuery({
    queryKey: ['staff'],
    queryFn: () => getUsers(token),
  });

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <StaffNav />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-5">Staff Overview</h1>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search Staff</CardTitle>
            <CardDescription>Enter a staff member&apos;s name to search</CardDescription>
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
            <CardTitle>Staff List</CardTitle>
            <CardDescription>View and manage staff records</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {staffQuery.data?.filter(s => s.healthcareRole !== 'patient').filter(p => p.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) || p.lastName?.toLowerCase().includes(searchTerm.toLowerCase())).map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.firstName} {member.lastName}</TableCell>
                    <TableCell>{member.healthcareRole}</TableCell>
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

