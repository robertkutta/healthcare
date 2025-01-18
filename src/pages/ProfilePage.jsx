
import { Mail, Phone, MapPin } from 'lucide-react'
import {Navbar} from "@/components/Navbar.jsx";
import {useAuth} from "@/contexts/AuthContext.js";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";

export default function ProfilePage() {
  const { userQuery } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <Navbar />

      <main className="flex-1 p-8">
        <div className="flex items-center pb-7">
          <Avatar className="h-12 w-12 mr-5">
            <AvatarImage src="/placeholder.svg" alt={`${userQuery.data?.firstName} ${userQuery.data?.lastName}`} />
            <AvatarFallback>{`${userQuery.data?.firstName.slice(0, 1)}${userQuery.data?.lastName.slice(0, 1)}`}</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold">{userQuery.data?.firstName} {userQuery.data?.lastName} - My Profile</h1>
        </div>
        <div className="grid gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">{userQuery.data?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Phone</p>
              <p className="text-sm text-muted-foreground">{userQuery.data?.phone ?? "No phone added"}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Address</p>
              <p className="text-sm text-muted-foreground">{userQuery.data?.address ?? "No address added"}</p>
            </div>
          </div>
        </div>
        </main>
    </div>
  )
}

