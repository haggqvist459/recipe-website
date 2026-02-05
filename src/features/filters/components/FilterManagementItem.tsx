import { useState } from "react";
import { FilterOptionType } from "@/types";
import { useNotification } from '@/contexts';
import { Trashcan, EditIcon, CheckSolidCircle, Close, Input } from "@/components";



type Props = {
  filter: FilterOptionType
  onUpdate: () => void 
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
      message: 'Are you sure you want to delete this filter?',
      onConfirm: () => {
        // Your delete logic here
        // deleteFilter(filterId);
        resetModalState();
      }
    });
  };
  return (
    <div className="w-full">
      {isEditing ?
        <div className="flex justify-between px-5">
          <Input
            id="filterText"
            placeholder="..."
            onChange={(e) => setEditText(e.target.value)}
            value={editText}
          />
          <div className="flex space-x-2">
            <button
              className=""
              onClick={() => setIsEditing(prev => !prev)}
            >
              <Close />
            </button>
            <button
              className=""
              onClick={() => {}}
            >
              <CheckSolidCircle />
            </button>
          </div>
        </div>
        :
        <div className="flex justify-between px-5">
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