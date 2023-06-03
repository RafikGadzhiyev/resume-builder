import {useEffect, useRef, useState} from "react";

export const useDebounce = <T>(initialState: T, duration: number, turnMemoization: boolean) => {
	const [state, setState] = useState<T>(initialState);
	const prevValue = useRef<T>(initialState);

	useEffect(() => {
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
