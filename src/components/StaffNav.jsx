import {Clock, Home, UserCog, Users} from "lucide-react";

export const StaffNav = () => {
  return (
    <aside className="w-64 p-6 bg-white border-r">
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Admin</h2>
      </div>
      <nav className="space-y-2">
        <a
          href="/staffpage"
          className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-gray-100"
        >
          <Home className="w-4 h-4"/>
          Home
        </a>
        <a
          href="/staffappointments"
          className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-gray-100"
        >
          <Clock className="w-4 h-4"/>
          Appointments
        </a>
        <a
          href="/staffpatients"
          className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-gray-100"
        >
          <Users className="w-4 h-4"/>
          Patients
        </a>
        <a
          href="/staffstaff"
          className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-gray-100"
        >
          <UserCog className="w-4 h-4"/>
          Staff
        </a>
      </nav>

    </aside>
  )
}