import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User } from "@supabase/supabase-js";
import { signIn, signOut, getCurrentUser, getUserRole, onAuthStateChange } from "@/supabase/services";

type UserRoleType = {
  role: 'admin' | 'user' | 'webmaster',
  rank: number
}
type AuthContextType = {
  user: User | null
  isSignedIn: boolean
  loading: boolean
  userRole: UserRoleType | null
  refreshAuth: () => Promise<void>
  handleSignIn: (email: string, password: string) => Promise<void>;
  handleSignOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  userRole: null,
  isSignedIn: false,
  loading: false,
  refreshAuth: async () => { },
  handleSignIn: async () => { },
  handleSignOut: async () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRoleType | null>(null)
  const [loading, setLoading] = useState(true)

  const handleSignIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      await signIn(email, password);
      await loadUserState();
    } catch (error) {
      console.log("handleSignIn error: ", error)
      //NotifcationProvider error handling 
    } finally {
      setLoading(false)
    }
  };

  const handleSignOut = async () => {
    setLoading(true)
    try {
      await signOut();
      setUser(null);
      setUserRole(null);
      setIsSignedIn(false);
    } catch (error) {
      console.log("handleSignOut error: ", error)
      //NotifcationProvider error handling 
    } finally {
      setLoading(false)
    }
  };


  const loadUserState = async () => {
    setLoading(true)
    try {
      const currentUser = await getCurrentUser()

      setUser(currentUser)
      setIsSignedIn(!!currentUser)

      if (currentUser) {
        const fetchedUserRole = await getUserRole(currentUser.id)
        setUserRole(fetchedUserRole)
      }

    } catch (error) {
      console.error("AuthContext, loadUserState error:", error)
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChange((event, session) => {
      console.log('AUTH EVENT:', event, 'User ID:', session?.user?.id)

      switch (event) {
        case 'INITIAL_SESSION':
          const currentUser = session?.user ?? null
          if (currentUser) {
            setUser(currentUser)
            setIsSignedIn(true)
            loadUserState()
          } else {
            setUser(null)
            setIsSignedIn(false)
            setUserRole(null)
            setLoading(false)
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
    <AuthContext.Provider value={{ user, isSignedIn, userRole, loading, handleSignIn, handleSignOut, refreshAuth: loadUserState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;

export const useAuthenticatedUser = (): User => {
  const { user } = useAuth();
  return user as User;
};