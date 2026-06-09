
type SidebarFilterProps = {
   label: string;
   allLabel?: string;
   options: string[];
   value: string;
   onChange: (value: string) => void;
};

export function SidebarFilter({
   label,
   allLabel,
   options,
   value,
   onChange,
}: SidebarFilterProps) {
   return (
      <div className="mb-6">
         <label className="mb-2 block text-sm font-medium text-zinc-300">
            {label}
         </label>

         <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-sm text-white outline-none transition-colors focus:border-cyan-400"
         >
            <option value="">{allLabel || `All ${label}'s`}</option>
            {options.map((option) => (
               <option key={option} value={option}>
                  {option}
               </option>
            ))}
         </select>
      </div>
   );
}
