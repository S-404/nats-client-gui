import { useState } from 'react';

interface IModalProps {
  isOpened: boolean;
  open: () => void;
  close: () => void;
}

export function useModal(): IModalProps {
  const [isOpened, setIsOpened] = useState(false);
  const open = () => setIsOpened(true);
  const close = () => setIsOpened(false);

  return { isOpened, open, close };
}
