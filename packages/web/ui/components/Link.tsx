import NextLink from 'next/link';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function Link(props: LinkProps) {
  return (
    <NextLink href={props.href}>
      <a className={props.className}>{props.children}</a>
    </NextLink>
  );
}
