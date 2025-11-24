import { updateEmailService, updatePasswordService, updateUserCredentialsService } from "../../services/auth/updateUserService";

export const updateEmailAPI = async (newEmail: string): Promise<void> => {
  await updateEmailService(newEmail)
}

export const updatePasswordAPI = async (
  currentEmail: string,
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  await updatePasswordService(currentEmail, currentPassword, newPassword)
}

export const updateUserCredentialsAPI = async (
  currentEmail: string,
  currentPassword: string,
  newEmail?: string,
  newPassword?: string
): Promise<void> => {
  await updateUserCredentialsService(currentEmail, currentPassword, newEmail, newPassword)
}