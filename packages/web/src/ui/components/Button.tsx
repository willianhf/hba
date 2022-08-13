import { PolymorphicComponentProps } from '@/types/helpers';
import clsx from 'clsx';
import { useMemo } from 'react';
import { Spinner } from './Spinner';

const styling = {
  base: 'text-base font-medium disabled:opacity-80 disabled:cursor-not-allowed',
  colorSchemes: {
    base: {
      solid: null,
      link: 'text-white hover:text-gray-200'
    },
    blue: {
      solid: 'bg-blue-600 hover:bg-blue-700 text-white',
      link: 'text-blue-600 hover:text-blue-700'
    },
    red: {
      solid: 'bg-rose-600 hover:bg-rose-700 text-white',
      link: 'text-rose-600 hover:text-rose-700'
    }
  },
  variants: {
    solid: 'flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm',
    link: 'whitespace-nowrap'
  }
};

type Props = {
  isLoading?: boolean;
  isDisabled?: boolean;
  fillParent?: boolean;
} & (
  | {
      variant: 'link';
      colorScheme?: keyof typeof styling['colorSchemes'];
    }
  | {
      variant?: keyof typeof styling['variants'];
      colorScheme: keyof typeof styling['colorSchemes'];
    }
);

type ButtonProps<Component extends React.ElementType> = PolymorphicComponentProps<Component, Props>;

export function Button<Component extends React.ElementType = 'button'>({
  as,
  children,
  className,
  colorScheme = 'base',
  variant = 'solid',
  isLoading,
  fillParent,
  ...props
}: ButtonProps<Component>) {
  const Component = as ?? 'button';

  const isDisabled = useMemo(() => {
    if (isLoading) {
      return true;
    }

    return !!props.isDisabled;
  }, [isLoading, props.isDisabled]);

  const classes = clsx([
    styling.base,
    className,
    styling.colorSchemes[colorScheme][variant],
    styling.variants[variant],
    fillParent && 'w-full'
  ]);

  return (
    <Component className={classes} disabled={isDisabled} {...props}>
      {children}
      {isLoading && (
        <div className="ml-2">
          <Spinner className="text-white" />
        </div>
      )}
    </Component>
  );
}
