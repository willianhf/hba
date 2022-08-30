import { PolymorphicComponentProps } from '@/types/helpers';
import clsx from 'clsx';

const styling = {
  colors: {
    primary: 'text-gray-900',
    secondary: 'text-gray-700',
    error: 'text-red-500',
    white: 'text-white'
  },
  variants: {
    regular: 'text-base',
    small: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl',
    title: 'text-4xl font-bold',
    subtitle: 'text-2xl font-semibold',
    label: 'text-sm font-medium text-gray-700',
    placeholder: 'text-sm text-gray-500'
  },
  weights: {
    regular: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
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
  weight?: keyof Styling['weights'];
}

type TextProps<C extends React.ElementType> = PolymorphicComponentProps<C, Props>;

export function Text<C extends React.ElementType = 'span'>({
  color = 'primary',
  variant,
  style,
  weight,
  as,
  className,
  ...props
}: TextProps<C>) {
  const Component = as ?? 'span';

  return (
    <Component
      className={clsx(
        styling.colors[color],
        variant && styling.variants[variant],
        style && styling.style[style],
        weight && styling.weights[weight],
        className
      )}
      {...props}
    >
      {props.children}
    </Component>
  );
}
