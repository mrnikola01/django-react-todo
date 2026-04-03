import { useEffect } from "react";

function useAutoClearMessage(value, clearValue, delay = 3000) {
  useEffect(() => {
    if (!value) return;

    const timer = setTimeout(() => {
      clearValue();
    }, delay);

    return () => clearTimeout(timer);
  }, [value, clearValue, delay]);
}

export default useAutoClearMessage;
