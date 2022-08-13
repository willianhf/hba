import { useLocation } from '@/hooks';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import { Link } from './Link';

interface Props {
  to?: string;
}

export function BackButton(props: Props) {
  const location = useLocation();
  const state = location?.state;

  const to = state?.from?.pathname ?? props.to;
  if (!to) {
    return null;
  }

  return (
    <Link to={to}>
      <ArrowLeftIcon className="h-6 w-6 text-gray-900 mr-3" />
    </Link>
  );
}
