import React, { useEffect } from "react";
///
///
/// <b style='font-size: 12px'>startValue takes time in milliseconds</b> <br>
/// <b style='font-size: 12px'>ms takes time in milliseconds</b>
///
export const useTimer = (startValue: number, ms: number) => {
  const [time, setTime] = React.useState(startValue);
  const [isWorking, setIsWorking] = React.useState(true);
  const timerCount = React.useRef(1);
  let timerId: NodeJS.Timer;

  const resetTimer = () => {
    timerCount.current *= 2;
    setTime(() => startValue * timerCount.current);
    setIsWorking(() => true);
  };

  useEffect(() => {
    if (isWorking) {
      timerId = setInterval(() => {
        setTime((prev) => prev - ms);
      }, ms);
    }
    if (time <= 0) {
      setIsWorking(() => false);
      clearInterval(timerId);
    }
    return () => clearInterval(timerId);
  }, [time, isWorking]);

  return { time, isWorking, resetTimer };
};
