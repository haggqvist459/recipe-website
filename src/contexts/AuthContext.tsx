import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User } from "@supabase/supabase-js";
import * as authApi from "@/utils/backend/api/auth";

type UserRoleType = {
  role: 'admin' | 'user' | 'webmaster',
  rank: number
}
type AuthContextType = {
  user: User | null
  isSignedIn: boolean
  userRole: UserRoleType | null
  refreshAuth: () => Promise<void>
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  userRole: null,
  isSignedIn: false,
  refreshAuth: async () => { }
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRoleType | null>(null)

  const loadUserState = async () => {
    console.log("loadUserState triggered")
    try {
      const session = await authApi.getSession()
      const currentUser = session?.user ?? null

      setUser(currentUser)
      setIsSignedIn(!!session)

      if (currentUser) {
        console.log("about to make two DB calls")
        const fetchedUserRole = await authApi.getUserRoleAPI(currentUser.id)
        setUserRole(fetchedUserRole)
      }

    } catch (error) {
      console.error("AuthContext, loadUserState error:", error)
    }
  }


  useEffect(() => {
    const unsubscribe = authApi.onAuthStateChange((event, session) => {
      console.log('AUTH EVENT:', event, 'User ID:', session?.user?.id)

      switch (event) {
        case 'INITIAL_SESSION':
          const currentUser = session?.user ?? null
          if (currentUser) {
            loadUserState()
          } else {
            setUser(null)
            setIsSignedIn(false)
            setUserRole(null)
          }
          break;
        case 'SIGNED_OUT':
          setUser(null)
          setIsSignedIn(false)
          setUserRole(null)
          break;
        case 'TOKEN_REFRESHED':
          if (session?.user) {
            loadUserState()
          }
          break;
        default:
          break;
      }

    })

    return () => unsubscribe()
  }, [])


  return (
    <AuthContext.Provider value={{ user, isSignedIn, userRole, refreshAuth: loadUserState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;

export const useAuthenticatedUser = (): User => {
  const { user } = useAuth();
  return user as User;
};