import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface CustomSelectOption {
  value: string | number;
  label: string;
  sublabel?: string;
  badge?: string;
}

interface CustomSelectProps {
  value: string | number;
  onChange: (val: any) => void;
  options: CustomSelectOption[];
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
  dropdownClassName?: string;
  direction?: 'auto' | 'up' | 'down';
}

export function CustomSelect({
  value,
  onChange,
  options,
  placeholder = 'Select an option...',
  className = '',
  triggerClassName = '',
  dropdownClassName = '',
  direction = 'auto'
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openDirection, setOpenDirection] = useState<'down' | 'up'>('down');
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-calculate direction based on screen space
  useEffect(() => {
    if (!isOpen) return;

    function calculateDirection() {
      if (direction === 'up') {
        setOpenDirection('up');
        return;
      }
      if (direction === 'down') {
        setOpenDirection('down');
        return;
      }
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        // Approx height of dropdown menu (items * itemHeight + padding) capped at max-h-72 (288px)
        const estimatedHeight = Math.min(options.length * 52 + 16, 280);

        // If not enough space below, but more space above, open upwards
        if (spaceBelow < estimatedHeight && rect.top > spaceBelow) {
          setOpenDirection('up');
        } else {
          setOpenDirection('down');
        }
      }
    }

    calculateDirection();

    window.addEventListener('resize', calculateDirection);
    window.addEventListener('scroll', calculateDirection, true);
    return () => {
      window.removeEventListener('resize', calculateDirection);
      window.removeEventListener('scroll', calculateDirection, true);
    };
  }, [isOpen, direction, options.length]);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const selectedOption = options.find((opt) => String(opt.value) === String(value));

  return (
    <div
      ref={containerRef}
      className={`relative select-none ${isOpen ? 'z-50' : 'z-10'} ${className}`}
    >
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-3 bg-black/60 hover:bg-black/80 border transition-all duration-200 rounded-xl px-4 py-3 text-sm text-left outline-none cursor-pointer ${
          isOpen
            ? 'border-[#FF5500] shadow-[0_0_20px_rgba(255,85,0,0.2)] text-white'
            : 'border-white/10 hover:border-white/20 text-white'
        } ${triggerClassName}`}
      >
        <span className="truncate font-medium">
          {selectedOption ? (
            <span className="flex items-center gap-2">
              <span className="text-white font-medium">{selectedOption.label}</span>
              {selectedOption.sublabel && (
                <span className="text-xs text-zinc-400 font-normal">({selectedOption.sublabel})</span>
              )}
            </span>
          ) : (
            <span className="text-zinc-500">{placeholder}</span>
          )}
        </span>
        <ChevronDown
          size={16}
          className={`text-zinc-400 transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180 text-[#FF5500]' : ''
          }`}
        />
      </button>

      {/* Custom Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute left-0 right-0 ${
            openDirection === 'up'
              ? 'bottom-full mb-2 origin-bottom'
              : 'top-full mt-2 origin-top'
          } z-50 rounded-2xl bg-[#0E0E12] border border-white/20 p-1.5 shadow-[0_25px_60px_rgba(0,0,0,0.95)] backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150 max-h-72 overflow-y-auto ${dropdownClassName}`}
        >
          {options.map((option) => {
            const isSelected = String(option.value) === String(value);
            return (
              <button
                key={String(option.value)}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-left transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-[#FF5500]/15 text-[#FF5500] font-semibold'
                    : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex flex-col min-w-0 pr-2">
                  <span className="truncate font-medium">{option.label}</span>
                  {option.sublabel && (
                    <span
                      className={`text-[11px] font-normal truncate mt-0.5 ${
                        isSelected ? 'text-[#FF5500]/80' : 'text-zinc-500'
                      }`}
                    >
                      {option.sublabel}
                    </span>
                  )}
                </div>

                {isSelected && (
                  <Check size={14} className="text-[#FF5500] shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
