import { useCallback, useState } from 'react';

const useDisclosure = (isOpenDefault = false, callback?: () => void) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  const open = useCallback(() => {
    // eslint-disable-next-line no-unused-expressions
    callback && callback();
    setIsOpen(true);
  }, [callback]);
  const close = useCallback(() => {
    // eslint-disable-next-line no-unused-expressions
    callback && callback();
    setIsOpen(false);
  }, [callback]);
  const toggle = useCallback(() => {
    // eslint-disable-next-line no-unused-expressions
    callback && callback();
    setIsOpen((state) => !state);
  }, [callback]);

  return [isOpen, open, close, toggle] as const;
};

export default useDisclosure;
