import { useCallback, useState } from 'react';

const useInput = (defaultValue: string) => {
  const [input, setInput] = useState(defaultValue);
  const setInputText = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => setInput(e.target.value),
    [],
  );
  return [input, setInputText] as const;
};

export default useInput;
