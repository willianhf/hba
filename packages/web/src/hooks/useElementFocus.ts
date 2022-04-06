import { useCallback, useState } from 'react';

export function useElementFocus() {
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const onBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return [isFocused, onFocus, onBlur] as const;
}
