import { ChangeEvent, useState } from "react";
import { ItemLabel } from "./ItemLabel"

export interface CheckListProps {
  label: string,
  value: string[],
  items: string[],
  onChange: (checked: string[]) => void
  errors?: string[]
}

export const CheckList = ({label, items, value, onChange, errors}: CheckListProps) => {
  const [checked, setChecked] = useState<string[]>(value);
  
  const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
    var updatedList = checked
      .filter(el => el.trim().length > 0)
      .filter((el,index) => checked.indexOf(el) === index);

    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value),1)
    }

    setChecked(updatedList)
    onChange(updatedList);
    
  }

  return (
    <ItemLabel label={label}>
      {items.map((item,i) =>{
        return (
          <div key={i} className='flex items-center gap-2'>
            <input className='rounded' type="checkbox" defaultChecked={checked.includes(item)} value={item} onChange={handleCheck}/>
            <span className='text-sm'>{item}</span>
          </div>
        )
      })}
      {errors && errors.map((error,i) => {
        return (<p key={i} className='text-xs text-rose-600'>{error}</p>)
      })}
    </ItemLabel>
  )
}