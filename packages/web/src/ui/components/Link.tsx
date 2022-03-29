import { Link as RouterLink } from 'react-router-dom';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function Link(props: LinkProps) {
  return (
    <RouterLink to={props.href} className={props.className}>
      {props.children}
    </RouterLink>
  );
}
