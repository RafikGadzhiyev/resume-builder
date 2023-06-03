import {useCallback, useEffect, useRef, useState} from "react";

export const useTimer = (startValue: number, ms: number) => {
	const [time, setTime] = useState(startValue);
	const [isWorking, setIsWorking] = useState(true);
	const timerCount = useRef(1);
	const timerId = useRef<NodeJS.Timer>();

	const resetTimer = useCallback(
		(doubleIt: boolean) => {
			if (doubleIt) {
				timerCount.current *= 2;
			}
			setTime(() => startValue * timerCount.current);
			setIsWorking(true);
		}, [startValue])

	useEffect(() => {
		if (isWorking) {
			timerId.current = setInterval(() => {
				setTime((prev) => prev - ms);
			}, ms);
		}
		if (time <= 0) {
			setIsWorking(false);
			clearInterval(timerId.current);
		}
		return () => clearInterval(timerId.current);
	}, [time, isWorking]);

	return {time, isWorking, resetTimer};
};
