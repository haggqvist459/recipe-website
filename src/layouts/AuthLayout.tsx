import { Outlet, useLocation } from "react-router-dom";
import { AuthPage } from "@/pages";
import { FadeWrapper } from "@/components";
import { useAuth } from "@/contexts";

const AuthLayout = () => {
  const location = useLocation();
  const { isSignedIn, loading } = useAuth()

  if (loading) return null; // TODO proper loading here 

  return (
    <div className="bg-primary-bg min-h-screen flex flex-col relative">
      <div className="flex-grow">
        <FadeWrapper key={location.pathname}>
          {isSignedIn ? <Outlet /> : <AuthPage />}
        </FadeWrapper>
      </div>
    </div>
  );
};

export default AuthLayout;