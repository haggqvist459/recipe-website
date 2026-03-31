import { createContext, useContext, useState, ReactNode } from 'react'
import { Modal, type ModalStateType } from '@/components/ui/modal'
import { Toast, type ToastType } from '@/components/ui/toast'


type NotificationContextType = {
  showToast: (message: string, type: 'success' | 'error' | 'info') => void
  setModalState: (state: ModalStateType) => void
  resetModalState: () => void
};


const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastType[]>([])
  const [modalState, setModalState] = useState<ModalStateType>({
    isOpen: false,
    showCancel: false,
    title: '',
    message: '',
    onConfirm: () => { },
  });

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    const id = Date.now().toString()
    setToasts((prev) => [...prev, { id, message, type }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000)
  };

  const resetModalState = () => {
    setModalState({
      isOpen: false,
      showCancel: false,
      title: '',
      message: '',
      onConfirm: () => { }
    })
  }

  return (
    <NotificationContext.Provider value={{ showToast, setModalState, resetModalState }}>
      {children}

      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id} 
            toast={toast} 
            onClose={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
            />
        ))}
      </div>

      <Modal modalState={modalState} />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider')
  }
  return context
};
