import clsx from 'clsx';
import { Link as RouterLink, useLocation } from 'react-router-dom';

interface LinkProps {
  to: string;
  children: React.ReactNode;
  state?: any;
  className?: string;
  disabled?: boolean;
}

export function Link(props: LinkProps) {
  const location = useLocation();
  const state = props.state || {};

  const classes = clsx([props.className, props.disabled && 'pointer-events-none opacity-80 cursor-not-allowed']);

  return (
    <RouterLink
      to={props.to}
      className={classes}
      state={{
        from: location,
        ...state
      }}
    >
      {props.children}
    </RouterLink>
  );
}
