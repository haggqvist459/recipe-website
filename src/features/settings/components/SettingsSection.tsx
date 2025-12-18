
import { useState } from "react";
import { Heading, Input, } from "@/components";
import { useLanguage, useAuth, useNotification } from "@/contexts";
import { translateText } from "@/utils";
import { updateUserCredentialsAPI } from "@/utils/backend/api/auth/updateUserAPI";

const SettingsSection = () => {

  const { user } = useAuth()
  const { language } = useLanguage()
  const { setModalState, resetModalState } = useNotification()
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')


  const validateEmail = (email: string): void => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format')
    }
  }

  const validatePasswordStrength = (password: string): void => {
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters')
    }

    if (!/[A-Z]/.test(password)) {
      throw new Error('Password must contain at least one uppercase letter')
    }

    if (!/[a-z]/.test(password)) {
      throw new Error('Password must contain at least one lowercase letter')
    }

    if (!/[0-9]/.test(password)) {
      throw new Error('Password must contain at least one number')
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      throw new Error('Password must contain at least one special character')
    }
  }

  const validatePasswordMatch = (): void => {
    if (newPassword !== confirmPassword) {
      throw new Error('Passwords do not match')
    }
  }

  const handleSubmit = async () => {
    try {
      if (!currentPassword) throw new Error('Current password is required')
      if (!newEmail && !newPassword) throw new Error('Please enter email or password to update')

      if (newEmail) validateEmail(newEmail)
      if (newPassword) {
        validatePasswordStrength(newPassword)
        validatePasswordMatch()
      }

      if (!user?.email) throw new Error('User not authenticated')
      await updateUserCredentialsAPI(user.email, currentPassword, newEmail || undefined, newPassword || undefined)

      setModalState({
        isOpen: true,
        title: 'Success',
        message: 'Email and password has been changed.',
        showCancel: false,
        onConfirm: () => resetModalState(),
      })

    } catch (error) {

      setModalState({
        isOpen: true,
        title: 'Error updating credentials.',
        message: error instanceof Error ? error.message : 'An unknown error occurred',
        showCancel: false,
        onConfirm: () => resetModalState()
      })
    }
  }

  return (
    <div className="">
      <Heading title={translateText('profile', 'settings', language)} headingType="sub-heading" />
      <div className="space-y-1 mt-5">
        <Heading title={translateText('profile', 'changeEmail', language)} headingType="sub-heading" />
        <Input
          id="newEmail"
          label={translateText('profile', 'newEmail', language)}
          placeholder="..."
          inputType="email"
          autoComplete="email"
          onChange={(e) => setNewEmail(e.target.value)}
          value={newEmail}
        />
      </div>
      <div className="space-y-1 mt-5">
        <Heading title={translateText('profile', 'updatePassword', language)} headingType="sub-heading" />
        <Input
          id="newPassword"
          label={translateText('profile', 'newPassword', language)}
          placeholder="..."
          inputType="password"
          autoComplete="new-password"
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
        />
        <Input
          id="confirmPassword"
          label={translateText('profile', 'confirmPassword', language)}
          placeholder="..."
          inputType="password"
          autoComplete="new-password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
      </div>
      <div className="space-y-1 mt-5">
        <Heading title={translateText('profile', 'validateChanges', language)} headingType="sub-heading" />
        <Input
          id="currentPassword"
          label={translateText('profile', 'currentPassword', language)}
          placeholder="..."
          inputType="password"
          autoComplete="current-password"
          onChange={(e) => setCurrentPassword(e.target.value)}
          value={currentPassword}
        />
      </div>
      <button
        className="w-full mt-5 rounded bg-primary border border-primary hover:border-primary-text disabled:opacity-50"
        onClick={() => handleSubmit()}
        disabled={(!currentPassword && (!newEmail || (!newPassword && !confirmPassword)))}
      >
        {translateText('buttons', 'confirm', language)}
      </button>
    </div>
  )
}

export default SettingsSection;