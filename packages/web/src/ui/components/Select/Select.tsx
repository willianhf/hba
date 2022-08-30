import { Listbox } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { useField } from 'formik';
import { useMemo } from 'react';
import { Text } from '../Text';
import { OptionProps, SelectOption } from './Option';

interface Props<Option> {
  label: string;
  name: string;
  options: Option[] | readonly Option[];
  renderItem: (optionProps: OptionProps<Option>) => React.ReactNode;
  getDisplayValue: (value: Option) => string;
  getValue: (option: Option) => any;
  placeholder?: string;
  isMultiple?: boolean;
}

export function Select<Option>(props: Props<Option>) {
  const [field, meta, helpers] = useField<any>(props.name);

  const isEmpty = props.options.length === 0;
  const hasError = !!meta.error;

  function isMultiple(value: any): value is Option[] {
    return Array.isArray(value);
  }

  function handleValue(option?: Option) {
    if (!option) {
      return option;
    }

    return props.getValue(option);
  }

  function isSelected(option?: Option) {
    if (isMultiple(field.value)) {
      return field.value.some(value => handleValue(value) === handleValue(option));
    }

    return handleValue(field.value) === handleValue(option);
  }

  function handleChange(option: Option) {
    if (isMultiple(field.value)) {
      const values = field.value ?? [];

      if (isSelected(option)) {
        helpers.setValue(values.filter(value => handleValue(value) !== handleValue(option)));
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

  function handleDisplayValue(option: Option | null): string {
    if (!option) {
      return '';
    }

    return props.getDisplayValue(option);
  }

  const DisplayValue = useMemo(() => {
    if (hasValue) {
      if (isMultiple(field.value)) {
        return (
          <div className="my-1 space-x-1">
            {field.value.map(value => (
              <Text key={handleValue(value)} variant="small" className="bg-gray-200 rounded py-1 px-2 shadow">
                {handleDisplayValue(value)}
              </Text>
            ))}
          </div>
        );
      }

      const displayValue = handleDisplayValue(field.value);
      return <Text variant="small">{displayValue}</Text>;
    }

    return <Text variant="placeholder">{props.placeholder}</Text>;
  }, [hasValue, field.value]);

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
              'py-2 pl-3 pr-10',
              open ? 'rounded-t-md' : 'rounded-md',
              hasError && 'border-rose-600 ring-rose-600'
            )}
          >
            <Listbox.Button className="text-left p-0 border-none outline-none w-full">
              {DisplayValue}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <SelectorIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" aria-hidden="true" />
              </div>
            </Listbox.Button>
          </div>
          {!isEmpty && (
            <Listbox.Options className="z-10 absolute w-full p-1 overflow-auto text-sm bg-white rounded-b-md shadow-sm border border-gray-300 border-t-0 max-h-64 outline-none">
              {props.options.map(option => {
                return (
                  <Listbox.Option key={handleValue(option)} className="outline-none select-none mb-1" value={option}>
                    {optionProps => (
                      <SelectOption selected={isSelected(option)} active={optionProps.active}>
                        {props.renderItem({ ...optionProps, option })}
                      </SelectOption>
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
