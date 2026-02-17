import type { DropdownOption } from './types';
import { ArrowIcon } from '@/components/icons';

type Props = {
  id: string
  label: string
  defaultValue?: string
  value: string | number
  required?: boolean
  options: DropdownOption[]
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  error?: boolean
}

const Dropdown = ({
  id,
  label,
  defaultValue = '',
  value,
  required = false,
  options,
  onChange,
  error = false
}: Props) => {


  return (
    <div className="w-full">
      <label htmlFor={id} className="label">{label}</label>
      <div className='w-full relative'>
        <select
          required={required}
          id={id}
          value={value}
          onChange={onChange}
          className={`${error ? 'dropdown-text-error': 'dropdown-text'} pr-4 truncate`}
        >
          <option value="">{defaultValue}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value ?? ''}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className='absolute top-0.5 right-0.5 flex items-center pointer-events-none'>
          <ArrowIcon />
        </div>
      </div>
    </div>
  )
}

export default Dropdown;