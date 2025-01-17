import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/AuthContext"
import { useEffect } from "react"

export default function LogoutPage() {
  const { setLoggedIn } = useAuth()

  useEffect(() => {
    localStorage.removeItem("loggedIn")
    setLoggedIn(false)
  })

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50/50">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">Thank you for using King&apos;s Cross Care</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center">
            You have been logged out successfully. <br />
            You may now close this window.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
