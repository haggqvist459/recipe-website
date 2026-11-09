import { Outlet } from "react-router-dom"
import { AuthPage } from "@/pages"
import { useAuth } from "@/contexts"

const AuthLayout = () => {
  const { isSignedIn, loading } = useAuth()

  if (loading) return null // TODO proper loading UI 

  return (
    <div className="flex flex-col flex-1 min-h-0">
        {isSignedIn ? <Outlet /> : <AuthPage />}
    </div>
  )
}

export default AuthLayout