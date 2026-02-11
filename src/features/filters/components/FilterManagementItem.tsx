import { useState } from "react";
import { FilterOptionType } from "@/types";
import { useLanguage } from '@/contexts';
import { Trashcan, EditIcon, CheckSolidCircle, Close, Input, IconButton } from "@/components";



type Props = {
  filter: FilterOptionType
  onUpdate: (updatedText: string) => void
  onDelete: () => void
}


const FilterManagementItem = ({ filter, onUpdate, onDelete }: Props) => {

  const { language } = useLanguage();

  const filterText = filter[`${language}_text`];
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(filterText);


  const cancelUpdate = () => {
    setEditText(filterText)
    setIsEditing(prev => !prev)
  }

  const handleUpdate = async () => {
    await onUpdate(editText);
    setIsEditing(false);
  }

  const handleEdit = () => {
    setEditText(filterText);
    setIsEditing(true);
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
            <IconButton onClick={cancelUpdate}>
              <Close />
            </IconButton>
            <IconButton onClick={handleUpdate}>
              <CheckSolidCircle/>
            </IconButton>
          </div>
        </div>
        :
        <div className="flex justify-between">
          <span className="text-primary-text">{filterText}</span>
          <div className="flex space-x-2">
            <IconButton onClick={handleEdit}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={onDelete}>
              <Trashcan />
            </IconButton>
          </div>
        </div>
      }
    </div>
  );
}

export default FilterManagementItem;