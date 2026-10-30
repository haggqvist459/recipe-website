import { Outlet } from "react-router-dom"
import { NavBar, Footer } from "@/components/layout"


const MainLayout = () => {
  return (
    <div className="bg-primary-bg h-dvh overflow-hidden flex flex-col">
      <NavBar />
      <div className="flex-1 min-h-0 flex flex-col">
        <Outlet/>
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
