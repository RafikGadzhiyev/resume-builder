import {useCallback, useRef} from 'react';

export const useCallbackOnce = (callback: (...args: any[]) => any) => {
	const one = useRef<number>(1);

	const reset = useCallback(() => {
		one.current = 1;
	}, [])

	const call = useCallback(() => {
		if (one.current === 0) return;
		one.current--;
		callback();
	}, [])

	return [reset, call]
}