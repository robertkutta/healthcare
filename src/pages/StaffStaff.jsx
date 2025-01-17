import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Home, Clock, Users, UserCog, Settings, HelpCircle, MessageSquare } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"


const mockStaff = [
  { id: 1, name: "Dr. John Smith", role: "Doctor", specialization: "General Practitioner", email: "john.smith@clinic.com", phone: "+44123456789" },
  { id: 2, name: "Dr. Sarah Brown", role: "Doctor", specialization: "Pediatrician", email: "sarah.brown@clinic.com", phone: "+44123456789" },
  { id: 3, name: "Emily Johnson", role: "Nurse", specialization: "General", email: "emily.johnson@clinic.com", phone: "+44123456789" },
  { id: 5, name: "Anna Davis", role: "Receptionist", specialization: "Front Desk", email: "anna.davis@clinic.com", phone: "+44123456789" },
]

export default function StaffStaff() {
  const [searchTerm, setSearchTerm] = useState('')
  const [staff, setStaff] = useState(mockStaff)

  const handleSearch = (e) => {
    e.preventDefault()
    const filteredStaff = mockStaff.filter(member => 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setStaff(filteredStaff)
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
            className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-gray-100"
          >
            <Users className="w-4 h-4" />
            Patients
          </a>
          <a 
            href="/staff/overview" 
            className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg bg-gray-100"
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
        <h1 className="text-3xl font-bold mb-5">Staff Overview</h1>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search Staff</CardTitle>
            <CardDescription>Enter a name, role, or specialization to search</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="text"
                placeholder="Search staff..."
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
            <CardTitle>Staff List</CardTitle>
            <CardDescription>View and manage staff records</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {staff.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.role}</TableCell>
                    <TableCell>{member.specialization}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">View Details</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>{member.name}</DialogTitle>
                            <DialogDescription>{member.role}</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="font-medium">Specialization:</span>
                              <span className="col-span-3">{member.specialization}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="font-medium">Email:</span>
                              <span className="col-span-3">{member.email}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="font-medium">Phone:</span>
                              <span className="col-span-3">{member.phone}</span>
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

