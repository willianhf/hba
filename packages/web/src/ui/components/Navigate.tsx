import { useNavigate } from '@/hooks';
import { useEffect } from 'react';
import type { NavigateProps } from 'react-router-dom';

export const Navigate: React.FC<NavigateProps> = ({ to, ...options }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to, options);
  }, [navigate, to, options]);

  return null;
};
