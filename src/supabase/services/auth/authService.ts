import type { AuthChangeEvent, Session } from "@supabase/supabase-js"
import { supabase } from "@/supabase/client"
import { UserRoleType } from '@/types'
import { selectUserRole } from '@/supabase/queries'
import { handleError } from "@/errorHandling"


export const signIn = async (email: string, password: string) => {
 
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      const errorMessage = handleError(error)
      throw errorMessage
    }
    return data

};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    const errorMessage = handleError(error)
    throw errorMessage
  }
};

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession()
  if (error) {
      const errorMessage = handleError(error)
      throw errorMessage
    }
  return data.session
};

export const getCurrentUser = async () => {
  console.log("getCurrentUser start")
  const { data, error } = await supabase.auth.getUser()
  if (error) {
      const errorMessage = handleError(error)
      throw errorMessage
    }
  return data.user
};

export const onAuthStateChange = (
  callback: (event: AuthChangeEvent, session: Session | null) => void
) => {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session)
  });
  return () => data.subscription.unsubscribe()
};

export const getUserRole = async (uid: string): Promise<UserRoleType> => {

  try {
    const data = await selectUserRole(uid)
    return data
  } catch (error) {
    const errorMessage = handleError(error)
    throw errorMessage
  }
}