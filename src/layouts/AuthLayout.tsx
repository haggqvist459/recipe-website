import { Outlet } from "react-router-dom"
import { AuthPage } from "@/pages"
import { useAuth } from "@/contexts"

const AuthLayout = () => {
  const { isSignedIn, loading } = useAuth()

  if (loading) return null // TODO proper loading UI 

  return (
    <div className="bg-primary-bg min-h-screen flex flex-col relative">
      <div className="flex-grow">
        {isSignedIn ? <Outlet /> : <AuthPage />}
      </div>
    </div>
  )
}

export default AuthLayout