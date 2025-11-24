
import { useState } from "react";
import { Heading, Input, } from "@/components";
import { Modal, type ModalStateType } from '@/components'
import { useLanguage } from "@/contexts";
import { translateText } from "@/utils";


const SettingsSection = () => {

  const { language } = useLanguage()
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [modalState, setModalState] = useState<ModalStateType>({
    isOpen: false,
    message: '',
    onConfirm: () => { },
    onCancel: () => { },
    title: '',
    showCancel: false
  })
  const [errors, setErrors] = useState({
    email: '',
    newPassword: '',
    confirmPassword: '',
    currentPassword: ''
  })


  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
  }

  const validatePasswordLength = (password: string): boolean => {
    return password.length >= 8
  }

  const validatePasswordStrength = (password: string): boolean => {
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    return hasUppercase && hasLowercase && hasNumber && hasSpecialChar
  }

  const validatePasswordMatch = (password: string, confirmPassword: string): boolean => {
    return password === confirmPassword && password.length > 0
  }


  const updateEmail = () => {

  }

  const updatePassword = () => {

  }

  const handleSubmit = async () => {
    
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
        className="w-full mt-5 rounded bg-primary border border-primary hover:border-primary-text"
      >
        {translateText('buttons', 'confirm', language)}
      </button>
      <Modal modalState={modalState} />
    </div>
  )
}

export default SettingsSection;