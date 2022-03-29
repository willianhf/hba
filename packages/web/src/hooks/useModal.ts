import { useState } from 'react';

export function useModal() {
  const [isOpen, setOpen] = useState<boolean>(false);

  function open() {
    setOpen(true);
  }

  function close() {
    setOpen(false);
  }

  return { isOpen, open, close };
}
