import { useState } from "react"
import { FilterOptionType } from "@/shared/types"
import { useLanguage } from '@/contexts'
import { EditIcon, Close, TrashOutline, CheckOutlineCircle } from "@/components/icons"
import { Input, IconButton } from "@/components/ui"
import { getCategoryColourClasses } from "../helpers/categoryColours"


type Props = {
  filter: FilterOptionType
  onUpdate: (updatedText: string) => void
  onDelete: () => void
}


const FilterManagementItem = ({ filter, onUpdate, onDelete }: Props) => {

  const { language } = useLanguage();

  const filterText = filter[`${language}_text`]
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(filterText)
  const { bg } = getCategoryColourClasses(filter.categoryCounter)

  const cancelUpdate = () => {
    setEditText(filterText)
    setIsEditing(prev => !prev)
  }

  const handleUpdate = async () => {
    await onUpdate(editText)
    setIsEditing(false)
  }

  const handleEdit = () => {
    setEditText(filterText)
    setIsEditing(true)
  }

  return (
    <div className="w-full border-b-1 border-marblewhite pb-1">
      {isEditing ?
        <div className="flex justify-between">
          <Input
            id="filterText"
            placeholder="..."
            onChange={(e) => setEditText(e.target.value)}
            value={editText}
          />
          <div className="flex w-1/2 justify-end space-x-2">
            <IconButton onClick={cancelUpdate}>
              <Close size="size-7" colour="text-secondary-text"/>
            </IconButton>
            <IconButton onClick={handleUpdate}>
              <CheckOutlineCircle size="size-7" colour="text-primary"/>
            </IconButton>
          </div>
        </div>
        :
        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <div className={`h-2 w-2 rounded-full flex-none ${bg}`}/>
            <span className="text-primary-text text-lg">{filterText}</span>
          </div>

          <div className="flex space-x-4">
            <IconButton onClick={handleEdit}>
              <EditIcon size="size-7" colour="text-primary" />
            </IconButton>
            <IconButton onClick={onDelete}>
              <TrashOutline size="size-7" colour="text-secondary-text"/>
            </IconButton>
          </div>
        </div>
      }
    </div>
  );
}

export default FilterManagementItem