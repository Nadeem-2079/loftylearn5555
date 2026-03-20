import { useState, useCallback } from "react";

export default function useToasts() {

  const [toasts, setToasts] = useState([]);

  const add = useCallback((message, icon = "✦") => {

    const id = Date.now();

    setToasts(t => [...t, { id, message, icon }]);

    setTimeout(() => {
      setToasts(t => t.map(x => x.id === id ? { ...x, removing: true } : x));
    }, 2800);

    setTimeout(() => {
      setToasts(t => t.filter(x => x.id !== id));
    }, 3100);

  }, []);

  return [toasts, add];

}