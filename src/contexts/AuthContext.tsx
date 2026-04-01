import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { User } from "@supabase/supabase-js"
import { signIn, signOut, getCurrentUser, getUserRole, onAuthStateChange } from "@/supabase/services"
import { useNotification } from "./NotificationContext"
import { handleError } from "@/errorHandling"

type UserRoleType = {
  role: 'admin' | 'user' | 'webmaster',
  rank: number
}
type AuthContextType = {
  user: User | null
  isSignedIn: boolean
  loading: boolean
  userRole: UserRoleType | null
  handleSignIn: (email: string, password: string) => Promise<void>
  handleSignOut: () => Promise<void>
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  userRole: null,
  isSignedIn: false,
  loading: false,
  handleSignIn: async () => { },
  handleSignOut: async () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [userRole, setUserRole] = useState<UserRoleType | null>(null)
  const [loading, setLoading] = useState(true)
  const { showToast } = useNotification()

  const handleSignIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      await signIn(email, password)

    } catch (error) {
      setLoading(false)
      const errorMessage = handleError(error)
      throw errorMessage
      
    }
    await loadUserState();
  }

  const handleSignOut = async () => {
    setLoading(true)
    try {
      await signOut()
      setUser(null)
      setUserRole(null)
      setIsSignedIn(false)
    } catch (error) {
      showToast(handleError(error), 'error')
    } finally {
      setLoading(false)
    }
  }


const loadUserState = async (existingUser?: User) => {
  setLoading(true)
  try {
    const currentUser = existingUser ?? await getCurrentUser()

    setUser(currentUser)
    setIsSignedIn(!!currentUser)

    if (currentUser) {
      const fetchedUserRole = await getUserRole(currentUser.id)
      setUserRole(fetchedUserRole)
    }

  } catch (error) {
    showToast(handleError(error), 'error')
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
            console.log("INITIAL_SESSION, found currentUser")
            loadUserState(currentUser)
          } else {
            setUser(null)
            setIsSignedIn(false)
            setUserRole(null)
            setLoading(false)
          }
          break
        case 'SIGNED_OUT':
          setUser(null)
          setIsSignedIn(false)
          setUserRole(null)
          break
        case 'TOKEN_REFRESHED':
          if (session?.user) {
            loadUserState(session.user)
          }
          break
        default:
          break
      }

    })

    return () => unsubscribe()
  }, [])


  return (
    <AuthContext.Provider value={{ user, isSignedIn, userRole, loading, handleSignIn, handleSignOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}

export const useAuthenticatedUser = (): User => {
  const { user } = useAuth()
  if (!user) throw new Error("useAuthenticatedUser called without an authenticated user")
  return user
}