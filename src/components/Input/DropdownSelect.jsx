import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDown, Check } from 'lucide-react';
import clsx from 'clsx';

export default function DropdownSelect({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Chọn một giá trị',
  className = '',
}) {
  const selected = options.find((opt) => opt.value === value) || { label: placeholder, value: '' };

  return (
    <div className="w-full">
      {label && <label className="text-gray-700 font-medium mb-2 block">{label}</label>}

      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          {/* Button */}
          <Listbox.Button
            className={clsx(
              'relative w-full cursor-pointer rounded-xl border border-yellow-500 bg-white py-3 pl-4 pr-10 text-left focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-150',
              className
            )}
          >
            <span className={clsx('block truncate', !value && 'text-gray-400')}>
              {selected.label}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <ChevronDown className="h-5 w-5 text-gray-500" />
            </span>
          </Listbox.Button>

          {/* Dropdown options */}
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {options.map((opt) => (
                <Listbox.Option
                  key={opt.value}
                  value={opt.value}
                  className={({ active }) =>
                    clsx(
                      'relative cursor-pointer select-none py-2 pl-10 pr-4',
                      active ? 'bg-yellow-100 text-yellow-900' : 'text-gray-900'
                    )
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={clsx(
                          'block truncate',
                          selected && 'font-semibold text-yellow-700'
                        )}
                      >
                        {opt.label}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-3 flex items-center text-yellow-500">
                          <Check className="h-4 w-4" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
