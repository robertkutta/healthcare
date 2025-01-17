import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Home, Clock, Users, UserCog, Settings, HelpCircle, MessageSquare } from 'lucide-react'



// Mock data for patients
const mockPatients = [
  { id: 1, name: "David Smith", email: "david@example.com", dateOfBirth: "1990-05-15", gender: "Male" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", dateOfBirth: "1985-08-22", gender: "Female" },
]

export default function StaffPatients() {
  const [searchTerm, setSearchTerm] = useState('')
  const [patients, setPatients] = useState(mockPatients)


  const handleSearch = (e) => {
    e.preventDefault()
    const filteredPatients = mockPatients.filter(patient => 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setPatients(filteredPatients)
  }


  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <aside className="w-64 p-6 bg-white border-r">
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
            className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-gray-100"
          >
            <Clock className="w-4 h-4" />
            Appointments
          </a>
          <a 
            href="/staffpatients" 
            className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg bg-gray-100"
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

        <nav className="absolute bottom-6 space-y-2">
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

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-5">Patient Database</h1>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search Patients</CardTitle>
            <CardDescription>Enter a patient&apos;s name to search</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit">Search</Button>
            </form>
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
                  <TableHead>Date of Birth</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.email}</TableCell>
                    <TableCell>{patient.dateOfBirth}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">View Profile</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{patient.name}&apos;s Profile</DialogTitle>
                            <DialogDescription>Patient Details</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div>
                              <h4 className="font-medium">Email</h4>
                              <p>{patient.email}</p>
                            </div>
                            <div>
                              <h4 className="font-medium">Date of Birth</h4>
                              <p>{patient.dateOfBirth}</p>
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
