import React from "react";

export const useSort = <T>(initialState: T[]) => {
  const [state, setState] = React.useState<T[]>(initialState);

  const sort = (callBack: (a: T, b: T) => boolean): void => {
    setState(() =>
      [...initialState].sort((el1: T, el2: T): number =>
        callBack(el1, el2) ? 1 : !callBack(el1, el2) ? -1 : 0
      )
    );
  };

  const reset = (): void => {
    setState(() => initialState);
  };

  const updateState = (newState: T[]): void => {
    setState(() => newState);
  };

  return { state, sort, reset, updateState };
};
