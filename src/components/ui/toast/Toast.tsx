import { useState, useEffect } from "react";
import { ToastType } from "./types";

const Toast = ({ toast }: { toast: ToastType}) => {
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

  return (
    <div
      className={`${bgColor} text-white px-4 py-3 rounded shadow-lg min-w-[250px] ${isExiting ? 'animate-slide-out-to-right' : 'animate-slide-in-from-right'
        }`}
    >
      <p className="text-sm font-medium">{toast.message}</p>
    </div>
  );
};

export default Toast;