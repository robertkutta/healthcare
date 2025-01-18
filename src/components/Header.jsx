import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"

export function Header() {
  const { token, logout } = useAuth()

  return (
    <header className="border-b bg-white w-screen">
      <div className="h-16 flex items-center justify-between px-4">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-[207px]">
            <img src="kcclogo.png" />
          </div>
          <span className="font-semibold text-lg">Dashboard</span>
        </div>
        {token ?
          <a href="/logout" onClick={logout}>
            <Button className="bg-blue-500 hover:bg-blue-600">Sign out</Button>
          </a>
      : <div className="flex items-center space-x-8">
      <nav className="hidden md:flex items-center space-x-8">
      </nav>
      <a href="/stafflogin">
        <Button className="ghost">Staff Login</Button>
      </a>
    </div>}
      </div>
    </header>
  )
}

