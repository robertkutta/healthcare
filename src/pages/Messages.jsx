import { Home, Calendar1, MessageSquare, User } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"


export default function Messages() {

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
            className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-gray-100"
          >
            <Home className="w-4 h-4" />
            Home
          </a>
          <a
            href="/appointment"
            className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-gray-100"
          >
            <Calendar1 className="w-4 h-4" />
            Appointments
          </a>
          <a
            href="/messages"
            className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg bg-gray-100"
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
        <h1 className="text-3xl font-bold mb-6">Messages</h1>
        <div className="space-y-6">
          <Card className="">
            <CardContent>
              <div className="p-4 border rounded-lg bg-gray-100 mt-6">
                <h3 className="font-semibold mb-2">Appointment Confirmed</h3>
                <p className="text-sm mb-2">You have an appointment scheduled with Dr. John Smith on:</p>
                <p className="font-bold text-lg mb-4">January 8th, 2025, at 2:00 PM</p>
                <p className="text-sm">Please arrive 15 minutes earlier. If you need to cancel, please use the Home page.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardContent>
              <div className="p-4 border rounded-lg bg-gray-100 mt-6">
                <h3 className="font-semibold mb-2">Appointment Cancelled</h3>
                <p className="text-sm mb-2">Your appointment with Dr. John Smith on:</p>
                <p className="font-bold text-lg mb-4">December 20th, 2024, at 2:00 PM</p>
                <p className="text-sm">has been cancelled. If you would like to reschedule, please arrange a new appointment in the Appointments page.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}