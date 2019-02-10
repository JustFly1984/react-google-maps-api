import { useEffect, useRef } from "react";

export default function usePrevious(value: any = {}) {
  const ref = useRef({});

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
