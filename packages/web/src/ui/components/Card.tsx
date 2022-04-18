import clsx from 'clsx';

interface Props {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, ...props }: Props) {
  return <div className={clsx('bg-white rounded-md shadow px-4 py-5', className)} {...props} />;
}
