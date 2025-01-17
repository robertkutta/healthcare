import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Home, Calendar, MessageSquare, User, Mail, Phone, MapPin } from 'lucide-react'

export default function ProfilePage() {


  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <aside className="w-64 p-6 bg-white border-r">
        <div className="mb-8">
          <h2 className="text-xl font-semibold">David Smith</h2>
          <p className="text-sm text-muted-foreground">Male</p>
          <p className="text-sm text-muted-foreground">35 years old</p>
        </div>
        <nav className="space-y-2">
          <a 
            href="/dashboard" 
            className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-gray-100"
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
            className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg bg-gray-100"
          >
            <User className="w-4 h-4" />
            Profile
          </a>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-8">My Profile</h1>
        <div className="grid gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">davidsmith@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Phone</p>
              <p className="text-sm text-muted-foreground">+44 12345 6789</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Address</p>
              <p className="text-sm text-muted-foreground">No address added</p>
            </div>
            <Button variant="outline" size="sm">Add</Button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Healthcare Records</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/placeholder.svg" alt="Dr. John Smith" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Dr. John Smith</p>
                <p className="text-sm text-muted-foreground">General Practitioner</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/placeholder.svg" alt="Dr. Jane Doe" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Dr. John Smith</p>
                <p className="text-sm text-muted-foreground">Wednesday, January 8th, 2025 at 2:00pm.</p>
              </div>
            </div>
          </div>
        </div>
        </main>
    </div>
  )
}

