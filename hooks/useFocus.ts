import {MutableRefObject, useCallback, useEffect, useState} from "react";

export const useFocus = (reference: MutableRefObject<HTMLButtonElement | null>) => {
	const [isCorrectFocus, setCorrectFocus] = useState<boolean>(false);

	const FocusHandler = useCallback(() => {
		setCorrectFocus((prev) => !prev);
	}, [])

	const BlurHandler = useCallback(() => {
		setCorrectFocus(false);
	}, [])

	useEffect(() => {
		if (reference.current) {
			reference.current.ontouchstart = () => FocusHandler();
			reference.current.onclick = () => FocusHandler();
			reference.current.onblur = () => BlurHandler();
		}

		return () => {
			if (reference.current) {
				reference.current.onblur = () => {};
				reference.current.onclick = () => {};
				reference.current.ontouchstart = () => {};
			}
		};
	}, []);

	return isCorrectFocus;
};
