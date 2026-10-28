import { useState } from "react"
import { Heading, Input, Output, } from "@/components/ui"
import { useLanguage, useAuth, useNotification, useAuthenticatedUser } from "@/contexts"
import { translateText } from "@/shared"
import { updateUserCredentials } from "@/integrations/supabase/services/auth/updateUserService"
import { handleError } from "@/errorHandling"

const SettingsSection = () => {

  const { user } = useAuth()
  const authenticatedUser = useAuthenticatedUser()

  const { language } = useLanguage()
  const { setModalState, resetModalState } = useNotification()
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [showEmailFields, setShowEmailFields] = useState(false)
  const [showPasswordFields, setShowPasswordFields] = useState(false)


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
      await updateUserCredentials(user.email, currentPassword, newEmail || undefined, newPassword || undefined)

      setModalState({
        isOpen: true,
        title: 'Success',
        message: 'Email and password has been changed.',
        showCancel: false,
        onConfirm: () => resetModalState(),
      })

    } catch (error) {
      const errorMessage = handleError(error)
      setModalState({
        isOpen: true,
        title: 'Error updating credentials.',
        message: errorMessage,
        showCancel: false,
        onConfirm: () => resetModalState()
      })
    }
  }

  return (
    <div className="w-full pt-5 px-5">
      <Heading title={translateText('profile', 'settings', language)} headingType="sub-heading" />
      <div className="space-y-1 mt-5">
        <div className="p-2 bg-ceramic rounded-lg border-1 border-secondary">
          <div className="flex justify-between">
            <Output label={translateText('profile', 'email', language)} value={authenticatedUser.email} />
            <button className="text-primary text-sm font-semibold" onClick={() => setShowEmailFields(prev => !prev)}>Change</button>
          </div>

          <div className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${showEmailFields ? 'max-h-80' : 'max-h-0'}`}>
            <div className="mt-2 space-y-3">
              <Input
                id="newEmail"
                // label={translateText('profile', 'newEmail', language)}
                placeholder={translateText('profile', 'newEmail', language)}
                inputType="email"
                autoComplete="email"
                onChange={(e) => setNewEmail(e.target.value)}
                value={newEmail}
              />
              <Input
                id="currentPassword"
                // label={translateText('profile', 'currentPassword', language)}
                placeholder={translateText('profile', 'currentPassword', language)}
                inputType="password"
                autoComplete="current-password"
                onChange={(e) => setCurrentPassword(e.target.value)}
                value={currentPassword}
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => handleSubmit()}
                  disabled={!currentPassword && !newEmail}
                  className="w-3/4 bg-primary border-1 border-primary text-marblewhite font-semibold rounded-lg p-1 disabled:opacity-50">
                  Save Email
                </button>
                <button
                  onClick={() => {
                    setNewEmail('')
                    setCurrentPassword('')
                    setShowEmailFields(prev => !prev)
                  }}
                  className="w-1/4 border-1 border-primary-text text-primary-text font-semibold rounded-lg p-1">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="p-2 bg-ceramic rounded-lg border-1 border-secondary">
          <div className="flex justify-between">
            <Output label={translateText('profile', 'password', language)} value={'********'} />
            <button className="text-primary text-sm font-semibold" onClick={() => setShowPasswordFields(prev => !prev)}>Change</button>
          </div>
          <div className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${showPasswordFields ? 'max-h-80' : 'max-h-0'}`}>
            <div className="mt-2 space-y-3">
              <Input
                id="newPassword"
                // label={translateText('profile', 'newPassword', language)}
                placeholder={translateText('profile', 'newPassword', language)}
                inputType="password"
                autoComplete="new-password"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
              <Input
                id="confirmPassword"
                // label={translateText('profile', 'confirmPassword', language)}
                placeholder={translateText('profile', 'confirmPassword', language)}
                inputType="password"
                autoComplete="new-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
              <Input
                id="currentPassword"
                // label={translateText('profile', 'currentPassword', language)}
                placeholder={translateText('profile', 'currentPassword', language)}
                inputType="password"
                autoComplete="current-password"
                onChange={(e) => setCurrentPassword(e.target.value)}
                value={currentPassword}
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => handleSubmit()}
                  disabled={!currentPassword && !newEmail}
                  className="w-3/4 bg-primary border-1 border-primary text-marblewhite font-semibold rounded-lg p-1 disabled:opacity-50">
                  Save Password
                </button>
                <button
                  onClick={() => {
                    setNewPassword('')
                    setConfirmPassword('')
                    setCurrentPassword('')
                    setShowEmailFields(prev => !prev)
                  }}
                  className="w-1/4 border-1 border-primary-text text-primary-text font-semibold rounded-lg p-1">
                  Cancel
                </button>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsSection