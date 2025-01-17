import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"

export function Header() {
  const { loggedIn } = useAuth()

  return (
    <header className="border-b bg-white w-screen">
      <div className="h-16 flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-black rounded-sm" />
          <span className="font-semibold text-lg">King&apos;s Cross Care</span>
        </div>
        {loggedIn === true ? 
          <a href="/logout">
            <Button className="bg-blue-500 hover:bg-blue-600">Sign out</Button>
          </a>
      : <div className="flex items-center space-x-8">
      <nav className="hidden md:flex items-center space-x-8">
        <a href="/services" className="text-gray-600 hover:text-gray-900">
          Services
        </a>
        <a href="/locations" className="text-gray-600 hover:text-gray-900">
          Location
        </a>
      </nav>
      <a href="/stafflogin">
        <Button className="ghost">Staff Login</Button>
      </a>
    </div>}
      </div>
    </header>
  )
}

