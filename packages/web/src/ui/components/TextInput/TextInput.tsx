import { useElementFocus } from '@/hooks';
import { InheritableElementProps } from '@/types/helpers';
import { ExclamationCircleIcon, EyeIcon, EyeOffIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { useField, useFormikContext } from 'formik';
import React, { useMemo, useState } from 'react';
import { Button } from '../Button';
import { Spinner } from '../Spinner';
import { Tooltip } from '../Tooltip';

interface Props {
  label: string;
  name: string;
  isLoading?: boolean;
  rightElement?: React.ReactNode;
  tooltip?: string;
}

type TextInputProps = InheritableElementProps<'input', Props>;

function TextInputRoot({
  label,
  type = 'text',
  isLoading,
  placeholder,
  name,
  onChange,
  className,
  rightElement,
  tooltip,
  ...props
}: TextInputProps) {
  const [{ onChange: formikOnChange, onBlur: formikOnBlur, ...field }, meta] = useField<'input'>({ name });
  const [isFocused, onFocus, onBlur] = useElementFocus();

  const hasError = useMemo(() => {
    if (isLoading) {
      return false;
    }

    return !!meta.error && meta.touched;
  }, [isLoading, meta.error, meta.touched]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (onChange) {
      onChange(event);
    }

    formikOnChange(event);
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    onBlur();
    formikOnBlur(event);
  }

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div
        className={clsx(
          'relative flex rounded-md shadow-sm border border-gray-300 overflow-hidden pr-3',
          isFocused && 'ring-1 ring-blue-600 border-blue-600',
          hasError && 'border-rose-600 ring-rose-600'
        )}
      >
        <input
          type={type}
          id={name}
          placeholder={placeholder}
          className={clsx(
            'flex-1 sm:text-sm text-black border-none focus:outline-none focus:ring-0',
            hasError && 'text-rose-600'
          )}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={handleBlur}
          {...field}
          {...props}
        />
        <div className="flex space-x-1 items-center">
          {tooltip && (
            <Tooltip tabIndex={-1} content={<p className="text-sm text-gray-900">{tooltip}</p>}>
              <QuestionMarkCircleIcon
                tabIndex={-1}
                className={clsx(
                  'h-5 w-5 text-gray-400 hover:text-gray-600',
                  hasError && 'text-red-500 hover:text-red-700'
                )}
              />
            </Tooltip>
          )}
          {rightElement}
          {isLoading && <Spinner />}
          {hasError && <ExclamationCircleIcon className="h-5 w-5 text-red-500" />}
        </div>
      </div>
      {hasError && <span className="text-sm text-red-500">{meta.error}</span>}
    </div>
  );
}

function Password(props: TextInputProps) {
  const formikContext = useFormikContext();
  const [isShowingPassword, setShowingPassword] = useState(false);

  const computedType = isShowingPassword ? 'text' : 'password';
  const Icon = isShowingPassword ? EyeIcon : EyeOffIcon;

  const meta = useMemo(() => formikContext.getFieldMeta(props.name), [formikContext, props.name]);

  const hasError = useMemo(() => {
    if (props.isLoading) {
      return false;
    }

    return !!meta.error && meta.touched;
  }, [props.isLoading, meta.error, meta.touched]);

  return (
    <TextInputRoot
      {...props}
      type={computedType}
      rightElement={
        <Button variant="link" onClick={() => setShowingPassword(previous => !previous)} tabIndex={-1}>
          <Icon
            className={clsx('h-5 w-5 text-gray-400 hover:text-gray-600', hasError && 'text-red-500 hover:text-red-700')}
          />
        </Button>
      }
    />
  );
}

export const TextInput = Object.assign(TextInputRoot, { Password });
