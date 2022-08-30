import clsx from 'clsx';
import { Link as RouterLink, LinkProps as RouterLinkProps, useLocation } from 'react-router-dom';

interface LinkProps extends RouterLinkProps {
  disabled?: boolean;
}

export function Link({ state: initialState, className, disabled, to, ...props }: LinkProps) {
  const location = useLocation();
  const state = initialState ?? {};

  const classes = clsx([className, disabled && 'pointer-events-none opacity-80 cursor-not-allowed']);

  return (
    <RouterLink
      to={to}
      className={classes}
      state={{
        from: location,
        ...state
      }}
      {...props}
    />
  );
}
