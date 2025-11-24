
type Props = {
  id: string
  label?: string
  value: string
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onFocus?: () => void,
  onBlur?: () => void,
  inputType?: 'text' | 'number' | 'email' | 'password'
  required?: boolean
  allowDecimals?: boolean
  autoComplete?: string
  multiline?: boolean
  rows?: number
}

const Input = ({
  label,
  value,
  placeholder,
  id,
  inputType = 'text',
  required = false,
  allowDecimals = false,
  onChange,
  onBlur,
  onFocus,
  autoComplete,
  multiline = false,
  rows
}: Props) => {
  return (
    <div className="flex flex-col w-full">
      {label !== undefined && (
        <div className="flex space-x-1">
          <label htmlFor={id} className="label">{label || '\u00A0'}</label>
        </div>
      )}
      {multiline ? (
        <textarea
          rows={rows}
          className="input-text no-spinner"
          id={id}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          autoComplete={autoComplete}
        />
      ) : (
        <input
          className="input-text no-spinner"
          id={id}
          placeholder={placeholder}
          inputMode={inputType === "number" ? (allowDecimals ? "decimal" : "numeric") : undefined}
          value={value}
          type={inputType}
          step={allowDecimals ? "any" : "1"}
          required={required}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          autoComplete={autoComplete}
        />
      )}
    </div>
  )
}

export default Input;