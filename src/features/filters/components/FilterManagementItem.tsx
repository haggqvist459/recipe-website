import { useState } from "react";
import { FilterOptionType } from "@/types";
import { useNotification } from '@/contexts';
import { Trashcan, EditIcon, CheckSolidCircle, Close, Input } from "@/components";



type Props = {
  filter: FilterOptionType
  onUpdate: (updatedText: string) => void 
  onDelete: () => void
}


const FilterManagementItem = ({ filter, onUpdate, onDelete }: Props) => {

  const { setModalState, resetModalState } = useNotification();

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(filter.text);

  const handleDelete = () => {
    setModalState({
      isOpen: true,
      showCancel: true,
      title: 'Delete Filter',
      message: `Are you sure you want to delete the filter ${filter.text}?`,
      onConfirm: () => {
        onDelete()
        resetModalState();
      },
      onCancel: () => resetModalState()
    });
  };

  const cancelUpdate = () => {
    setEditText(filter.text)
    setIsEditing(prev => !prev)
  }

  return (
    <div className="w-full my-1.5">
      {isEditing ?
        <div className="flex justify-between">
          <Input
            id="filterText"
            placeholder="..."
            onChange={(e) => setEditText(e.target.value)}
            value={editText}
          />
          <div className="flex space-x-2">
            <button
              className=""
              onClick={() => cancelUpdate()}
            >
              <Close />
            </button>
            <button
              className=""
              onClick={() => onUpdate(editText)}
            >
              <CheckSolidCircle />
            </button>
          </div>
        </div>
        :
        <div className="flex justify-between">
          <span className="text-primary-text">{filter.text}</span>
          <div className="flex space-x-2">
            <button
              className=""
              onClick={() => setIsEditing(prev => !prev)}
            >
              <EditIcon />
            </button>
            <button
              className=""
              onClick={handleDelete}
            >
              <Trashcan />
            </button>
          </div>
        </div>
      }
    </div>
  );
}

export default FilterManagementItem;