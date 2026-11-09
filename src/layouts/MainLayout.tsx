import { Outlet } from "react-router-dom"
import { NavBar, Footer } from "@/components/layout"


const MainLayout = () => {
  return (
    <div className="bg-primary-bg h-dvh flex flex-col">
      <NavBar />
      <div className="flex-1 overflow-y-auto">
        <div className="min-h-full flex flex-col">
          <div className="flex-1">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default MainLayout
