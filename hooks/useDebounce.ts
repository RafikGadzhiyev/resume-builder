import React from "react";

export const useDebounce = <T>(
  initialState: T,
  duration: number,
  turnMemoization: boolean
) => {
  const [state, setState] = React.useState<T>(initialState);
  const prevValue = React.useRef<T>(initialState);

  React.useEffect(() => {
    let timer = setTimeout(() => {
      if (prevValue.current !== initialState || !turnMemoization) {
        prevValue.current = state;
        setState(initialState);
      }
    }, duration);
    return () => clearTimeout(timer);
  }, [initialState, duration, turnMemoization]);

  return state;
};
