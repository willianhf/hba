import { Combobox as HeadlessCombobox } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { useField } from 'formik';
import { useRef } from 'react';
import { Spinner } from '../Spinner';
import { Text } from '../Text';
import { Props as OptionProps } from './Option';

interface Props<Option> {
  name: string;
  label: string;
  renderItem: (optionProps: OptionProps<Option>) => React.ReactNode;
  options: Readonly<Option[]> | Option[];
  getDisplayValue: (option: Option) => string;
  getKey?: (option: Option) => string;
  search: string;
  onSearchChange: (search: string) => void;
  isLoading?: boolean;
  isMultiple?: boolean;
  inputPlaceholder?: string;
}

export function Combobox<Option>(props: Props<Option>) {
  const [field, meta, helpers] = useField({
    name: props.name,
    multiple: props.isMultiple
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const isEmpty = props.options.length === 0;
  const shouldDisplayOptions = !props.isLoading && !!props.search;

  const hasError = !props.isLoading && !!meta.error && meta.touched;

  function handleChange(option: Option) {
    helpers.setValue(option);
  }

  const inputId = inputRef.current?.id;

  function handleDisplayValue(option?: Option): string {
    if (!option) {
      return '';
    }

    return props.getDisplayValue(option);
  }

  function handleKey(index: number, option?: Option): string {
    if (option && props.getKey) {
      return props.getKey(option);
    }

    return index.toString();
  }

  return (
    <HeadlessCombobox value={field.value} onChange={handleChange}>
      {({ open }) => (
        <>
          <div className="relative">
            <Text as="label" htmlFor={inputId} variant="label" className="block mb-1">
              {props.label}
            </Text>
            <div
              className={clsx(
                'shadow-sm border-2 border-gray-300 overflow-hidden relative',
                'flex items-center',
                'py-2 pl-3 pr-10',
                open && shouldDisplayOptions ? 'rounded-t-md' : 'rounded-md',
                hasError && 'border-rose-600 ring-rose-600'
              )}
            >
              {props.isLoading && <Spinner className="mr-1" />}
              <HeadlessCombobox.Input
                name={props.name}
                placeholder={props.inputPlaceholder}
                className={clsx(
                  'border-none rounded-md focus:ring-0',
                  'p-0 ml-1 w-full',
                  'text-sm text-gray-900 placeholder:text-gray-500'
                )}
                displayValue={handleDisplayValue}
                onChange={event => props.onSearchChange(event.target.value)}
                autoComplete="off"
                ref={inputRef}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <HeadlessCombobox.Button className="ml-1">
                  <SelectorIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" aria-hidden="true" />
                </HeadlessCombobox.Button>
              </div>
            </div>
            {shouldDisplayOptions && (
              <HeadlessCombobox.Options
                className={clsx(
                  'z-10 absolute overflow-auto bg-white shadow-sm',
                  'rounded-b-md border-2 border-gray-300 border-t-0',
                  'max-h-64 w-full p-1 space-y-1'
                )}
              >
                {isEmpty ? (
                  <div className="cursor-default select-none px-2 py-1 text-gray-900">Nenhum resultado encontrado</div>
                ) : (
                  props.options.map((option, index) => (
                    <HeadlessCombobox.Option key={handleKey(index, option)} value={option}>
                      {optionProps => (
                        <div
                          className={clsx(
                            'outline-none select-none cursor-pointer',
                            'px-3 py-1',
                            'rounded-md',
                            (optionProps.active || optionProps.selected) && 'bg-gray-100/75'
                          )}
                        >
                          {props.renderItem({ ...optionProps, option, getDisplayValue: handleDisplayValue })}
                        </div>
                      )}
                    </HeadlessCombobox.Option>
                  ))
                )}
              </HeadlessCombobox.Options>
            )}
          </div>
          {hasError && <span className="text-sm text-red-500">{meta.error}</span>}
        </>
      )}
    </HeadlessCombobox>
  );
}
