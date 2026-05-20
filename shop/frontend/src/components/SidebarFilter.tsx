import { useEffect, useState } from "react";

type SidebarFilterProps = {
   label: string;
   options: string[];
   value: string;
   onChange: (value: string) => void;
};

export function SidebarFilter({
    label,
    options
}: SidebarFilterProps) {
   return (
      <div className="mb-6">
         <label className="mb-2 block text-sm font-medium text-zinc-300">
            {label}
         </label>

         <select className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-sm text-white outline-none transition-colors focus:border-cyan-400">
            <option>
                {label}
            </option>
            {options.map((option) => (
                <option key={option}>
                    {option}
                </option>
            ))}
         </select>
      </div>
   );
}
