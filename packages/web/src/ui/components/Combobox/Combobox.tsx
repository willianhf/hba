import { useElementFocus } from '@/hooks';
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
  options: Readonly<Option[]>;
  getDisplayValue: (option: Option) => string;
  getValue: (option: Option | null) => any;
  search: string;
  onSearchChange: (search: string) => void;
  isLoading?: boolean;
  isMultiple?: boolean;
  inputPlaceholder?: string;
}

export function Combobox<Option>(props: Props<Option>) {
  const [field, meta, helpers] = useField<Option>({
    name: props.name,
    multiple: props.isMultiple
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const hasSearch = props.search.length > 0 && !props.isLoading;
  const isEmpty = props.options.length === 0 && hasSearch;

  const hasError = !props.isLoading && !!meta.error && meta.touched;

  function handleChange(option: Option) {
    helpers.setValue(option);
  }

  const inputId = inputRef.current?.id;
  const [isFocused, onFocus, onBlur] = useElementFocus();

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
                'shadow-sm border border-gray-300 overflow-hidden relative',
                open ? 'rounded-t-md' : 'rounded-md',
                isFocused && 'ring-1 ring-blue-600 border-blue-600',
                hasError && 'border-rose-600 ring-rose-600'
              )}
            >
              <HeadlessCombobox.Input
                name={props.name}
                placeholder={props.inputPlaceholder}
                className="w-full border-none focus:ring-0 py-2 pl-3 pr-10 text-sm text-gray-900 placeholder:text-gray-500"
                displayValue={props.getDisplayValue}
                onChange={event => props.onSearchChange(event.target.value)}
                autoComplete="off"
                ref={inputRef}
                {...{ onFocus, onBlur }}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                {props.isLoading && <Spinner />}
                <HeadlessCombobox.Button className="ml-1">
                  <SelectorIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" aria-hidden="true" />
                </HeadlessCombobox.Button>
              </div>
            </div>
            {hasSearch && (
              <HeadlessCombobox.Options className="z-10 absolute w-full p-1 overflow-auto text-sm bg-white rounded-b-md shadow-sm border border-gray-300 border-t-0 max-h-64">
                {isEmpty ? (
                  <div className="cursor-default select-none px-2 py-1 text-gray-900">Nenhum resultado encontrado</div>
                ) : (
                  props.options.map(option => (
                    <HeadlessCombobox.Option
                      key={props.getValue(option)}
                      className="outline-none select-none mb-1"
                      value={option}
                    >
                      {optionProps =>
                        props.renderItem({ ...optionProps, option, getDisplayValue: props.getDisplayValue })
                      }
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
