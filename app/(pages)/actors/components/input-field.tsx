interface InputFieldProps {
    label: string;
    type: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}

const InputField = (inputField: InputFieldProps) => {
 
  return (
    <div>
        <label className="mb-1.5 block text-xs font-medium text-[#8c8c8c]">{inputField.label}</label>
        <input
            type={inputField.type}
            value={inputField.value}
            onChange={(e) => inputField.onChange(e.target.value)}
            className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-[#ededed] placeholder-[#555] outline-none transition-all duration-200 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10"
            placeholder={inputField.placeholder}
        />
    </div>
  )
}

export default InputField
