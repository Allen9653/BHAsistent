import React from 'react';
import * as Select from '@radix-ui/react-select';
import { ChevronDown, Check } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface RadixCustomSelectProps {
  value: string;
  onValueChange: (val: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
}

export const RadixCustomSelect: React.FC<RadixCustomSelectProps> = ({
  value,
  onValueChange,
  options,
  placeholder = 'Odaberite...',
  className = '',
}) => {
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger
        className={`w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-[#0A1628] border border-[#1A3152] focus:border-[#00C9A7] text-[#F5F0E8] text-xs font-sans flex items-center justify-between outline-none cursor-pointer transition-colors ${className}`}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDown className="w-4 h-4 text-[#00C9A7]" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className="overflow-hidden bg-[#0F2038] border border-[#1A3152] rounded-xl shadow-2xl z-50 p-1 min-w-[200px] animate-fadeIn"
          position="popper"
          sideOffset={5}
        >
          <Select.Viewport className="p-1">
            {options.map((opt) => (
              <Select.Item
                key={opt.value}
                value={opt.value}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-xs text-[#F5F0E8] font-sans hover:bg-[#00C9A7] hover:text-[#0A1628] focus:bg-[#00C9A7] focus:text-[#0A1628] outline-none cursor-pointer transition-colors min-h-[36px]"
              >
                <Select.ItemText>{opt.label}</Select.ItemText>
                <Select.ItemIndicator>
                  <Check className="w-4 h-4 text-[#0A1628] stroke-[3]" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
