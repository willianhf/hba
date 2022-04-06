import { ExclamationCircleIcon } from '@heroicons/react/outline';
import clsx from 'clsx';

interface Props {
  className?: string;
  children: React.ReactNode;
}

export function Error(props: Props) {
  return (
    <div className={clsx('flex items-center text-red-500', props.className)}>
      <ExclamationCircleIcon className="h-5 w-5 mr-2" />
      <span className="text-sm">{props.children}</span>
    </div>
  );
}
