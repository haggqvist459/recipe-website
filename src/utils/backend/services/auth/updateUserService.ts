import { supabase } from "@/utils/backend/db/client";


export const updateEmailService = async (newEmail: string): Promise<void> => {
  if (!newEmail || !newEmail.includes('@')) {
    throw new Error('Invalid email format')
  }

  const { error } = await supabase.auth.updateUser({
    email: newEmail
  })

  if (error) throw error
}

export const updatePasswordService = async (
  currentEmail: string,
  currentPassword: string,
  newPassword: string
): Promise<void> => {

  if (!currentPassword) {
    throw new Error('Current password is required')
  }

  validatePasswordStrength(newPassword)

  if (currentPassword === newPassword) {
    throw new Error('New password must be different from current password')
  }

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: currentEmail,
    password: currentPassword
  })

  if (signInError) {
    throw new Error('Current password is incorrect')
  }

  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword
  })

  if (updateError) throw updateError
}

export const updateUserCredentialsService = async (
  currentEmail: string,
  currentPassword: string,
  newEmail?: string,
  newPassword?: string
): Promise<void> => {
  if (!currentPassword) {
    throw new Error('Current password is required')
  }

  if (!newEmail && !newPassword) {
    throw new Error('At least one field (email or password) must be provided')
  }

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: currentEmail,
    password: currentPassword
  })

  if (signInError) {
    throw new Error('Current password is incorrect')
  }

  
  const updatePayload: { email?: string; password?: string } = {}

  if (newEmail) {
    if (!newEmail.includes('@')) {
      throw new Error('Invalid email format')
    }
    updatePayload.email = newEmail
  }

  if (newPassword) {
    validatePasswordStrength(newPassword)

    if (currentPassword === newPassword) {
      throw new Error('New password must be different from current password')
    }
    updatePayload.password = newPassword
  }

  const { error } = await supabase.auth.updateUser(updatePayload)

  if (error) throw error
}

const validatePasswordStrength = (password: string): void => {
  if (!password || password.length < 8) {
    throw new Error('Password must be at least 8 characters')
  }

  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (!hasUppercase) {
    throw new Error('Password must contain at least one uppercase letter')
  }
  if (!hasLowercase) {
    throw new Error('Password must contain at least one lowercase letter')
  }
  if (!hasNumber) {
    throw new Error('Password must contain at least one number')
  }
  if (!hasSpecialChar) {
    throw new Error('Password must contain at least one special character')
  }
}