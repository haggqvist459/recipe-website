import { useState } from "react";
import { useAppDispatch } from "@/redux";
import { addItem } from "../slice";
import { AddListItem, IconButton } from "@/components";

const AddItem = () => {

  const dispatch = useAppDispatch();
  const [value, setValue] = useState('')

  const handleAddItemClick = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    dispatch(addItem(trimmed));
    setValue('');
  }

  return (
    <div className="w-full flex justify-between space-x-1 border-b-2 border-primary-text">
      <input 
        className="focus:border-none text-primary-text"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddItemClick(value);
            }
          }}
      />
      <IconButton onClick={() => handleAddItemClick(value)}>
        <AddListItem />
      </IconButton>
    </div>
  );
}

export default AddItem;