import { PolymorphicComponentProps } from '@/types/helpers';
import clsx from 'clsx';

const styling = {
  colors: {
    primary: 'text-gray-900',
    secondary: 'text-gray-700',
    error: 'text-red-500',
  },
  variants: {
    regular: 'text-base',
    small: 'text-sm',
    title: 'text-4xl font-bold',
    subtitle: 'text-2xl font-semibold',
    label: 'text-sm font-medium text-gray-700',
    placeholder: 'text-sm text-gray-500'
  },
  style: {
    sans: 'font-sans'
  }
};

type Styling = typeof styling;

interface Props {
  children: React.ReactNode;
  color?: keyof Styling['colors'];
  variant?: keyof Styling['variants'];
  style?: keyof Styling['style'];
}

type TextProps<Component extends React.ElementType> = PolymorphicComponentProps<Component, Props>;

export function Text<Component extends React.ElementType = 'span'>({
  color = 'primary',
  variant = 'regular',
  style = 'sans',
  as,
  className,
  ...props
}: TextProps<Component>) {
  const Component = as ?? 'span';

  return (
    <Component
      className={clsx(styling.colors[color], styling.variants[variant], styling.style[style], className)}
      {...props}
    >
      {props.children}
    </Component>
  );
}
