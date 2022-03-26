import clsx from 'clsx';
import { useMemo } from 'react';
import { PolymorphicComponentProps } from '~/types/helpers';

const Styling = {
  base: 'text-base font-medium',
  colorSchemes: {
    blue: {
      solid: 'bg-blue-600 hover:bg-blue-700 text-white',
      link: 'text-blue-600 hover:!text-blue-700'
    },
    red: {
      solid: 'bg-rose-600 hover:bg-rose-700 text-white',
      link: 'text-rose-600 hover:!text-rose-700'
    }
  },
  variants: {
    solid: 'flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm',
    link: 'whitespace-nowrap text-white hover:text-gray-200'
  }
};

type Props =
  | {
      variant: 'link';
      colorScheme?: keyof typeof Styling['colorSchemes'];
    }
  | {
      variant?: keyof typeof Styling['variants'];
      colorScheme: keyof typeof Styling['colorSchemes'];
    };

type ButtonProps<Component extends React.ElementType> = PolymorphicComponentProps<Component, Props>;

export function Button<Component extends React.ElementType = 'button'>({
  as,
  children,
  className,
  colorScheme,
  variant = 'solid',
  ...props
}: ButtonProps<Component>) {
  const Component = as ?? 'button';

  const computedClassNames = useMemo(() => {
    const classNames = [Styling.base, className, Styling.variants[variant]];
    if (colorScheme) {
      classNames.push(Styling.colorSchemes[colorScheme][variant]);
    }

    return clsx(classNames);
  }, [variant, className, colorScheme]);

  return (
    <Component className={computedClassNames} {...props}>
      {children}
    </Component>
  );
}
