import React from "react";

export const useFocus = (
  reference: React.MutableRefObject<HTMLButtonElement | null>
) => {
  const [isCorrectFocus, setCorrectFocus] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (reference.current) {
      reference.current.onclick = (e) => {
        setCorrectFocus((prev) => !prev);
      };
      reference.current.onblur = (e) => {
        setCorrectFocus(() => false);
      };
    }

    return () => {
      if (reference.current) {
        reference.current.onblur = () => {};
        reference.current.onclick = () => {};
      }
    };
  }, []);

  return isCorrectFocus;
};
