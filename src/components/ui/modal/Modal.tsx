import { Heading } from "@/components";
import { useLanguage } from "@/contexts";
import { translateText } from "@/utils";
import { ModalStateType } from "./types";

type Props = {
  modalState: ModalStateType
}

const Modal = ({ modalState }: Props) => {

  const { language } = useLanguage()

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${modalState.isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        } bg-black/20`}
      onClick={modalState.onCancel}
    >
      <div
        className="bg-white p-5 rounded shadow-lg w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <Heading title={modalState.title} />
        <p className="my-2">{modalState.message}</p>
        <div className="flex justify-end space-x-2">
          {modalState.onCancel && (
            <button onClick={modalState.onCancel} className="px-4 py-2 bg-secondary text-primary-text rounded">{translateText('modal', 'cancel', language)}</button>
          )}
          <button onClick={modalState.onConfirm} className="px-4 py-2 bg-primary text-primary-text rounded">{translateText('modal', 'confirm', language)}</button>
        </div>
      </div>
    </div>
  )
}

export default Modal;