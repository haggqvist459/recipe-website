import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import * as authService from "@/utils/backend/services/auth";
import { UserRoleType } from "../../types/index.ts";

export const signIn = async (email: string, password: string) => {
  try {
    const data = await authService.signIn(email, password);
    return data;
  } catch (error) {
    throw error
  }
};

export const signOut = async () => {
  try {
    await authService.signOut();
    return { success: true };
  } catch (error) {
    throw error
  }
};

export const getSession = async () => {
  try {
    const session = await authService.getSession();
    return session
  } catch (error) {
    throw error
  }
};

export const onAuthStateChange = (
  callback: (event: AuthChangeEvent, session: Session | null) => void
) => {
  return authService.onAuthStateChange(callback);
};
export const getUserRoleAPI = async (uid: string): Promise<UserRoleType> => {

  try {
    const data = await authService.getUserRoleService(uid)
    return data
  } catch (error) {
    throw error
  }
}