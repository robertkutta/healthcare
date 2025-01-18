import {Calendar, Home, MessageSquare, User} from "lucide-react";
import {useAuth} from "@/contexts/AuthContext.js";

export const Navbar = () => {
  const {userQuery} = useAuth()

  return (<aside className="w-64 p-6 bg-white border-r flex flex-col">
    <div className="mb-8">
      <h2 className="text-xl font-semibold">{`${userQuery.data?.firstName} ${userQuery.data?.lastName}`}</h2>
      <p className="text-sm text-muted-foreground">{userQuery.data?.gender}</p>
      <p className="text-sm text-muted-foreground">{userQuery.data?.age} years old</p>
    </div>
    <nav className="space-y-2 flex-grow">
      <a
        href="/dashboard"
        className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-gray-100"
      >
        <Home className="w-4 h-4"/>
        Home
      </a>
      <a
        href="/appointment"
        className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-gray-100"
      >
        <Calendar className="w-4 h-4"/>
        Appointments
      </a>
      <a
        href="/messages"
        className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-gray-100"
      >
        <MessageSquare className="w-4 h-4"/>
        Messages
      </a>
      <a
        href="/profilepage"
        className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-gray-100"
      >
        <User className="w-4 h-4"/>
        Profile
      </a>
    </nav>
  </aside>)
}