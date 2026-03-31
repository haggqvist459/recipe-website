import { useState, useEffect } from "react";
import { ToastType } from "./types";
import { Close, IconButton } from '@/components'

const Toast = ({ toast, onClose }: { toast: ToastType, onClose: () => void }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Start exit animation before removal
    const exitTimeout = setTimeout(() => {
      setIsExiting(true);
    }, 2700); // Start exit 300ms before the 3000ms timeout

    return () => clearTimeout(exitTimeout);
  }, []);

  const bgColor = {
    success: 'bg-lightblue',
    error: 'bg-orange',
    info: 'bg-darkblue',
  }[toast.type];

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => onClose(), 300)
  }


  return (
    <div
      className={`${bgColor} text-white px-4 py-3 rounded shadow-lg min-w-[250px] max-w-[350px] flex ${isExiting ? 'animate-slide-out-to-right' : 'animate-slide-in-from-right'
        }`}
    >
      <p className="text-sm font-medium">{toast.message}</p>
      <IconButton onClick={handleClose} className="flex self-start">
        <Close />
      </IconButton>
    </div>
  );
};

export default Toast;