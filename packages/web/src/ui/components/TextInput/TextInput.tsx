import { ExclamationCircleIcon, EyeIcon, EyeOffIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { useState } from 'react';
import { InheritableElementProps } from '@/types/helpers';
import { Button } from '../Button';
import { Tooltip } from '../Tooltip';
import { Spinner } from '../Spinner';

interface Props {
  label: string;
  name: string;
  error?: React.ReactNode;
  isLoading?: boolean;
  rightElement?: React.ReactNode;
  tooltip?: string;
}

type TextInputProps = InheritableElementProps<'input', Props>;

function TextInputRoot({
  label,
  type = 'text',
  error,
  isLoading,
  placeholder,
  name,
  className,
  rightElement,
  tooltip,
  ...props
}: TextInputProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const hasError = !isLoading && !!error;

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div
        className={clsx(
          'relative flex rounded-md shadow-sm border border-gray-300 overflow-hidden pr-3',
          isFocused && 'ring-1 ring-blue-600 border-blue-600',
          hasError && 'text-rose-600 border-rose-600 ring-rose-600',
        )}
      >
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          className={clsx(
            'flex-1 sm:text-sm text-black border-none focus:outline-none focus:ring-0',
            hasError && 'text-red-800'
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        <div className={clsx('flex space-x-1 items-center', hasError && 'text-red-500')}>
          {tooltip && (
            <Tooltip content={<p className="text-sm text-gray-900">{tooltip}</p>}>
              <QuestionMarkCircleIcon
                className={clsx(
                  'h-5 w-5 text-gray-400 hover:text-gray-600',
                  hasError && 'text-red-500 hover:text-red-700'
                )}
              />
            </Tooltip>
          )}
          {rightElement}
          {isLoading && <Spinner />}
          {hasError && (
            <div className="flex items-center">
              <ExclamationCircleIcon className="h-5 w-5" />
            </div>
          )}
        </div>
      </div>
      {hasError && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}

function Password(props: TextInputProps) {
  const [isShowingPassword, setShowingPassword] = useState(false);

  const computedType = isShowingPassword ? 'text' : 'password';
  const Icon = isShowingPassword ? EyeIcon : EyeOffIcon;

  return (
    <TextInputRoot
      {...props}
      type={computedType}
      rightElement={
        <Button
          variant="link"
          className={clsx('text-gray-400 hover:text-gray-600', props.error && 'text-red-500 hover:text-red-700')}
          onClick={() => setShowingPassword(previous => !previous)}
        >
          <Icon className="h-5 w-5" />
        </Button>
      }
    />
  );
}

export const TextInput = Object.assign(TextInputRoot, { Password });
