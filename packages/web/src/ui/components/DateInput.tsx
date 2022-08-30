import { useElementFocus } from '@/hooks';
import { ExclamationCircleIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { isValid, parse } from 'date-fns';
import { useField, useFormikContext } from 'formik';
import React from 'react';

interface TimeInputProps {
  name: string;
  hasError: boolean;
}

function TimeInput(props: TimeInputProps) {
  const formikContext = useFormikContext();
  const [isFocused, onFocus, onBlur] = useElementFocus();

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const date = formikContext.getFieldProps(props.name).value;
    const dateTime = parse(event.target.value, 'HH:mm', date);

    if (isValid(dateTime)) {
      formikContext.getFieldHelpers(props.name).setValue(dateTime);
    }
  }

  return (
    <div
      className={clsx(
        'relative flex rounded-md border border-gray-300 px-3 py-2 w-1/2',
        isFocused && 'border-2 border-blue-600',
        props.hasError && 'border-rose-600 ring-rose-600'
      )}
    >
      <input
        type="text"
        placeholder="HH:mm"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className={clsx(
          'flex-1 sm:text-sm text-black border-none focus:outline-none focus:ring-0 p-0',
          props.hasError && 'text-rose-600'
        )}
      />
      <div className="flex space-x-1 items-center">
        {props.hasError && <ExclamationCircleIcon className="h-5 w-5 text-red-500" />}
      </div>
    </div>
  );
}

interface Props {
  label: string;
  name: string;
  withTime?: boolean;
}

export function DateInput({ withTime, ...props }: Props) {
  const [{ onBlur: formikOnBlur, onChange: formikOnChange, value, ...field }, meta, helpers] = useField(props.name);
  const [isFocused, onFocus, onBlur] = useElementFocus();

  const hasError = !!meta.error && meta.touched;

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    if (value.trim()) {
      const date = parse(event.target.value, 'dd/MM/yyyy', new Date());
      helpers.setValue(date);
    } else {
      helpers.setValue(null);
    }
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    onBlur();
    formikOnBlur(event);
  }

  return (
    <div>
      <label htmlFor={props.name} className="block text-sm font-medium text-gray-700 mb-1">
        {props.label}
      </label>
      <div className="flex space-x-2">
        <div
          className={clsx(
            'relative flex rounded-md shadow-sm border border-gray-300 px-3 py-2 ',
            withTime ? 'w-1/2' : 'w-full',
            isFocused && 'border-2 border-blue-600',
            hasError && 'border-rose-600 ring-rose-600'
          )}
        >
          <input
            id={props.name}
            type="text"
            placeholder="DD/MM/YYYY"
            className={clsx(
              'flex-1 sm:text-sm text-black border-none focus:outline-none focus:ring-0 p-0',
              hasError && 'text-rose-600'
            )}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={handleBlur}
            {...field}
            {...props}
          />
          <div className="flex space-x-1 items-center">
            {hasError && <ExclamationCircleIcon className="h-5 w-5 text-red-500" />}
          </div>
        </div>
        {withTime && <TimeInput name={props.name} hasError={hasError} />}
      </div>
      {hasError && <span className="text-sm text-red-500">{meta.error}</span>}
    </div>
  );
}
