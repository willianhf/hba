import { Listbox } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { useField } from 'formik';
import { useMemo } from 'react';
import { Text } from './Text';

interface Props<Option> {
  label: string;
  name: string;
  options: Option[];
  getDisplayValue: (value: Option | null) => string;
  getValue: (option: Option | null) => any;
  placeholder?: string;
  isMultiple?: boolean;
}

export function Select<Option>(props: Props<Option>) {
  const [field, meta, helpers] = useField<any>(props.name);

  const isEmpty = props.options.length === 0;
  const hasError = !!meta.error && meta.touched;

  function isMultiple(value: any): value is Option[] {
    return Array.isArray(value);
  }

  function isSelected(option: Option) {
    if (isMultiple(field.value)) {
      return field.value.some(value => props.getValue(value) === props.getValue(option));
    }

    return props.getValue(field.value) === props.getValue(option);
  }

  function handleChange(option: Option) {
    if (isMultiple(field.value)) {
      const values = field.value ?? [];

      if (isSelected(option)) {
        helpers.setValue(values.filter(value => props.getValue(value) !== props.getValue(option)));
      } else {
        helpers.setValue([...values, option]);
      }
    } else {
      helpers.setValue(option);
    }
  }

  const hasValue = useMemo(() => {
    if (isMultiple(field.value)) {
      return field.value.length > 0;
    }

    return !!field.value;
  }, [field.value]);

  const DisplayValue = useMemo(() => {
    if (hasValue) {
      if (isMultiple(field.value)) {
        return (
          <div className="my-1 space-x-1">
            {field.value.map(value => (
              <Text key={props.getValue(value)} variant="small" className="bg-gray-200 rounded py-1 px-2 shadow">
                {props.getDisplayValue(value)}
              </Text>
            ))}
          </div>
        );
      }

      const displayValue = props.getDisplayValue(field.value);
      return <Text variant="small">{displayValue}</Text>;
    }

    return <Text variant="placeholder">{props.placeholder}</Text>;
  }, [hasValue, field.value, props.getDisplayValue]);

  return (
    <Listbox value={field.value} onChange={handleChange}>
      {({ open }) => (
        <div className="relative">
          <Text as="label" variant="label" className="block mb-1">
            {props.label}
          </Text>
          <div
            className={clsx(
              'shadow-sm border border-gray-300 overflow-hidden relative',
              open ? 'rounded-t-md' : 'rounded-md',
              open && 'ring-1 ring-blue-600 border-blue-600 border-b-0',
              hasError && 'border-rose-600 ring-rose-600'
            )}
          >
            <Listbox.Button className="text-left border-none outline-none py-1 pl-3 pr-10 w-full">
              {DisplayValue}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <SelectorIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" aria-hidden="true" />
              </div>
            </Listbox.Button>
          </div>
          {!isEmpty && (
            <Listbox.Options className="z-10 absolute w-full p-1 overflow-auto text-sm bg-white rounded-b-md shadow-sm border border-gray-300 border-t-0 max-h-64 outline-none">
              {props.options.map(option => {
                const selected = isSelected(option);

                return (
                  <Listbox.Option key={props.getValue(option)} className="outline-none select-none mb-1" value={option}>
                    {({ active }) => (
                      <div
                        className={clsx(
                          'rounded-md p-2 bg-white cursor-pointer',
                          (selected || active) && 'bg-gray-100'
                        )}
                      >
                        <span className="truncate">{props.getDisplayValue(option)}</span>
                      </div>
                    )}
                  </Listbox.Option>
                );
              })}
            </Listbox.Options>
          )}
          {hasError && <span className="text-sm text-red-500">{meta.error}</span>}
        </div>
      )}
    </Listbox>
  );
}
